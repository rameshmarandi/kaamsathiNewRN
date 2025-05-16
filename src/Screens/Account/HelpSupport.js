import React, { memo } from 'react'
import FAQListComp from '../../Components/FAQListComp'

import CustomHeader from '../../Components/CustomHeader'
import SafeAreaContainer from '../../Components/SafeAreaContainer'
import { useTheme } from '../../Hooks/ThemeContext'
import { helpSuportPageStyle } from './styles/helpSupport.styles'

const faqData = [
  {
    lableName: 'What is KaamSathi?',
    lableValue:
      'KaamSathi is a platform that connects users with professional service providers for various home and business needs.',
  },
  {
    lableName: 'How do I book a service on KaamSathi?',
    lableValue:
      'You can book a service through our website or mobile app by selecting the service, choosing a provider, and confirming your booking.',
  },
  {
    lableName: 'Is there a registration fee to use KaamSathi?',
    lableValue:
      'No, registering on KaamSathi is free for users. Service providers may have a subscription or commission-based model.',
  },
  {
    lableName: 'How can I contact customer support?',
    lableValue:
      'You can reach our customer support via email, phone, or live chat through the KaamSathi app.',
  },
  {
    lableName: 'What types of services are available on KaamSathi?',
    lableValue:
      'KaamSathi offers services like home cleaning, plumbing, electrical work, carpentry, beauty services, repairs, and more.',
  },
  {
    lableName: 'How do I cancel or reschedule a booking?',
    lableValue:
      'Go to your bookings section in the app, select the booking, and choose the cancel or reschedule option. Cancellation policies may apply.',
  },
  {
    lableName: 'Are the service providers verified?',
    lableValue:
      'Yes, all service providers undergo a verification process, including ID verification and background checks.',
  },
  {
    lableName: 'How do I make a payment?',
    lableValue:
      'Payments can be made online through UPI, debit/credit cards, wallets, or in cash after service completion.',
  },
  {
    lableName: 'Is there a refund policy?',
    lableValue:
      'Yes, refunds are processed based on our cancellation and service quality policy. Contact support for assistance.',
  },
  {
    lableName: 'Can I tip the service provider?',
    lableValue:
      'Yes, tipping is optional and can be given directly to the provider or through the app (if available).',
  },
  {
    lableName: 'What if I am not satisfied with the service?',
    lableValue:
      'You can report issues via the app, and we will take necessary actions, including refunds or reassigning a provider.',
  },
  {
    lableName: 'How can I become a service provider on KaamSathi?',
    lableValue:
      'Download the KaamSathi Provider app, register with your details, complete verification, and start receiving job requests.',
  },
  {
    lableName: 'How do I update my profile details?',
    lableValue:
      'You can update your profile details in the "My Account" section of the app or website.',
  },
  {
    lableName: 'Is there a referral program?',
    lableValue:
      'Yes! You can refer friends to KaamSathi and earn rewards. Check the app for more details.',
  },
  {
    lableName: 'Do I need to provide materials for the service?',
    lableValue:
      'Some services require the customer to provide materials, while others include materials in the pricing. Check the service details before booking.',
  },
  {
    lableName: 'What safety measures are in place for services?',
    lableValue:
      'We conduct background checks on providers, and they follow COVID-19 safety guidelines and hygiene protocols.',
  },
  {
    lableName: 'How do I track my service request?',
    lableValue:
      'You can track your service status in the app under "My Bookings" and receive real-time updates.',
  },
  {
    lableName: 'Can I choose a specific service provider?',
    lableValue:
      'Yes, you can browse provider profiles, check reviews, and select a specific provider if available.',
  },
  {
    lableName: 'What if my service provider is late or does not show up?',
    lableValue:
      'If your provider is late, you will be notified. If they don’t show up, you can request a reassignment or refund.',
  },
  {
    lableName: 'How do I leave a review for a service provider?',
    lableValue:
      'After service completion, you can leave a review and rating through the app to help others choose better providers.',
  },
  {
    lableName: 'Can I book services for someone else?',
    lableValue:
      'Yes, you can book a service for a friend or family member by entering their address and contact details.',
  },
  {
    lableName: 'Does KaamSathi operate in my city?',
    lableValue:
      'KaamSathi is available in multiple cities. Check the app or website to see if we operate in your area.',
  },
  {
    lableName: 'How can I delete my account?',
    lableValue:
      'To delete your account, go to settings in the app or contact our customer support.',
  },
]

const HelpSupport = memo(props => {
  const {navigation} = props
  const theme = useTheme()
  const styles = helpSuportPageStyle()
  return (
    <>
      <SafeAreaContainer>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle={`Support & FAQ`}
        />

        <FAQListComp data={faqData} />
      </SafeAreaContainer>
    </>
  )
})

export default HelpSupport
