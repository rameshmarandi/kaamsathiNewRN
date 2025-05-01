import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const RadiusSlider = ({
  min = 5,
  max = 10,
  step = 1,
  colors = ['#4CAF50', '#2196F3'],
  labelFormatter = (value) => `${value}km`,
  onRadiusChange,
  style,
  ...sliderProps
}) => {
  const [radius, setRadius] = useState(min);
  const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width - 80);

  const handleLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  }, []);

  const handleValueChange = useCallback((value) => {
    const roundedValue = Math.round(value);
    setRadius(roundedValue);
    onRadiusChange?.(roundedValue);
  }, [onRadiusChange]);

  const fillWidth = useMemo(() => {
    return ((radius - min) / (max - min)) * sliderWidth;
  }, [radius, min, max, sliderWidth]);

  const ThumbComponent = useMemo(() => (
    <View style={styles.thumb}>
      <Text style={styles.thumbText}>{labelFormatter(radius)}</Text>
    </View>
  ), [radius, labelFormatter]);

  const TrackComponent = useMemo(() => (
    <View style={[styles.track, { width: sliderWidth }]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: fillWidth }]}
      />
    </View>
  ), [sliderWidth, colors, fillWidth]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.sliderContainer}>
        <Slider
          {...sliderProps}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={radius}
          onValueChange={handleValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbComponent={ThumbComponent}
          trackStyle={[styles.trackBase, sliderProps.trackStyle]}
          onLayout={handleLayout}
        />
        {/* {TrackComponent} */}
        {/* <View style={styles.labelContainer}>
          <Text style={styles.label}>{labelFormatter(min)}</Text>
          <Text style={styles.label}>{labelFormatter(max)}</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#a91414',
    borderRadius: 15,
    margin: 10,
  },
  sliderContainer: {
    position: 'relative',
    height: 60,
  },
  trackBase: {
    height: 10,
    borderRadius: 10,
  },
  track: {
    position: 'absolute',
    top: 15,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    zIndex: -1,
  },
  fill: {
    height: '100%',
    borderRadius: 10,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
});

export default React.memo(RadiusSlider);