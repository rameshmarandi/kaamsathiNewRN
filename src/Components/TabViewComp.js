import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useTheme} from '../Hooks/ThemeContext';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {VectorIcon} from './VectorIcon';

const initialLayout = {width: Dimensions.get('window').width};

const TabViewComp = memo(
  ({
    routes,
    scenes,
    indicatorStyle,
    sceneContainerStyle,
    tabBarContainerStyle,
    labelStyle,
    onIndexChange,
  }) => {
    const theme = useTheme();
    const styles = getStyles();
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);

    const renderScene = useMemo(() => SceneMap(scenes), [scenes]);

    const handleIndexChange = useCallback(
      newIndex => {
        setIndex(newIndex);
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
          viewPosition: 0.5,
        });
        if (onIndexChange) onIndexChange(newIndex);
      },
      [onIndexChange],
    );

    const getItemLayout = useCallback(
      (_data, index) => ({
        length: getResWidth(50),
        offset: getResWidth(50) * index,
        index,
      }),
      [],
    );

    const renderItem = useCallback(
      ({item, index: tabIndex}) => {
        const isActive = index === tabIndex;

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.tabItem,
              isActive
                ? styles.activeTab
                : {
                    borderBottomColor: theme.color.outlineColor,
                    borderBottomWidth: 2,
                  },{
                    flexDirection:"row",
                    alignItems:"center"
                  }
            ]}
            onPress={() => handleIndexChange(tabIndex)}>
            <VectorIcon
              type={item.icons.type}
              name={item.icons.name}
              size={getFontSize(2.6)}
              color={isActive ? theme.color.primary : theme.color.outlineColor}
            />
            <Text
              style={[
                styles.tabLabel,
                labelStyle,
                isActive && styles.activeLabel,{
                  marginLeft:"4%"
                }
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      },
      [index, styles, theme, handleIndexChange, labelStyle],
    );

    const renderTabBar = useCallback(
      () => (
        <View style={[styles.tabBarContainer, tabBarContainerStyle]}>
          <FlatList
            ref={flatListRef}
            data={routes}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            showsHorizontalScrollIndicator={false}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            extraData={index}
          />
        </View>
      ),
      [styles, tabBarContainerStyle, routes, renderItem, getItemLayout, index],
    );

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        animationEnabled
        onIndexChange={handleIndexChange}
        sceneContainerStyle={sceneContainerStyle}
        initialLayout={initialLayout}
      />
    );
  },
);

const getStyles = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        tabBarContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.color.background,
        },
        tabItem: {
          paddingVertical: getResHeight(1),
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 0,
          width: getResWidth(49),
        },
        activeTab: {
          borderBottomWidth: 2,
          borderBottomColor: theme.color.ratingColor,
        },
        tabLabel: {
          fontSize: theme.fontSize.medium,
          fontFamily: theme.font.medium,
          textTransform: 'capitalize',
          color: theme.color.dimBlack,
        },
        activeLabel: {
          color: theme.color.textColor,
          fontSize: theme.fontSize.medium,
          fontFamily: theme.font.medium,
        },
      }),
    [theme],
  );
};

export default TabViewComp;
