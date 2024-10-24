import { fetchDataCommon, postData, postDataCommon } from "@/api/commonApi";
import {
  BreadcrumbCustom,
  ButtonForm,
  InputFormikForm,
  SelectFormikForm,
} from "@/component_common";
import NumberFormikForm from "@/component_common/commonForm/NumberFormikForm";
import TextareaFormikForm from "@/component_common/commonForm/TextareaFormikForm";
import { useStoreStore, useUserStore } from "@/store";
import { ProductCreateObject } from "@/type/TypeCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Danh sách sản phẩm",
    itemLink: "/store/product",
  },
  {
    itemName: "Tạo",
    itemLink: "/store/create_product",
  },
];

const StoreProductCreatePage = () => {
  const { currentStore } = useStoreStore();
  const navigate = useNavigate();
  const {
    data: dataTypeGood,
    isLoading: isLoadingTypeGood,
    isFetching: isFetchingTypeGood,
    error: errorTypeGood,
    isSuccess: isSuccessTypeGood,
  } = useQuery({
    queryKey: ["typeGoods"],
    queryFn: () => fetchDataCommon("/common/type-good/all"),
    enabled: currentStore != null,
  });
  const {
    data: dataDiscount,
    isLoading: isLoadingDiscount,
    isFetching: isFetchingDiscount,
    error: errorDiscount,
    isSuccess: isSuccessDiscount,
  } = useQuery({
    queryKey: ["discounts"],
    queryFn: () => fetchDataCommon("/common/discount/all"),
    enabled: currentStore != null,
  });

  const handleFetchProductAttr = useMutation({
    mutationFn: (body: any) =>
      postDataCommon(body, "/common/type-good-attr/all"),
    onSuccess: async (data, variables) => {},
  });
  const handleRegister = useMutation({
    mutationFn: (body: any) => postData(body, "/store/product/new"),
    // onSuccess: (data) => {
    //   // setCurrentUser(data);
    // },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không để trống tên sản  phẩm!"),
    description: Yup.string().required("Không để trống mô tả!"),
    shortDescription: Yup.string().required("Không để trống mô tả ngắn!"),
    image: Yup.string().required("Không để trống hình ảnh!"),
    typeGoodCode: Yup.string().required("Không để trống loại hàng!"),
    productAttrList: Yup.array()
      .of(
        Yup.object({
          attrValue: Yup.string().required(
            "Không để trống giá trị thuộc tính!"
          ),
          typeGoodAttrCode: Yup.string().required("Không để trống thuộc tính!"),
        })
      )
      .min(1, "Không để trống thuộc tính sản phẩm!"),
    productDetailList: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Không để trống tên thuộc tính!"),
          price: Yup.number()
            .min(1000, "Giá tối thiểu 1.000VNĐ")
            .max(10000000, "Giá tối đa 10,000,000VNĐ")
            .required("Không để trống giá chi tiết!"),
          image: Yup.string().required("Không để trống hình ảnh!"),
          quantity: Yup.number()
            .min(1, "Số lượng tối thiểu là 1")
            .max(10000, "Số lượng tối đa là 10,000")
            .required("Không để trống số lượng!"),
          discountCode: Yup.string().required("Không để trống giảm giá!"),
        })
      )
      .min(1, "Không để trống thuộc tính sản phẩm!"),
  });

  const initialValue: ProductCreateObject & { newImage?: File | null } = {
    productCode: null,
    storeCode: currentStore?.storeCode,
    name: "",
    description: "",
    shortDescription: "",
    newImage: null,
    image: "",
    typeGoodCode: 0,
    productAttrList: [],
    productDetailList: [],
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <div className="flex flex-col gap-y-2">
        {/* <Progress value={progress} className="w-[60%]" />
      <Button
        onClick={() => {
          setProgress(50);
        }}
      ></Button> */}
        <div className="mb-3">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        <Formik
          key={"formLogin"}
          initialValues={initialValue}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, handleChange, values, errors, touched }) => (
            <Form id="formCreateProduct">
              {/* Action  */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-end gap-x-2">
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <i className="ri-logout-box-line text-xl"></i>
                  </div>
                  <h4 className="text-xl font-medium text-gray-600">
                    Thêm sản phẩm mới
                  </h4>
                </div>
                <div className="flex gap-x-2 shrink-0">
                  <ButtonForm
                    label="Lưu"
                    type="submit"
                    className="!w-24 bg-green-700"
                  ></ButtonForm>
                </div>
              </div>

              <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
                <div className="flex flex-col gap-y-10">
                  <div>
                    <h5 className="text-xl font-medium text-gray-700 mb-2">
                      Thông tin chung
                    </h5>
                    <div className="grid grid-cols-[1fr_3fr] gap-x-4">
                      <div>
                        <input
                          type="file"
                          id="mainImg"
                          onChange={(e) => {
                            setFieldValue(
                              "newImage",
                              e.target.files ? e.target.files[0] : null
                            );
                            setFieldValue(
                              "image",
                              e.target.files ? e.target.files[0].name : ""
                            );
                          }}
                          className="hidden"
                        />
                        <label htmlFor="mainImg">
                          <img
                            src={
                              values.newImage
                                ? URL.createObjectURL(values.newImage)
                                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                            }
                            alt=""
                            className="h-[450px] w-full object-cover object-center"
                          />
                        </label>
                      </div>
                      <div className="flex gap-y-2 flex-col">
                        <InputFormikForm
                          name="name"
                          label="Tên sản phẩm"
                          placeholder="Nhập tên sản phẩm..."
                          important={true}
                        ></InputFormikForm>{" "}
                        <TextareaFormikForm
                          placeholder="Nhập mô tả ngắn..."
                          name="shortDescription"
                          label="Mô tả ngắn"
                          important={true}
                          row={2}
                        ></TextareaFormikForm>
                        <TextareaFormikForm
                          name="description"
                          label="Mô tả"
                          placeholder="Nhập mô tả..."
                          important={true}
                          row={5}
                        ></TextareaFormikForm>
                        <SelectFormikForm
                          label="Loại hàng"
                          itemKey={"typeGoodCode"}
                          itemValue={"name"}
                          name="typeGoodCode"
                          options={dataTypeGood ? dataTypeGood : []}
                          loading={isFetchingTypeGood}
                          important={true}
                          onChange={async (e) => {
                            const data =
                              await handleFetchProductAttr.mutateAsync({
                                typeGoodCode: e.typeGoodCode,
                              });
                            if (data) {
                              setFieldValue(
                                "productAttrList",
                                data?.map((item: any) => ({
                                  typeGoodAttrCode: item?.typeGoodAttrCode,
                                  attrValue: "",
                                  typeGoodAttrName: item.name,
                                }))
                              );
                            }
                          }}
                        ></SelectFormikForm>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <h5 className="text-xl font-medium text-gray-700 mb-2">
                      Thuộc tính sản phẩm
                    </h5>

                    <div className="grid grid-cols-3 gap-3">
                      {/* {values.pro} */}
                      {values.productAttrList.map((i: any, index: number) => {
                        return (
                          <InputFormikForm
                            label={i.typeGoodAttrName}
                            name={`productAttrList[${index}].attrValue`}
                            placeholder={`Nhập ${i.typeGoodAttrName.toLowerCase()}...`}
                          ></InputFormikForm>
                        );
                      })}{" "}
                    </div>
                  </div>
                  <div className="w-full">
                    <h5 className="text-xl font-medium text-gray-700 mb-2 flex items-center gap-x-2">
                      Biến thể sản phẩm
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setFieldValue("productDetailList", [
                            ...values.productDetailList,
                            {
                              productDetailCode: null,
                              name: "",
                              price: 0,
                              image: "",
                              newImage: null,
                              quantity: 0,
                              discountCode: "1",
                            },
                          ]);
                        }}
                      >
                        <i className="ri-file-add-line"></i>
                      </div>
                    </h5>
                    {errors.productDetailList && touched.productDetailList && (
                      <span className="text-red-500 text-xs">
                        Phải có ít nhất một biến thể!
                      </span>
                    )}
                    {/* {values.pro} */}
                    <div className="grid grid-cols-4 gap-3">
                      {values.productDetailList.map((i: any, index: number) => {
                        return (
                          <div className="border relative flex flex-col gap-x-2 border-gray-300 rounded-md p-3">
                            <div
                              onClick={() => {
                                console.log(index);
                                setFieldValue("productDetailList", [
                                  ...values.productDetailList.filter(
                                    (_, i) => i !== index
                                  ),
                                ]);
                              }}
                              className="cursor-pointer absolute flex items-center justify-center -top-2 -right-2 w-5 h-5 bg-white border border-gray-300 rounded-full text-gray-700"
                            >
                              <i className="ri-close-line"></i>
                            </div>
                            <div className="w-full h-48 shrink-0">
                              <input
                                type="file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "productDetailList",
                                    values.productDetailList.map((j, jndex) => {
                                      if (jndex == index) {
                                        j.newImage = e.target.files
                                          ? e.target.files[0]
                                          : null;
                                        j.image = e.target.files
                                          ? e.target.files[0].name
                                          : "";
                                      }
                                      return j;
                                    })
                                  );
                                }}
                                id={"imageDetail" + index}
                                className="hidden"
                              />
                              <label
                                className="w-full"
                                htmlFor={"imageDetail" + index}
                              >
                                <img
                                  src={
                                    values.productDetailList[index]
                                      .newImage instanceof File
                                      ? URL.createObjectURL(
                                          values.productDetailList[index]
                                            .newImage as File
                                        )
                                      : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                                  }
                                  alt=""
                                  className="w-full h-full object-cover object-center"
                                />
                              </label>
                            </div>
                            <div className="flex-auto">
                              <InputFormikForm
                                label={"Tên biến thể"}
                                name={`productDetailList[${index}].name`}
                                placeholder={`Nhập tên biến thể...`}
                              ></InputFormikForm>

                              <NumberFormikForm
                                label={"Giá biến thể"}
                                name={`productDetailList[${index}].price`}
                                placeholder={`Nhập giá biến thể...`}
                                important={true}
                                disabled={false}
                              ></NumberFormikForm>

                              <NumberFormikForm
                                label={"Số lượng biến thể"}
                                name={`productDetailList[${index}].quantity`}
                                placeholder={`Nhập số lượng biến thể...`}
                                important={true}
                                disabled={false}
                              ></NumberFormikForm>
                              <SelectFormikForm
                                name={`productDetailList[${index}].discountCode`}
                                itemKey={"discountCode"}
                                itemValue={"name"}
                                important={true}
                                label="Giảm giá"
                                options={dataDiscount ? dataDiscount : []}
                                disabled={false}
                              ></SelectFormikForm>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>{" "}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default StoreProductCreatePage;
