import Navbar from "./components/navbar";
import "./styles/global.css";
import CookieBanner from "./components/cookieConsentBanner";
import { useEffect } from "react";
import { initApp } from "./services/appService";
import Footer from "./components/footer";
import Breadcrumb from "./components/breadcrumb";
import AppRoutes from "./routes";

function App() {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto px-4">
          <Breadcrumb />
        </div>
        <AppRoutes />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

export default App;
