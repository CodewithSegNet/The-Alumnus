import React from "react";
import { FooterComponent } from "./Footer";
import { HeaderComponent } from "./Header";

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <main>
      <HeaderComponent />
      <section className="min-h-screen">{children}</section>
      <FooterComponent />
    </main>
  );
};

export default BaseLayout;
