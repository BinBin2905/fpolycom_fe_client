import React, { useEffect, useRef, useState } from "react";
import { PayOSConfig, usePayOS } from "payos-checkout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { ButtonForm, SpinnerLoading } from "@/component_common";
import { useCartStore } from "@/store/cartStore";

const PaymentVietQr = ({
  infoPayemnt,
  openPayment,
}: {
  infoPayemnt: any;
  openPayment: any;
}) => {
  const { checkFalseAll } = useCartStore();
  const navigate = useNavigate();
  const [imageQr, setImageQr] = useState(null);
  const componentRef = useRef();
  const [successPay, setSuccessPay] = useState({
    loading: false,
    code: "",
    id: "",
    cancel: false,
    orderCode: 0,
    status: "",
  });
  const genearateQR = useMutation({
    mutationFn: (data: any) =>
      axios.post("https://api.vietqr.io/v2/generate", data, {
        headers: {
          "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
          "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
        },
      }),
  });
  const payOsConfig: PayOSConfig = {
    RETURN_URL: `http://localhost:5173/payment-success/${
      infoPayemnt && infoPayemnt.orderCode ? infoPayemnt.orderCode : ""
    }`, // required
    ELEMENT_ID: "info_vietqr", // required
    CHECKOUT_URL: infoPayemnt?.checkoutUrl, // required
    embedded: false, // Nếu dùng giao diện nhúng
    onSuccess: (event: any) => {
      console.log(event, "event");
      checkFalseAll();
      document.getElementById("appLoginUser")?.scrollTo(0, 0);
      navigate("/payment-success/" + infoPayemnt.orderCode);
    },
    onCancel: (event: any) => {
      // deleteOrder()
      console.log("Payment cancel: ", event);
    },
    onExit: (event: any) => {
      console.log("Payment exit: ", event);
    },
  };
  //   console.log(payOsConfig);
  //   console.log(infoPayemnt.checkoutUrl);
  const { open, exit } = usePayOS(payOsConfig);

  useEffect(() => {
    if (openPayment && infoPayemnt) {
      console.log("helo");
      open();
    }
  }, [openPayment, infoPayemnt]);
  console.log(infoPayemnt, "infopaymen");
  console.log(
    `http://localhost:5173/payment-success/${
      infoPayemnt && infoPayemnt.orderCode ? infoPayemnt.orderCode : ""
    }`
  );
  const handleCancel = async () => {
    await axios
      .post(
        `https://api-merchant.payos.vn/v2/payment-requests/${infoPayemnt.paymentLinkId}/cancel`,
        {
          cancellationReason: "Cancel Payment",
        },
        {
          headers: {
            "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
            "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
          },
        }
      )
      .then((response) => {
        setSuccessPay({
          ...successPay,
          cancel: true,
          status: response.data?.data.status,
        });
        console.log(response);
        exit();
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log(infoPayemnt, "sdfsdfsf");
    const fetchImageQR = async () => {
      try {
        await genearateQR.mutateAsync({
          accountNo: infoPayemnt?.accountNumber,
          accountName: infoPayemnt?.accountName,
          acqId: infoPayemnt?.bin,
          amount: infoPayemnt?.amount,
          addInfo: infoPayemnt?.description,
          format: "text",
          template: "compact",
        });
      } catch (error) {
        return;
      }
    };
    fetchImageQR();
  }, [infoPayemnt]);
  useEffect(() => {
    if (genearateQR.isSuccess && genearateQR.data.data.data) {
      setImageQr(genearateQR?.data.data.data.qrDataURL);
    }
  }, [genearateQR.isSuccess]);

  console.log(genearateQR, "asdasda");
  //   console.log(infoPayemnt.checkoutUrl, "dadasdasdas");
  return (
    <div className="w-full">
      <div className="mb-5">
        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
          Thông tin thanh toán
        </h1>
        <div className="w-full border border-gray-300 py-5 px-2">
          <div id="info_vietqr" hidden></div>
          <div
            className={`grid grid-cols-2 w-[200%] h-full overflow-hidden ${
              successPay.status == "" ? "translate-x-0" : "-translate-x-1/2"
            } transition-transform duration-200`}
          >
            <div className="w-full h-full flex flex-col">
              {genearateQR.isPending ? (
                <div className="flex items-center gap-x-3 justify-center py-5">
                  <SpinnerLoading className="h-10 w-10 fill-qyellow"></SpinnerLoading>{" "}
                  <span className="text-gray-600 italic text-xl">
                    {" "}
                    Đang tải thông tin thanh toán...
                  </span>
                </div>
              ) : (
                <>
                  <h5 className="text-gray-500 italic text-sm ml-10">
                    Vui lòng thanh toán theo thông tin bên dưới!
                  </h5>

                  <div
                    className="w-full flex-auto flex justify-center gap-x-10 px-5 py-5"
                    // ref={componentRef}
                  >
                    <div className="p-1 border rounded-xl flex flex-col items-center">
                      <div className="justify-between flex mb-4">
                        {/* <div className="flex justify-start gap-x-6">
                      <button
                        className="text-gray-dark cursor-pointer text-sm"
                        onClick={handlePrint}
                      >
                        <i class="ri-printer-line text-xl"></i> Print
                      </button>
                      <a
                        download={infoPayemnt?.orderCode}
                        className="text-gray-dark cursor-pointer text-sm"
                        href={imageQr}
                      >
                        <i class="ri-download-2-line text-xl"></i> Lưu ảnh
                      </a>
                      <button
                        className="text-gray-dark cursor-pointer text-sm"
                        // onClick={shareImage}F
                      >
                        <i class="ri-share-forward-line text-gray-dark"></i>{" "}
                        Chia sẻ
                      </button>
                    </div> */}
                      </div>
                      <img
                        src={imageQr ? imageQr : ""}
                        alt=""
                        className="w-auto flex-auto"
                      />
                    </div>

                    <div>
                      <h5 className="text-2xl text-gray-700 italic font-semibold   self-centers mb-5">
                        Thông tin thanh toán
                      </h5>
                      <div className="flex flex-col gap-y-3">
                        <p>
                          <span className="text-gray-600 font-semibold">
                            Tên tài khoản:
                          </span>{" "}
                          {infoPayemnt?.accountName}
                        </p>
                        <p>
                          <span className="text-gray-600 font-semibold">
                            Số tiền:
                          </span>{" "}
                          {infoPayemnt?.amount?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        <p>
                          <span className="text-gray-600 font-semibold">
                            Nội dung chuyển khoản:
                          </span>{" "}
                          {infoPayemnt?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <ButtonForm
                      label={"Hủy thanh toán"}
                      className="!bg-red-500 !w-fit ml-auto px-2 py-2"
                      type="button"
                      onClick={() => handleCancel()}
                    ></ButtonForm>
                  </div>
                </>
              )}
            </div>

            {/* <div className="w-full h-full flex flex-col pt-20">
          <h5 className="text-gray-500 italic mx-auto mb-5 text-2xl">
            {successPay.status == "PAID"
              ? isLoadingNewReceipt
                ? "Đang xử lí thanh toán..."
                : isSuccessNewReceipt
                ? "Thanh toán thành công!"
                : "Thanh toán thành công. Server lỗi cập nhật!"
              : successPay.status == "CANCELLED"
              ? "Đã hủy thanh toán..."
              : "Thanh toán không thành công"}
          </h5>
          <div className="flex justify-center gap-x-5">
            <ButtonForm
              label={"Tiếp tục mua sắm"}
              className="!bg-red-400 !w-fit"
              type="button"
              onClick={() => navigate("/products")}
            ></ButtonForm>
            {successPay.status == "PAID" && (
              <ButtonForm
                label={"Xem thông tin đơn hàng"}
                className="!bg-second !w-fit"
                type="button"
                onClick={() => navigate("/personal?tab=order")}
              ></ButtonForm>
            )}
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVietQr;
