import {
  fetchData,
  postData,
  postDataStore,
  uploadImage,
} from "@/api/commonApi";
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
import { ProvinceObject, VoucherObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 1024 * 1024 * 2;
const StoreVoucherCreateDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { currentStore } = useStoreStore();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("KHông để trống tên voucher!"),
    priceApply: Yup.number()
      .required("Không để trống giá!")
      .min(0, "Giá trị tối thiểu là 1")
      .max(10000000, "Giá trị tối đa là 10,000,000VNĐ!"),
    amount: Yup.number()
      .required("Không để trống số lượng!")
      .min(1, "Giá trị tối thiểu là 1")
      .max(1000, "Giá trị tối đa là 100!"),
    percentDecrease: Yup.number()
      .required("Không để trống phần trăm giảm!")
      .min(1, "Giá trị tối thiểu là 1")
      .max(100, "Giá trị tối đa là 100!"),
    beginDate: Yup.string().required("Không để trống ngày bắt đầu!"),
    endDate: Yup.string().required("Không để trống ngày kết thúc!"),
  });

  const handlePost = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postDataStore(body, "/store/voucher/new"),
    onSuccess: (data: VoucherObject) => {
      if (queryClient.getQueryData(["store_vouchers"])) {
        queryClient.setQueryData(
          ["store_vouchers"],
          (oldData: VoucherObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [resultData, ...oldData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "store_vouchers",
        });
      }
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    // setIsLoading(true);
    const body: VoucherObject = {
      ...values,
      storeCode: currentStore?.storeCode,
      voucherType: "store",
    };
    await handlePost.mutateAsync(body);
    // if (values.image != null) {
    //   const url = await uploadImage(values.image, "common");
    //   body.image = url != undefined ? url : "";
    // }
    // await handlePost.mutateAsync(body);
    // setIsLoading(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handlePost.isPending) {
          onClose();
          setTimeout(() => {
            handlePost.reset();
          }, 500);
        }
      }}
    >
      <DialogContent className="sm:max-w-[700px]">
        <Formik
          key={"formCratePaymentType"}
          initialValues={{
            name: "",
            priceApply: 0,
            amount: 0,
            percentDecrease: 0,
            beginDate: new Date(),
            endDate: new Date(),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Hello");
            handleSubmit(values);
          }}
        >
          {({
            setFieldValue,
            handleChange,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Thêm mới loại thanh toán
                </DialogTitle>

                {!handlePost.isSuccess ? (
                  <div className="flex flex-col gap-y-4 px-1">
                    <DialogDescription className="grid grid-cols-2 gap-3">
                      <InputFormikForm
                        label="Tên voucher"
                        name="name"
                        important={true}
                        placeholder="Nhập tên voucher..."
                        disabled={handlePost.isPending}
                      ></InputFormikForm>
                      <NumberFormikForm
                        label="Giá áp dụng"
                        name="priceApply"
                        important={true}
                        unit="VNĐ"
                        placeholder="Nhập giá áp dụng..."
                        disabled={handlePost.isPending}
                      ></NumberFormikForm>
                      <NumberFormikForm
                        label="Số lượng"
                        name="amount"
                        important={true}
                        placeholder="Nhập số lượng..."
                        disabled={handlePost.isPending}
                      ></NumberFormikForm>
                      <NumberFormikForm
                        label="Phần trăm giảm"
                        name="percentDecrease"
                        important={true}
                        placeholder="Nhập phân trăm giảm..."
                        unit="%"
                        disabled={handlePost.isPending}
                      ></NumberFormikForm>
                      <DatePickerFormikForm
                        disabled={handlePost.isPending}
                        important={true}
                        label="Ngày bắt đầu"
                        name="beginDate"
                      ></DatePickerFormikForm>
                      <DatePickerFormikForm
                        disabled={handlePost.isPending}
                        important={true}
                        label="Ngày bắt đầu"
                        name="endDate"
                      ></DatePickerFormikForm>
                    </DialogDescription>
                    <DialogFooter>
                      <div className="flex gap-x-2 justify-end">
                        <ButtonForm
                          type="submit"
                          className="!w-28 !bg-primary"
                          label="Thêm mới"
                          loading={handlePost.isPending}
                          // disabled={false}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-red-500"
                          label="Hủy"
                          disabled={handlePost.isPending}
                          onClick={() => {
                            onClose();
                            setTimeout(() => {
                              handlePost.reset();
                              resetForm();
                            }, 500);
                          }}
                        ></ButtonForm>
                      </div>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="flex flex-col px-1">
                    <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                      <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                      <span className="text-gray-700 text-base">
                        Thêm thành công
                      </span>
                    </DialogDescription>
                    <div className="flex gap-x-2 justify-end">
                      <ButtonForm
                        type="button"
                        className="!w-28 !bg-primary"
                        label="Thêm mới"
                        onClick={() => {
                          handlePost.reset();
                          resetForm();
                        }}
                      ></ButtonForm>
                      <ButtonForm
                        type="button"
                        className="!w-28 !bg-red-500"
                        label="Hủy"
                        onClick={() => {
                          onClose();
                          setTimeout(() => {
                            handlePost.reset();
                            resetForm();
                          }, 500);
                        }}
                      ></ButtonForm>
                    </div>
                  </div>
                )}
              </DialogHeader>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default StoreVoucherCreateDialog;
