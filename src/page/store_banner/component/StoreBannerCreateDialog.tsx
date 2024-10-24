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
import React, { useState } from "react";
import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 1024 * 1024 * 2;

const StoreBannerCreateDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { currentStore } = useStoreStore();
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
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    image: Yup.string().required("Không để trống hình ảnh!"),
    title: Yup.string().required("Không để trống tiêu đề!"),
    bannerPosition: Yup.string().required("Không để trống vị trí!"),
    status: Yup.boolean().required("Không để trống trạng thái!"),
    productCode: Yup.number().required("Không để trống sản phẩm!"),
  });

  const handlePost = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postDataStore(body, "/store/banner/new"),
    onSuccess: (data: StoreBannerObject) => {
      if (queryClient.getQueryData(["store_banners"])) {
        queryClient.setQueryData(
          ["store_banners"],
          (oldData: VoucherObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [resultData, ...oldData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "store_banners",
        });
      }
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    setIsLoading(true);
    const body: StoreBannerObject = {
      ...values,
    };
    if (values.newImage != null) {
      const url = await uploadImage(values.newImage, "banner");
      body.image = url != undefined ? url : "";
    }
    console.log(body);
    await handlePost.mutateAsync(body);
    // if (values.image != null) {
    //   const url = await uploadImage(values.image, "common");
    //   body.image = url != undefined ? url : "";
    // }
    // await handlePost.mutateAsync(body);
    setIsLoading(false);
  };
  const listStatus = [
    { itemKey: true, itemName: "Hoạt động" },
    { itemKey: false, itemName: "Không hoạt động" },
  ];
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
            storeCode: currentStore?.storeCode,
            image: "",
            title: "",
            bannerPosition: "",
            status: true,
            productCode: "",
            newImage: null,
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
                <DialogTitle className="mb-5">Thêm mới banner</DialogTitle>

                {!handlePost.isSuccess ? (
                  <div className="flex flex-col gap-y-4 px-1">
                    <DialogDescription>
                      <div>
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
                                  : "https://static.vecteezy.com/system/resources/thumbnails/050/140/627/small/add-image-icon-isolated-vector.jpg"
                              }
                              alt=""
                              className="h-full w-full object-center object-cover"
                            />
                          </label>
                          {errors.image && (
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
                          disabled={handlePost.isPending}
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
                          label="Thêm mới"
                          loading={handlePost.isPending || isLoading}
                          // disabled={false}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-red-500"
                          label="Hủy"
                          disabled={handlePost.isPending || isLoading}
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

export default StoreBannerCreateDialog;
