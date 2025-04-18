// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
// } from 'react-native';
// import {Formik} from 'formik';
// import {useFocusEffect} from '@react-navigation/native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from '../../utility/theme';
// // import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';

// import MasterTextInput from '../../Components/MasterTextInput';
// import CustomButton from '../../Components/CustomButton';
// import OTPInput from '../../Components/OTPInput';
// import StepProgressBarComp from '../../Components/StepProgressBarComp';
// import RegistrationHeader from './RegistrationHeader';
// import SkillInput from './SkillInput';

// import {skilledWorkers} from '../../Components/StaticDataHander';
// import {formatCurrency} from '../../Components/commonHelper';
// import {TextInput as PaperTextInput} from 'react-native-paper';
// import {TermAndConditionModal} from '../../Components/ModalsComponent';
// import {store} from '../../redux/store';
// import {setIsUserLoggedIn} from '../../redux/reducer/Auth';
// import {useTranslation} from 'react-i18next';
// import {getFontSize, getResHeight, getResWidth } from '../../utility/responsive';

// const Registration = ({navigation, route}) => {
//   const {contact} = route.params;
//   const formRef = useRef(null);
//   const [isOtpFiledVisible, setIsOtpFiledVisible] = useState(false);
//   const [isCheckBoxMarked, setIsCheckBoxMarked] = useState(false);
//   const formSubmitRef = useRef(null);
//   const [gmailUserData, setGmailUserData] = useState('');
//   const otpRef = useRef(null);
//   const [step, setStep] = useState(1);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [termConditionModalVisible, setTermConditionModalVisible] =
//     useState(false);
//   const maxAmount = 5000;
//   // let totalSteps = 2;

//   const [totalSteps, setTotalSteps] = useState(3);

//   const inputRefs = {
//     email: useRef(null),
//   };
//   const {t, i18n} = useTranslation();
//   const handleNext = () => {
//     if (totalSteps == step) {
//       setTermConditionModalVisible(true);
//     } else {
//       return step < totalSteps && setStep(prev => prev + 1);
//     }
//   };

//   const handleBack = () => step > 1 && setStep(prev => prev - 1);

//   // Update totalSteps whenever userRole changes
//   const updateSteps = userRole => {
//     const newTotal = ['labour', 'skilledWorker'].includes(userRole) ? 3 : 2;
//     setTotalSteps(newTotal);
//   };

//   const handleSubmit = values => {
//     isOtpFiledVisible
//       ? setIsOtpFiledVisible(false)
//       : setIsOtpFiledVisible(true);
//     if (!isOtpFiledVisible) handleNext();
//   };

//   const handleOTPComplete = ({otp}) => {
//     if (otp.length === 4 && formSubmitRef.current) {
//       setIsOtpFiledVisible(false);
//       formSubmitRef.current();
//     }
//   };

//   const extractUserDetailsFromGmail = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (response?.data?.user) setGmailUserData(response.data.user);
//     } catch (error) {
//       console.log('GmailError', error);
//     }
//   };

//   useEffect(() => {
//     if (gmailUserData?.name && gmailUserData?.email) {
//       formRef.current?.setFieldValue('fullName', gmailUserData.name);
//       formRef.current?.setFieldValue('email', gmailUserData.email);
//     }
//   }, [gmailUserData]);

//   useEffect(() => {
//     extractUserDetailsFromGmail();
//   }, []);

//   useEffect(() => {
//     formRef.current?.setFieldValue('skills', selectedSkills);
//   }, [selectedSkills]);

//   const onPressSubmitBtn = () => {
//     store.dispatch(setIsUserLoggedIn(true));
//     navigation.navigate('Home');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StepProgressBarComp step={step} totalSteps={totalSteps} />
//       <TermAndConditionModal
//         isModalVisible={termConditionModalVisible}
//         isCheckBox={true}
//         isCheckBoxMarked={isCheckBoxMarked}
//         setIsCheckBoxMarked={() => {
//           setIsCheckBoxMarked(!isCheckBoxMarked);
//         }}
//         onBackdropPress={() => {
//           console.log('onBackdropPress__');
//           setTermConditionModalVisible(false);
//         }}
//         handleSubmit={onPressSubmitBtn}
//       />
//       {step === 1 && (
//         <View style={styles.headerContainer}>
//           <RegistrationHeader
//             mainText={t('registerWelcomeMsg')}
//             firstWord={t('welcomeMsgFirstHalf')}
//             secondWord={t('welcomeMsgSecondHalf')}
//           />
//         </View>
//       )}

