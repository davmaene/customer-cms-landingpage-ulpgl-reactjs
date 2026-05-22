import React from "react";

import "./App.css";
import "./styles/custom.scss";
import "./styles/skeleton.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/Home";
import { routes } from "./utils/utils.routes";
import { Footer } from "./components/Footer.component";
import { Header } from "./components/Header.component";
import { SkipToContent } from "./components/subcomponents/Skipbutton";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { Center } from "./pages/Center";
import { Articles } from "./pages/Articles";
import { NotFound } from "./pages/NotFound";
import { Faq } from "./pages/Faq";
import { ArticleDerails } from "./pages/Articledetails";
import { LoadingWrapper } from "./components/Loaderwrapper";
import { Centers } from "./pages/Centers";
import { Profile } from "./pages/Profile";
import { Domaines } from "./pages/Domaines";
import { Library } from "./pages/Bilbiotheques";
import { Metanoia } from "./pages/Metanoia";
import { Kauta } from "./pages/Kauta";
import { Faculties } from "./pages/Faculties";
import { FacultyDetail } from "./pages/FacultyDetail";
import { Search } from "./pages/Search";
import { Login } from "./pages/Login";
import { ForgotPassword, ResetPassword } from "./pages/PasswordReset";
import { SchedulesPage } from "./pages/Schedules";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./pages/AdminDashboard";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-rsssl="1"
    className="home wp-singular page-template page-template-no-title page page-id-11 wp-custom-logo wp-embed-responsive wp-theme-edublock-pro tribe-js"
  >
    <SkipToContent />
    <LoadingWrapper>
      <div className="wp-site-blocks- px-0 py-0">
        <Header />
        <main
          className="wp-block-group site-content is-layout-flow wp-block-group-is-layout-flow"
          style={{ marginTop: 10 }}
          id="wp--skip-link--target"
        >
          <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained pl-2">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </LoadingWrapper>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin dashboard — own layout (no public Header/Footer) */}
          <Route path={routes.ADMIN} element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<AdminDashboard />} />
            <Route path="events" element={<AdminDashboard />} />
            <Route path="activities" element={<AdminDashboard />} />
            <Route path="schedules" element={<AdminDashboard />} />
            <Route path="centers" element={<AdminDashboard />} />
            <Route path="pending" element={<AdminDashboard />} />
            <Route path="newsletter" element={<AdminDashboard />} />
            <Route path="messages" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard />} />
          </Route>

          {/* Auth pages — minimal layout (no public header/footer) */}
          <Route path={routes.LOGIN} element={<><Login /><ToastContainer position="bottom-center" autoClose={3000} hideProgressBar /></>} />
          <Route path={routes.FORGOT_PASSWORD} element={<><ForgotPassword /><ToastContainer position="bottom-center" autoClose={3000} hideProgressBar /></>} />
          <Route path={routes.RESET_PASSWORD} element={<><ResetPassword /><ToastContainer position="bottom-center" autoClose={3000} hideProgressBar /></>} />

          {/* Public site */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <Routes>
                  <Route path={routes.HOME} element={<Home />} />
                  <Route path={routes.HOMEBLANK} element={<Home />} />
                  <Route path={routes.CONTACTS} element={<Contacts />} />
                  <Route path={routes.ABOUT} element={<About />} />
                  <Route path={routes.DOMAINES} element={<Domaines />} />
                  <Route path={routes.FACULTIES} element={<Faculties />} />
                  <Route path={`${routes.FACULTIES}/:slug`} element={<FacultyDetail />} />
                  <Route path={`${routes.DOMAINES}/:faculty/:filiaire`} element={<FacultyDetail />} />
                  <Route path={`${routes.CENTRES}/:center`} element={<Center />} />
                  <Route path={routes.CENTRES} element={<Centers />} />
                  <Route path={routes.SCHEDULES} element={<SchedulesPage />} />
                  <Route path={`${routes.PROFILE}/:profile`} element={<Profile />} />
                  <Route path={`${routes.ARTICLES}/:category?`} element={<Articles />} />
                  <Route path={`${routes.ARTICLESDETAILS}/:article`} element={<ArticleDerails />} />
                  <Route path={routes.FAQ} element={<Faq />} />
                  <Route path={routes.METANOIA} element={<Metanoia />} />
                  <Route path={routes.KAUTA} element={<Kauta />} />
                  <Route path={routes.BIBLIO} element={<Library />} />
                  <Route path={routes.SEARCH} element={<Search />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PublicLayout>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
