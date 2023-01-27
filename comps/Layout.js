import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