//       <Formik
//         innerRef={formRef}
//         initialValues={{
//           contact: contact || '',
//           fullName: '',
//           email: '',
//           otp: '',
//           userRole: 'labour',
//           experience: '0-1Year',
//           skills: [],
//           userBio: '',
//           priceType: '',
//           hourlyPrice: '',
//           fullDayPrice: '',
//         }}
//         onSubmit={handleSubmit}>
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           setFieldValue,
//           setFieldError,
//         }) => {
//           formSubmitRef.current = handleSubmit;
//           const isFieldValid = field => touched[field] && !errors[field];

//           // totalSteps =
//           // Update steps when userRole changes
//           useEffect(() => {
//             updateSteps(values.userRole);
//           }, [values.userRole]);
//           useFocusEffect(
//             React.useCallback(() => formRef.current?.resetForm(), []),
//           );

//           return (
//             <>
//               <ScrollView
//                 style={styles.scrollView}
//                 keyboardShouldPersistTaps={'handled'}
//                 contentContainerStyle={styles.scrollViewContent}
//                 showsVerticalScrollIndicator={false}>
//                 {step === 1 && (
//                   <>
//                     <MasterTextInput
//                       label={t('loginLabel')}
//                       placeholder={t('loginPlaceHolder')}
//                       ref={inputRefs.contact}
//                       keyboardType="number-pad"
//                       autoCapitalize="none"
//                       maxLength={10}
//                       value={values.contact}
//                       onChangeText={text =>
//                         setFieldValue('contact', text.replace(/[^0-9]/g, ''))
//                       }
//                       left={
//                         <PaperTextInput.Icon
//                           icon="phone"
//                           color={theme.color.outlineColor}
//                         />
//                       }
//                     />

//                     <MasterTextInput
//                       label={t('fullName')}
//                       placeholder={t('fullNameLable')}
//                       value={values.fullName}
//                       onChangeText={text =>
//                         setFieldValue(
//                           'fullName',
//                           text.replace(/[^a-zA-Z ]/g, ''),
//                         )
//                       }
//                       left={
//                         <PaperTextInput.Icon
//                           icon="account"
//                           color={theme.color.outlineColor}
//                         />
//                       }
//                     />

//                     <MasterTextInput
//                       label={t('emailFiled')}
//                       placeholder={t('emailFiledLable')}
//                       keyboardType="email-address"
//                       value={values.email}
//                       onChangeText={text => setFieldValue('email', text.trim())}
//                       left={
//                         <PaperTextInput.Icon
//                           icon="email"
//                           color={theme.color.outlineColor}
//                         />
//                       }
//                     />

//                     {isOtpFiledVisible && (
//                       <OTPInput
//                         ref={otpRef}
//                         length={4}
//                         onComplete={handleOTPComplete}
//                         otpText={t('otpLabel')}
//                       />
//                     )}
//                   </>
//                 )}

//                 {step === 2 && (
//                   <View style={styles.stepContainer}>
//                     <Text style={styles.header}>
//                       {t('professionalDetails')} 💼
//                     </Text>
//                     <Text style={styles.subHeader}>
//                       {t('professionalLabel')}
//                     </Text>

//                     <View style={styles.inputGroup}>
//                       <MasterTextInput
//                         label={t('workerRole')}
//                         topLableName={t('workerRole')}
//                         isDropdown
//                         dropdownData={[
//                           {label: 'House Owner', value: 'homeowner'},
//                           {label: 'Worker (Labour)', value: 'labour'},
//                           {label: 'Skilled Worker', value: 'skilledWorker'},
//                           {label: 'Contractor', value: 'contractor'},
//                         ]}
//                         value={values.userRole}
//                         onDropdownChange={item => {
//                           setSelectedSkills([]);

//                           setFieldValue('userRole', item.value);
//                         }}
//                       />

