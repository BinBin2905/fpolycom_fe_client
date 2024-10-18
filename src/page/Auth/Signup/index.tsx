import { useState } from "react";
import Thumbnail from "../Signup/Thumbnail";
import Layout from "@/component_common/Partials/Headers/Layout";
import InputCom from "@/component_common/Helpers/InputCom";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, userRegister } from "@/api/authApi";
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
import { RegisterObject } from "@/type/TypeCommon";

export default function Signup() {
  const navigate = useNavigate();
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

  const [checked, setChecked] = useState(false);
  const rememberMe = () => {
    setChecked(!checked);
  };

  const [initialValue, setInitialValue] = useState<
    RegisterObject & { confirmPassword?: string }
  >({
    userLogin: "",
    confirmPassword: "",
    password: "",
    name: "",
    phone: "",
    addressDetail: "",
    address: "",
    email: "",
    dateOfBirth: "",
    gender: true,
    provinceCode: "",
    wardCode: "",
    districtCode: "",
  });

  const validationSchema = Yup.object().shape({
    userLogin: Yup.string().required("Không để trống tên đăng nhập!"),
    password: Yup.string().required("Không để trống mật khẩu!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Xác nhận password không đúng!")
      .required("Không để trống xác nhận pasword!"),
    name: Yup.string().required("Không để trống tên người dùng!"),
    phone: Yup.string().required("Không để trống số điện thoại!"),
    addressDetail: Yup.string().required("Không để trống địa chỉ cụ thể!"),
    address: Yup.string().required("Không để trống địa chỉ!"),
    email: Yup.string()
      .required("Không để trống email!")
      .email("Email không đúng định dạng!"),
    dateOfBirth: Yup.string().required("Không để trống ngày sinh!"),
    gender: Yup.bool().required("Không để trống giới tính!"),
    provinceCode: Yup.string().required("Không để trống tỉnh/thành phố!"),
    wardCode: Yup.string().required("Không để trống thị xã/thị trấn!"),
    districtCode: Yup.string().required("Không để trống Huyện/Phường!"),
  });

  const handleRegister = useMutation({
    mutationFn: (body: any) => userRegister(body),
    // onSuccess: (data) => {
    //   // setCurrentUser(data);
    // },
  });

  const convertAddress = (values: RegisterObject) => {
    let result: string = "";
    if (values.addressDetail) {
      result += values.addressDetail;
    }
    if (values.wardCode) {
      result =
        result +
        "," +
        fetchWardCode.data.find((item: any) => item.wardCode == values.wardCode)
          .name;
    }
    if (values.districtCode) {
      result =
        result +
        "," +
        fetchDistrict.data.find(
          (item: any) => item.districtCode == values.districtCode
        ).name;
    }
    if (values.provinceCode) {
      result =
        result +
        "," +
        dataProvinces.find(
          (item: any) => item.provinceCode == values.provinceCode
        ).name;
    }
    return result;
  };

  const handleSubmit = async (values: any) => {
    await handleRegister.mutateAsync(values);
  };
  return (
    <div className="login-page-wrapper w-full mt-10 flex items-center">
      <div className="container-x mx-auto">
        <div className="lg:flex justify-center">
          <div className="lg:w-[1000px] z-20 w-full  bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
            <div className="w-full">
              <Formik
                key={"formCreateProvince"}
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmit(values);
                }}
              >
                {({ setFieldValue, isValid, values }) => (
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
                    <div className="w-full overflow-hidden">
                      <div
                        className={`w-[200%] ${
                          !handleRegister.isSuccess
                            ? "translate-x-0"
                            : "-translate-x-1/2"
                        } transition-transform grid grid-cols-2`}
                      >
                        <div className="input-area flex flex-col gap-y-3">
                          <InputFormikForm
                            label="Tên đăng nhập"
                            name="userLogin"
                            placeholder="Nhập tên đăng nhập..."
                            important={true}
                            // disabled={handlePostProvince.isPending}
                          ></InputFormikForm>
                          <PasswordFormikForm
                            label="Mật khẩu"
                            name="password"
                            placeholder="Nhập mật khẩu..."
                            important={true}
                            // disabled={handlePostProvince.isPending}
                          ></PasswordFormikForm>
                          <PasswordFormikForm
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            placeholder="Nhập xác nhận mật khẩu..."
                            important={true}
                            // disabled={handlePostProvince.isPending}
                          ></PasswordFormikForm>
                          <div className="grid grid-cols-2 gap-x-3">
                            <InputFormikForm
                              label="Họ và tên"
                              name="name"
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
                              name="email"
                              placeholder="Nhập email..."
                              important={true}
                              // disabled={handlePostProvince.isPending}
                            ></InputFormikForm>
                            <InputFormikForm
                              label="Số điện thoại"
                              name="phone"
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
                                setFieldValue(
                                  "address",
                                  convertAddress(values)
                                );
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
                                setFieldValue(
                                  "address",
                                  convertAddress(values)
                                );
                              }}
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
                              onChange={() => {
                                setFieldValue(
                                  "address",
                                  convertAddress(values)
                                );
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
                              placeholder="Nhập số điện thoại..."
                              important={true}
                              onChange={() => {
                                console.log(values.address);
                                setFieldValue(
                                  "address",
                                  convertAddress(values)
                                );
                              }}
                            ></InputFormikForm>
                          </div>

                          <InputFormikForm
                            label="Địa chỉ"
                            name="address"
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
                              onValueChange={(e) => setFieldValue("gender", e)}
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
                          {handleRegister.isError && (
                            <span className="text-red-500 text-xs">
                              {handleRegister.error.message}
                            </span>
                          )}
                          <div className="forgot-password-area mb-2">
                            <div className="remember-checkbox flex items-center space-x-2.5">
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
                          </div>
                          <ButtonForm
                            label="Đăng kí"
                            type="submit"
                            disabled={handleRegister.isPending || !checked}
                            loading={handleRegister.isPending}
                            className="!bg-primary !h-11 mb-3 disabled:!bg-slate-800"
                          ></ButtonForm>
                          <div className="signup-area flex justify-center">
                            <p className="text-base text-qgraytwo font-normal">
                              Đã có tài khoản?
                              <NavLink
                                to={"/login"}
                                className="ml-2 text-qblack"
                              >
                                Đăng nhập
                              </NavLink>
                            </p>
                          </div>
                        </div>
                        <div className="py-56 flex flex-col items-center">
                          <h5 className="text-3xl text-gray-700 mb-5 font-medium text-center">
                            Xác thực tài khoản
                          </h5>
                          <ButtonForm
                            label="Xác thực"
                            type="button"
                            onClick={() => {
                              window.open(
                                "https://mail.google.com/mail/u/0/#inbox",
                                "_blank"
                              );
                              navigate("/login");
                            }}
                            className="!bg-slate-900 !h-11 mb-3"
                          ></ButtonForm>
                        </div>
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
