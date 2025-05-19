import React, {useMemo, useState, memo, useCallback} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CircularProgress} from 'react-native-circular-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomHeader from '../../Components/CustomHeader';
import {initiatePayment} from '../../Components/PaymentHandler';
import SafeAreaContainer from '../../Components/SafeAreaContainer';
import {VectorIcon} from '../../Components/VectorIcon';
import useAppTheme from '../../Hooks/useAppTheme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import NoDataFound from '../../Components/NoDataFound';
import {ROUTES} from '../../Navigation/RouteName';
import {useSelector} from 'react-redux';
import {paymentPageStyle} from './styles/payment.styles';

const tabArray = [
  {id: 0, icon: 'list', label: 'History'},
  {id: 1, icon: 'list', label: 'Credit'},
  {id: 2, icon: 'refresh', label: 'Refund'},
];

// Data structure
const data = [
  {type: 'TABS', id: 'header-tabs'},
  {type: 'CONTENT', id: 'main-content'},
];

const PaymentHistory = ({navigation}) => {
  const theme = useAppTheme();
  const styles = paymentPageStyle();
  const {isDarkMode} = useSelector(state => state.user);
  const [activeTab, setActiveTab] = useState(0);
  const [spent, setSpent] = useState(0);
  const [historyTransc, setHistoryTransc] = useState([]);
  const [creditTransc, setCreditTransc] = useState([]);
  const [refundTransc, setRefundTransc] = useState([]);

  const handleTransaction = useCallback(
    (amount = 10, type) => {
      const newSpent = type === 'spend' ? spent + amount : spent - amount;
      if (newSpent < 0 || newSpent > 100) return;

      setSpent(newSpent);
      setHistoryTransc(prev => [
        {
          id: Date.now(),
          amount,
          type,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [spent],
  );

  const handlePaymentGateway = useCallback(() => {
    navigation.navigate(ROUTES.COIN_PURCHASE);
  }, []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <TransactionList
            transactions={historyTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        );
      case 1:
        return (
          <TransactionList
            transactions={creditTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        );
      case 2:
        return (
          <TransactionList
            transactions={refundTransc}
            styles={styles}
            selectedTab={activeTab}
          />
        );
      default:
        return null;
    }
  }, [activeTab, historyTransc, creditTransc, refundTransc, styles]);

  const renderItem = ({item, index}) => {
    switch (index) {
      case 0:
        return (
          <>
            <View
              style={[
                styles.tabs,
                !isDarkMode &&
                  {
                    // backgroundColor:"red"
                  },
              ]}>
              {tabArray.map(tab => (
                <TabItem
                  key={tab.id}
                  iconName={tab.icon}
                  label={tab.label}
                  tabName={tab.id}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  theme={theme}
                  isDarkMode={isDarkMode}
                  styles={styles}
                />
              ))}
            </View>
          </>
        );
      case 1:
        return <>{renderContent()}</>;
    }
  };

  return (
    <SafeAreaContainer>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Payment History"
      />

      <FlatList
        contentContainerStyle={styles.content}
        // data={[0, 1, 2]}
        // renderItem={renderItems}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <ProgressCard
              spent={spent}
              styles={styles}
              onBuyCoins={handlePaymentGateway}
              removeCoin={() => handleTransaction(5, 'spend')}
              addCoins={() => handleTransaction(10, 'add')}
            />
          </View>
        }
        stickyHeaderIndices={[1]} // Makes the first item (tabs) sticky
      />
    </SafeAreaContainer>
  );
};

const TabItem = memo(
  ({
    iconName,
    label,
    isDarkMode,
    tabName,
    activeTab,
    setActiveTab,
    theme,
    styles,
  }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}>
      <Ionicons
        name={iconName}
        color={
          activeTab === tabName && isDarkMode
            ? theme.color.background
            : !isDarkMode
            ? theme.color.textColor
            : theme.color.background
        }
        size={20}
      />
      <Text
        style={[
          styles.tabText,
          activeTab === tabName && styles.activeTabText,
          !isDarkMode && {color: theme.color.textColor},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  ),
);

const ProgressCard = memo(
  ({spent, styles, onBuyCoins, removeCoin, addCoins}) => {
    const theme = useAppTheme();
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Wallet Overview</Text>
        <View style={styles.balanceCard}>
          {/* Remove later */}

          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={removeCoin}
              style={{
                marginRight: '15%',
              }}>
              <VectorIcon
                type={'Entypo'}
                name={'minus'}
                size={getFontSize(3)}
                color={theme.color.textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={addCoins}
              // style={styles.buyButton}
            >
              <VectorIcon
                type={'Entypo'}
                name={'plus'}
                size={getFontSize(3)}
                color={theme.color.textColor}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.balanceText}>Available Points</Text>
            <View style={styles.progressSection}>
              <CircularProgress
                size={getResHeight(20)}
                width={getResWidth(3)}
                fill={100 - spent}
                tintColor={theme.color.successPrimary}
                backgroundColor="#f0f0f8"
                rotation={0}
                lineCap="round">
                {() => (
                  <View style={styles.progressTextContainer}>
                    <Text style={styles.progressValue}>{spent}/100</Text>
                    <Text style={styles.progressLabel}>Points Used</Text>
                  </View>
                )}
              </CircularProgress>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBuyCoins}
            style={styles.buyButton}>
            <VectorIcon
              type={'MaterialCommunityIcons'}
              name={'hand-coin'}
              size={getFontSize(3)}
              color={theme.color.white}
            />
            <Text style={styles.buyText}>Buy coins</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const TransactionList = memo(({transactions, styles}) => (
  <FlatList
    data={transactions}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <View style={styles.transactionCard}>
        <Ionicons
          name={item.type === 'spend' ? 'arrow-up' : 'arrow-down'}
          size={20}
          color={item.type === 'spend' ? '#ff6b6b' : '#4ecdc4'}
        />
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'spend' ? styles.spent : styles.refunded,
          ]}>
          {item.type === 'spend' ? '-' : '+'}
          {item.amount}
        </Text>
      </View>
    )}
    ListEmptyComponent={() => (
      <View
        style={{
          marginTop: getResHeight(-23),
        }}>
        <NoDataFound />
      </View>
    )}
  />
));

export default memo(PaymentHistory);
