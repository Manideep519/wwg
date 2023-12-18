import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
