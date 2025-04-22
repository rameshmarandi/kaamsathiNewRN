import HomePage from './HomePage/index';

import MyBooking from './Booked/MyBooking';
import BookMarks from './Booked/BookMarks';
import EditProfile from './Account/EditProfile';
import ChangePassword from './Account/ChangePassword';
import HelpSupport from './Account/HelpSupport';
import PaymentHistory from './Account/PaymentHistory';
import PrivacyPolicy from './Account/PrivacyPolicy';
import ProfileDetails from './Account/ProfileDetails';
import Notification from './Notification/index';
import LoginPage from './Auth/LoginPage';
import Registration from './Auth/Registration';

import SearchOnMap from './GoogleMap/SearchOnMap';
import EmployeeFound from './GoogleMap/EmployeeFound';
import EmployeeProfileDetails from './GoogleMap/EmployeeProfileDetails';
import Profile from './Account/Profile';

const UserAllScreens = {
  //Homepage
  HomePage,
  SearchOnMap,
  EmployeeFound,
  EmployeeProfileDetails,

  //Bookmark
  MyBooking,
  BookMarks,
  Notification,

  //Account
  LoginPage,
  Registration,
  Profile,
  ProfileDetails,
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
