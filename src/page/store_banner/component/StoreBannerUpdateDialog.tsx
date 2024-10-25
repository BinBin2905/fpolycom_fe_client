import {
  fetchData,
  fetchDataCommon,
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
import {
  ProvinceObject,
  StoreBannerObject,
  VoucherObject,
} from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const StoreBannerUpdateDialog = ({
  open = false,
  onClose,
  item = null,
}: {
  open: boolean;
  onClose: () => void;
  item: StoreBannerObject | null;
}) => {
  const { currentStore } = useStoreStore();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    image: Yup.string().required("Không để trống hình ảnh!"),
    title: Yup.string().required("Không để trống tiêu đề!"),
    bannerPosition: Yup.string().required("Không để trống vị trí!"),
    status: Yup.boolean().required("Không để trống trạng thái!"),
    productCode: Yup.number().required("Không để trống sản phẩm!"),
  });
  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    error: errorProducts,
    isSuccess: isSuccessProducts,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      postDataStore(
        { storeCode: currentStore?.storeCode },
        "/store/product/all"
      ),
    enabled: currentStore != null,
  });

  const {
    data: dataBannerPosition,
    isLoading: isLoadingBannerPosition,
    isFetching: isFetchingBannerPosition,
    error: errorBannerPosition,
    isSuccess: isSuccessBannerPosition,
  } = useQuery({
    queryKey: ["banner_position"],
    queryFn: () => fetchDataCommon("/common/banner-position/all"),
  });
  const [initialValues, setInitialValues] = useState<
    StoreBannerObject & { newImage?: File | null }
  >({
    newImage: null,
    storeBannerCode: 0,
    image: "",
    title: "",
    status: true,
    productCode: 0,
    productName: "",
    storeCode: currentStore?.storeCode,
    storeName: "",
    bannerPosition: "",
  });

  const handleUpdate = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postDataStore(body, "/store/banner/update"),
    onSuccess: (data: StoreBannerObject) => {
      if (queryClient.getQueryData(["store_banners"])) {
        queryClient.setQueryData(
          ["store_banners"],
          (oldData: StoreBannerObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [
              resultData,
              ...oldData.filter(
                (item) => item.storeBannerCode != resultData.storeBannerCode
              ),
            ];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "store_banners",
        });
      }
    },
  });

  const handleSubmit = async (
    values: StoreBannerObject & { newImage?: File | null }
  ): Promise<void> => {
    console.log(values, "Vluaes");
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
  const listStatus = [
    { itemKey: true, itemName: "Hoạt động" },
    { itemKey: false, itemName: "Không hoạt động" },
  ];
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handleUpdate.isPending) {
          onClose();
          setTimeout(() => {
            handleUpdate.reset();
          }, 500);
        }
      }}
    >
      <DialogContent className="sm:max-w-[700px]">
        <Formik
          key={"formCratePaymentType"}
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
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle className="mb-5">Thêm mới banner</DialogTitle>

                {!handleUpdate.isSuccess ? (
                  <div className="flex flex-col gap-y-4 px-1">
                    <DialogDescription>
                      <div className="mb-2">
                        <div>
                          <label htmlFor="imageBank" className="mb-1 block">
                            <span className="text-gray-700 font-medium text-sm">
                              Hình ảnh banner
                            </span>
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            className="hidden"
                            id="imageBank"
                            name="image"
                            onChange={(e) => {
                              setFieldValue(
                                "newImage",
                                e.target.files && e.target.files.length > 0
                                  ? e.target.files[0]
                                  : null
                              );
                              setFieldValue(
                                "image",
                                e.target.files && e.target.files.length > 0
                                  ? e.target.files[0].name
                                  : null
                              );
                            }}
                          />
                          <label
                            htmlFor="imageBank"
                            className="h-64 w-full block border border-gray-300 p-4"
                          >
                            <img
                              src={
                                values.newImage
                                  ? URL.createObjectURL(values.newImage)
                                  : values.image
                                  ? values.image
                                  : "https://static.vecteezy.com/system/resources/thumbnails/050/140/627/small/add-image-icon-isolated-vector.jpg"
                              }
                              alt=""
                              className="h-full w-full object-center object-cover"
                            />
                          </label>
                          {errors.image && touched.image && (
                            <span className="text-red-500">
                              Không để trống banner
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputFormikForm
                          label="Tiêu đề banner"
                          name="title"
                          important={true}
                          placeholder="Nhập tiêu đề banner..."
                          disabled={handleUpdate.isPending}
                        ></InputFormikForm>
                        <SelectFormikForm
                          itemKey={"productCode"}
                          itemValue={"name"}
                          label="Sản phẩm liên kết"
                          name="productCode"
                          options={dataProducts ? dataProducts : []}
                          disabled={false}
                          important={true}
                        ></SelectFormikForm>
                        <SelectFormikForm
                          itemKey={"name"}
                          itemValue={"description"}
                          label="Vị trí banner"
                          name="bannerPosition"
                          options={dataBannerPosition ? dataBannerPosition : []}
                          disabled={false}
                          important={true}
                        ></SelectFormikForm>
                        <SelectFormikForm
                          itemKey={"itemKey"}
                          itemValue={"itemName"}
                          label="Trạng thái hoạt động"
                          name="status"
                          options={listStatus ? listStatus : []}
                          disabled={false}
                          important={true}
                        ></SelectFormikForm>{" "}
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                      <div className="flex gap-x-2 justify-end">
                        <ButtonForm
                          type="submit"
                          className="!w-28 !bg-primary"
                          label="Cập nhật"
                          loading={handleUpdate.isPending || isLoading}
                          // disabled={false}
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
                        Cập nhật thành công!
                      </span>
                    </DialogDescription>
                    <div className="flex gap-x-2 justify-end">
                      <ButtonForm
                        type="button"
                        className="!w-28 !bg-primary"
                        label="Thêm mới"
                        onClick={() => {
                          handleUpdate.reset();
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

export default StoreBannerUpdateDialog;
