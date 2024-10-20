import { postData } from "@/api/commonApi";
import InputQuantityCom from "@/component_common/Helpers/InputQuantityCom";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/cartStore";
import { CartObject, OrderDetailObject, OrderObject } from "@/type/TypeCommon";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ProductsTable({
  className,
  data,
}: {
  className: string;
  data: CartObject[];
}) {
  const [dataFilter, setDataFilter] = useState<OrderObject[]>([]);
  const { currentCart, checkAllProduct, updateCart } = useCartStore();
  const { currentUser } = useUserStore();

  const handleUpdateCart = useMutation({
    mutationFn: (body: any) => postData(body, "/user/cart/update"),
    onSuccess: (data, variables) => {
      updateCart(data);
      handleUpdateCart.reset();
    },
  });
  const covertData = () => {
    const resultData: OrderObject[] = [];
    data?.map((item) => {
      if (!resultData.find((i) => i.storeCode == item.storeCode)) {
        const result: OrderObject = {
          storeCode: item.storeCode,
          storeName: item.storeName,
          orderDetailList: [
            {
              totalAmount: item.quantity * item.price,
              totalDiscount:
                (item.percentDecrease * item.price * item.quantity) / 100,
              finalTotal:
                item.quantity * item.price -
                (item.percentDecrease * item.price * item.quantity) / 100,
              quantity: item.quantity,
              productDetailCode: item.productDetailCode,
              discountCode: item.discountCode,
              checked: item.checked,
              image: item.image,
              productName: item.productName,
              productDetailName: item.detailName,
              price: item.price,
              percentDecrease: item.percentDecrease,
            },
          ],
        };
        resultData.push(result);
      } else {
        const findCH = resultData.find((i) => i.storeCode == item.storeCode);
        findCH?.orderDetailList.push({
          totalAmount: item.quantity * item.price,
          totalDiscount:
            (item.percentDecrease * item.price * item.quantity) / 100,
          finalTotal:
            item.quantity * item.price -
            (item.percentDecrease * item.price * item.quantity) / 100,
          quantity: item.quantity,
          productDetailCode: item.productDetailCode,
          discountCode: item.discountCode,
          checked: item.checked,
          image: item.image,
          productName: item.productName,
          productDetailName: item.detailName,
          price: item.price,
          percentDecrease: item.percentDecrease,
        });
        if (findCH) {
          setDataFilter([
            ...resultData.filter((i) => item.storeCode != i.storeCode),
            findCH,
          ]);
        }
      }
    });
    setDataFilter(resultData);
    console.log(dataFilter);
  };
  useEffect(() => {
    covertData();
  }, [currentCart]);

  const increment = (item: OrderDetailObject) => {
    handleUpdateCart.mutateAsync({
      userLogin: currentUser?.userLogin,
      productDetailCode: item.productDetailCode,
      quantity: item.quantity + 1,
    });
  };
  const decrement = (item: OrderDetailObject) => {
    handleUpdateCart.mutateAsync({
      userLogin: currentUser?.userLogin,
      productDetailCode: item.productDetailCode,
      quantity: item.quantity == 0 ? 0 : item.quantity - 1,
    });
  };
  const onBlurValue = (item: OrderDetailObject) => {
    handleUpdateCart.mutateAsync({
      userLogin: currentUser?.userLogin,
      productDetailCode: item.productDetailCode,
      quantity: item.quantity,
    });
  };
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto">
        {dataFilter.map((data) => {
          return (
            <table className="w-full text-sm border text-left text-gray-500 dark:text-gray-400 mb-4">
              <tbody>
                {/* table heading */}
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                  <td className="py-4 whitespace-nowrap text-center">
                    <input
                      className="accent-amber-600"
                      id={`ch${data.storeCode}`}
                      type="checkbox"
                      onChange={(e) => {
                        if (data.storeCode) {
                          checkAllProduct(data.storeCode, e.target.checked);
                        }
                      }}
                    />
                  </td>
                  <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                    <label
                      htmlFor={`ch${data.storeCode}`}
                      className="cursor-pointer"
                    >
                      {data.storeName}
                    </label>
                  </td>
                  <td className="py-4 whitespace-nowrap text-center">Giá</td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Số lượng
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Giảm giá
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Tổng tiền
                  </td>
                  <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
                </tr>
                {/* table heading end */}
                {data.orderDetailList?.map((item) => {
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="text-center py-4 px-2">
                        <input
                          className="accent-amber-600"
                          type="checkbox"
                          id={`${item?.productDetailCode}`}
                          checked={item.checked}
                        />
                      </td>
                      <td className="pl-10  py-4  w-[380px]">
                        <label
                          htmlFor={`${item?.productDetailCode}`}
                          className="flex space-x-6 items-center"
                        >
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                            <img
                              src={item.image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.productName} {item.productDetailName}
                            </p>
                          </div>
                        </label>
                      </td>

                      <td className="text-center py-4 px-2">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">
                            {item.price?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className=" py-4">
                        <div className="flex justify-center items-center">
                          <InputQuantityCom
                            item={item}
                            onBlurValue={onBlurValue}
                            increment={increment}
                            disableb={handleUpdateCart.isPending}
                            decrement={decrement}
                          />
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">
                            {item.percentDecrease}%(-
                            {item.totalDiscount?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                            )
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-4">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">
                            {item.finalTotal?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-4">
                        <div className="flex space-x-1 items-center justify-center">
                          <span
                            // onClick={() => removeCart(item)}
                            className="cursor-pointer"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                fill="#AAAAAA"
                              />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}
