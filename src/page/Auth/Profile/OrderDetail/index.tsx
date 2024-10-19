import { useQuery } from "@tanstack/react-query";
import CheckedMark from "./checkedMark";
import { orderDetails } from "@/api/commonApi";
import { useEffect } from "react";
import { SpinnerLoading } from "@/component_common";
import { useParams } from "react-router-dom";

type donHang = {
  code: string;
  status: number;
  timestamp: string;
  errorMessage: string;
  data: {
    orderCode: number;
    userLogin: boolean;
    totalAmount: number;
    totalAmountVoucher: number;
    totalAmountShip: number;
    finalTotal: number;
    orderBillCode: string;
    noteContent: string;
    addressDetail: string;
    address: string;
    shippingFeeCode: number;
    storeCode: string;
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    deliveryTypeCode: string;
    paymentTypeCode: string;
    paymentSuccess: boolean;
    orderDetailList: [];
  };
};

const donHangE: donHang = {
  code: "00",
  status: 2,
  timestamp: "2024-10-18T15:07:33.623938",
  errorMessage: "",
  data: {
    orderCode: 1,
    userLogin: true,
    totalAmount: 60000,
    totalAmountVoucher: 30000,
    totalAmountShip: 80000,
    finalTotal: 50000,
    orderBillCode: "123",
    noteContent: "Content",
    addressDetail: "35 Trai Dai Nghiax kp noi hoa 2 ",
    address: "35 Tran dai nghia",
    shippingFeeCode: 1,
    storeCode: "1",
    provinceCode: "1",
    districtCode: "1",
    wardCode: "1",
    deliveryTypeCode: "1",
    paymentTypeCode: "1",
    paymentSuccess: false,
    orderDetailList: [],
  },
};

