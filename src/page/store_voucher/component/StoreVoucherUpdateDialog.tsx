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
import { ProvinceObject, VoucherObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
const StoreVoucherUpdateDialog = ({
  open = false,
  onClose,
  item = null,
}: {
  open: boolean;
  onClose: () => void;
  item: VoucherObject | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không để trống tên loại thanh toán!"),
    image: Yup.string().required("Không để trống hình ảnh!"),
  });

  const [initialValues, setInitialValues] = useState<VoucherObject>({
    name: "",
    priceApply: 0,
    amount: 0,
    percentDecrease: 0,
    beginDate: new Date().toString(),
    endDate: new Date().toString(),
    storeCode: 0,
    voucherType: "",
    voucherCode: 0,
  });

  const handleUpdate = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postDataStore(body, "/store/voucher/update"),
    onSuccess: (data: VoucherObject) => {
      if (queryClient.getQueryData(["store_vouchers"])) {
        queryClient.setQueryData(
          ["paymentTypes"],
          (oldData: VoucherObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [
              resultData,
              ...oldData.filter(
                (item) => item.voucherCode != resultData.voucherCode
              ),
            ];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "paymentTypes",
        });
      }
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    setIsLoading(true);
    const body = {
      ...values,
    };
    console.log(body);
    if (values.newImage != null) {
      const url = await uploadImage(values.newImage, "common");
      body.image = url;
    }
    console.log(body.image);
    await handleUpdate.mutateAsync(body);
    setIsLoading(false);
  };

  useEffect(() => {
    if (open == true && item) {
      setInitialValues({
        ...item,
      });
    }
  }, [item, open]);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handleUpdate.isPending && !isLoading) {
          onClose();
          setTimeout(() => {
            handleUpdate.reset();
          }, 500);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <Formik
          key={"formUpdateDistrict"}
          initialValues={initialValues}
          enableReinitialize={true}
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
            <Form>
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Cập nhật loại thanh toán
                </DialogTitle>
                {!handleUpdate.isSuccess ? (
                  <div className="flex flex-col gap-y-4 px-1">
                    <DialogDescription className="flex flex-col gap-y-3">
                      <InputFormikForm
                        label="Tên voucher"
                        name="name"
                        important={true}
                        placeholder="Nhập tên voucher..."
                        disabled={true}
                      ></InputFormikForm>
                      <NumberFormikForm
                        label="Giá áp dụng"
                        name="priceApply"
                        important={true}
                        unit="VNĐ"
                        placeholder="Nhập giá áp dụng..."
                        disabled={true}
                      ></NumberFormikForm>
                      <NumberFormikForm
                        label="Số lượng"
                        name="amount"
                        important={true}
                        placeholder="Nhập số lượng..."
                        disabled={handleUpdate.isPending}
                      ></NumberFormikForm>
                      <NumberFormikForm
                        label="Phần trăm giảm"
                        name="percentDecrease"
                        important={true}
                        placeholder="Nhập phân trăm giảm..."
                        unit="%"
                        disabled={true}
                      ></NumberFormikForm>
                      <DatePickerFormikForm
                        disabled={handleUpdate.isPending}
                        important={true}
                        label="Ngày bắt đầu"
                        name="beginDate"
                      ></DatePickerFormikForm>
                      <DatePickerFormikForm
                        disabled={handleUpdate.isPending}
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
                          label="Cập nhật"
                          // disabled={false}
                          loading={handleUpdate.isPending || isLoading}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-red-500"
                          label="Hủy"
                          disabled={handleUpdate.isPending || isLoading}
                          onClick={() => {
                            onClose();
                            setTimeout(() => {
                              handleUpdate.reset();
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
                        Cập nhật thành công
                      </span>
                    </DialogDescription>
                    <div className="flex gap-x-2 justify-end">
                      <ButtonForm
                        type="button"
                        className="!w-28 !bg-red-500"
                        label="Hủy"
                        onClick={() => {
                          onClose();
                          setTimeout(() => {
                            handleUpdate.reset();
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
export default StoreVoucherUpdateDialog;
