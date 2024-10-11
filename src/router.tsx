import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllProductPage from "./pages/AllProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import CardPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Wishlist from "./components/Wishlist";
import SallerPage from "./pages/SallerPage";
import ProbView from "./pages/SallerPage/StoreManagement/ProbView";
import Sallers from "./pages/Sellers";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blogs/Blog.jsx";
import TrackingOrder from "./pages/TrackingOrder/index.js";
import Contact from "./pages/Contact/index.js";
import Faq from "./pages/Faq/index.js";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Auth/Profile/index.js";
import BecomeSaller from "./pages/BecomeSaller/index.js";
import PrivacyPolicy from "./pages/PrivacyPolicy/index.js";
import TermsCondition from "./pages/TermsCondition/index.js";
import FourZeroFour from "./pages/FourZeroFour/index.js";
import FlashSale from "./pages/FlashSale/index.js";
import MyStore from "./pages/SallerPage/StoreManagement/StoreManagement.jsx";

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
