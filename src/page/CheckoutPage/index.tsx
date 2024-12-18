import { fetchDataCommon, postData } from "@/api/commonApi";
import InputCom from "@/component_common/Helpers/InputCom";
import PageTitle from "@/component_common/Helpers/PageTitle";
import Layout from "@/component_common/Partials/Headers/Layout";
import ComboboxCustom from "@/component_common/common_form/ComboboxCustom";
import VoucherApply from "@/component_common/voucher/VoucherApply";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/cartStore";
import { OrderObject, VoucherObject, userProfile } from "@/type/TypeCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { UserInfo } from "os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hmacSHA512 from "crypto-js/hmac-sha512";
import CryptoJs from "crypto-js";
import Base64 from "crypto-js/enc-hex";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

import * as Yup from "yup";
import axios from "axios";
import PaymentVietQr from "./PaymentVietQr";
import { ButtonForm } from "@/component_common";

type PaymentTypeObject = {
  paymentTypeCode: number;
  name: string;
  image: string;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [infoVietQR, setInfoVietQR] = useState(null);
  const [successPayment, setSuccessPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentTypeObject | null>(
    null
  );
  const [user, setUser] = useState<userProfile | null>(null);
  const handleFetchUser = useMutation({
    mutationFn: (body: any) => postData(body, "/user/get"),
    onSuccess: (data, variables) => {},
  });
  const handleFetchVoucherUser = useMutation({
    mutationFn: (body: any) => postData(body, "/user/voucher/all"),
    onSuccess: (data, variables) => {},
  });

  const handlePostOrder = useMutation({
    mutationFn: (body: any) => postData(body, "/user/orders/new"),
    onSuccess: (data, variables) => {
      // navigate("/payment-success/" + variables[0].orderBillCode);
      // console.log(body);
    },
  });

  const {
    data: dataPaymentType,
    isSuccess: isSuccessPaymentType,
    isError: isErrorPaymentType,
    isFetching: isFetchingPaymentType,
  } = useQuery({
    queryKey: ["paymentTypes"],
    queryFn: () => fetchDataCommon("/common/payment-type/all"),
  });
  const {
    data: dataShippingFee,
    isSuccess: isSuccessShippingFee,
    isError: isErrorShippingFee,
    isFetching: isFetchingShippingFee,
  } = useQuery({
    queryKey: ["shippingFees"],
    queryFn: () => fetchDataCommon("/common/shipping-fee/all"),
  });

  const {
    data: dataDeliveryType,
    isSuccess: isSuccessDeliveryType,
    isError: isErrorDeliveryType,
    isFetching: isFetchingDeliveryType,
  } = useQuery({
    queryKey: ["deliveryTypes"],
    queryFn: () => fetchDataCommon("/common/delivery-type/all"),
  });
  const validationSchema = Yup.object().shape({
    userLogin: Yup.string().required("Không để trống tên đăng nhập!"),
    password: Yup.string().required("Không để trống mật khẩu!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Xác nhận password không đúng!")
      .required("Không để trống xác nhận pasword!"),
    name: Yup.string().required("Không để trống tên người dùng!"),
    phone: Yup.string().required("Không để trống số điện thoại!"),
    addressDetail: Yup.string().required("Không để trống địa chỉ cụ thể!"),
    address: Yup.string().required("Không để trống địa chỉ!"),
    email: Yup.string()
      .required("Không để trống email!")
      .email("Email không đúng định dạng!"),
    dateOfBirth: Yup.string().required("Không để trống ngày sinh!"),
    gender: Yup.bool().required("Không để trống giới tính!"),
    provinceCode: Yup.string().required("Không để trống tỉnh/thành phố!"),
    wardCode: Yup.string().required("Không để trống thị xã/thị trấn!"),
    districtCode: Yup.string().required("Không để trống Huyện/Phường!"),
  });
  const [initialValue, setInitialValue] = useState<any>({
    userLogin: "",
    confirmPassword: "",
    password: "",
    name: "",
    phone: "",
    addressDetail: "",
    address: "",
    email: "",
    dateOfBirth: "",
    gender: true,
    provinceCode: "",
    wardCode: "",
    districtCode: "",
  });

  const [dataFilter, setDataFilter] = useState<OrderObject[]>([]);
  const { currentCart } = useCartStore();
  const { currentUser } = useUserStore();
  const covertData = () => {
    const resultData: OrderObject[] = [];
    currentCart
      ?.filter((item) => item.checked == true)
      ?.map((item) => {
        if (!resultData.find((i) => i.storeCode == item.storeCode)) {
          const result: OrderObject = {
            storeCode: item.storeCode,
            storeName: item.storeName,
            provinceCode: user ? user.provinceCode : 0,
            deliveryTypeCode: -1,
            districtCode: user ? user.districtCode : 0,
            wardCode: user ? user.districtCode : 0,
            address: user ? user.address : "",
            addressDetail: user ? user.addressDetail : "",
            totalAmountVoucher: 0,
            totalAmount: currentCart
              .filter((i) => i.storeCode == item.storeCode)
              .reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity * currentValue.price;
              }, 0),
            totalAmountDiscount: currentCart
              .filter((i) => i.storeCode == item.storeCode)
              .reduce((accumulator, currentValue) => {
                return (
                  accumulator +
                  (currentValue.quantity *
                    currentValue.price *
                    currentValue.percentDecrease) /
                    100
                );
              }, 0),
            totalAmountShip:
              dataShippingFee && user != null
                ? (user?.provinceCode.toString() == item.provinceCode
                    ? dataShippingFee.find(
                        (item: any) => item?.typeShipping == "inner"
                      )
                    : dataShippingFee.find(
                        (item: any) => item?.typeShipping == "outer"
                      )
                  )?.fee
                : 0,
            shippingFeeCode:
              dataShippingFee && user != null
                ? (user?.provinceCode.toString() == item.provinceCode
                    ? dataShippingFee.find(
                        (item: any) => item?.typeShipping == "inner"
                      )
                    : dataShippingFee.find(
                        (item: any) => item?.typeShipping == "outer"
                      )
                  )?.shippingFeeCode
                : 0,
            finalTotal:
              currentCart
                .filter((i) => i.storeCode == item.storeCode)
                .reduce((accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.quantity * currentValue.price
                  );
                }, 0) -
              currentCart
                .filter((i) => i.storeCode == item.storeCode)
                .reduce((accumulator, currentValue) => {
                  return (
                    accumulator +
                    (currentValue.quantity *
                      currentValue.price *
                      currentValue.percentDecrease) /
                      100
                  );
                }, 0) +
              (dataShippingFee && user
                ? (user?.provinceCode.toString() == item.provinceCode
                    ? dataShippingFee.find(
                        (item: any) => item?.typeShipping == "inner"
                      )
                    : dataShippingFee.find(
                        (item: any) => item?.typeShipping == "outer"
                      )
                  )?.fee
                : 0),
            provinceStoreCode: item.provinceCode,
            voucherList: [],
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
          if (findCH?.orderDetailList) {
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
          }
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

  const handlePayment = async () => {
    if (!paymentType) {
      toast.warning("Thông báo", {
        className: "p-3",
        description: <span>Vui lòng chọn thanh toán!</span>,
      });
    }
    const findItem = dataFilter.find((item) => item.deliveryTypeCode == -1);
    const billOrderCode = new Date(Date.now()).getTime();
    if (findItem) {
      toast.warning("Thông báo", {
        className: "p-3",
        description: (
          <span>
            Chưa chọn loại vận chuyển cho hóa đơn <b>{findItem.storeName}</b>{" "}
          </span>
        ),
      });
      return;
    }
    const body = await dataFilter.map((item) => ({
      ...item,
      paymentTypeCode: paymentType?.paymentTypeCode,
      userLogin: currentUser?.userLogin ? currentUser.userLogin : null,
      orderBillCode: billOrderCode,
      voucherList: item.voucherList
        ? [
            ...item.voucherList.map((i: any) => ({
              voucherCode: i.voucherCode,
            })),
          ]
        : [],
    }));

    console.log(body);
    const data = await handlePostOrder.mutateAsync(body);

    if (infoVietQR == null && data && paymentType?.paymentTypeCode == 1) {
      const body = {
        orderCode: billOrderCode,
        amount: 10000,
        // dataFilter.reduce((accumulator, currentValue) => {
        //   return (
        //     accumulator +
        //     (currentValue.finalTotal ? currentValue.finalTotal : 0)
        //   );
        // }, 0),
        description: "",
        buyerAddress: "số nhà, đường, phường, tỉnh hoặc thành phố",
        items: [],
        cancelUrl: `http://localhost:5173/payment-success/${billOrderCode}`,
        returnUrl: `http://localhost:5173/payment-success/${billOrderCode}`,
        expiredAt: Math.floor(
          (new Date(Date.now()).getTime() + 15 * 60000) / 1000
        ),
        template: "info",
      };
      const query = `amount=${body.amount}&cancelUrl=${body.cancelUrl}&description=${body.description}&orderCode=${body.orderCode}&returnUrl=${body.returnUrl}`;
      const hmac = Base64.stringify(
        CryptoJs.HmacSHA256(
          query,
          "dff2b663051b6bc4d07668b7c4e7a4f7f7365540fb8db84055b26156739a56e6"
        )
      );
      await axios
        .post(
          "https://api-merchant.payos.vn/v2/payment-requests",
          { ...body, signature: hmac },
          {
            headers: {
              "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
              "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
            },
          }
        )
        .then((resp) => {
          setInfoVietQR({ ...resp.data.data });

          return resp.data.data;
        })
        .catch((e) => console.log(e));
    }

    setSuccessPayment(true);
  };

  useEffect(() => {
    const findItem = currentCart.find((item) => item.checked == true);
    if (!findItem) {
      navigate("/cart");
      return;
    }
    if (currentUser) {
      handleFetchUser.mutateAsync({ userLogin: currentUser.userLogin });
      handleFetchVoucherUser.mutateAsync({ userLogin: currentUser.userLogin });
    }
  }, [currentCart]);

  useEffect(() => {
    if (isSuccessShippingFee && user) {
      covertData();
    }
  }, [isSuccessShippingFee, user]);
  useEffect(() => {
    if (handleFetchUser.isSuccess && handleFetchUser.data) {
      setUser(handleFetchUser.data);
    }
  }, [handleFetchUser.isSuccess]);
  console.log(user);
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="w-full mb-5">
        <PageTitle
          title="Thanh toán"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Thanh toán", path: "/checkout" },
          ]}
        />
      </div>
      <div className="checkout-main-content w-full">
        <div className="container-x mx-auto">
          <div className="w-full sm:mb-10 mb-5">
            <div className="sm:flex sm:space-x-[18px]"></div>
          </div>
          <div className="w-full overflow-hidden">
            <div
              className={`grid grid-cols-2 w-[200%] ${
                successPayment ? "-translate-x-1/2" : "translate-x-0"
              }`}
            >
              <div className="w-full">
                <div className="mb-5">
                  <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                    Thông tin đơn hàng
                  </h1>

                  {dataFilter.map((item) => {
                    return (
                      <div className="w-full px-10 py-[30px] border border-[#EDEDED] mb-5">
                        <div className="sub-total mb-6">
                          <div className=" flex justify-between mb-5">
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Hóa đơn: {item.storeName}
                            </p>
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Tạm tính
                            </p>
                          </div>
                          <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        </div>
                        <div className="product-list w-full mb-[30px]">
                          <ul className="flex flex-col space-y-5">
                            {item.orderDetailList.map((item) => {
                              return (
                                <li>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="text-[15px] text-qblack mb-2.5">
                                        {item.productName}
                                        <sup className="text-[13px] text-qgray ml-2 mt-2">
                                          x{item.quantity}
                                        </sup>
                                      </h4>
                                      <p className="text-[13px] text-qgray">
                                        {item.productDetailName}
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <span className="text-[15px] text-qblack font-semibold">
                                        {item.finalTotal?.toLocaleString(
                                          "en-US"
                                        )}{" "}
                                        <span className="font-normal">đ</span>
                                      </span>
                                      <span className="text-[15px] text-gray-500 text-xs font-medium">
                                        ( -
                                        {item.totalDiscount?.toLocaleString(
                                          "en-US",
                                          {
                                            style: "currency",
                                            currency: "VND",
                                          }
                                        )}
                                        )
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                        <div className="mt-[30px]">
                          <div className=" flex justify-between mb-5">
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Tổng tiền
                            </p>
                            <p className="text-[15px] font-medium text-qblack uppercase">
                              {item.totalAmount?.toLocaleString("en-US")}{" "}
                              <span className="font-normal lowercase">đ</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-[10px]">
                          <div className=" flex justify-between mb-5">
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Tổng giảm sản phẩm
                            </p>
                            <p className="text-[15px] font-medium text-qblack uppercase">
                              -
                              {item.totalAmountDiscount?.toLocaleString(
                                "en-US"
                              )}{" "}
                              <span className="font-normal lowercase">đ</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-[10px]">
                          <div className=" flex justify-between mb-5">
                            <div className="flex-auto">
                              <p className="text-[13px] mb-1 font-medium text-qblack uppercase">
                                Mã giảm giá
                              </p>
                              <div className="h-fit grid grid-cols-2 gap-2">
                                {handleFetchVoucherUser.data &&
                                  handleFetchVoucherUser.data.length > 0 &&
                                  handleFetchVoucherUser.data
                                    .filter(
                                      (voucher: any) =>
                                        voucher?.storeCode == item.storeCode
                                    )
                                    .map((i: any) => {
                                      return (
                                        <VoucherApply
                                          // keySelected={}
                                          save={
                                            item.voucherList?.find(
                                              (item: any) =>
                                                item.voucherCode ==
                                                i.voucherCode
                                            )
                                              ? true
                                              : false
                                          }
                                          name={"voucherName"}
                                          priceApply={"priceApply"}
                                          item={i}
                                          percent={"percentDecrease"}
                                          loading={false}
                                          onSave={(i: any) => {
                                            if (
                                              item.totalAmount &&
                                              i.priceApply > item.totalAmount
                                            ) {
                                              toast.warning("Thông báo", {
                                                className: "p-3",
                                                description: (
                                                  <span>
                                                    Không áp dụng với tổng giá
                                                    trị đơn hàng dưới{" "}
                                                    {i.priceApply}
                                                  </span>
                                                ),
                                              });
                                              return;
                                            }
                                            const cloneItem = item;
                                            const findItem =
                                              item.voucherList?.find(
                                                (item) =>
                                                  item.voucherCode ==
                                                  i.voucherCode
                                              );
                                            if (findItem) {
                                              cloneItem.voucherList =
                                                cloneItem.voucherList
                                                  ? cloneItem.voucherList.filter(
                                                      (item) =>
                                                        item.voucherCode !=
                                                        i.voucherCode
                                                    )
                                                  : [];
                                              setDataFilter([
                                                ...dataFilter.map((item) => {
                                                  if (
                                                    item.storeCode ==
                                                    cloneItem.storeCode
                                                  ) {
                                                    return cloneItem;
                                                  } else {
                                                    return item;
                                                  }
                                                }),
                                              ]);
                                            } else {
                                              cloneItem.voucherList = [];
                                              cloneItem.voucherList?.push(i);
                                              if (cloneItem.totalAmount) {
                                                cloneItem.totalAmountVoucher =
                                                  (cloneItem.totalAmount *
                                                    i.percentDecrease) /
                                                  100;
                                                if (cloneItem.finalTotal) {
                                                  cloneItem.finalTotal =
                                                    currentCart
                                                      .filter(
                                                        (i) =>
                                                          i.storeCode ==
                                                          item.storeCode
                                                      )
                                                      .reduce(
                                                        (
                                                          accumulator,
                                                          currentValue
                                                        ) => {
                                                          return (
                                                            accumulator +
                                                            currentValue.quantity *
                                                              currentValue.price
                                                          );
                                                        },
                                                        0
                                                      ) -
                                                    currentCart
                                                      .filter(
                                                        (i) =>
                                                          i.storeCode ==
                                                          item.storeCode
                                                      )
                                                      .reduce(
                                                        (
                                                          accumulator,
                                                          currentValue
                                                        ) => {
                                                          return (
                                                            accumulator +
                                                            (currentValue.quantity *
                                                              currentValue.price *
                                                              currentValue.percentDecrease) /
                                                              100
                                                          );
                                                        },
                                                        0
                                                      ) +
                                                    (dataShippingFee && user
                                                      ? (user?.provinceCode ==
                                                        item.provinceCode
                                                          ? dataShippingFee.find(
                                                              (item: any) =>
                                                                item?.typeShipping ==
                                                                "inner"
                                                            )
                                                          : dataShippingFee.find(
                                                              (item: any) =>
                                                                item?.typeShipping ==
                                                                "outer"
                                                            )
                                                        )?.fee
                                                      : 0) -
                                                    (cloneItem.totalAmount *
                                                      i.percentDecrease) /
                                                      100 +
                                                    (item.totalAmountShip
                                                      ? item.totalAmountShip
                                                      : 0);
                                                }
                                              }
                                              setDataFilter([
                                                ...dataFilter.map((item) => {
                                                  if (
                                                    item.storeCode ==
                                                    cloneItem.storeCode
                                                  ) {
                                                    return cloneItem;
                                                  } else {
                                                    return item;
                                                  }
                                                }),
                                              ]);
                                            }
                                          }}
                                          dateEnd={"endDate"}
                                        ></VoucherApply>
                                      );
                                    })}
                              </div>
                            </div>
                            <p className="text-[15px] font-medium w-56 text-end text-qblack uppercase">
                              {handleFetchVoucherUser.data &&
                              handleFetchVoucherUser.data.length > 0 &&
                              handleFetchVoucherUser.data.find(
                                (i: any) => i.storeCode == item.storeCode
                              )
                                ? "-" +
                                  item.totalAmountVoucher?.toLocaleString(
                                    "en-US"
                                  )
                                : 0}{" "}
                              <span className="font-normal lowercase">đ</span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-[10px]">
                          <div className=" flex justify-between mb-5">
                            <div className="text-[13px] font-medium text-qblack uppercase">
                              <span className="mb-1">
                                {" "}
                                Phí ship (
                                {dataShippingFee && user
                                  ? (user?.provinceCode.toString() ==
                                    item.provinceStoreCode
                                      ? dataShippingFee.find(
                                          (item: any) =>
                                            item?.typeShipping == "inner"
                                        )
                                      : dataShippingFee.find(
                                          (item: any) =>
                                            item?.typeShipping == "outer"
                                        )
                                    )?.typeShipping == "inner"
                                    ? "Nội thành"
                                    : "Ngoại thành"
                                  : ""}
                                )
                              </span>
                              <Select
                                onValueChange={(e) => {
                                  const cloneItem = item;
                                  cloneItem.deliveryTypeCode =
                                    Number.parseInt(e);
                                  if (dataDeliveryType) {
                                    cloneItem.totalAmountShip =
                                      cloneItem.totalAmountShip +
                                      dataDeliveryType.find(
                                        (item: any) =>
                                          item.deliveryTypeCode == e
                                      )?.fee;

                                    if (cloneItem.finalTotal) {
                                      console.log("hello");
                                      cloneItem.finalTotal =
                                        currentCart
                                          .filter(
                                            (i) => i.storeCode == item.storeCode
                                          )
                                          .reduce(
                                            (accumulator, currentValue) => {
                                              return (
                                                accumulator +
                                                currentValue.quantity *
                                                  currentValue.price
                                              );
                                            },
                                            0
                                          ) -
                                        currentCart
                                          .filter(
                                            (i) => i.storeCode == item.storeCode
                                          )
                                          .reduce(
                                            (accumulator, currentValue) => {
                                              return (
                                                accumulator +
                                                (currentValue.quantity *
                                                  currentValue.price *
                                                  currentValue.percentDecrease) /
                                                  100
                                              );
                                            },
                                            0
                                          ) +
                                        (dataShippingFee && user
                                          ? (user?.provinceCode ==
                                            item.provinceCode
                                              ? dataShippingFee.find(
                                                  (item: any) =>
                                                    item?.typeShipping ==
                                                    "inner"
                                                )
                                              : dataShippingFee.find(
                                                  (item: any) =>
                                                    item?.typeShipping ==
                                                    "outer"
                                                )
                                            )?.fee
                                          : 0) -
                                        (item.totalAmountVoucher
                                          ? item.totalAmountVoucher
                                          : 0) +
                                        (cloneItem.totalAmountShip
                                          ? cloneItem.totalAmountShip
                                          : 0) +
                                        dataDeliveryType.find(
                                          (item: any) =>
                                            item.deliveryTypeCode == e
                                        )?.fee;
                                    }
                                  }
                                  setDataFilter([
                                    ...dataFilter.map((item) => {
                                      if (
                                        item.storeCode == cloneItem.storeCode
                                      ) {
                                        return cloneItem;
                                      } else {
                                        return item;
                                      }
                                    }),
                                  ]);
                                }}
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue
                                    placeholder="Loại vận chuyển"
                                    className="text-xs"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Chọn loại vận chuyển
                                    </SelectLabel>
                                    {dataDeliveryType &&
                                      dataDeliveryType?.map((item: any) => {
                                        return (
                                          <SelectItem
                                            value={item?.deliveryTypeCode}
                                          >
                                            {item.name}
                                          </SelectItem>
                                        );
                                      })}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <p className="text-[15px] font-medium text-qblack uppercase">
                              +
                              {item.totalAmountShip &&
                                item.totalAmountShip.toLocaleString(
                                  "en-US"
                                )}{" "}
                              <span className="font-normal lowercase">đ</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-[10px] border-t pt-5">
                          <div className=" flex justify-between mb-5">
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Tổng tiền
                            </p>
                            <p className="text-[15px] font-semibold text-qblack uppercase ">
                              {item.finalTotal
                                ? item.finalTotal.toLocaleString("en-US")
                                : 0}{" "}
                              <span className="font-normal lowercase">đ</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <Textarea
                            placeholder="Nhập ghi chú..."
                            onBlur={(e) => {
                              const cloneItem = item;
                              cloneItem.noteContent = e.target.value;
                              setDataFilter([
                                ...dataFilter.map((item) => {
                                  if (item.storeCode == cloneItem.storeCode) {
                                    return cloneItem;
                                  } else {
                                    return item;
                                  }
                                }),
                              ]);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED] mb-5">
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Tổng tiền
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        {dataFilter
                          .reduce((accumulator, currentValue) => {
                            return (
                              accumulator +
                              (currentValue.finalTotal
                                ? currentValue.finalTotal
                                : 0)
                            );
                          }, 0)
                          .toLocaleString("en-US")}{" "}
                        <span className="font-normal lowercase">đ</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between items-center mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Loại thanh toán
                      </p>
                      <Select
                        onValueChange={(item) =>
                          setPaymentType(
                            dataPaymentType.find(
                              (i: PaymentTypeObject) =>
                                i.paymentTypeCode.toString() == item.toString()
                            )
                          )
                        }
                      >
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Loại thanh toán" />
                        </SelectTrigger>
                        <SelectContent className="w-72">
                          <SelectGroup>
                            {dataPaymentType &&
                              dataPaymentType.map(
                                (item: {
                                  paymentTypeCode: number;
                                  name: string;
                                  image: string;
                                }) => {
                                  return (
                                    <SelectItem
                                      value={item.paymentTypeCode.toString()}
                                    >
                                      <img src="" alt="" /> {item.name}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <div className=" flex gap-x-2 mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Địa chỉ giao hàng:
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {user && user.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:flex justify-end">
                  <div className="flex space-x-2.5 items-center">
                    <NavLink to={"/all-products"}>
                      <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Tiếp tục mua sắm
                        </span>
                      </div>
                    </NavLink>
                    <button onClick={() => handlePayment()}>
                      <div className="w-[140px] h-[50px] bg-qyellow flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Thanh toán
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                {/* <div className="w-full">
              <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-3">
                Hóa đơn
              </h1>
              <div className="form-area border border-gray-200 px-10 py-[30px]">
                <Formik
                  key={"formCreateProvince"}
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values);
                    // handleSubmit(values);
                  }}
                >
                  {({ setFieldValue, isValid, values }) => (
                    <Form id="formCreateProduct">
                      <div className="sm:flex sm:space-x-5 items-center mb-6">
                        <div className="sm:w-1/2  mb-5 sm:mb-0">
                          <InputCom
                            label="First Name*"
                            placeholder="Demo Name"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                        <div className="flex-1">
                          <InputCom
                            label="Last Name*"
                            placeholder="Demo Name"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <InputCom
                            label="Email Address*"
                            placeholder="demoemial@gmail.com"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                        <div className="flex-1">
                          <InputCom
                            label="Phone Number*"
                            placeholder="012 3  *******"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                          Country*
                        </h1>
                        <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                          <span className="text-[13px] text-qgraytwo">
                            Select Country
                          </span>
                          <span>
                            <svg
                              width="11"
                              height="7"
                              viewBox="0 0 11 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                fill="#222222"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className=" mb-6">
                        <div className="w-full">
                          <InputCom
                            label="Address*"
                            placeholder="your address here"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                            Town / City*
                          </h1>
                          <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center">
                            <span className="text-[13px] text-qgraytwo">
                              Miyami Town
                            </span>
                            <span>
                              <svg
                                width="11"
                                height="7"
                                viewBox="0 0 11 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                  fill="#222222"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <InputCom
                            label="Postcode / ZIP*"
                            placeholder=""
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2 items-center mb-10">
                        <div>
                          <input type="checkbox" name="" id="create" />
                        </div>
                        <label
                          htmlFor="create"
                          className="text-qblack text-[15px] select-none"
                        >
                          Create an account?
                        </label>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div> */}
              </div>

              {successPayment &&
                paymentType &&
                paymentType?.paymentTypeCode == 2 && (
                  <div>
                    <h5>Bạn đặt hàng thành công</h5>
                    <div className="flex flex-col items-center justify-end">
                      <div className="flex items-center justify-center gap-x-2 mt-5">
                        <ButtonForm
                          type="button"
                          onClick={() => navigate("/all-products")}
                          className="!bg-qyellow !text-gray-800 px-3 !py-5 font-medium"
                          label="Tiếp tục mua sắm"
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          onClick={() => navigate("/profile#dashboard")}
                          className="!bg-qyellow !text-gray-800 !py-5"
                          label="Xem đơn hàng"
                        ></ButtonForm>
                      </div>
                    </div>
                  </div>
                )}
              {successPayment &&
                paymentType &&
                paymentType?.paymentTypeCode == 1 && (
                  <PaymentVietQr
                    infoPayemnt={infoVietQR}
                    openPayment={true}
                  ></PaymentVietQr>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
