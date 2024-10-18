import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import datas from "../../../data/products.json";
import MenuItem from "./MenuItem";

import {
  // IcoAdress,
  // IcoCart,
  IcoDashboard,
  IcoLogout,
  // IcoLove,
  IcoPassword,
  // IcoPayment,
  IcoPeople,
  // IcoReviewHand,
  IcoSupport,
} from "./icons";
import {
  AddressesTab,
  Dashboard,
  // OrderTab,
  PasswordTab,
  Payment,
  ProfileTab,
  ReviewTab,
  SupportTab,
  WishlistTab,
} from "./tabs";
import BreadcrumbCom from "@/component_common/BreadcrumbCom";
import Layout from "@/component_common/Partials/Headers/Layout";

export default function Profile() {
  // const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);
  return (
    // <Layout childrenClasses="pt-0 pb-0">
    <div className="profile-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="w-full my-10">
          <BreadcrumbCom
            paths={[
              { name: "home", path: "/" },
              { name: "profile", path: "/profile" },
            ]}
          />
          <div className="w-full bg-white px-9 lg:px-3">
            <div className="title-area w-full flex justify-between items-center">
              <h1 className="text-[22px] font-bold text-qblack">
                Thông tin tài khoản
              </h1>
              {/* <div className="switch-dashboard flex space-x-3 items-center">
                  <p className="text-qgray text-base">Switch Dashboard</p>
                  <button
                    onClick={() => setSwitchDashboard(!switchDashboard)}
                    type="button"
                    className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                  >
                    <div
                      className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${
                        switchDashboard ? "left-[44px]" : "left-[4px]"
                      }`}
                    ></div>
                  </button>
                </div> */}
            </div>

            <div className="w-full mt-4 lg:mt-10 flex flex-col lg:flex-row gap-x-10 gap-y-10">
              <div className="border-r-0 lg:border-r-[1px] flex-none pr-10 hidden lg:block">
                <div className="flex flex-col space-y-10">
                  <MenuItem
                    to="/profile#dashboard"
                    Icon={IcoDashboard}
                    text="Tổng quan mua hàng"
                  />
                  <MenuItem
                    to="/profile#profile"
                    Icon={IcoPeople}
                    text="Thông tin cá nhân"
                  />
                  {/* <MenuItem to="/profile#payment" Icon={IcoPayment} text="Payment Method" /> */}
                  {/* <MenuItem to="/profile#order" Icon={IcoCart} text="Đơn hàng" /> */}
                  {/* <MenuItem to="/profile#wishlist" Icon={IcoLove} text="Wishlist" /> */}
                  {/* <MenuItem to="/profile#address" Icon={IcoAdress} text="Address" /> */}
                  {/* <MenuItem to="/profile#review" Icon={IcoReviewHand} text="Đánh giá" /> */}
                  <MenuItem
                    to="/profile#password"
                    Icon={IcoPassword}
                    text="Đổi mật khẩu"
                  />
                  <MenuItem
                    to="/profile#support"
                    Icon={IcoSupport}
                    text="Khiếu nại & đóng góp"
                  />
                  <MenuItem
                    to="/profile#profile"
                    Icon={IcoLogout}
                    text="Đăng xuất"
                  />
                </div>
              </div>

              <div className="block lg:hidden">
                {/* <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                    <select
                      className="w-full p-2"
                      onChange={(e) => {
                        window.location.href = e.target.value;
                      }}
                    >
                      <option value="/profile#dashboard">Tổng quan</option>
                      <option value="/profile#profile">Thông tin cá nhân</option>
                      <option value="/profile#order">Đơn hàng</option>
                      <option value="/profile#password">Đổi mật khẩu</option>
                      <option value="/profile#support">Khiếu nại & đóng góp</option>
                      <option value="/profile#profile">Đăng xuất</option>
                    </select>
                  </div> */}

                <div className="w-full mx-auto">
                  <select
                    className="w-full block py-2.5 px-0 text-qblack bg-transparent border-b-2 "
                    onChange={(e) => {
                      window.location.href = e.target.value;
                    }}
                  >
                    <option defaultValue="true" value="/profile#dashboard">
                      Tổng quan mua hàng
                    </option>
                    <option value="/profile#profile">Thông tin cá nhân</option>
                    <option value="/profile#password">Đổi mật khẩu</option>
                    <option value="/profile#support">
                      Khiếu nại & đóng góp
                    </option>
                    <option value="/profile#profile">Đăng xuất</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <div className="item-body dashboard-wrapper">
                  {active === "dashboard" ? (
                    <Dashboard />
                  ) : active === "profile" ? (
                    <>
                      <ProfileTab />
                    </>
                  ) : active === "payment" ? (
                    <>
                      <Payment />
                    </>
                  ) : // ) : active === "order" ? (
                  //   <>
                  //     <OrderTab />
                  //   </>
                  active === "wishlist" ? (
                    <>
                      <WishlistTab />
                    </>
                  ) : active === "address" ? (
                    <>
                      <AddressesTab />
                    </>
                  ) : active === "password" ? (
                    <>
                      <PasswordTab />
                    </>
                  ) : active === "support" ? (
                    <>
                      <SupportTab />
                    </>
                  ) : active === "review" ? (
                    <>
                      <ReviewTab products={datas.products} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
}
