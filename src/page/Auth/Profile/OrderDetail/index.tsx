import { useQuery } from "@tanstack/react-query";
import CheckedMark from "./checkedMark";
import { orderDetails } from "@/api/commonApi";
import { useParams } from "react-router-dom";
import {
  fetchData,
  fetchDataCommon,
  postData,
  postDataStore,
  uploadImage,
} from "@/api/commonApi";
import { SpinnerLoading } from "@/component_common";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import DatePickerFormikForm from "@/component_common/commonForm/DatePickerFormikForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import NumberFormikForm from "@/component_common/commonForm/NumberFormikForm";
import SelectFormikForm from "@/component_common/commonForm/SelectFormikForm";
import TextareaFormikForm from "@/component_common/commonForm/TextareaFormikForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStoreStore } from "@/store";
import {
  OrderDetailObject,
  OrderInfoObject,
  OrderListObject,
  OrderObject,
  ProvinceObject,
  ReceiveDeliveryObject,
  StoreBannerObject,
  VoucherObject,
} from "@/type/TypeCommon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import EvaludateDialog from "./EvaludateDialog";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 1024 * 1024 * 2;
export default function OrderDetail() {
  const { orderCode } = useParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { currentStore } = useStoreStore();
  const [orderDetail, setOrderDetail] = useState<OrderInfoObject | null>(null);
  const [statusReceive, setStatusReceive] = useState<
    ReceiveDeliveryObject | null | undefined
  >(null);
  const [statusDelivery, setStatusDelivery] = useState<
    ReceiveDeliveryObject | null | undefined
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    image: Yup.string().required("Không để trống hình ảnh!"),
    title: Yup.string().required("Không để trống tiêu đề!"),
    bannerPosition: Yup.string().required("Không để trống vị trí!"),
    status: Yup.boolean().required("Không để trống trạng thái!"),
    productCode: Yup.number().required("Không để trống sản phẩm!"),
  });

  const handleUpdateEvaluate = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postData(body, "/user/orders/updateEvaluate"),
    onSuccess: (data: any) => {
      if (orderDetail) {
        setOrderDetail({ ...orderDetail, isEvaluate: true });
      }
    },
  });
  const handleFetchOrder = useMutation({
    mutationFn: (body: number) =>
      postData({ orderCode: body }, "/user/orders/detail"),
    onSuccess: (data: OrderInfoObject) => {
      console.log(data);
      setOrderDetail(data);
      if (data.receiveDeliveryList) {
        setStatusReceive(
          data.receiveDeliveryList
            ? data.receiveDeliveryList?.find(
                (item: any) => item.typeDelivery == "receive"
              )
            : null
        );
        setStatusDelivery(
          data.receiveDeliveryList
            ? data.receiveDeliveryList?.find(
                (item: any) => item.typeDelivery == "delivery"
              )
            : null
        );
      }
    },
  });

  useEffect(() => {
    if (orderCode) {
      handleFetchOrder.mutateAsync(Number.parseInt(orderCode));
    }
  }, [orderCode]);

  return (
    <div
      className={`container-x bg-white border mx-auto ${
        orderDetail ? "" : "relative opacity-40"
      } `}
    >
      <EvaludateDialog
        onUpdateEvalute={() => {
          if (orderDetail && orderDetail.orderCode) {
            handleUpdateEvaluate.mutateAsync({
              orderCode: orderDetail?.orderCode,
            });
          }
        }}
        item={
          orderDetail && orderDetail.orderDetailList
            ? orderDetail?.orderDetailList
            : []
        }
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      ></EvaludateDialog>
      <div className=" w-full flex justify-between">
        <div className="pt-6 flex-row gap-10 h-auto">
          <h3 className="font-semibold text-qgray text-[20px] mb-3">
            ĐƠN HÀNG #{orderDetail?.orderCode}
            <span
              className={`${
                orderDetail?.paymentSuccess ? "text-green-600" : "text-qyellow"
              }`}
            >
              (
              {orderDetail?.paymentSuccess
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
              )
            </span>
          </h3>
        </div>
      </div>

      {handleFetchOrder.isSuccess && orderDetail ? (
        <div className="flex flex-col gap-y-4 px-1">
          <div>
            <div
              className={`flex items-center mb-1 gap-x-2 ${
                orderDetail?.orderStatus == "complete"
                  ? "text-green-500"
                  : "text-yellow-400"
              }`}
            >
              <div
                className={`size-3 rounded-full ${
                  orderDetail?.orderStatus == "complete"
                    ? "bg-green-500"
                    : "bg-yellow-400"
                }`}
              ></div>
              {orderDetail?.orderStatus == "complete" && "Hoàn thành"}
              {orderDetail?.orderStatus == "prepare" &&
                "Cửa hàng đang chuẩn bị hàng"}
              {orderDetail?.orderStatus == "pending" &&
                "Đợi xác nhận từ cửa hàng"}
              {orderDetail?.orderStatus == "pickup" && "Đang lấy hàng"}
            </div>
            <div className="grid grid-cols-2 px-5 py-2 text-gray-700">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 ${
                      orderDetail?.confirmOrder
                        ? "bg-qyellow"
                        : "bg-gray-200 border"
                    } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
                  >
                    {orderDetail?.confirmOrder ? (
                      <i className="ri-check-line text-gray-500"></i>
                    ) : (
                      <i className="ri-store-line text-gray-500"></i>
                    )}
                  </span>
                  <h3 className="font-medium leading-tight mb-1">
                    Xác nhận từ cửa hàng
                  </h3>
                  <p>
                    {orderDetail?.confirmOrder
                      ? "Đã xác nhận đơn hàng"
                      : "Đợi xác nhận đơn hàng"}
                  </p>
                </li>
                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 ${
                      orderDetail?.confirmPrepare
                        ? "bg-qyellow"
                        : "bg-gray-200 border"
                    } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
                  >
                    {orderDetail?.confirmPrepare ? (
                      <i className="ri-check-line text-gray-500"></i>
                    ) : (
                      <i className="ri-instance-line text-gray-500"></i>
                    )}
                  </span>
                  <h3 className="font-medium leading-tight mb-1">
                    Chuẩn bị hàng
                  </h3>
                  <p>
                    {orderDetail?.confirmPrepare
                      ? "Đã chuẩn bị xong đơn hàng"
                      : "Cửa hàng đang soạn hàng"}
                  </p>
                </li>
                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 ${
                      statusReceive?.statusDelivery == "complete"
                        ? "bg-qyellow"
                        : "bg-gray-200 border"
                    } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
                  >
                    {orderDetail.receiveDeliveryList?.find(
                      (item) => item.typeDelivery == "receive"
                    )?.statusDelivery == "complete" ? (
                      <i className="ri-check-line text-gray-500"></i>
                    ) : (
                      <i className="ri-instance-line text-gray-500"></i>
                    )}
                  </span>
                  <div>
                    <h3 className="font-medium leading-tight mb-1">Lấy hàng</h3>
                    <p className="mb-1">
                      {statusReceive && (
                        <span>
                          {statusReceive?.statusDelivery == "taking" &&
                            "Đang lấy hàng"}
                          {statusReceive?.statusDelivery == "appoinment" &&
                            "Lấy hàng bị hoãn"}
                          {statusReceive?.statusDelivery == "complete" &&
                            "Đã lấy hàng"}
                        </span>
                      )}
                    </p>
                    <p className="text-xs">
                      <span>
                        {statusReceive &&
                        statusReceive?.statusDelivery == "complete"
                          ? "Hoàn thành"
                          : "Ước tính"}
                        :{" "}
                      </span>
                      {statusReceive
                        ? statusReceive?.deliveryDate
                        : "Chưa có ngày lấy hàng"}
                    </p>
                  </div>
                </li>
                <li className="ms-6 !border-transparent">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 ${
                      statusDelivery?.statusDelivery == "complete"
                        ? "bg-qyellow"
                        : "bg-gray-200 border"
                    } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
                  >
                    {orderDetail.receiveDeliveryList?.find(
                      (item) => item.typeDelivery == "delivery"
                    )?.statusDelivery == "complete" ? (
                      <i className="ri-check-line text-gray-500"></i>
                    ) : (
                      <i className="ri-instance-line text-gray-500"></i>
                    )}
                  </span>
                  <div>
                    <h3 className="font-medium leading-tight mb-1">
                      Giao hàng
                    </h3>
                    <p className="mb-1">
                      {statusDelivery && (
                        <span>
                          {statusDelivery?.statusDelivery == "taking" &&
                            "Đang giao hàng"}
                          {statusDelivery?.statusDelivery == "appoinment" &&
                            "Giao hàng bị hoãn"}
                          {statusDelivery?.statusDelivery == "complete" &&
                            "Đã giao hàng"}
                        </span>
                      )}
                    </p>
                    <p className="text-xs">
                      <span>
                        {" "}
                        {statusDelivery &&
                        statusDelivery?.statusDelivery == "complete"
                          ? "Hoàn thành"
                          : "Ước tính"}
                        : :{" "}
                      </span>
                      {statusDelivery
                        ? statusDelivery?.deliveryDate
                        : "Chưa có ngày giao hàng hàng"}
                    </p>
                  </div>
                </li>
              </ol>

              <div>
                <h5 className="text-gray-700 font-medium mb-2">
                  Thông tin giao hàng
                </h5>
                <div className="flex flex-col gap-y-3">
                  <div>
                    <span>Ngày đặt hàng: </span>
                    <span>{orderDetail.orderDate}</span>
                  </div>
                  <div>
                    <span>Địa chỉ giao hàng: </span>
                    <span>{orderDetail.address}</span>
                  </div>
                  <div>
                    <span>Ghi chú: </span>
                    <span>{orderDetail.noteContent}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {orderDetail.orderDetailList.map(
                (orderDetailItem: OrderDetailObject) => {
                  return (
                    <div className="flex items-start justify-between border p-3">
                      <div className="flex items-center gap-x-2">
                        <img
                          src={orderDetailItem.image}
                          alt=""
                          className="size-28 object-center object-cover"
                        />
                        <div className="flex flex-col gap-y-1">
                          <h5 className="text-gray-700">
                            {orderDetailItem.productName}{" "}
                            <span className="text-red-500">
                              (Giảm {orderDetailItem.percentDecrease} %)
                            </span>
                          </h5>
                          <span className="text-gray-700 flex items-center">
                            {orderDetailItem.productDetailName}{" "}
                          </span>
                          <span className="text-gray-700 text-xs">
                            Giá:{" "}
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(
                                orderDetailItem.productDetailPrice
                                  ? orderDetailItem.productDetailPrice
                                  : 0
                              )}
                            </span>
                          </span>
                          <span className="text-gray-700 text-xs">
                            Số lượng: <span>{orderDetailItem.quantity}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            orderDetailItem ? orderDetailItem.finalTotal : 0
                          )}
                        </span>
                        <span>
                          ( -
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderDetailItem.totalDiscount)}
                          )
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex flex-col py-2 border-t border-gray-100 gap-2">
              <div className="flex items-center justify-between">
                <span>Tổng tiền tạm tính:</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderDetail?.totalAmount ? orderDetail?.totalAmount : 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tổng tiền giảm giá sản phẩm:</span>
                <span>
                  -
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderDetail?.totalAmountDiscount
                      ? orderDetail?.totalAmountDiscount
                      : 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tổng tiền ship:</span>
                <span>
                  +
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderDetail?.totalAmountShip
                      ? orderDetail?.totalAmountShip
                      : 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tổng tiền voucher giảm:</span>
                <span>
                  -
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderDetail?.totalAmountVoucher
                      ? orderDetail?.totalAmountVoucher
                      : 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span>Tổng tiền:</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderDetail?.finalTotal ? orderDetail?.finalTotal : 0
                  )}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-x-2 justify-end">
              {orderDetail.isEvaluate == null &&
                orderDetail.paymentSuccess &&
                orderDetail.receiveDeliveryList?.length == 2 && (
                  <>
                    <ButtonForm
                      type="button"
                      className="!w-40 !bg-primary"
                      label="Đánh giá sản phẩm"
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    ></ButtonForm>
                  </>
                )}
              {orderDetail.orderStatus == "pending" && (
                <ButtonForm
                  type="submit"
                  className="!w-40 !bg-primary"
                  label="Hủy đơn hàng"
                  // loading={handlePreparedOrder.isPending || isLoading}
                  // onClick={() => {
                  //   if (orderDetail.orderCode) {
                  //     handlePreparedOrder.mutateAsync(
                  //       Number.parseInt(orderDetail.orderCode)
                  //     );
                  //   }
                  // }}
                ></ButtonForm>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-x-3 px-1">
          <SpinnerLoading className="!h-6 !w-6 !fill-primary"></SpinnerLoading>
          <div>
            <span>Đang tải dữ liệu...</span>
          </div>
        </div>
      )}
    </div>
  );
}
