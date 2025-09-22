import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Layout = ({ children }) => {

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
