//The Outlet is used to have Header component in both paths.

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
