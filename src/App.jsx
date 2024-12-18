import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/aboutPage/AboutPage";
import ContactPage from "./components/contactPage/ContactPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import CrreateNote from "./components/Notes/CrreateNote";
import AllNotes from "./components/Notes/AllNotes";
import AccessDenied from "./components/auth/AccessDenied";
import Admin from "./components/AuditLogs/Admin";
import { ContextProvider } from "./store/ContextApi";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import OAuth2RedirectHandler from "./components/auth/OAuth2RedirectHandler";

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="reset-password/" element={<ResetPassword />} />

          <Route path="/notes" element={
            <ProtectedRoute>
              <AllNotes />
            </ProtectedRoute>
          } />

          <Route path="/create-note" element={
            <ProtectedRoute>
              <CrreateNote />
            </ProtectedRoute>
          } />

          <Route path="/access-denied" element={
            <ProtectedRoute>
              <AccessDenied />
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
export default App;
