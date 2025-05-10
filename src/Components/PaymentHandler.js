// paymentHandler.js

import RazorpayCheckout from 'react-native-razorpay'
import {Alert} from 'react-native'

import {store} from '../redux/store'
import {createTransactionAPIHandler} from '../redux/reducer/Transactions/transactionAPI'
import {STORAGE_KEYS} from '../Config/StorageKeys'
import useAppTheme from '../Hooks/useAppTheme'

const initiatePayment = (
  amount,
  myProfile,
  onPaymentSuccess,
  onPaymentFailure,
) => {
  // const theme = useAppTheme()
  if (amount <= 0) {
    Alert.alert('Invalid Amount', 'Please check the amount before proceeding.')
    return
  }

  const {fullName, avatar, email, mobile} = myProfile?.data || {}

  // User info (you can also dynamically fetch this)
  const userInfo = {
    name: `Ramesh Marandi`,
    userEmail: `ramesh@gmail.com`,
    contact: `80980980`,
    useImage: ``,
  }
  //   const userInfo = {
  //     name: `${fullName}`,
  //     userEmail: `${email}`,
  //     contact: `${mobile}`,
  //     useImage: `${avatar}`,
  //   };

  const description = 'Donation for Church'

  const {name, userEmail, contact, useImage} = userInfo

  // Convert amount to paise (1 INR = 100 paise)
  const amountInPaise = amount * 100

  const options = {
    description: description,
    image:
      useImage ||
      'https://res.cloudinary.com/de6ewhwuo/image/upload/v1731172156/ci2q2ofquyfviw6c1cet.png', // Replace with your logo URL
    currency: 'INR',
    key: STORAGE_KEYS.RAZORPAY_KEY, // Replace with your Razorpay API Key
    amount: amountInPaise, // Amount in paise
    name: name,
    prefill: {
      email: userEmail,
      contact: contact,
      name: name,
    },
    theme: {color: 'blue'},
  }

  // Open Razorpay Checkout with the dynamic amount
  RazorpayCheckout.open(options)
    .then(data => {
      // Handle payment success
      onPaymentSuccess(data)
    })
    .catch(error => {
      // Handle payment error
      onPaymentFailure(error)
    })
}

export {initiatePayment}
