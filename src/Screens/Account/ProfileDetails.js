import React, {memo, useState} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import CustomHeader from '../../Components/CustomHeader'
import {VectorIcon} from '../../Components/VectorIcon'
import {getFontSize} from '../../utility/responsive'

import SafeAreaContainer from '../../Components/SafeAreaContainer'
import {useTheme} from '../../Hooks/ThemeContext'
import EmployeeReview from '../GoogleMap/EmployeeReview'
import {profilePageStyle} from './styles/profile.styles'
// import EmployeeReview from '../User/GoogleMap/EmployeeReview';

const ProfileDetails = props => {
  const {navigation, route} = props
  const {isDarkMode} = useSelector(state => state.user)
  const theme = useTheme()

  const styles = profilePageStyle()

  const [selectedDistance, setSelectedDistance] = useState({
    id: 0,
    distance: '1 km',
  })

  const worker = {
    id: 1,
    name: 'Amit Kumar',
    skill: 'Electrician',
    location: 'Delhi',
    experience: 5,
    rating: 4.7,
    reviews: [
      {
        id: 1,
        name: 'Rahul Sharma',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        rating: 5,
        comment: 'Great electrician! Fixed all my wiring issues in no time.',
      },
      {
        id: 2,
        name: 'Priya Verma',
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        rating: 4,
        comment: 'Good service, but took a little longer than expected.',
      },
      {
        id: 3,
        name: 'Vikram Singh',
        profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
        rating: 5,
        comment: 'Very professional and skilled. Highly recommended!',
      },
      {
        id: 4,
        name: 'Anjali Mehta',
        profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
        rating: 4.5,
        comment:
          'Amit is very knowledgeable and efficient. Did a great job with my new switchboard.',
      },
      {
        id: 5,
        name: 'Suresh Gupta',
        profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
        rating: 3.5,
        comment:
          'Work was good, but he arrived late. Communication could be better.',
      },
      {
        id: 6,
        name: 'Neha Kapoor',
        profilePic: 'https://randomuser.me/api/portraits/women/6.jpg',
        rating: 5,
        comment:
          'Excellent service! Very polite and professional. Will definitely hire again.',
      },
      {
        id: 7,
        name: 'Ravi Dubey',
        profilePic: 'https://randomuser.me/api/portraits/men/7.jpg',
        rating: 4.8,
        comment: 'Fixed my inverter wiring quickly. Knows his work well!',
      },
      {
        id: 8,
        name: 'Pooja Tiwari',
        profilePic: 'https://randomuser.me/api/portraits/women/8.jpg',
        rating: 4.2,
        comment: 'Did a neat job, but the pricing was slightly high.',
      },
      {
        id: 9,
        name: 'Arun Mishra',
        profilePic: 'https://randomuser.me/api/portraits/men/9.jpg',
        rating: 4.9,
        comment:
          'Best electrician I have hired so far! Really impressed with his expertise.',
      },
      {
        id: 10,
        name: 'Megha Choudhary',
        profilePic: 'https://randomuser.me/api/portraits/women/10.jpg',
        rating: 4.6,
        comment:
          'Very patient and skilled. Fixed all issues without any hassle.',
      },
    ],
  }
  const ProfileDetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{`${label} :`}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  )

  return (
    <SafeAreaContainer>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle='My profile'
      />
      {/* <HireNowDetailsModal
        isModalVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        selectedDistance={selectedDistance}
        handleSelectDistance={item => {
          setSelectedDistance(item);

          props.navigation.navigate('EmployeeFound');
        }}
        onSelectDistance={item => {}}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: 'https://i3.wp.com/www.thebalancemoney.com/thmb/BTv9xPg48VpnxeRm8qkCkO_Fjwg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1209681524-1fe805ac87ca4fed9e57a20f020733cb.jpg?ssl=1',
              }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{worker.name}</Text>
          </View>

          {[
            {label: 'Languages', value: 'Hindi, English, Bengali'},
            {label: 'Distance', value: '10 KM'},
            {label: 'Skills', value: 'Electrician, Plumber, Carpenter'},
            {label: 'Location', value: 'Rajpur'},
            {label: 'Experience', value: '5 Years'},
            {label: 'Rating', value: '⭐ 4.5 /5.0'},
          ].map((detail, idx) => (
            <ProfileDetailRow key={idx} {...detail} />
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {worker.about ||
              'Passionate carpenter with a decade of experience in crafting high-quality furniture and custom woodwork. Specialized in creating elegant and durable designs tailored to clients'}
          </Text>
        </View>

        <ContactInfo />

        <EmployeeReview reviews={worker.reviews} />
      </ScrollView>
    </SafeAreaContainer>
  )
}

const ContactInfo = memo(() => {
  const theme = useTheme()
  const styles = profilePageStyle(theme)
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Contact Details</Text>
      <View style={styles.contactContainer}>
        <View style={styles.contactRow}>
          <VectorIcon
            type='Ionicons'
            name='call'
            size={getFontSize(2.5)}
            color={theme.color.textColor}
          />
          <Text style={styles.contactText}>+91 7887706698</Text>
        </View>

        <View style={styles.contactRow}>
          <VectorIcon
            type='MaterialCommunityIcons'
            name='email'
            size={getFontSize(2.5)}
            color={theme.color.textColor}
          />
          <Text style={styles.contactText}>ramesh.marandi@gmail.com</Text>
        </View>
      </View>
    </View>
  )
})

export default memo(ProfileDetails)
