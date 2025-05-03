import React, {
  useState,
  memo,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getFontSize, getResHeight, getResWidth } from '../utility/responsive';
import useAppTheme from '../Hooks/useAppTheme';

const initialLayout = { width: Dimensions.get('window').width };

const TabViewComp = memo(({
  routes,
  scenes,
  indicatorStyle,
  sceneContainerStyle,
  tabBarContainerStyle,
  labelStyle,
  onIndexChange,
}) => {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderScene = useMemo(() => SceneMap(scenes), [scenes]);

  const handleIndexChange = useCallback((newIndex) => {
    setIndex(newIndex);
    flatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
      viewPosition: 0.5,
    });
    if (onIndexChange) onIndexChange(newIndex);
  }, [onIndexChange]);

  const getItemLayout = useCallback((_data, index) => ({
    length: getResWidth(50),
    offset: getResWidth(50) * index,
    index,
  }), []);

  const renderItem = useCallback(({ item, index: tabIndex }) => {
    const isActive = index === tabIndex;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabItem,
          isActive ? styles.activeTab : {
            borderBottomColor: theme.color.outlineColor,
            borderBottomWidth: 2,
          },
        ]}
        onPress={() => handleIndexChange(tabIndex)}
      >
        <Text
          style={[
            styles.tabLabel,
            labelStyle,
            isActive && styles.activeLabel,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }, [index, styles, theme, handleIndexChange, labelStyle]);

  const renderTabBar = useCallback(() => (
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
  ), [styles, tabBarContainerStyle, routes, renderItem, getItemLayout, index]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      animationEnabled
      onIndexChange={handleIndexChange}
      sceneContainerStyle={sceneContainerStyle}
      initialLayout={initialLayout}
    />
  );
});

const getStyles = theme => StyleSheet.create({
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
    width: getResWidth(50),
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
});

export default TabViewComp;
