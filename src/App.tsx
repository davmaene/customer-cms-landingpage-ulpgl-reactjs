import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./pages/Home";
import { routes } from "./utils/utils.routes";
import { Footer } from "./components/Footer.component";
import { Header } from "./components/Header.component";
import { SkipToContent } from "./components/subcomponents/Skipbutton";

function App() {
  return (
    <Router>
      <div data-rsssl="1" className="home wp-singular page-template page-template-no-title page page-id-11 wp-custom-logo wp-embed-responsive wp-theme-edublock-pro tribe-js">
        <SkipToContent />
        <div className="wp-site-blocks">
          <Header />
          <main className="wp-block-group site-content is-layout-flow wp-block-group-is-layout-flow" style={{ marginTop: 0 }} id="wp--skip-link--target">
            <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
              <Routes>
                <Route path={routes.HOME} element={<Home />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
