import {
  fetchDataCommon,
  postData,
  postDataCommon,
  uploadImage,
} from "@/api/commonApi";
import {
  ButtonForm,
  InputFormikForm,
  SelectFormikForm,
} from "@/component_common";
import InputCom from "@/component_common/Helpers/InputCom";
import PageTitle from "@/component_common/Helpers/PageTitle";
import Layout from "@/component_common/Partials/Headers/Layout";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { useUserStore } from "@/store";
import { RegisterObject, RegisterStoreObject } from "@/type/TypeCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { error } from "console";
import { Form, Formik } from "formik";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function BecomeSaller() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser } = useUserStore();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const rememberMe = () => {
    setChecked(!checked);
  };
  const {
    data: dataProvinces,
    isSuccess: isSuccessProvinces,
    isError: isErrorProvinces,
    isFetching: isFetchingProvinces,
  } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => fetchDataCommon("/category/provinces"),
  });

  const fetchDistrict = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/category/districts"),
  });

  const fetchWardCode = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/category/wards"),
  });

  const handlePost = useMutation({
    mutationFn: (body: any) => postData(body, "/user/store/register"),
    onSuccess: (data) => {
      console.log(data, "REgister stores");
      setCurrentUser({
        ...currentUser,
        storeStatus: "pending",
        storeCode: data.storeRegisterCode,
        storeName: data.name,
      });
      navigate("/infomation-store");
    },
  });

  const handleSubmit = async (values: RegisterStoreObject) => {
    setIsLoading(true);
    const body: RegisterStoreObject = { ...values };
    body.userLogin = currentUser?.userLogin ? currentUser.userLogin : "";
    if (body.newBannerImage) {
      const url = await uploadImage(body.newBannerImage, "common");
      body.bannerImage = url ? url : "";
    }

    if (body.newImage) {
      const url = await uploadImage(body.newImage, "common");
      body.image = url ? url : "";
    }

    await Promise.all(
      body.documentList.map(async (item) => {
        if (item.newImage) {
          const url = await uploadImage(item.newImage, "common");
          item.documentUrl = url ? url : "";
        }
      })
    );

    console.log(body);
    await handlePost.mutateAsync(body);
    setIsLoading(false);
  };

  const [initialValue, setInitialValue] = useState<
    RegisterStoreObject & { confirmPassword?: string }
  >({
    userLogin: "",
    confirmPassword: "",
    password: "",
    name: "",
    phone: "",
    addressDetail: "",
    address: "",
    email: "",
    provinceCode: "",
    wardCode: "",
    districtCode: "",
    bannerImage: "",
    documentList: [],
    image: "",
  });
  const validationSchema = Yup.object().shape({
    // userLogin: Yup.string().required("Không để trống tên đăng nhập!"),
    password: Yup.string().required("Không để trống mật khẩu!"),
    name: Yup.string().required("Không để trống tên người dùng!"),
    phone: Yup.string().required("Không để trống số điện thoại!"),
    addressDetail: Yup.string().required("Không để trống địa chỉ cụ thể!"),
    address: Yup.string().required("Không để trống địa chỉ!"),
    email: Yup.string()
      .required("Không để trống email!")
      .email("Email không đúng định dạng!"),
    bannerImage: Yup.string().required("Không để trống hình nền cửa hàng!"),
    image: Yup.string().required("Không để trống hình đại diện cửa hàng!"),
    provinceCode: Yup.string().required("Không để trống tỉnh/thành phố!"),
    wardCode: Yup.string().required("Không để trống thị xã/thị trấn!"),
    districtCode: Yup.string().required("Không để trống Huyện/Phường!"),
    documentList: Yup.array()
      .of(
        Yup.object().shape({
          documentUrl: Yup.string().required("Không để trống tài liệu!"),
        })
      )
      .min(1, "Phải có ít nhất 1 hình ảnh!"),
  });

  const convertAddress = (values: RegisterObject) => {
    let result: string = "";
    if (values.addressDetail) {
      result += values.addressDetail;
    }
    if (values.wardCode && fetchWardCode.data) {
      result =
        result +
        "," +
        fetchWardCode.data.find((item: any) => item.wardCode == values.wardCode)
          .name;
    }
    if (values.districtCode && fetchDistrict.data) {
      result =
        result +
        "," +
        fetchDistrict.data.find(
          (item: any) => item.districtCode == values.districtCode
        ).name;
    }
    if (values.provinceCode && dataProvinces) {
      result =
        result +
        "," +
        dataProvinces.find(
          (item: any) => item.provinceCode == values.provinceCode
        ).name;
    }
    return result;
  };
  return (
    <div className="become-saller-wrapper w-full">
      <div className="title mb-10">
        <PageTitle
          title="Đăng kí cửa hàng"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Đăng kí cửa hàng", path: "/become-saller" },
          ]}
        />
      </div>
      <Formik
        key={"formCreateProvince"}
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        {({ setFieldValue, isValid, values, errors, touched }) => (
          <Form id="formCreateProduct">
            <div className="content-wrapper w-full mb-10">
              <div className="container-x mx-auto">
                <div className="w-full bg-white sm:p-[30px] p-3">
                  <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
                    <div className="xl:w-[824px]">
                      <div className="title w-full mb-4">
                        <h1 className="text-[22px] font-semibold text-qblack mb-1">
                          Thông tin cửa hàng
                        </h1>
                        <p className="text-[15px] text-qgraytwo">
                          Điền đầy đủ thông tin. Chúng tôi sẽ duyệt bạn trở
                          thành cửa hàng!
                        </p>
                      </div>
                      <div className="input-area">
                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                          <InputFormikForm
                            label="Tên cửa hàng"
                            name="name"
                            important={true}
                            placeholder="Nhập tên cửa hàng..."
                          ></InputFormikForm>

                          <InputFormikForm
                            label="Email cửa hàng"
                            name="email"
                            important={true}
                            placeholder="Nhập email cửa hàng..."
                          ></InputFormikForm>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                          <InputFormikForm
                            label="Số điện thoại cửa hàng"
                            name="phone"
                            important={true}
                            placeholder="Nhập số điện thoại cửa hàng..."
                          ></InputFormikForm>
                          <PasswordFormikForm
                            label="Mật khẩu cửa hàng"
                            name="password"
                            important={true}
                            placeholder="Nhập mật khẩu cửa hàng..."
                          ></PasswordFormikForm>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                          <SelectFormikForm
                            label="Tỉnh/Thành phố"
                            itemKey={"provinceCode"}
                            itemValue={"name"}
                            options={dataProvinces ? dataProvinces : []}
                            name="provinceCode"
                            onChange={(item) => {
                              fetchWardCode.reset();
                              fetchDistrict.mutateAsync({
                                provinceCode: item.provinceCode,
                              });
                              setFieldValue("address", convertAddress(values));
                            }}
                            important={true}
                            // disabled={handlePostProvince.isPending}
                          ></SelectFormikForm>
                          <SelectFormikForm
                            label="Phường/Huyện"
                            itemKey={"districtCode"}
                            itemValue={"name"}
                            disabled={!fetchDistrict.data}
                            options={
                              fetchDistrict.data ? fetchDistrict.data : []
                            }
                            name="districtCode"
                            onChange={(e) => {
                              fetchWardCode.mutateAsync({
                                districtCode: e.districtCode,
                              });
                              setFieldValue("address", convertAddress(values));
                            }}
                            important={true}
                            loading={fetchDistrict.isPending}
                          ></SelectFormikForm>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                          <SelectFormikForm
                            label="Thị xã/Thị Trấn"
                            itemKey={"wardCode"}
                            itemValue={"name"}
                            options={
                              fetchWardCode.data && fetchWardCode.isSuccess
                                ? fetchWardCode.data
                                : []
                            }
                            onChange={() => {
                              setFieldValue("address", convertAddress(values));
                            }}
                            disabled={!fetchWardCode.data}
                            name="wardCode"
                            // placeholder="Nhập họ và tên..."
                            important={true}
                            loading={fetchWardCode.isPending}
                          ></SelectFormikForm>
                          <InputFormikForm
                            label="Địa chỉ cụ thể"
                            name="addressDetail"
                            placeholder="Nhập địa chỉ cụ thể..."
                            important={true}
                            onChange={() => {
                              console.log(values.address);
                              setFieldValue("address", convertAddress(values));
                            }}
                          ></InputFormikForm>
                        </div>
                        <InputFormikForm
                          label="Địa chỉ"
                          name="address"
                          placeholder="Nhập địa chỉ..."
                          disabled={true}
                        ></InputFormikForm>
                        <div className="mt-2 mb-1">
                          <label htmlFor="" className="mb-1 block">
                            <span className="text-gray-700 font-medium text-sm">
                              Hình ảnh liên quan
                            </span>{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-x-2">
                            <input
                              type="file"
                              multiple
                              id="multiDocument"
                              onChange={(e) =>
                                setFieldValue(
                                  "documentList",
                                  e.target.files
                                    ? Array.from(e.target.files).map(
                                        (item) => ({
                                          documentUrl: item.name,
                                          documentType: item.type,
                                          documentCode: null,
                                          newImage: item,
                                        })
                                      )
                                    : []
                                )
                              }
                              className="hidden"
                            />
                            {values.documentList.map((item) => {
                              return (
                                <div className="h-28 w-28">
                                  <img
                                    src={
                                      item.newImage
                                        ? URL.createObjectURL(item.newImage)
                                        : ""
                                    }
                                    alt=""
                                    className="h-full w-full object-center object-cover"
                                  />
                                </div>
                              );
                            })}
                            <label
                              htmlFor="multiDocument"
                              className="border border-gray-200 rounded-sm flex items-center justify-center w-28 h-28"
                            >
                              <i className="ri-add-line text-xl text-gray-500"></i>
                            </label>
                          </div>
                          {errors.documentList && touched.documentList && (
                            <span className="text-xs text-red-500">
                              Không để trống thông tin hình ảnh liên quan!
                            </span>
                          )}
                        </div>
                        <div className="remember-checkbox mt-5 flex items-center space-x-2.5">
                          <button
                            onClick={() => {
                              if (isValid) {
                                rememberMe();
                              }
                            }}
                            type="button"
                            className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                          >
                            {checked && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                          <span
                            onClick={() => {
                              if (isValid) {
                                rememberMe();
                              }
                            }}
                            className="text-base text-black"
                          >
                            Tôi đồng ý với các điều khoản
                          </span>
                        </div>
                        <ButtonForm
                          type="submit"
                          disabled={!checked}
                          loading={isLoading}
                          className="!bg-primary mt-2 disabled:!bg-gray-800"
                          label="Đăng kí"
                        ></ButtonForm>
                      </div>
                    </div>
                    <div className="flex-1 mb-10 xl:mb-0">
                      <div className="update-logo w-full mb-9">
                        <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                          Ảnh đại diện cửa hàng
                          <span className="ml-1">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                                fill="#374557"
                                fillOpacity="0.6"
                              />
                            </svg>
                          </span>
                        </h1>
                        <p className="text-sm text-qgraytwo mb-5">
                          Ảnh đại diện có kích thước
                          <span className="ml-1 text-qblack font-semibold">
                            300x300
                          </span>
                          . Kích thước hình ảnh không vượt quá
                          <span className="ml-1 text-qblack font-semibold">
                            5mb
                          </span>
                          .
                        </p>
                        <div className="flex xl:justify-center justify-start">
                          <div className="relative">
                            <img
                              src={
                                values.newImage
                                  ? URL.createObjectURL(values.newImage)
                                  : `/assets/images/edit-logoimg.jpg`
                              }
                              alt=""
                              className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden object-cover"
                            />
                            <input
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
                              type="file"
                              id="imageLogo"
                              className="hidden"
                            />
                            <label
                              htmlFor="imageLogo"
                              className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                  fill="white"
                                />
                                <path
                                  d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                  fill="white"
                                />
                              </svg>
                            </label>
                          </div>
                        </div>
                        {errors.image && touched.image && (
                          <span className="text-red-500 text-xs">
                            {errors.image}
                          </span>
                        )}
                      </div>
                      <div className="update-cover w-full">
                        <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                          Hình nền
                          <span className="ml-1">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                                fill="#374557"
                                fillOpacity="0.6"
                              />
                            </svg>
                          </span>
                        </h1>
                        <p className="text-sm text-qgraytwo mb-5">
                          Kích thước cơ bản
                          <span className="ml-1 text-qblack font-semibold">
                            1170x920
                          </span>
                          .
                        </p>
                        <div className="flex justify-center">
                          <div className="w-full relative">
                            <img
                              src={
                                values.newBannerImage
                                  ? URL.createObjectURL(values.newBannerImage)
                                  : `/assets/images/edit-coverimg.jpg`
                              }
                              alt=""
                              className="w-full h-[120px] rounded-lg overflow-hidden object-cover"
                            />
                            <input
                              onChange={(e) => {
                                setFieldValue(
                                  "newBannerImage",
                                  e.target.files ? e.target.files[0] : null
                                );
                                setFieldValue(
                                  "bannerImage",
                                  e.target.files ? e.target.files[0].name : ""
                                );
                              }}
                              type="file"
                              id="imageCover"
                              className="hidden"
                            />
                            <label
                              htmlFor="imageCover"
                              className="w-[32px] h-[32px] absolute -bottom-2 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                  fill="white"
                                />
                                <path
                                  d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                  fill="white"
                                />
                              </svg>
                            </label>
                          </div>
                        </div>
                        {errors.bannerImage && touched.bannerImage && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.bannerImage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </Form>
        )}
      </Formik>
    </div>
  );
}
