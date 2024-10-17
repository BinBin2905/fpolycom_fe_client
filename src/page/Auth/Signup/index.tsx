import { useState } from "react";
import Thumbnail from "../Signup/Thumbnail";
import Layout from "@/component_common/Partials/Headers/Layout";
import InputCom from "@/component_common/Helpers/InputCom";
import { NavLink } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "@/api/authApi";
import {
  ButtonForm,
  InputFormikForm,
  SelectFormikForm,
} from "@/component_common";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
import DatePickerFormikForm from "@/component_common/commonForm/DatePickerFormikForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { fetchData, fetchDataCommon, postDataCommon } from "@/api/commonApi";

export default function Signup() {
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

  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Không để trống tên đăng nhập!"),
    password: Yup.string().required("Không để trống mật khẩu!"),
  });

  const handleLoginUser = useMutation({
    mutationFn: (body: typeof validationSchema) => loginUser(body),
    // onSuccess: (data) => {
    //   setCurrentUser(data);
    // },
  });

  const handleSubmit = (values: any) => {};
  return (
    <div className="login-page-wrapper w-full mt-10 flex items-center">
      <div className="container-x mx-auto">
        <div className="lg:flex justify-center">
          <div className="lg:w-[1000px] z-20 w-full  bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
            <div className="w-full">
              <Formik
                key={"formCreateProvince"}
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("values on user login : ", values);
                  handleSubmit(values);
                }}
              >
                {({}) => (
                  <Form id="formCreateProduct">
                    <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                      <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                        Đăng kí
                      </h1>
                      <div className="shape -mt-6">
                        <svg
                          width="354"
                          height="30"
                          viewBox="0 0 354 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                            stroke="#FFBB38"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="input-area flex flex-col gap-y-3">
                      <InputFormikForm
                        label="Tên đăng nhập"
                        name="username"
                        placeholder="Nhập tên đăng nhập..."
                        important={true}
                        // disabled={handlePostProvince.isPending}
                      ></InputFormikForm>
                      <PasswordFormikForm
                        label="Mật khẩu"
                        name="username"
                        placeholder="Nhập tên đăng nhập..."
                        important={true}
                        // disabled={handlePostProvince.isPending}
                      ></PasswordFormikForm>
                      <PasswordFormikForm
                        label="Xác nhận mật khẩu"
                        name="username"
                        placeholder="Nhập tên đăng nhập..."
                        important={true}
                        // disabled={handlePostProvince.isPending}
                      ></PasswordFormikForm>
                      <div className="grid grid-cols-2 gap-x-3">
                        <InputFormikForm
                          label="Họ và tên"
                          name="username"
                          placeholder="Nhập họ và tên..."
                          important={true}
                          // disabled={handlePostProvince.isPending}
                        ></InputFormikForm>
                        <DatePickerFormikForm
                          label="Ngày sinh"
                          important={true}
                          disabled={false}
                          name="dateOfBirth"
                        ></DatePickerFormikForm>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3">
                        <InputFormikForm
                          label="Email"
                          name="username"
                          placeholder="Nhập họ và tên..."
                          important={true}
                          // disabled={handlePostProvince.isPending}
                        ></InputFormikForm>
                        <InputFormikForm
                          label="Số điện thoại"
                          name="username"
                          placeholder="Nhập số điện thoại..."
                          important={true}
                          // disabled={handlePostProvince.isPending}
                        ></InputFormikForm>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3">
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
                          }}
                          important={true}
                          // disabled={handlePostProvince.isPending}
                        ></SelectFormikForm>
                        <SelectFormikForm
                          label="Phường/Huyện"
                          itemKey={"districtCode"}
                          itemValue={"name"}
                          options={fetchDistrict.data ? fetchDistrict.data : []}
                          name="districtCode"
                          onChange={(e) =>
                            fetchWardCode.mutateAsync({
                              districtCode: e.districtCode,
                            })
                          }
                          important={true}
                          loading={fetchDistrict.isPending}
                        ></SelectFormikForm>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3">
                        <SelectFormikForm
                          label="Thị xã/Thị Trấn"
                          itemKey={"wardCode"}
                          itemValue={"name"}
                          options={
                            fetchWardCode.data && fetchWardCode.isSuccess
                              ? fetchWardCode.data
                              : []
                          }
                          name="wardCode"
                          // placeholder="Nhập họ và tên..."
                          important={true}
                          loading={fetchWardCode.isPending}
                        ></SelectFormikForm>
                        <InputFormikForm
                          label="Địa chỉ cụ thể"
                          name="username"
                          placeholder="Nhập số điện thoại..."
                          important={true}
                          // disabled={handlePostProvince.isPending}
                        ></InputFormikForm>
                      </div>
                      <InputFormikForm
                        label="Địa chỉ"
                        name="username"
                        placeholder="Nhập địa chỉ..."
                        disabled={true}
                      ></InputFormikForm>
                      <div>
                        <label htmlFor="" className="mb-2 block">
                          <span className="text-gray-600 text-sm font-semibold">
                            Giới tính
                          </span>
                        </label>
                        <RadioGroup
                          defaultValue="true"
                          className="flex gap-x-5"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="r1" />
                            <Label htmlFor="r1">Nam</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">Nữ</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="forgot-password-area mb-2">
                        <div className="remember-checkbox flex items-center space-x-2.5">
                          <button
                            onClick={rememberMe}
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
                            onClick={rememberMe}
                            className="text-base text-black"
                          >
                            Tôi đồng ý với các điều khoản
                          </span>
                        </div>
                      </div>
                      <ButtonForm
                        label="Đăng kí"
                        type="submit"
                        disabled={handleLoginUser.isPending}
                        loading={handleLoginUser.isPending}
                        className="!bg-slate-900 !h-11 mb-3"
                      ></ButtonForm>
                      <div className="signup-area flex justify-center">
                        <p className="text-base text-qgraytwo font-normal">
                          Đã có tài khoản?
                          <NavLink to={"/login"} className="ml-2 text-qblack">
                            Đăng nhập
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* <div
            className="absolute top-0 right-0"
            style={{ top: "calc(50% - 258px)" }}
          >
            <Thumbnail />
          </div> */}
        </div>
      </div>
    </div>
  );
}
