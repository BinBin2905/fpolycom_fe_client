import { fetchData, postData } from "@/api/commonApi";
import ThinBag from "@/component_common/Helpers/icons/ThinBag";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/cartStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Cart({
  className,
  type,
}: {
  className?: string;
  type?: any;
}) {
  const { currentUser } = useUserStore();
  const { currentCart, setCart } = useCartStore();
  const handleFetchCart = useMutation({
    mutationFn: (body: any) => postData(body, "/user/cart/all"),
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await handleFetchCart.mutateAsync({ userLogin: currentUser?.userLogin });
    };
    if (currentUser != null) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (handleFetchCart.isSuccess && handleFetchCart.data) {
      setCart(handleFetchCart.data);
    }
  }, [handleFetchCart.isSuccess]);
  console.log(handleFetchCart.data);
  return (
    <>
      <div className="cart relative cursor-pointer">
        <a href="/cart">
          <span>
            <ThinBag />
          </span>
        </a>
        <span
          className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow
                      `}
        >
          {currentCart ? currentCart.length : 0}
        </span>
      </div>
      <div
        style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`w-[400px] bg-white border-t-[3px] ${
          type === 3 ? "border-qh3-blue" : "cart-wrappwer"
        }  absolute -right-[45px] top-10 z-50 hidden group-hover:block`}
      >
        <div className="w-full h-full">
          <div className="product-items h-[310px] py-5 overflow-y-scroll flex flex-col justify-start">
            {currentCart.length > 0 ? (
              currentCart.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={`/single-product/${item.productCode}`}
                    className="w-full h-fit flex border-b border-gray-100"
                  >
                    <div
                      key={item.productCode || index}
                      className="flex space-x-[6px] justify-center items-center px-4 my-[20px]"
                    >
                      <div className="w-[65px]  h-[40px] flex-shrink">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 h-fit flex flex-col justify-center ">
                        <p className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                          iPhone 12 Pro Max 128GB Golen colour
                        </p>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className="h-full flex justify-center">
                Không có sản phẩm trong giỏ hàng...
              </div>
            )}
          </div>
          <div className="w-full px-4 mt-[20px] mb-[12px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="product-actions px-4">
            <div className="product-action-btn">
              {currentCart.length > 0 ? (
                <NavLink to={"/cart"}>
                  <div className="gray-btn !bg-qyellow w-full h-[50px] mb-[10px] ">
                    <span>Xem giỏ hàng</span>
                  </div>
                </NavLink>
              ) : (
                <NavLink to={"/cart"}>
                  <div className="gray-btn !bg-qyellow w-full h-[50px] mb-[10px] ">
                    <span>Mua sắm</span>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
          <div className="w-full px-4 mt-[20px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="flex justify-center py-[15px]">
            <p className="text-[13px] font-500 text-qgray">
              Sản phẩm được hoàn trả trong{" "}
              <span className="text-qblack">30 ngày</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
