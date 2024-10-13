import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import { Toaster } from "sonner";
import Wishlist from "./component_common/Wishlist";
import { useUserStore, useStoreStore } from "./store/index.js";
import { AppCommon, AppCommonUser, AppLoginUser } from "./template/index.js";
import {
  About,
  AllProductPage,
  BecomeSaller,
  Blog,
  Blogs,
  CardPage,
  CheckoutPage,
  Contact,
  DashboardProductPage,
  DashboardRevenuePage,
  Faq,
  FlashSale,
  FourZeroFour,
  Home,
  Login,
  PrivacyPolicy,
  ProbView,
  Profile,
  ProvincePage,
  SallerPage,
  Sallers,
  Signup,
  SingleProductPage,
  TermsCondition,
  TrackingOrder,
} from "./page/index.js";

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
