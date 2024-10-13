import { ReactNode, useState } from "react";

import HeaderOne from ".";
import Footer from "../Footers";
import Drawer from "../../../pages/Mobile/Drawer";
import DiscountBanner from "../../../pages/Home/DiscountBanner";

export default function Layout({
  children,
  childrenClasses,
}: {
  children?: ReactNode;
  childrenClasses?: string;
}) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <HeaderOne className="" drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
}
