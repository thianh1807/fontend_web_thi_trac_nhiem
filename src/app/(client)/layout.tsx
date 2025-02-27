import React from "react";
import NavBar from "../_components/layout/NavBar";
import Footer from "../_components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