//                       {values.userRole === 'skilledWorker' && (
//                         <>
//                           <View
//                             style={{
//                               width: '100%',
//                               flexDirection: 'row',
//                               alignItems: 'center',
//                               justifyContent: 'space-between',

//                               marginTop: getResHeight(1),
//                             }}>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                               }}>
//                               <Text style={styles.label}>
//                                 {t('primarySkills')}
//                               </Text>
//                               <Text
//                                 style={{
//                                   color: 'red',
//                                   marginTop: '-3%',
//                                 }}>
//                                 *
//                               </Text>
//                             </View>
//                             <Text
//                               style={{
//                                 color: theme.color.redBRGA,
//                                 fontFamily: theme.font.medium,
//                                 fontSize: getFontSize(1.5),
//                                 paddingRight: '3%',
//                               }}>{`${selectedSkills.length}/5`}</Text>
//                           </View>
//                           <SkillInput
//                             selectedSkills={selectedSkills}
//                             setSelectedSkills={setSelectedSkills}
//                             skilledWorkers={skilledWorkers}
//                             maxSkills={5}
//                           />
//                         </>
//                       )}

//                       {['skilledWorker', 'labour'].includes(
//                         values.userRole,
//                       ) && (
//                         <>
//                           <MasterTextInput
//                             label={t('yearOfExperience')}
//                             topLableName={t('yearOfExperience')}
//                             isDropdown
//                             dropdownData={[
//                               {label: '0-1 years', value: '0-1'},
//                               {label: '1-3 years', value: '1-3'},
//                               {label: '3-5 years', value: '3-5'},
//                               {label: '5+ years', value: '5+'},
//                             ]}
//                             value={values.experience}
//                             onDropdownChange={item =>
//                               setFieldValue('experience', item.value)
//                             }
//                           />

//                           <MasterTextInput
//                             label="Pricing Model"
//                             topLableName={t('feeAmountLabel')}
//                             isDropdown
//                             dropdownData={[
//                               {
//                                 label: 'Full day (Fixed rate per day)',
//                                 value: 'fullDay',
//                               },
//                               {
//                                 label: 'Hourly Basis (Rate per hour)',
//                                 value: 'hourlyBasis',
//                               },
//                               {label: 'Both', value: 'both'},
//                             ]}
//                             value={values.priceType}
//                             onDropdownChange={item => {
//                               setFieldValue('priceType', item.value);
//                               setFieldValue('fullDayPrice', '');
//                               setFieldValue('hourlyPrice', '');
//                             }}
//                           />

//                           <View style={styles.priceRow}>
//                             {(values.priceType === 'fullDay' ||
//                               values.priceType === 'both') && (
//                               <PriceInput
//                                 label={t('fullDayFee')}
//                                 value={values.fullDayPrice}
//                                 onChange={value =>
//                                   handlePriceChange(
//                                     value,
//                                     'fullDayPrice',
//                                     setFieldValue,
//                                     setFieldError,
//                                     maxAmount,
//                                   )
//                                 }
//                               />
//                             )}

//                             {(values.priceType === 'hourlyBasis' ||
//                               values.priceType === 'both') && (
//                               <PriceInput
//                                 label={t('hourlyFee')}
//                                 value={values.hourlyPrice}
//                                 onChange={value =>
//                                   handlePriceChange(
//                                     value,
//                                     'hourlyPrice',
//                                     setFieldValue,
//                                     setFieldError,
//                                     maxAmount,
//                                   )
//                                 }
//                               />
//                             )}
//                           </View>

//                           <MasterTextInput
//                             label={t('bioLabel')}
//                             placeholder={t('bioPlaceholder')}
//                             multiline
//                             roundness={10}
//                             value={values.userBio}
//                             onChangeText={handleChange('userBio')}
//                           />
//                         </>
//                       )}
//                     </View>
//                   </View>
//                 )}
//                 {step == 3 && (
//                   <>
//                     <Text
//                       style={{
//                         color: 'red',
//                       }}>
//                       Please upload your profile picture and your aadhar card{' '}
//                     </Text>
//                   </>
//                 )}
//               </ScrollView>

