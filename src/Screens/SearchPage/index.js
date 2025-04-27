import {
  View,
  Text,
  Animated,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import SafeAreaContainer from '../../Components/SafeAreaContainer';
import CustomHeader from '../../Components/CustomHeader';
import SearchBarComp from '../../Components/SearchBarComp';
import {skilledWorkers} from '../../Components/StaticDataHander';
import useAppTheme from '../../Hooks/useAppTheme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import ModalMap from './ModalMap';

const uniqueSkills = [
  ...new Set(skilledWorkers.map(worker => worker.skill.toLowerCase())),
];

const index = props => {
  const {navigation} = props;
  const theme = useAppTheme();

  const styles = useMemo(() => getStyles(theme), [theme]);

  // State management
  const [searchText, setSearchText] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(uniqueSkills);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const searchBarPlaceholder = useMemo(
    () => (selectedSkill ? selectedSkill : searchText),
    [selectedSkill, searchText],
  );

  const handleKeySearch = useCallback(text => {
    setSearchText(text);
    setIsSearchModalVisible(true);

    if (!text.trim()) {
      setFilteredSkills(uniqueSkills);
    } else {
      const filtered = uniqueSkills.filter(skill =>
        skill.includes(text.toLowerCase()),
      );
      setFilteredSkills(filtered);
    }

    setSelectedSkill('');
    setFilteredProfiles([]);
  }, []);

  const handleSkillSelect = useCallback(skill => {
    setIsMapModalVisible(true);
    setSelectedSkill(skill);
    const profiles = skilledWorkers.filter(
      worker => worker.skill.toLowerCase() === skill,
    );
    setFilteredProfiles(profiles);
    setIsSearchModalVisible(false);
  }, []);

  // Modal view

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  // Example of user location (replace with actual geolocation data)
  const userLocation = {latitude: 37.7749, longitude: -122.4194};

  // Handle Book Now action (logic for booking)
  const handleBookNow = () => {
    console.log('Booking initiated...');
  };

  return (
    <SafeAreaContainer>
      <Animated.View>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle="Search Skilled Professionals"
        />
      </Animated.View>

      <View style={{flex: 1}}>
        <SearchBarComp
          placeholder="Search skilled professionals..."
          onChangeText={handleKeySearch}
          value={searchBarPlaceholder}
          onClear={() => {
            setIsSearchModalVisible(false);
          }}
          autoFocus
        />

        {/* ModalMap component to show the map */}
        <ModalMap
          isVisible={isMapModalVisible}
          onClose={() => setIsMapModalVisible(false)}
          userLocation={userLocation}
          onBookNow={handleBookNow}
        />
        <View style={{paddingHorizontal: '5%', marginTop: 10, flex: 1}}>
          <Text
            style={{
              color: theme.color.textColor,
              fontFamily: theme.font.medium,
              fontSize: theme.fontSize.large,
            }}>
            Search For
          </Text>

          {/* Pills Section */}
          <FlatList
            data={filteredSkills}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <AnimatedSkillPill
                skill={item}
                selectedSkill={selectedSkill}
                onPress={handleSkillSelect}
                theme={theme}
                index={index}
              />
            )}
            contentContainerStyle={styles.pillsContainer}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

const AnimatedSkillPill = ({skill, selectedSkill, onPress, theme, index}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 60,
        delay: index * 30,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 30,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const isSelected = selectedSkill === skill;

  return (
    <Animated.View
      style={{
        transform: [{scale: scaleAnim}],
        opacity: opacityAnim,
        margin: 5,
      }}>
      <Pressable
        onPress={() => onPress(skill)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({pressed}) => [
          {
            backgroundColor: isSelected
              ? theme.color.primary
              : pressed
              ? theme.color.primaryLight
              : theme.color.background,
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.color.primary,
            minWidth: getResWidth(24),
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <Text
          style={{
            color: isSelected ? theme.color.background : theme.color.textColor,
            fontFamily: theme.font.medium,
            fontSize: theme.fontSize.medium,
            textAlign: 'center',
          }}>
          {skill.charAt(0).toUpperCase() + skill.slice(1)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    pillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',

      paddingBottom: 100,
      marginTop: 10,
    },
  });

export default index;
