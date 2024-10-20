import BreadcrumbCom from "@/component_common/BreadcrumbCom";
import EmptyCardError from "@/component_common/EmptyCardError";
import PageTitle from "@/component_common/Helpers/PageTitle";

import ProductsTable from "./ProductsTable";
import { useCartStore } from "@/store/cartStore";
import { NavLink } from "react-router-dom";

export default function CardPage({ cart = true }) {
  const { currentCart } = useCartStore();

  return (
    <>
      {!cart ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Giỏ hàng"
              breadcrumb={[
                { name: "Trang chủ", path: "/" },
                { name: "Giỏ hàng", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" data={currentCart} />
              <div className="w-full sm:flex justify-end">
                <div className="flex space-x-2.5 items-center">
                  <a href="#">
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Tiếp tục mua sắm
                      </span>
                    </div>
                  </a>
                  <NavLink to={"/checkout"}>
                    <div className="w-[140px] h-[50px] bg-qyellow flex justify-center items-center">
                      <span className="text-sm font-semibold">Thanh toán</span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
