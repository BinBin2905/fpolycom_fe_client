import { fetchData, postData } from "@/api/commonApi";
import ThinBag from "@/component_common/Helpers/icons/ThinBag";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/cartStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { currentUser } = useUserStore();
  const [open, setOpen] = useState<boolean>(false);
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
      <Popover
        open={open}
        onOpenChange={() => {
          if (open) {
            setOpen(false);
          }
        }}
      >
        <PopoverTrigger asChild className="group cart relative cursor-pointer">
          <div onClick={() => setOpen(true)}>
            <i className="ri-shopping-cart-line text-xl text-gray-700"></i>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-1 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow`}
            >
              {currentCart ? currentCart.length : 0}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] px-0 py-0">
          <h5 className="font-semibold text-sm p-3">Giỏ hàng</h5>
          <div>
            <div className="w-full h-full">
              <div className="product-items h-[310px] overflow-y-scroll custom-scrollbar-wider flex flex-col justify-start">
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
                              {item.productName} {item.detailName}
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
                    <NavLink to={"/cart"} onClick={() => setOpen(false)}>
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
        </PopoverContent>
      </Popover>
    </>
  );
}
