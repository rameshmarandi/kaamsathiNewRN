import React, {useState, useRef, memo, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {VectorIcon} from '../../Components/VectorIcon';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../utility/responsive';
import theme from '../../utility/theme';
import useAppTheme from '../../Hooks/useAppTheme';
import {useTranslation} from 'react-i18next';

const EmployeeReview = ({reviews}) => {
  const {t} = useTranslation();
  const theme = useAppTheme();

  const styles = useMemo(() => getStyles(theme), [theme]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const slideReview = (index, direction) => {
    Animated.timing(translateX, {
      toValue: direction === 'left' ? getResWidth(-100) : getResWidth(100),
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(index);
      setExpandedReview(false);
      translateX.setValue(direction === 'left' ? getResWidth(100) : getResWidth(-100));
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const currentReview = reviews[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>User Reviews</Text>

        {/* Previous Button */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.leftButton, currentIndex === 0 && styles.disabledArrow]}
          onPress={() => currentIndex > 0 && slideReview(currentIndex - 1, 'left')}
          disabled={currentIndex === 0}>
          <VectorIcon
            type="MaterialIcons"
            name="chevron-left"
            size={getFontSize(3)}
            color={theme.color.white}
          />
        </TouchableOpacity>

        {/* Review Content */}
        <Animated.View style={[styles.contentContainer, {transform: [{translateX}]}]}>
          <Image source={{uri: currentReview.profilePic}} style={styles.reviewerImage} />
          <Text style={styles.reviewerName}>{currentReview.name}</Text>
          <Text style={styles.reviewRating}>⭐ {currentReview.rating} / 5</Text>
          <Text style={styles.reviewComment} numberOfLines={expandedReview ? null : 2}>
            "{currentReview.comment}"
          </Text>
          {currentReview.comment.length > 50 && (
            <TouchableOpacity onPress={() => setExpandedReview(!expandedReview)}>
              <Text style={styles.readMoreText}>
                {expandedReview ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.rightButton, currentIndex === reviews.length - 1 && styles.disabledArrow]}
          onPress={() =>
            currentIndex < reviews.length - 1 && slideReview(currentIndex + 1, 'right')
          }
          disabled={currentIndex === reviews.length - 1}>
          <VectorIcon
            type="MaterialIcons"
            name="chevron-right"
            size={getFontSize(3)}
            color={theme.color.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      marginTop: getResHeight(2),
    },
    sectionTitle: {
      position: 'absolute',
      top: getResHeight(2),
      left: getResWidth(5),
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
      color: theme.color.textColor,
    },
    card: {
      width: '90%',
      backgroundColor: theme.color.background,
      borderColor: theme.color.cardBorderColor,
      borderWidth: 1,
      borderRadius: getResHeight(2),
      padding: getResWidth(4),
      elevation: 5,
      alignItems: 'center',
      position: 'relative',
      height: getResHeight(30),
      justifyContent: 'center',
      overflow: 'hidden',
    },
    contentContainer: {
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      paddingTop: getResHeight(3),
    },
    reviewerImage: {
      width: getResHeight(10),
      height: getResHeight(10),
      borderRadius: getResHeight(100),
      marginBottom: 5,
    },
    reviewerName: {
      fontSize: theme.fontSize.medium,
      color: theme.color.textColor,
      fontFamily: theme.font.semiBold,
      marginVertical: getResHeight(1),
    },
    reviewRating: {
      fontSize: theme.fontSize.medium,
      color: theme.color.ratingColor,
      marginBottom: getResHeight(1),
    },
    reviewComment: {
      fontSize: theme.fontSize.medium,
      color: theme.color.nonActiveTextColor,
      fontFamily: theme.font.regular,
      textAlign: 'center',
      marginBottom: getResHeight(1),
      paddingHorizontal: getResWidth(5),
    },
    readMoreText: {
      color: theme.color.primary,
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    arrowButton: {
      position: 'absolute',
      top: '50%',
      backgroundColor: theme.color.primary,
      borderRadius: 20,
      padding: 8,
      transform: [{translateY: -15}],
      zIndex: 99,
    },
    leftButton: {
      left: 10,
    },
    rightButton: {
      right: 10,
    },
    disabledArrow: {
      opacity: 0.5,
    },
  });

export default memo(EmployeeReview); // Wrap EmployeeReview;
