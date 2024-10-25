import Layout from "@/component_common/Partials/Headers/Layout";
import { Outlet } from "react-router-dom";

const AppCommonUser = () => {
  return (
    <div id="appLoginUser" className="overflow-y-scroll h-screen scroll-smooth">
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </div>
  );
};

export default AppCommonUser;
