import React from "react";
import "./guest-layout.scss";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
type Props = {
  children?: any;
};

export const GuestLayout = ({ children }: Props) => {
  return (
    <div className="guest-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
