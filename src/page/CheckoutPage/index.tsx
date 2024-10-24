import { fetchDataCommon, postData } from "@/api/commonApi";
import InputCom from "@/component_common/Helpers/InputCom";
import PageTitle from "@/component_common/Helpers/PageTitle";
import Layout from "@/component_common/Partials/Headers/Layout";
import ComboboxCustom from "@/component_common/common_form/ComboboxCustom";
import { useUserStore } from "@/store";
import { useCartStore } from "@/store/cartStore";
import { OrderObject, userProfile } from "@/type/TypeCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { UserInfo } from "os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userProfile | null>(null);
  const handleFetchUser = useMutation({
    mutationFn: (body: any) => postData(body, "/user/get"),
    onSuccess: (data, variables) => {},
  });
  const handleFetchVoucherUser = useMutation({
    mutationFn: (body: any) => postData(body, "/user/voucher/all"),
    onSuccess: (data, variables) => {},
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
  const [dataFilter, setDataFilter] = useState<OrderObject[]>([]);
  const { currentCart } = useCartStore();
  const { currentUser } = useUserStore();
  const covertData = () => {
    const resultData: OrderObject[] = [];
    currentCart
      ?.filter((item) => item.checked == true)
      .map((item) => {
        if (!resultData.find((i) => i.storeCode == item.storeCode)) {
          const result: OrderObject = {
            storeCode: item.storeCode,
            storeName: item.storeName,
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
              dataShippingFee && user
                ? (user?.provinceCode.toString() == item.provinceCode
                    ? dataShippingFee.find(
                        (item: any) => item?.typeShipping == "inner"
                      )
                    : dataShippingFee.find(
                        (item: any) => item?.typeShipping == "outer"
                      )
                  )?.fee
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
            <div className="sm:flex sm:space-x-[18px] s"></div>
          </div>
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
                                    {item.finalTotal?.toLocaleString("en-US")} <span className="font-normal">đ</span>
                                  </span>
                                  {/* <span className="text-[15px] text-qblack font-medium">
                                    ( -
                                    {item.totalDiscount?.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                    )
                                  </span> */}
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
                          {item.totalAmount?.toLocaleString("en-US")} <span className="font-normal lowercase">đ</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-[10px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Giá trị được giảm
                        </p>
                        <p className="text-[15px] font-medium text-qblack uppercase">
                          -
                          {item.totalAmountDiscount?.toLocaleString("en-US")} <span className="font-normal lowercase">đ</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-[10px]">
                      <div className=" flex justify-between mb-5">
                        <div>
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            Mã giảm giá
                          </p>
                          <div className="h-fit">
                            {handleFetchVoucherUser.data &&
                              handleFetchVoucherUser.data.length > 0 &&
                              handleFetchVoucherUser.data
                                .filter(
                                  (voucher: any) =>
                                    voucher?.storeCode == item.storeCode
                                )
                                .map((i: any) => {
                                  return (
                                    <div
                                      className={`text-xs ${
                                        item.voucherList.find(
                                          (item) =>
                                            item.voucherCode == i?.voucherCode
                                        )
                                          ? "border-red-400"
                                          : "border-gray-200"
                                      } border px-2 py-2`}
                                      onClick={() => {
                                        const itemFind = item;
                                        const findVoucher =
                                          item.voucherList.find(
                                            (j) =>
                                              j.voucherCode == i?.voucherCode
                                          );
                                        if (findVoucher) {
                                          itemFind.voucherList.filter(
                                            (j) =>
                                              j.voucherCode != i?.voucherCode
                                          );
                                        } else {
                                          itemFind.voucherList.push({
                                            voucherCode: i?.voucherCode,
                                          });
                                        }
                                        setDataFilter([...dataFilter]);
                                      }}
                                    >
                                      {i.voucherName}
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                        <p className="text-[15px] font-medium text-qblack uppercase">
                          {handleFetchVoucherUser.data &&
                          handleFetchVoucherUser.data.length > 0 &&
                          handleFetchVoucherUser.data.find(
                            (i: any) => i.storeCode == item.storeCode
                          )
                            ? "-" +
                              item.totalAmountDiscount?.toLocaleString(
                                "en-US"
                              )
                            : 0} <span className="font-normal lowercase">đ</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-[10px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Phí ship (
                          {dataShippingFee && user
                            ? (user?.provinceCode.toString() ==
                              item.provinceStoreCode
                                ? dataShippingFee.find(
                                    (item: any) => item?.typeShipping == "inner"
                                  )
                                : dataShippingFee.find(
                                    (item: any) => item?.typeShipping == "outer"
                                  )
                              )?.typeShipping == "inner"
                              ? "Nội thành"
                              : "Ngoại thành"
                            : ""}
                          )
                        </p>
                        <p className="text-[15px] font-medium text-qblack uppercase">
                          +
                          {item.totalAmountShip &&
                            item.totalAmountShip.toLocaleString("en-US")} <span className="font-normal lowercase">đ</span>
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
                            ? item.finalTotal.toLocaleString("en-US") : 0} <span className="font-normal lowercase">đ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
        </div>
      </div>
    </div>
  );
}
