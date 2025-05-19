import React, {useState, useCallback, memo} from 'react';
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
import {helpSuportPageStyle} from '../Screens/Account/styles/helpSupport.styles';
import {useTheme} from '../Hooks/ThemeContext';

const FAQItem = React.memo(({item, index, expandedIndex, setExpandedIndex}) => {
  const isExpanded = expandedIndex === index;
  const toggleCollapse = useCallback(() => {
    setExpandedIndex(isExpanded ? null : index);
  }, [isExpanded, index, setExpandedIndex]);

  const theme = useTheme();
  const styles = helpSuportPageStyle();
  return (
    <Animatable.View
      style={[
        styles.itemContainer,
        {
          borderColor:
          isExpanded
            ? theme.color.primary
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
                  ? theme.color.primary
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
                ? theme.color.primary
                : theme.color.placeholder,
              color: theme.color.textColor,
              fontSize: theme.fontSize.medium,
              fontFamily: theme.font.regular,

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
  const theme = useTheme();
  const styles = helpSuportPageStyle();
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
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <ContactSupport />
            <Text
              style={{
                fontSize: theme.fontSize.large,
                color: theme.color.textColor,
                fontFamily: theme.font.semiBold,
                marginVertical: getResHeight(2),
              }}>
              FAQ's
            </Text>
          </>
        )}
        contentContainerStyle={{
          paddingHorizontal: '4%',
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaContainer>
  );
};

const ContactSupport = memo(() => {
  const theme = useTheme();
  const styles = helpSuportPageStyle();
  const handlePress = type => {
    switch (type) {
      case 'call':
        Linking.openURL('tel:+1234567890');
        break;
      case 'email':
        Linking.openURL('mailto:support@example.com?subject=Support Request');
        break;
        // case 'whatsapp':
        //   Linking.openURL('https://wa.me/1234567890');
        //   break;
        // case 'chat':
        //   console.log('Navigate to live chat');
        break;
      default:
        break;
    }
  };

  const supportOptions = [
    {id: 'call', label: 'Call Support', icon: 'phone', type: 'Feather'},
    {id: 'email', label: 'Email Support', icon: 'mail', type: 'Feather'},
    // {
    //   id: 'whatsapp',
    //   label: 'WhatsApp Support',
    //   icon: 'message-circle',
    //   type: 'Feather',
    // },
    // {id: 'chat', label: 'Live Chat', icon: 'message-square', type: 'Feather'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Support</Text>
      {supportOptions.map(option => (
        <TouchableOpacity
          key={option.id}
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => handlePress(option.id)}>
          <VectorIcon
            type={option.type}
            name={option.icon}
            size={getFontSize(2.8)}
            color={theme.color.background}
          />
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});


export default FAQListComp;
