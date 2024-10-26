import { ReactNode, useState } from "react";

import HeaderOne from ".";
import Footer from "../Footers";
import Drawer from "@/page/Mobile/Drawer";
import DiscountBanner from "@/page/home/DiscountBanner";
import TopBar from "./TopBar";

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
      <TopBar className="quomodo-shop-top-bar" />
      <HeaderOne className="" drawerAction={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <div className={`w-full  ${childrenClasses || "pt-[10px] pb-[60px]"}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
}
