import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
  StyleSheet,
  Image,
} from 'react-native'
import { useSelector } from 'react-redux'
import CustomHeader from '../../Components/CustomHeader'
import Icon from 'react-native-vector-icons/Feather'
import useAppTheme from '../../Hooks/useAppTheme'
import SafeAreaContainer from '../../Components/SafeAreaContainer'
import NoDataFound from '../../Components/NoDataFound'
import { getResHeight } from '../../utility/responsive'

// ---------------- Notification Card Component ---------------- //
const NotificationCard = React.memo(({ item, onDelete, theme }) => {
  const fadeAnim = useMemo(() => new Animated.Value(1), [])
  const styles = useMemo(() => getStyles(theme), [theme])

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item._id)
    })
  }

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
        },
      ]}
    >
      <Image
        source={{
          uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/notifications-3d-icon-5034125.png',
        }}
        style={styles.imageStyle}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.msgTitle}>{item.message}</Text>
        <Text style={styles.dateStyle}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Icon
          name="trash-2"
          size={theme.fontSize.xxLarge}
          color={theme.color.textColor}
        />
      </TouchableOpacity>
    </Animated.View>
  )
})

// ---------------- Main Screen Component ---------------- //
const Index = ({ navigation }) => {
  const theme = useAppTheme()
  const styles = useMemo(() => getStyles(theme), [theme])
  const [refreshing, setRefreshing] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      _id: '1',
      message: 'New message received!',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      message: 'Your order has been shipped.',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      message: 'Reminder: Meeting at 3 PM',
      createdAt: new Date().toISOString(),
    },
  ])

  const loadNotifications = useCallback(async () => {
    setRefreshing(true)
    try {
      // Fetch notifications from API here
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  const handleDeleteNotification = useCallback(id => {
    setNotifications(prev => prev.filter(item => item._id !== id))
  }, [])

  const renderItem = useCallback(
    ({ item }) => (
      <NotificationCard
        item={item}
        onDelete={handleDeleteNotification}
        theme={theme}
      />
    ),
    [handleDeleteNotification, theme]
  )

  return (
    <SafeAreaContainer>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Notifications"
      />

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadNotifications} />
        }
        contentContainerStyle={
          notifications.length === 0 && {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
        ListEmptyComponent={<NoDataFound />}
      />
    </SafeAreaContainer>
  )
}

// ---------------- Styles ---------------- //
const getStyles = theme =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.color.border,
    },
    imageStyle: {
      width: getResHeight(5),
      height: getResHeight(5),
      marginRight: '5%',
      borderRadius: getResHeight(100),
    },
    msgTitle: {
      color: theme.color.textColor,
      fontSize: theme.fontSize.medium,
      fontFamily: theme.font.medium,
    },
    dateStyle: {
      color: theme.color.textColor,
      fontSize: theme.fontSize.small,
      marginTop: 4,
    },
  })

export default React.memo(Index)
