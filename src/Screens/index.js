//Confirmed routes

import HomePage from './HomePage/Index';
import MyBooking from './Booked/MyBooking';
import SearchPage from './SearchPage/Index';
import ProfileDetails from './Account/ProfileDetails';


// Unconfirmed route
import BookMarks from './Booked/BookMarks';
import EditProfile from './Account/EditProfile';
import ChangePassword from './Account/ChangePassword';
import HelpSupport from './Account/HelpSupport';
import PaymentHistory from './Account/PaymentHistory';
import PrivacyPolicy from './Account/PrivacyPolicy';

import Notification from './Notification/Index';
import LoginPage from './Auth/LoginPage';
import Registration from './Auth/Registration';

import SearchOnMap from './GoogleMap/SearchOnMap';
import EmployeeFound from './GoogleMap/EmployeeFound';
import EmployeeProfileDetails from './GoogleMap/EmployeeProfileDetails';
import Profile from './Account/Profile';


const UserAllScreens = {

  //Confirmed route
  HomePage,
  SearchPage,
  ProfileDetails,
  EmployeeProfileDetails,


  // Unconfirmed route
  SearchOnMap,

  EmployeeFound,


  //Bookmark
  MyBooking,
  BookMarks,
  Notification,

  //Account
  LoginPage,
  Registration,
  Profile,
 
  EditProfile,
  ChangePassword,
  HelpSupport,
  PaymentHistory,
  PrivacyPolicy,
};

const AdminScreens = {
  //   AdminDashboard,
  //   Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
