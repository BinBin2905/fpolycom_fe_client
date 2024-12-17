import ComponentFrameMessageUser from "@/component_common/message/ComponentFrameMessageUser";
import { Outlet } from "react-router-dom";

const AppLoginUser = () => {
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth">
      <Outlet />
    </div>
  );
};

export default AppLoginUser;
