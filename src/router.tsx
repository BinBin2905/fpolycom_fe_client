import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import AllProductPage from "./page/AllProductPage";
import SingleProductPage from "./page/SingleProductPage";
import CardPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import Wishlist from "./components/Wishlist";
import SallerPage from "./page/SallerPage";
import ProbView from "./page/SallerPage/StoreManagement/ProbView";
import Sallers from "./page/Sellers";
import About from "./page/About";
import Blogs from "./page/Blogs";
import Blog from "./page/Blogs/Blog.jsx";
import TrackingOrder from "./page/TrackingOrder/index.js";
import Contact from "./page/Contact/index.js";
import Faq from "./page/Faq/index.js";
import Login from "./page/Auth/Login";
import Signup from "./page/Auth/Signup";
import Profile from "./page/Auth/Profile/index.js";
import BecomeSaller from "./page/BecomeSaller/index.js";
import PrivacyPolicy from "./page/PrivacyPolicy/index.js";
import TermsCondition from "./page/TermsCondition/index.js";
import FourZeroFour from "./page/FourZeroFour/index.js";
import FlashSale from "./page/FlashSale/index.js";
import MyStore from "./page/SallerPage/StoreManagement/StoreManagement.jsx";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProductPage />} />
      <Route path="/single-product" element={<SingleProductPage />} />
      <Route path="/cart" element={<CardPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/flash-sale" element={<FlashSale />} />
      <Route path="/saller-page" element={<SallerPage />} />
      <Route path="/my-Store" element={<MyStore />} />
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
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
}
