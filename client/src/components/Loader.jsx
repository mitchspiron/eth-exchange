import "../assets/css/Loader.css";
const Loader = () => {
  return (
    <div className="atom-spinner">
      <div className="spinner-inner">
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-circle">&#9679;</div>
      </div>
    </div>
  );
};

export default Loader;
