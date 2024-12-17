import Layout from "@/component_common/Partials/Headers/Layout";
import ComponentFrameMessageUser from "@/component_common/message/ComponentFrameMessageUser";
import { Outlet } from "react-router-dom";

const AppCommonUser = () => {
  return (
    <div id="appLoginUser" className="overflow-y-scroll h-screen scroll-smooth">
      {location.pathname.indexOf("/messages") < 0 && (
        <ComponentFrameMessageUser></ComponentFrameMessageUser>
      )}
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </div>
  );
};

export default AppCommonUser;
