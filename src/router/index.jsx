import { Routes, Route } from "react-router-dom";

// Guards
import ProtectedRoute from "./ProtectedRoute";

// Layouts
// import PublicLayout from "@/layouts/PublicLayout";
import StudentLayout from "@/layouts/StudentLayout";
import LearnLayout from "@/layouts/LearnLayout";


// Public pages
import LandingPage from "@/pages/public/LandingPage";
import Auth from "@/pages/public/Auth";
import ForgotPassword from "@/pages/public/ForgotPassword";
import NotFound from "@/pages/public/NotFound";

// Student pages
import Home from "@/pages/student/Home";
import Explore from "@/pages/student/Explore";
import CourseDetail from "@/pages/student/CourseDetail";
import MyLearning from "@/pages/student/MyLearning";
import Wishlist from "@/pages/student/Wishlist";
import Notifications from "@/pages/student/Notifications";
import Profile from "@/pages/student/Profile";
import Settings from "@/pages/student/Settings";
import Cart from "@/pages/student/Cart";
import Checkout from "@/pages/student/Checkout";

// Learn pages
import LearnEnvironment from "@/pages/learn/LearnEnvironment";
// import CertificateView from "@/pages/learn/CertificateView";

export default function AppRouter() {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      {/* <Route element={<PublicLayout />}> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* </Route> */}

      
      {/* ---------- STUDENT ---------- */}
<Route
  element={
    <ProtectedRoute role="STUDENT">
      <StudentLayout />
    </ProtectedRoute>
  }
>
  <Route path="/home" element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/courses/:courseId" element={<CourseDetail />} />
  <Route path="/my-learning" element={<MyLearning />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
</Route>

      {/* ---------- LEARN ---------- */}
      <Route
  element={
    <ProtectedRoute role="STUDENT">
      <LearnLayout />
    </ProtectedRoute>
  }
>
  <Route path="/learn/:courseId" element={<LearnEnvironment />} />
</Route>


      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}