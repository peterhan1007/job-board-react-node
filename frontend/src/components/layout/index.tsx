import React from "react";

import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
