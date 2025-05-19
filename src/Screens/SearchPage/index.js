import {
  View,
  Text,
  Animated,
  StyleSheet,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  memo,
} from 'react';
import SafeAreaContainer from '../../Components/SafeAreaContainer';
import CustomHeader from '../../Components/CustomHeader';
import SearchBarComp from '../../Components/SearchBarComp';
import {skilledWorkers} from '../../Components/StaticDataHander';
// import useAppTheme from '../../Hooks/useAppTheme';
import {getResHeight, getResWidth} from '../../utility/responsive';
import ModalMap from './ModalMap';
import {useDispatch, useSelector} from 'react-redux';
import NoDataFound from '../../Components/NoDataFound';
import {createDebouncedSearch} from '../../utility/debounceUtils';
import {ROUTES} from '../../Navigation/RouteName';
import SearchFilter from './SearchFilter';
import UserRadiusModal from '../ModalScreens/UserRadiusModal';
import JobDurationModal from '../ModalScreens/JobDurationModal';
import JobCalendarModal from '../ModalScreens/JobCalendarModal';
import {VectorIcon} from '../../Components/VectorIcon';
import {searchPageStyles} from './styles/searchPage.styles';
import {useTheme} from '../../Hooks/ThemeContext';

const uniqueSkills = [
  ...new Set(skilledWorkers.map(worker => worker.skill.toLowerCase())),
];
const rotatingPlaceholders = [
  'Search skilled plumber',
  'Search skilled electrician',
  'Search skilled carpenter',
  'Search skilled painter',
  'Search skilled technician',
];

const Index = props => {
  const {navigation} = props;
  console.log('Cheming_reslosing_seachpages');

  const theme = useTheme();
  const dispatch = useDispatch();
  const isUserOnline = useSelector(state => state.user.isUserOnline);
  const isDarkMode = useSelector(state => state.user.isDarkMode);

  const styles = searchPageStyles();

  const [searchText, setSearchText] = useState('');
  const [rotatingPlaceholder, setRotatingPlaceholder] = useState(
    rotatingPlaceholders[0],
  );
  const [filteredSkills, setFilteredSkills] = useState(uniqueSkills);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  const [selectedDistance, setSelectedDistance] = useState(5);
  const flatListRef = useRef(null);
  const lastPress = useRef(0);

  const handleTextChange = useCallback(text => {
    setSearchText(text);
    setIsSearchModalVisible(true);
    debouncedHandleKeySearch(text);
  }, []);

  const handleKeySearch = useCallback(text => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setFilteredSkills(uniqueSkills);
    } else {
      const filtered = uniqueSkills.filter(skill =>
        skill.includes(trimmedText.toLowerCase()),
      );
      setFilteredSkills(filtered);
    }
    setSelectedSkill('');
    setFilteredProfiles([]);
  }, []);

  const debouncedHandleKeySearch = useMemo(
    () => createDebouncedSearch(handleKeySearch, 400),
    [handleKeySearch],
  );

  // useEffect(() => {
  //   let index = 0;
  //   const interval = setInterval(() => {
  //     index = (index + 1) % rotatingPlaceholders.length;
  //     setRotatingPlaceholder(rotatingPlaceholders[index]);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    return () => {
      debouncedHandleKeySearch.cancel();
    };
  }, [debouncedHandleKeySearch]);

  useEffect(() => {
    if (flatListRef.current && filteredSkills?.length > 0) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [filteredSkills]);

  const searchBarPlaceholder = useMemo(
    () => (selectedSkill ? selectedSkill : searchText),
    [selectedSkill, searchText],
  );

  const handleSkillSelect = useCallback(skill => {
    const now = Date.now();
    if (now - lastPress.current < 500) return;
    lastPress.current = now;

    setSearchText(skill);
    setSelectedSkill(skill);
    setIsMapModalVisible(true);
    setIsSearchModalVisible(true);
    debouncedHandleKeySearch(skill);

    const profiles = skilledWorkers.filter(
      worker => worker.skill.toLowerCase() === skill,
    );
    setFilteredProfiles(profiles);
    setIsSearchModalVisible(false);
  }, []);

  const userLocation = {latitude: 37.7749, longitude: -122.4194};

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

      {/* Select radius user wants to search */}
      {/* <UserRadiusModal
        isModalVisible={isDistanceModalVisible}
        onBackdropPress={() => setIsDistanceModalVisible(false)}
        selectedDistance={selectedDistance}
        handleSelectDistance={item => setSelectedDistance(item)}
      /> */}
      {/* Job duriation modal */}
      {/* <JobDurationModal
        isModalVisible={isJobDurationModalVisible}
        onBackdropPress={() => setIsJobDurationModalVisible(false)}
      /> */}
      {/* Job calender */}

      {/* <JobCalendarModal
        isModalVisible={isJobCalendarModalVisible}
        onBackdropPress={() => setIsJobCalendarModalVisible(false)}
      /> */}

      <ModalMap
        isVisible={isMapModalVisible}
        onClose={() => {
          setIsSearchModalVisible(false);
          setSearchText('');
          setFilteredSkills(uniqueSkills);
          setIsMapModalVisible(false);
        }}
        onComplete={() => props.navigation.navigate(ROUTES.BOOKING_STACK)}
        userLocation={userLocation}
        onBookNow={handleBookNow}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <SearchBarComp
          // placeholder={rotatingPlaceholder}

          onChangeText={handleTextChange}
          value={searchText}
          onClear={() => {
            setIsSearchModalVisible(false);
            setSearchText('');
            setFilteredSkills(uniqueSkills);
          }}
          autoFocus={false}
        />

        <View style={styles.searchContainer}>
          <SearchFilter
            // isDistanceModalVisible={isDistanceModalVisible}
            // onOpenDurationModal={handleOpenDurationModal}
            // onOpenCalendarModal={handleOpenCalendarModal}
            // onOpenRadiusModal={handleOpenRadiusModal}
          />

          <View style={styles.searchSection}>
            <VectorIcon
              name="account-search"
              type="MaterialCommunityIcons"
              size={theme.fontSize.xxLarge}
              color={theme.color.primary}
            />

            <Text style={styles.searchText}>Search For</Text>
          </View>
          <FlatList
            ref={flatListRef}
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
            ListEmptyComponent={() => (
              <View style={styles.noDataFoundContainer}>
                <NoDataFound message={`No results for "${searchText}"`} />
              </View>
            )}
            contentContainerStyle={styles.pillsContainer}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const AnimatedSkillPill = React.memo(
  ({skill, selectedSkill, onPress, theme, index}) => {
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
      Animated.spring(scaleAnim, {toValue: 1, useNativeDriver: true}).start();
    };

    const isSelected = selectedSkill === skill;

    return (
      <Animated.View
        style={{
          transform: [{scale: scaleAnim}],
          opacity: opacityAnim,
          margin: getResHeight(0.6),
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

              paddingVertical: getResHeight(0.8),
              paddingHorizontal: getResWidth(4.5),
              borderRadius: getResHeight(20),
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
              color: isSelected
                ? theme.color.background
                : theme.color.textColor,
              fontFamily: theme.font.medium,
              fontSize: theme.fontSize.medium,
              textAlign: 'center',
            }}>
            {skill.charAt(0).toUpperCase() + skill.slice(1)}
          </Text>
        </Pressable>
      </Animated.View>
    );
  },
);

// const getStyles = theme =>
//   StyleSheet.create()

export default memo(Index);
