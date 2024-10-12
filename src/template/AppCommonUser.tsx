import React from "react";
import { Outlet } from "react-router-dom";

const AppCommonUser = () => {
  return (
    <div className="overflow-y-scroll h-screen">
      <Outlet></Outlet>
    </div>
  );
};

export default AppCommonUser;
