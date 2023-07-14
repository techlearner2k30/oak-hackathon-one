"use client";
import React , { createContext, useContext, useId, useState } from "react";
import Copyright from "./components/copyright";
import Footer from "./components/footer/footer";
import Header from "./components/header";
// import SetCartCookies from "./components/cookies/setcartcookie";
import "./globals.css";
import {CartContextProvider} from "./themecontext/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={``}>
        <main className="m-auto max-w-[1200px] p-4 md:p-8">
          
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>

          <Footer />
        </main>
        <Copyright />
      </body>
    </html>
  );
}