//               {step === 1 ? (
//                 <View style={styles.step1Footer}>
//                   <CustomButton
//                     title={isOtpFiledVisible ? t('verifyOTP') : t('next')}
//                     onPress={handleSubmit}
//                     rightIcon={
//                       <Icon
//                         name="arrow-right"
//                         size={getFontSize(2.5)}
//                         color="white"
//                       />
//                     }
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.footer}>
//                   <TouchableOpacity
//                     onPress={handleBack}
//                     style={styles.navButton}>
//                     <Icon
//                       name="arrow-left"
//                       size={getFontSize(2.5)}
//                       color="white"
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleNext}
//                     style={styles.navButton}>
//                     <Icon
//                       name="arrow-right"
//                       size={getFontSize(2.5)}
//                       color="white"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </>
//           );
//         }}
//       </Formik>
//     </SafeAreaView>
//   );
// };

// const PriceInput = ({label, value, onChange}) => (
//   <View style={styles.priceContainer}>
//     <Text style={styles.priceLabel}>{label}</Text>
//     <View style={styles.inputWrapper}>
//       <Text style={styles.currencySymbol}>₹</Text>
//       <TextInput
//         style={[
//           styles.priceInput,
//           {
//             fontSize: value ? getFontSize(1.9) : getFontSize(1.3),
//           },
//         ]}
//         cursorColor={theme.color.secondary}
//         selectionColor={theme.color.secondary}
//         placeholderTextColor={theme.color.placeholder}
//         keyboardType="numeric"
//         placeholder={label}
//         value={value ? formatCurrency(value) : ''}
//         onChangeText={onChange}
//       />
//     </View>
//   </View>
// );

// const handlePriceChange = (
//   text,
//   field,
//   setFieldValue,
//   setFieldError,
//   maxAmount,
// ) => {
//   const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || '';
//   if (numericValue <= maxAmount) {
//     setFieldError(field, '');
//     setFieldValue(field, numericValue.toString());
//   } else {
//     setFieldError(field, `Amount cannot exceed ₹${maxAmount}`);
//   }
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.color.whiteBg,
//   },
//   headerContainer: {
//     marginTop: '5%',
//     paddingHorizontal: getResWidth(6),
//   },
//   label: {
//     fontFamily: theme.font.medium,
//     fontSize: getFontSize(1.6),
//     color: theme.color.charcolBlack,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingHorizontal: getResWidth(6),
//   },
//   stepContainer: {
//     marginBottom: getResHeight(4),
//   },
//   header: {
//     fontSize: getFontSize(1.8),
//     fontFamily: theme.font.semiBold,
//     color: theme.color.charcolBlack,
//   },
//   subHeader: {
//     fontSize: getFontSize(1.4),
//     fontFamily: theme.font.regular,
//     color: theme.color.charcolBlack,
//     marginBottom: getResHeight(2),
//   },
//   inputGroup: {
//     paddingTop: getResHeight(1),
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: getResHeight(1),
//   },
//   priceContainer: {
//     width: getResWidth(40),
//     marginVertical: getResHeight(1),
//   },
//   priceLabel: {
//     fontSize: getFontSize(1.4),
//     fontFamily: theme.font.medium,
//     color: theme.color.charcolBlack,
//     marginBottom: getResHeight(1),
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: getResHeight(6),
//     borderRadius: getResHeight(2),
//     borderWidth: 1,
//     borderColor: theme.color.outlineColor,
//     backgroundColor: 'white',
//   },
//   currencySymbol: {
//     fontSize: getFontSize(2.5),
//     marginHorizontal: getResWidth(2),
//     marginTop: '-2%',
//     color: theme.color.outlineColor,
//   },
//   priceInput: {
//     flex: 1,

//     fontFamily: theme.font.medium,
//     color: theme.color.charcolBlack,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: getResWidth(5),
//     paddingBottom: getResHeight(5),
//   },
//   navButton: {
//     height: getResHeight(6),
//     width: getResHeight(6),
//     backgroundColor: theme.color.secondary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: getResHeight(100),
//   },
//   step1Footer: {
//     paddingHorizontal: getResWidth(5),
//     paddingBottom: getResHeight(5),
//   },
// });

// export default Registration;


import { View, Text } from 'react-native'
import React from 'react'

const Registration = () => {
  return (
    <View>
      <Text>Registration</Text>
    </View>
  )
}

export default Registration