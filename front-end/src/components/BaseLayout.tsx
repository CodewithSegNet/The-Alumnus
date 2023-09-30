import React from "react";
import { FooterComponent } from "./Footer";
import { HeaderComponent } from "./Header";

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      <section className="min-h-screen">{children}</section>
      <FooterComponent />
    </>
  );
};

export default BaseLayout;
