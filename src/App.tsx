import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import AppCommon from "./template/AppCommon";
import DashboardProductPage from "./page/dashboard_product/DashboardProductPage";
import DashboardRevenuePage from "./page/dashboard_revenue/DashboardRevenuePage";
import AppLogin from "./template/AppLogin";
import LoginPage from "./page/login/LoginPage";
import { Toaster } from "sonner";
import ProvincePage from "./page/province/ProvincePage";
import Home from "./page/home";
import AllProductPage from "./page/AllProductPage";
import SingleProductPage from "./page/SingleProductPage";
import CardPage from "./page/CartPage";
import Wishlist from "./component_common/Wishlist";
import CheckoutPage from "./page/CheckoutPage";
import FlashSale from "./page/FlashSale";
import SallerPage from "./page/SallerPage";
import ProbView from "./page/SallerPage/StoreManagement/ProbView";
import Sallers from "./page/Sellers";
import About from "./page/About";
import Blogs from "./page/Blogs";
import Blog from "./page/Blogs/Blog.jsx";
import TrackingOrder from "./page/TrackingOrder/index.js";
import Contact from "./page/Contact/index.js";
import Faq from "./page/Faq/index.js";
import Login from "./page/Auth/Login/index.js";
import Signup from "./page/Auth/Signup/index.js";
import Profile from "./page/Auth/Profile/index.js";
import BecomeSaller from "./page/BecomeSaller/index.js";
import PrivacyPolicy from "./page/PrivacyPolicy/index.js";
import TermsCondition from "./page/TermsCondition/index.js";
import FourZeroFour from "./page/FourZeroFour/index.js";
import AppCommonUser from "./template/AppCommonUser.js";
import AppLoginUser from "./template/AppLoginUser.js";
import { useUserStore } from "./store/userStore.js";
import { useStoreStore } from "./store/storeStore.js";

function App() {
  const { currentUser } = useUserStore();
  const { currentStore } = useStoreStore();
  console.log(currentUser?.username);
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              // !!currentUser ? (
              <AppCommon />
              // ) : (
              //   <Navigate to={"/login"}></Navigate>
              // )
            }
          >
            <Route element={<HomePage></HomePage>} path="/store"></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <DashboardProductPage></DashboardProductPage>
                )
              }
              path="/store/dashboard_product"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <DashboardRevenuePage></DashboardRevenuePage>
                )
              }
              path="/store/dashboard_revenue"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <ProvincePage></ProvincePage>
                )
              }
              path="/store/province"
            ></Route>
          </Route>

          <Route element={<AppLoginUser></AppLoginUser>}>
            <Route
              path="/login"
              element={currentUser ? <Navigate to={"/"}></Navigate> : <Login />}
            />
            <Route
              path="/signup"
              element={
                currentUser ? <Navigate to={"/"}></Navigate> : <Signup />
              }
            />
          </Route>
          <Route
            element={
              currentUser ? (
                <AppCommonUser />
              ) : (
                <Navigate to={"/login"}></Navigate>
              )
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProductPage />} />
            <Route path="/single-product" element={<SingleProductPage />} />
            <Route path="/cart" element={<CardPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/flash-sale" element={<FlashSale />} />
            <Route path="/saller-page" element={<SallerPage />} />
            {/* <Route path="/my-Store" element={<MyStore />} /> */}
            <Route path="/my-Store/single-product" element={<ProbView />} />
            <Route path="/sallers" element={<Sallers />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/blog" element={<Blog />} />
            <Route path="/tracking-order" element={<TrackingOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/become-saller" element={<BecomeSaller />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="*" element={<FourZeroFour />} />.
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
