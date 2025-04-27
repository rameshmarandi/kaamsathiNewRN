import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import useAppTheme from '../Hooks/useAppTheme';
import SafeAreaContainer from './SafeAreaContainer';

const FAQItem = React.memo(({item, index, expandedIndex, setExpandedIndex}) => {
  const isExpanded = expandedIndex === index;
  const toggleCollapse = useCallback(() => {
    setExpandedIndex(isExpanded ? null : index);
  }, [isExpanded, index, setExpandedIndex]);

  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <Animatable.View
      style={[
        styles.itemContainer,
        {
          borderColor: isExpanded
            ? theme.color.cardBorderColor
            : theme.color.placeholder,
        },
      ]}
      duration={300}
      transition="backgroundColor">
      <TouchableOpacity onPress={toggleCollapse} style={styles.itemHeader}>
        <View style={styles.itemTitleContainer}>
          <Text
            style={[
              styles.itemTitle,
              {color: theme.color.textColor, fontSize: theme.fontSize.medium},
            ]}>
            {item.lableName}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleCollapse}>
          <VectorIcon
            type={'AntDesign'}
            name={isExpanded ? 'caretup' : 'caretdown'}
            size={theme.fontSize.large}
            color={
              isExpanded
                ? theme.color.textColor
                : theme.color.nonActiveTextColor
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        {isExpanded && (
          <>
            <View
              style={{
                marginTop: getResHeight(1),
                borderTopWidth: 1,
                borderColor: isExpanded
                  ? theme.color.cardBorderColor
                  : theme.color.placeholder,
                color: theme.color.placeholder,
                fontSize: theme.fontSize.medium,
                width: '100%',
              }}
            />
          </>
        )}
        <Animatable.Text
          animation={isExpanded ? 'fadeIn' : undefined}
          style={[
            styles.itemContent,
            {

              borderColor: isExpanded
                ? theme.color.cardBorderColor
                : theme.color.placeholder,
              color: theme.color.dimBlack,
              fontSize: theme.fontSize.medium,
              width: '95%',
              flexWrap: 'wrap',
            },
          ]}>
          {item.lableValue}
        </Animatable.Text>
      </Collapsible>
    </Animatable.View>
  );
});

const FAQListComp = ({data}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const renderItem = useCallback(
    ({item, index}) => (
      <FAQItem
        item={item}
        index={index}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
    ),
    [expandedIndex],
  );

  return (
    <SafeAreaContainer>
      <Text
        style={{
          fontSize: theme.fontSize.large,
          color: theme.color.textColor,
          fontFamily: theme.font.semiBold,
          marginVertical: getResHeight(1),
        }}>
        FAQ's
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaContainer>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: getResHeight(10),
    },
    itemContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.color.cardBorderColor,
      marginBottom: getResHeight(1.3),
      paddingVertical: getResHeight(1.3),
      borderRadius: getResHeight(1),
      backgroundColor: theme.color.background,
    },
    itemHeader: {
      paddingHorizontal: getResHeight(1.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitleContainer: {
      width: getResWidth(70),
    },
    itemTitle: {
      fontFamily: theme.font.medium,
      fontSize: getFontSize(1.6),
    },
    itemContent: {
      lineHeight: 27,
      paddingHorizontal: getResHeight(1.3),
      paddingVertical: getResHeight(1),
      fontFamily: theme.font.medium,
    },
  });

export default FAQListComp;
