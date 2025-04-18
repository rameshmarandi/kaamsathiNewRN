// import HomePage from "../Screens/HomePage/index.js";
// import LoginPage from "./AuthScreens/LoginPage.js";
// import BookedHistory from "./Booked/BookedHistory.js";


// const AuthScreen = {
//     LoginPage
// }
// const UserAllScreens = {
//     HomePage,
//     BookedHistory
    
// };

// export default AllScreens = {
//     ...AuthScreen,
//   ...UserAllScreens,

// };



// Users Screens

// import HomePage from './User/HomePage/index';

import HomePage from "./HomePage/index"

// Admin Dashboard

// import AdminDashboard from './Admin/AdminDashboard/index';
// import Approval from './Admin/Approval/index';


// import SearchOnMap from './User/GoogleMap/SearchOnMap';
// import EmployeeFound from './User/GoogleMap/EmployeeFound';
// import EmployeeProfileDetails from './User/GoogleMap/EmployeeProfileDetails';
// import Profile from './Account/Profile';
import BookedHistory from './Booked/BookedHistory';
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



import SearchOnMap from "./GoogleMap/SearchOnMap";
import EmployeeFound from "./GoogleMap/EmployeeFound";
import EmployeeProfileDetails from "./GoogleMap/EmployeeProfileDetails";
import Profile from "./Account/Profile";

const UserAllScreens = {
  //Homepage
  HomePage,
  SearchOnMap,
  EmployeeFound,
  EmployeeProfileDetails,

  //Bookmark
  BookedHistory,
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
