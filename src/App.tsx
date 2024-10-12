import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import AppCommon from "./template/AppCommon";
import ProductPage from "./page/product/ProductPage";
import AdvertisementPage from "./page/advertisement/AdvertisementPage";
import DashboardProductPage from "./page/dashboard_product/DashboardProductPage";
import DashboardRevenuePage from "./page/dashboard_revenue/DashboardRevenuePage";
import AppLogin from "./template/AppLogin";
import LoginPage from "./page/login/LoginPage";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "./store/userStore";
import SpinnerLoading from "./component_common/loading/SpinnerLoading";
import ProductCreatePage from "./page/create_product/ProductCreatePage";
import { Toaster } from "sonner";
import ProductCreatePageFormik from "./page/create_product/ProductCreatePageFormik";
import MessagesPage from "./page/message/MessagesPage";
import PromotionPage from "./page/promotion/PromotionPage";
import NotifycationComponent from "./page/NotifycationComponent";
import AdvertisementCreatePage from "./page/advertisement/AdvertisementCreatePage";
import AdvertisementUpdatePage from "./page/advertisement/AdvertisementUpdatePage";
import PostPage from "./page/post/PostPage";
import PostCreatePage from "./page/post/PostCreatePage";
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

function App() {
  const { currentUser, tokenInitial, setTokenInitial } = useUserStore();
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
              element={<DashboardProductPage></DashboardProductPage>}
              path="/store/dashboard_product"
            ></Route>
            <Route
              element={<DashboardRevenuePage></DashboardRevenuePage>}
              path="/store/dashboard_revenue"
            ></Route>
            <Route
              element={<ProvincePage></ProvincePage>}
              path="/store/province"
            ></Route>
          </Route>
          <Route
            element={
              currentUser ? <Navigate to={"/"}></Navigate> : <AppLogin />
            }
          >
            <Route
              path="/store/login"
              element={<LoginPage></LoginPage>}
            ></Route>
          </Route>
          <Route element={<AppCommonUser />}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
