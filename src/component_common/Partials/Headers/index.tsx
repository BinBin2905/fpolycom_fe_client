import ThinBag from "../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function HeaderOne({
  className,
  drawerAction,
}: {
  className?: string;
  drawerAction: () => void;
}) {
  return (
    <header
      className={` ${
        className || ""
      } z-50 header-section-wrapper sticky top-0 shadow-md`}
    >
      <Middlebar className="quomodo-shop-middle-bar lg:block hidden" />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div>
            <a href="/">
              <img
                width="152"
                height="36"
                src={`/assets/images/FpolyComLogoVertical.png`}
                alt="logo"
              />
            </a>
          </div>
          <div className="cart relative cursor-pointer">
            <a href="/cart">
              <span>
                <ThinBag />
              </span>
            </a>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow text-qblack
              }`}
            >
              15
            </span>
          </div>
        </div>
      </div>
      <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
