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
  const {
    currentCart,
    checkAllProduct,
    updateCart,
    checkFalseItem,
    checkTrueItem,
  } = useCartStore();
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

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    dataFilter.forEach((data) => {
      data.orderDetailList?.forEach((item) => {
        total += item.finalTotal;
      });
    });
    setCartTotal(total); // Cập nhật tổng giá trị giỏ hàng
  }, [dataFilter]);

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
      {dataFilter.map((data) => {
        return (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-gray-500 text-end">
              <thead className="text-[15px] text-gray-700 uppercase bg-gray-100">
                <tr className="h-[60px] text-[14px]">
                  <th scope="col" className="text-center w-[7%]">
                    <input
                      id={`ch${data.storeCode}`}
                      type="checkbox"
                      onChange={(e) => {
                        if (data.storeCode) {
                          checkAllProduct(data.storeCode, e.target.checked);
                        }
                      }}
                    />
                  </th>
                  <th scope="col" className="text-left w-[46%]">
                    <label
                      htmlFor={`ch${data.storeCode}`}
                      className="cursor-pointer"
                    >
                      {data.storeName}
                    </label>
                  </th>
                  <th scope="col" className=" w-[14%] text-center">
                    Số lượng
                  </th>
                  <th scope="col" className=" w-[11%]">
                    Giá
                  </th>
                  <th scope="col" className=" w-[11%]">
                    Thành tiền
                  </th>
                  <th scope="col" className="w-[7%]"></th>
                </tr>
              </thead>
              <tbody>
                {data.orderDetailList?.map((item) => {
                  return (
                    <tr className="bg-white dark:bg-gray-800 border-b-gray-100 border-b-[1px] h-[140px] text-[13px]">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          id={`${item?.productDetailCode}`}
                          checked={item.checked}
                        />
                      </td>

                      <td
                        scope="row"
                        className="font-medium text-gray-900 whitespace-nowrap text-left"
                      >
                        <label
                          htmlFor={`${item?.productDetailCode}`}
                          className="flex space-x-4 items-center"
                        >
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center">
                            <img
                              src={item.image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex flex-col py-1">
                            <p className="font-semibold text-[14px] text-qblack text-wrap">
                              {item.productName}
                            </p>
                            <p className="text-[12px] font-semibold text-qgray">
                              {item.productDetailName}
                            </p>
                          </div>
                        </label>
                      </td>

                      <td>
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

                      <td>
                        <div className="flex-row justify-end">
                          <p className="flex-1 text-[12px] text-qgray font-normal line-through">
                            {`${item.price?.toLocaleString("en-US")}`}
                          </p>
                          <p className="flex-1 text-[15px] font-medium">
                            {`${(
                              item.price -
                              (item.price * item.percentDecrease) / 100
                            ).toLocaleString("en-US")} ₫`}
                          </p>
                        </div>
                      </td>

                      <td>
                        <span className="text-[15px] font-medium">
                          {`${item.finalTotal.toLocaleString("en-US")} ₫`}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center justify-center">
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
                                fill="#ef4444"
                              />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="font-semibold text-gray-900">
                  <td className="px-6 py-3"></td>
                  <th scope="row" className="text-base text-left">
                    Tổng giá trị hóa đơn:
                  </th>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                  <td className="py-10 font-semibold text-[16px]">{`${cartTotal.toLocaleString(
                    "en-US"
                  )} ₫`}</td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
