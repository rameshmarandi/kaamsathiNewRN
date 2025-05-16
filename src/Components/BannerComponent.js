import { memo, useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getResHeight } from '../utility/responsive';

const {width} = Dimensions.get('window');

const BannerComponent = props => {
  const flatListRef = useRef(null);
  return (
    <>
      <View style={styles.container}>
        <Carousel
          // data={getBanner}
          data={[
            {
              imageUrl: 'https://media.sciencephoto.com/image/f0196939/800wm',
            },

            {
              imageUrl:
                'https://t3.ftcdn.net/jpg/05/87/21/26/360_F_587212614_0XgINBahra0KnDR9Cwq3pOH32sABMz3B.jpg',
            },
            {
              imageUrl:
                'https://www.qu.edu.qa/SiteImages/static_file/qu/colleges/engineering/images/EE%20banner.jpg',
            },
          ]}
          width={width} // Full-width banners with padding
          height={getResHeight(20)}
          pagingEnabled={false} // Prevents locking gestures
          vertical={false} // Ensures only horizontal swiping
          autoPlay
          autoPlayInterval={3000}
          loop
          snapEnabled
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 50,
            parallaxScrollingScale: 0.9,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              disabled
              activeOpacity={0.8}
              onPress={() => {}}
              style={styles.slide}>
              <Image
                source={{uri: item.imageUrl}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              {/* <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.overlay}
                />
                <Text style={styles.bannerTitle}>{item.title}</Text> */}
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  slide: {},
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {},
  bannerTitle: {},
});

export default memo(BannerComponent);
