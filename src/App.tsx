import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import { Toaster, toast } from "sonner";
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
  NewProductPage,
  NewVoucherPage,
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
  OrderDetail,
} from "./page/index.js";
import ConfirmAccountPage from "./page/confirm_account/ConfirmAccountPage.js";
import PasswordRecoverPage from "./page/password_recover/PasswordRecoverPage.js";
import ProductPage from "./page/store_product/ProductPage.js";
import StoreProductCreatePage from "./page/store_product/StoreProductCreatePage.js";
import StoreProductUpdatePage from "./page/store_product/StoreProductUpdatePage.js";
import InfomationRegisterStore from "./page/BecomeSaller/InfomationRegisterStore.js";
import StoreVoucherPage from "./page/store_voucher/StoreVoucherPage.js";
import StoreBannerPage from "./page/store_banner/StoreBannerPage.js";
import PaymentSuccessPage from "./page/CheckoutPage/PaymentSuccessPage.js";
import StoreInformationPage from "./page/store_infomation/StoreInformationPage.js";
import StoreOrderPage from "./page/store_order/StoreOrderPage.js";
import StoreWalletPage from "./page/store_wallet/StoreWalletPage.js";
import InfomationUser from "./page/Infomation_user/InfomationUser.js";
import SearchPage from "./page/serach/SearchPage.js";

function App() {
  const { currentUser } = useUserStore();
  const { currentStore } = useStoreStore();
  console.log(currentUser?.username);
  console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <Toaster closeButton richColors position="bottom-right" expand={true} />
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
                  <StoreProductCreatePage></StoreProductCreatePage>
                )
              }
              path="/store/create_product"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreProductUpdatePage></StoreProductUpdatePage>
                )
              }
              path="/store/update_product/:id"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <ProductPage></ProductPage>
                )
              }
              path="/store/product"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreVoucherPage></StoreVoucherPage>
                )
              }
              path="/store/voucher"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreBannerPage></StoreBannerPage>
                )
              }
              path="/store/banner"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreInformationPage></StoreInformationPage>
                )
              }
              path="/store/infomation"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreOrderPage></StoreOrderPage>
                )
              }
              path="/store/order"
            ></Route>
            <Route
              element={
                !currentStore ? (
                  <Navigate to={"/store"}></Navigate>
                ) : (
                  <StoreWalletPage></StoreWalletPage>
                )
              }
              path="/store/wallet"
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
            <Route
              path="/confirm_account/:token"
              element={
                currentUser ? (
                  <Navigate to={"/"}></Navigate>
                ) : (
                  <ConfirmAccountPage />
                )
              }
            />
            <Route
              path="/recover_password/:token"
              element={
                currentUser ? (
                  <Navigate to={"/"}></Navigate>
                ) : (
                  <PasswordRecoverPage />
                )
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
            <Route path="/cart" element={<CardPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/tracking-order" element={<TrackingOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/payment-success/:orderCode"
              element={<PaymentSuccessPage />}
            />
            {/* <Route path="/password" element={<PasswordTab />} /> */}
            <Route path="/become-saller" element={<BecomeSaller />} />
            <Route
              path="/infomation-store"
              element={
                currentUser?.storeStatus == "pending" ||
                currentUser?.storeStatus == "rejected" ? (
                  <InfomationRegisterStore />
                ) : (
                  <Navigate to={"/store"}></Navigate>
                )
              }
            />
            <Route path="/order-detail/:orderCode" element={<OrderDetail />} />
            <Route path="*" element={<FourZeroFour />} />.
          </Route>
          <Route element={<AppCommonUser />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProductPage />} />
            <Route path="/single-product/:id" element={<SingleProductPage />} />
            <Route path="/flash-sale" element={<FlashSale />} />
            <Route path="/saller-page/:id" element={<SallerPage />} />
            {/* <Route path="/my-Store" element={<MyStore />} /> */}{" "}
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/sallers" element={<Sallers />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/blog" element={<Blog />} />
            <Route path="/search/:keyword" element={<SearchPage />} />
            {/* <Route path="/password" element={<PasswordTab />} /> */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="*" element={<FourZeroFour />} />.
            <Route path="/user/:id" element={<InfomationUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
