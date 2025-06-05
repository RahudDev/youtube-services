import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import YoutubeSuccess from '../pages/checkoutsuccess';
import SignUp from '../pages/signup';
import VerifyEmail from '../pages/VerifyEmail';
import EmailVerificationConfirm from '../pages/EmailVerificationConfirm';
import Dashboard from '../pages/dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AuthGuard from './authsecurity';
import Channeldata from '../pages/ChannelInfo';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import DeleteAccount from '../pages/DeleteUser';
import MilkyWayBlog from '../pages/MilkyWayBlog';
import BlogRoutes from './BlogRoutes';
import OrderHistory from '../pages/OrderHistory';
import CreatePayment from '../pages/nowPayments';
import CryptoSuccess from '../pages/CryptoSuccess';
import AffiliateProgram from '../pages/AffiliateProgram';
import AffiliateDashboard from '../pages/AffiliateDashboard';
import AffiliateDashboardRoutes from './Affiliate-dashboard-routes';
import AffiliateProgramRoutes from './Affiliate-program';
import AffiliateGuard from './AffiliateGuard';
import PendingApplication from '../components/affiliate-components/PendingApplication';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""><Home /></AuthGuard>} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""> <Login /> </AuthGuard>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/completed" element={<YoutubeSuccess />} />
      <Route path="/completed-crypto" element={<CryptoSuccess />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/affiliate-program" element={<AffiliateGuard redirectIfAffiliator="/affiliate-dashboard" redirectIfNotAffiliator=""> <AffiliateProgram /> </AffiliateGuard>} />
      <Route path="/affiliate-program/*" element={<AffiliateGuard redirectIfAffiliator="/affiliate-dashboard" redirectIfNotAffiliator=""> <AffiliateProgramRoutes /> </AffiliateGuard>} />
      <Route path="/affiliate-dashboard" element={<AffiliateGuard redirectIfAffiliator="" redirectIfNotAffiliator="/affiliate-program"> <AffiliateDashboard /> </AffiliateGuard>} />
      <Route path="/affiliate-dashboard/*" element={<AffiliateGuard redirectIfAffiliator="" redirectIfNotAffiliator="/affiliate-program"> <AffiliateDashboardRoutes /> </AffiliateGuard>} />
      <Route path="/affiliate/pending-application" element={<PendingApplication />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/now-payments" element={<CreatePayment />} />
      <Route path="/academy/*" element={<BlogRoutes />} />
      <Route path="/academy" element={<MilkyWayBlog />} />
      <Route path="/my-orders" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/login"> <OrderHistory /> </AuthGuard>} />
      <Route path="/deletion" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/"> <DeleteAccount /> </AuthGuard>}/>
      <Route path="/signup" element={<AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""> <SignUp /> </AuthGuard>} />
      <Route path="/verifyemail" element={<AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""> <VerifyEmail /> </AuthGuard>} />
      <Route path="/confirm-email" element={<EmailVerificationConfirm />} />
      <Route path="/dashboard" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/login"> <Dashboard /> </AuthGuard> } />
      <Route path="/channel-info" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/login"> <Channeldata /> </AuthGuard> } />             
    </Routes>
  );
};

export default AppRoutes;
