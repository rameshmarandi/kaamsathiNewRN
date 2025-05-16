import React, { memo, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Dimensions, Image } from 'react-native';
import FastImageComponent from '../../Components/FastImageComponent';
import { useTheme } from '../../Hooks/ThemeContext';
import { getResHeight, getResWidth } from '../../utility/responsive';

const {width} = Dimensions.get('window');

const SquareCardComp = ({
  data = [],
  onCardPress,
  cardStyle,
  imageStyle,
  titleStyle,
}) => {
  const flatListRef = useRef(null); // for scrolling to top if needed
  const theme = useTheme();

  const CARD_SIZE = useMemo(() => (width - 60) / 3, []); // fixed 3 cards

  const styles =getStyles()

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onCardPress?.(item)}
      style={[styles.card, cardStyle]}
      activeOpacity={0.8}>
      {item.isInternal ? (
        <Image
          style={[styles.image, imageStyle]}
          source={
            item.image // for local images
          }
          resizeMode="contain"
        />
      ) : (
        <FastImageComponent
          style={[styles.image, imageStyle]}
          source={
            item.isInternal
              ? item.image // for local images
              : {
                  uri: item.image,
                  priority: 'high',
                }
          }
          resizeMode="contain"
        />
      )}

      <Text style={[styles.title, titleStyle]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0} // always start at beginning
        getItemLayout={(data, index) => ({
          length: CARD_SIZE + getResWidth(4), // card width + margin
          offset: (CARD_SIZE + getResWidth(4)) * index,
          index,
        })}
        scrollEnabled={true}
      />
    </View>
  );
};

const getStyles = CARD_SIZE => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          paddingHorizontal: 10,
        },
        card: {
          width: getResWidth(27),
          height: getResHeight(14),
          backgroundColor: theme.color.background,
          borderWidth: 1,
          borderColor: theme.color.border,
          margin: getResWidth(2),
          borderRadius: getResHeight(2),
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        },
        image: {
          width: '100%',
          height: getResHeight(8.5),
          borderRadius: 10,
          marginBottom: 5,
        },
        title: {
          fontSize: theme.fontSize.xSmall,
          color: theme.color.textColor,
          fontFamily: theme.font.semiBold,
          textAlign: 'center',
        },
      }),
    [theme],
  );
};

export default memo(SquareCardComp);
