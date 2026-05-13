import React from "react";

import "./App.css";
import './styles/custom.scss';
import './styles/skeleton.scss';
import './styles/dashboard.scss';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { routes } from "./utils/utils.routes";
import { Footer } from "./components/Footer.component";
import { Header } from "./components/Header.component";
import { SkipToContent } from "./components/subcomponents/Skipbutton";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { Center } from "./pages/Center";
import { ToastContainer } from 'react-toastify';
import { Articles } from "./pages/Articles";
import { NotFound } from "./pages/NotFound";
import { Faq } from "./pages/Faq";
import { ArticleDerails } from "./pages/Articledetails";
import { LoadingWrapper } from "./components/Loaderwrapper";
import { Centers } from "./pages/Centers";
import { Profile } from "./pages/Profile";
import { Domaines } from "./pages/Domaines";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import { DashboardOverview } from "./pages/dashboard/DashboardOverview";
import { DashboardArticles } from "./pages/dashboard/DashboardArticles";
import { DashboardStaff } from "./pages/dashboard/DashboardStaff";
import { DashboardCentres } from "./pages/dashboard/DashboardCentres";
import { DashboardDomaines } from "./pages/dashboard/DashboardDomaines";
import { LoginPage } from "./pages/dashboard/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ProtectedRoute } from "./components/dashboard/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/dashboard/login" element={<LoginPage />} />

            <Route path={`${routes.DASHBOARD}/*`} element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="articles" element={<DashboardArticles />} />
              <Route path="staff" element={<DashboardStaff />} />
              <Route path="centres" element={<DashboardCentres />} />
              <Route path="domaines" element={<DashboardDomaines />} />
            </Route>

            <Route path="*" element={
              <div data-rsssl="1" className="home wp-singular page-template page-template-no-title page page-id-11 wp-custom-logo wp-embed-responsive wp-theme-edublock-pro tribe-js">
                <SkipToContent />
                <LoadingWrapper>
                  <div className="wp-site-blocks- px-0 py-0">
                    <Header />
                    <main className="wp-block-group site-content is-layout-flow wp-block-group-is-layout-flow" style={{ marginTop: 10 }} id="wp--skip-link--target">
                      <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained pl-2">
                        <Routes>
                          <Route path={routes.HOME} element={<Home />} />
                          <Route path={routes.HOMEBLANK} element={<Home />} />
                          <Route path={routes.CONTACTS} element={<Contacts />} />
                          <Route path={routes.ABOUT} element={<About />} />
                          <Route path={routes.DOMAINES} element={<Domaines />} />
                          <Route path={`${routes.CENTRES}/:center`} element={<Center />} />
                          <Route path={routes.CENTRES} element={<Centers />} />
                          <Route path={`${routes.PROFILE}/:profile`} element={<Profile />} />
                          <Route path={`${routes.ARTICLES}/:category?`} element={<Articles />} />
                          <Route path={`${routes.ARTICLESDETAILS}/:article`} element={<ArticleDerails />} />
                          <Route path={routes.FAQ} element={<Faq />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </main>
                    <Footer />
                  </div>
                </LoadingWrapper>
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
                  theme="light" />
              </div>
            } />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
