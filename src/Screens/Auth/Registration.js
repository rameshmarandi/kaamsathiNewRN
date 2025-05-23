import React, {useRef, useEffect, useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Registration = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture area dimensions (90% width, 25% height, centered)
  const captureRect = useMemo(
    () => ({
      width: screenWidth * 0.9,
      height: screenHeight * 0.25,
      left: screenWidth * 0.05,
      top: screenHeight * 0.15,
    }),
    [screenWidth, screenHeight],
  );

  useEffect(() => {
    const checkPermissions = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    checkPermissions();
  }, [hasPermission, requestPermission]);

  const captureImage = async () => {
    if (camera.current) {
      try {
        setIsActive(false);
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'quality',
          skipMetadata: true,
        });
        setCapturedImage(photo.path);
      } catch (e) {
        console.error('Failed to capture photo:', e);
      } finally {
        setIsActive(true);
      }
    }
  };

  const openGallery = () => {
    console.log('Open gallery pressed');
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission not granted</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View - Only visible when no image is captured */}
      {!capturedImage && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          photo={true}
        />
      )}

      {/* Top overlay section */}
      <View style={[styles.topOverlay, {height: captureRect.top}]}>
        <Text style={styles.instructionText}>
          Capture Aadhaar Card (Front Side)
        </Text>
        <Text style={styles.subInstructionText}>
          Place your Aadhaar card within the frame
        </Text>
      </View>

      {/* Left side overlay */}
      <View
        style={[
          styles.sideOverlay,
          {
            width: captureRect.left,
            top: captureRect.top,
            height: captureRect.height,
          },
        ]}
      />

      {/* Right side overlay */}
      <View
        style={[
          styles.sideOverlay,
          {
            width: screenWidth - captureRect.left - captureRect.width,
            left: captureRect.left + captureRect.width,
            top: captureRect.top,
            height: captureRect.height,
          },
        ]}
      />

      {/* Bottom overlay section */}
      <View
        style={[
          styles.bottomOverlay,
          {
            top: captureRect.top + captureRect.height,
            height: screenHeight - (captureRect.top + captureRect.height),
          },
        ]}>
        {/* Sample Aadhaar card image */}
        <View style={styles.sampleImageContainer}>
          <Image
            source={{
              uri: 'https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card.webp',
            }}
            style={styles.sampleImage}
            resizeMode="contain"
          />
          <Text style={styles.sampleText}>SAMPLE</Text>
        </View>

        {/* Capture controls or preview actions */}
        {capturedImage ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCapturedImage(null)}>
              <Text style={styles.actionButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}>
              <Text style={styles.actionButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.captureControls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={openGallery}>
              <Icon name="photo-library" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={captureImage}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={styles.galleryButton} />
          </View>
        )}
      </View>

      {/* Capture rectangle outline */}
      {!capturedImage && (
        <View
          style={[
            styles.captureFrame,
            {
              width: captureRect.width,
              height: captureRect.height,
              left: captureRect.left,
              top: captureRect.top,
            },
          ]}>
          <View style={styles.frameBorder} />
        </View>
      )}

      {/* Display captured image */}
      {capturedImage && (
        <View
          style={[
            styles.imagePreviewContainer,
            {
              width: captureRect.width,
              height: captureRect.height,
              left: captureRect.left,
              top: captureRect.top,
            },
          ]}>
          <Image
            source={{uri: capturedImage}}
            style={styles.capturedImage}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  topOverlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subInstructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  captureFrame: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  frameBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  imagePreviewContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  sampleImageContainer: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sampleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  sampleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  captureControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: 50,
  },
  galleryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Registration;
