import React from "react";
import { Outlet } from "react-router-dom";

const AppLoginUser = () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Outlet />
    </div>
  );
};

export default AppLoginUser;
