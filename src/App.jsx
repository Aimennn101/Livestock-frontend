import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login';
import { Provider } from 'react-redux';
import store from './redux/store';
import './css/bootstrap.min.css';
import SignUpPage from './components/signUp';
import Dashboard from './components/AdminUser/Dashboard';
import ResourceManagement from './components/AdminUser/resourceManagement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedingRoutine from './components/AdminUser/feedingRoutine';
import Error from './components/error';
import Profile from './components/AdminUser/profile';
import AdminGuard from './guards/AdminGuard';
import AuthGuard from './guards/AuthGuard';
import AppointmentForm from './components/vetAppointment';
import UserGuard from './guards/UserGuard';
import ForgetPassword from './components/forgetPassword';
import AvailableSlotForm from './components/AdminUser/scheduleTimeslot';
import DoctorGuard from './guards/DoctorGuard';
import ShelterSpace from './components/AdminUser/shelterSpace';
import PurchasedItems from './components/AdminUser/purchasedItems';
import Cart from './components/AdminUser/addToCart';
import ListingPage from './components/AdminUser/listingPage';
import Livestock from './components/AdminUser/livestock';

const App = () => {
  return (
    <Provider store={store}>
       <ToastContainer />
      <Router>
        <div className="container-fluid mx-0 px-0 row">
          <Routes>
            <Route className="col-lg-12" path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forget-password/:email" element={<ForgetPassword />} />
            <Route className="col-lg-12" path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile/></AuthGuard>}></Route>
            <Route path="/livestock" element={<AdminGuard><Livestock /></AdminGuard>} />
            <Route path="/resource-management" element={<AdminGuard><ResourceManagement /></AdminGuard>} />
            <Route path="/feeding" element={<AdminGuard><FeedingRoutine /></AdminGuard>} />
            <Route path="/vet-appointment" element={<UserGuard><AppointmentForm /></UserGuard>} />
            <Route path="/orders" element={<UserGuard><PurchasedItems /></UserGuard>} />
            <Route path="/cart" element={<UserGuard><Cart /></UserGuard>} />
            <Route path="/shop-product" element={<UserGuard><ListingPage /></UserGuard>} />
            <Route path="/timeslot" element={<DoctorGuard><AvailableSlotForm /></DoctorGuard>} />
            
            {/* <Route path="/timeslot-recursive" element={<DoctorGuard><AvailableSlotForm /></DoctorGuard>} /> */}

            <Route path="/shelter-space" element={<ShelterSpace />} />
            
            {/* <Route path="/livestock" element={<LivestockPage />} /> */}
            <Route path="*" element={<Error/>}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