export default function OrderDetail() {
  const { orderCode } = useParams();
  console.log(orderCode);
  const orderDetail = useQuery({
    queryKey: ["orderDetail"],
    queryFn: async () => await orderDetails({ orderCode: orderCode }),
  });

  useEffect(() => {
    if (orderDetail.data) {
    }
  }, [orderDetail.data]);

  return (
    <div
      className={`container-x  mx-auto ${
        orderDetail.data ? "" : "relative opacity-40"
      } `}
    >
      <div className=" w-full flex justify-between">
        <span className="py-6 flex-row gap-10 h-auto">
          <h3 className="font-semibold text-qgray text-[20px] mb-3">
            ĐƠN HÀNG
          </h3>
          <h3 className="font-semibold text-qblacktext">
            #{orderDetail.data?.orderCode}
          </h3>
        </span>
        <span className="py-6 flex-row gap-10 h-auto">
          <h3 className="font-semibold text-qgray text-[20px] text-right mb-3">
            Ngày đặt
          </h3>
          <h3 className="font-semibold text-qblacktext text-right">
            #{donHangE.timestamp}
          </h3>
        </span>
      </div>

      <div className="py-[40px] rounded-[10px]">
        <h3 className="font-semibold text-qgray text-[16px] mb-3">
          Trạng thái
        </h3>
        <CheckedMark value={donHangE.status} />
      </div>

      <div className="w-full lg:flex lg:space-x-[30px]">
        <div className="flex-1">
          <h1 className="sm:text-2xl text-xl text-qblack font-semibold mb-5">
            SẢN PHẨM
          </h1>

          <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
            <div className="sub-total mb-6">
              <div className=" flex justify-between mb-5">
                <p className="text-[14px] font-medium text-qblack uppercase">
                  SẢN PHẨM
                </p>
                <p className="text-[14px] font-medium text-qblack uppercase">
                  GIÁ
                </p>
              </div>
              <div className="w-full h-[1px] bg-[#EDEDED]"></div>
            </div>
            <div className="product-list w-full mb-[30px]">
              <ul className="flex flex-col space-y-5">
                <li>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-[15px] text-qblack mb-2.5">
                        Apple Watch
                        <sup className="text-[13px] text-qgray ml-2 mt-2">
                          x1
                        </sup>
                      </h4>
                      <p className="text-[13px] text-qgray">
                        64GB, Black, 44mm, Chain Belt
                      </p>
                    </div>
                    <div>
                      <span className="text-[15px] text-qblack font-medium">
                        $38
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-[15px] text-qblack mb-2.5">
                        Apple Watch
                        <sup className="text-[13px] text-qgray ml-2 mt-2">
                          x1
                        </sup>
                      </h4>
                      <p className="text-[13px] text-qgray">
                        64GB, Black, 44mm, Chain Belt
                      </p>
                    </div>
                    <div>
                      <span className="text-[15px] text-qblack font-medium">
                        $38
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-[15px] text-qblack mb-2.5">
                        Apple Watch
                        <sup className="text-[13px] text-qgray ml-2 mt-2">
                          x1
                        </sup>
                      </h4>
                      <p className="text-[13px] text-qgray">
                        64GB, Black, 44mm, Chain Belt
                      </p>
                    </div>
                    <div>
                      <span className="text-[15px] text-qblack font-medium">
                        $38
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full h-[1px] bg-[#EDEDED]"></div>

            <div className="mt-[30px]">
              <div className=" flex justify-between mb-5">
                <p className="text-[13px] font-medium text-qblack uppercase">
                  THÀNH TIỀN
                </p>
                <p className="text-[15px] font-medium text-qblack uppercase">
                  $365
                </p>
              </div>
            </div>

            <div className="w-full mt-[30px]">
              <div className="sub-total mb-6">
                <div className=" flex justify-between mb-5">
                  <div>
                    <span className="text-xs text-qgraytwo mb-3 block">
                      Phí giao hàng
                    </span>
                    <p className="text-base font-medium text-qblack">
                      Loại giao hàng
                    </p>
                  </div>
                  <p className="text-[15px] font-medium text-qblack">
                    {orderDetail.data?.totalAmountShip}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-[#EDEDED]"></div>
              </div>
            </div>

            <div className="mt-[30px]">
              <div className=" flex justify-between mb-5">
                <p className="text-2xl font-medium text-qblack">
                  Tổng giá trị hóa đơn
                </p>
                <p className="text-2xl font-medium text-qred">
                  {orderDetail.data?.finalTotal}
                </p>
              </div>
            </div>
            <div className="shipping mt-[30px]">
              <ul className="flex flex-col space-y-1">
                <li className=" mb-5">
                  <span className="text-xs text-qgraytwo mb-3 block">
                    Hình thức thanh toán
                  </span>
                  <p className="text-base font-medium text-qblack">
                    {orderDetail.data?.paymentTypeCode}
                  </p>
                </li>
              </ul>
            </div>
            <a href="#">
              <div className="w-full h-[50px] black-btn flex justify-center items-center">
                <span className="text-sm font-semibold">HỦY ĐƠN HÀNG</span>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
            HÓA ĐƠN
          </h1>
          <div>
            <div className="w-full px-10 py-[30px] border border-[#EDEDED] flex-row">
              <div className="flex-1 mb-10">
                <ul className="flex flex-row">
                  <li className="flex-1">
                    <span className="text-xs text-qgraytwo mb-2 block">
                      Người nhận:
                    </span>
                    <p className="text-base font-medium text-qblack">
                      Nguyễn Viết Đức
                    </p>
                  </li>
                  <li className="flex-1">
                    <span className="text-xs text-qgraytwo mb-2 block">
                      Số điện thoại:
                    </span>
                    <p className="text-base font-medium text-qblack">
                      0123 456 789
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex-1 mb-10">
                <ul className="flex flex-row">
                  <li className="flex-1">
                    <span className="text-xs text-qgraytwo mb-2 block">
                      Tỉnh / Thành phố:
                    </span>
                    <p className="text-base font-medium text-qblack">
                      Thành phố Hồ Chí Minh
                    </p>
                  </li>
                  <li className="flex-1">
                    <span className="text-xs text-qgraytwo mb-2 block">
                      Quận / Huyện:
                    </span>
                    <p className="text-base font-medium text-qblack">
                      Bình Thạnh
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex-1">
                <span className="text-xs text-qgraytwo mb-2 block">
                  Địa chỉ chi tiết:
                </span>
                <p className="text-base font-medium text-qblack">
                  {orderDetail.data?.addressDetail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderDetail.data ? (
        <> </>
      ) : (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <SpinnerLoading></SpinnerLoading>
        </div>
      )}
    </div>
  );
}
