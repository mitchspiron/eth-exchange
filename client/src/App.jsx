import { useEffect } from "react";
import {
  Welcome,
  Footer,
  Transactions,
  Navbar,
  Services,
  SecurityTips,
  BackToTop,
} from "./components";
const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div id="welcome" className="gradient-bg-welcome">
        <Welcome />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="transactions">
        <Transactions />
      </div>
      <div id="tips">
        <SecurityTips />
      </div>
      <Footer id="contact" />
      <BackToTop/>
    </div>
  );
};

export default App;
