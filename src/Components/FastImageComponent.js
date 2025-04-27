import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const FastImageComponent = ({
  source,
  resizeMode = FastImage.resizeMode.cover,
  style,
  fallbackSource,
  loader = true,
  tintColor,
  borderRadius = 0,
  onLoadStart,
  onLoadEnd,
  ...rest
}) => {
  const [loading, setLoading] = React.useState(true);

  const handleLoadStart = () => {
    setLoading(true);
    onLoadStart?.();
  };

  const handleLoadEnd = () => {
    setLoading(false);
    onLoadEnd?.();
  };

  return (
    <View style={[styles.container, {borderRadius}, style]}>
      {/* {loader && loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )} */}
      <FastImage
        {...rest}
        // style={[StyleSheet.absoluteFill, {borderRadius}]}
        style ={style}
        source={source}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        tintColor={tintColor}
        fallback={true}
        defaultSource={fallbackSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default React.memo(FastImageComponent);
