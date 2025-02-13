import {
  Welcome,
  Footer,
  Transactions,
  Navbar,
  Services,
  SecurityTips,
  CryptoConverter,
} from "./components";
const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <SecurityTips />
      {/* <CryptoConverter /> */}
      <Footer />
    </div>
  );
};

export default App;
