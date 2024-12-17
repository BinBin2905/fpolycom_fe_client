import { fetchDataCommon, postDataCommon } from "@/api/commonApi";
import { ButtonForm, SpinnerLoading } from "@/component_common";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cartStore";
import { OrderObject } from "@/type/TypeCommon";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FriendGiftDialog from "./component/FriendGiftDialog";

const PaymentSuccessPage = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { orderCode } = useParams();
  const navigate = useNavigate();
  const [dataFilter, setDataFilter] = useState<
    (OrderObject & { gift?: boolean })[]
  >([]);
  const hanldeFetchConfirm = useMutation({
    mutationFn: (body: any) =>
      postDataCommon({}, "/order-confirm/" + orderCode),
    onSuccess: (data: OrderObject[]) => {
      setDataFilter([...data]);
    },
    onError: () => {
      // navigate("/");
    },
  });
  const { checkFalseAll } = useCartStore();
  useEffect(() => {
    if (orderCode) {
      hanldeFetchConfirm.mutateAsync(orderCode);
    }
  }, [orderCode]);
  console.log(dataFilter);
  return hanldeFetchConfirm.isPending ? (
    <div className="flex items-center justify-center h-[500px]">
      <SpinnerLoading className="h-10 w-10 fill-qyellow"></SpinnerLoading> Đang
      load đơn hàng
    </div>
  ) : (
    <div className="container-x mx-auto">
      <FriendGiftDialog
        onGift={(code: string) => {
          const dataFind = dataFilter.find((item) => item.orderCode == code);
          if (dataFind) dataFind.gift = true;
          setOpenDialog(false);
        }}
        item={selected}
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      ></FriendGiftDialog>
      <div className="w-full">
        <div className="mb-5">
          <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-1">
            Thanh toán đơn hàng thành công
          </h1>
          <p className="mb-5 font-light">
            Cám ơn bạn đã sử dụng dịch vụ của chúng tôi!
          </p>

          {dataFilter.map((item) => {
            return (
              <div className="w-full px-10 py-[30px] border border-[#EDEDED] mb-5">
                <div className="sub-total mb-6">
                  <div className=" flex justify-between mb-5">
                    <p className="text-[13px] font-medium text-qblack uppercase">
                      Hóa đơn: #{item.orderCode}
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
                                {item.finalTotal?.toLocaleString("en-US")}{" "}
                                <span className="font-normal">đ</span>
                              </span>
                              <span className="text-[15px] text-gray-500 text-xs font-medium">
                                ( -
                                {item.totalDiscount?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "VND",
                                })}
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
                      -{item.totalAmountDiscount?.toLocaleString("en-US")}{" "}
                      <span className="font-normal lowercase">đ</span>
                    </p>
                  </div>
                </div>

                <div className="mt-[10px]">
                  <div className=" flex justify-between mb-5">
                    <div className="text-[13px] font-medium text-qblack uppercase">
                      <span className="mb-1"> Phí ship</span>
                    </div>
                    <p className="text-[15px] font-medium text-qblack uppercase">
                      +
                      {item.totalAmountShip &&
                        item.totalAmountShip.toLocaleString("en-US")}{" "}
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
                <div>
                  {!item.gift && (
                    <ButtonForm
                      type="button"
                      label="Tặng quà"
                      onClick={() => {
                        if (item.orderCode) {
                          setSelected(item.orderCode);
                          setOpenDialog(true);
                        }
                      }}
                      className="bg-yellow-500"
                    ></ButtonForm>
                  )}
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
                      (currentValue.finalTotal ? currentValue.finalTotal : 0)
                    );
                  }, 0)
                  .toLocaleString("en-US")}{" "}
                <span className="font-normal lowercase">đ</span>
              </p>
            </div>
          </div>
          <div className="mt-[30px]">
            <div className=" flex justify-between mb-5">
              <p className="text-[13px] font-medium text-qblack uppercase">
                Loại thanh toán
              </p>
              <p className="text-[15px] font-medium text-qblack uppercase">
                Thanh toán bằng mã QR
              </p>
            </div>
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
  );
};

export default PaymentSuccessPage;
