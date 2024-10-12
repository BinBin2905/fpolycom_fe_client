import Layout from "@/component_common/Partials/Headers/Layout";
import React from "react";
import { Outlet } from "react-router-dom";

const AppCommonUser = () => {
  return (
    <div className="overflow-y-scroll h-screen">
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </div>
  );
};

export default AppCommonUser;
