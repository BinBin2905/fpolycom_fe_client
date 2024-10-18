import React, { useEffect } from "react";
import Logo from "/assets/images/FpolyComLogoVertical.png";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  changePasswordForgot,
  forgotPassword,
  getUserAccoutByPasswordRecover,
} from "@/api/authApi";
import { ButtonForm, InputFormikForm } from "@/component_common";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";

const PasswordRecoverPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Không để trống mật khẩu!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Xác nhận password không đúng!")
      .required("Không để trống xác nhận pasword!"),
  });
  const handleGetUserAccount = useMutation({
    mutationFn: (body: any) => getUserAccoutByPasswordRecover(body),
    onSuccess: (data, variables) => {
      console.log(data);
    },
  });

  const handlePost = useMutation({
    mutationFn: (body: any) => changePasswordForgot(body),
    onSuccess: (data, variables) => {
      console.log(data);
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    const data = await handlePost.mutateAsync({
      tokenRecover: token,
      passwordNew: values?.password,
    });
  };
  useEffect(() => {
    handleGetUserAccount.mutateAsync({ tokenRecover: token });
  }, [token]);

  useEffect(() => {
    if (handleGetUserAccount.isError) {
      navigate("/login");
    }
  }, [handleGetUserAccount.isError]);

  useEffect(() => {
    if (handlePost.isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [handlePost.isSuccess]);
  return !handleGetUserAccount.isSuccess ? (
    ""
  ) : (
    <div className="h-full w-full flex justify-center pt-10">
      <div className="border border-gray-200 h-96 py-10 px-10 w-80">
        <img src={Logo} alt="" className="h-10 mx-auto mb-5" />
        {handlePost.isSuccess ? (
          <div>
            <h5 className="text-gray-800 font-medium text-center mb-5">
              Đổi mật khẩu thành công!Chuyển trang sau 3 giây...
            </h5>
            <ButtonForm
              label="Đăng nhập"
              type="button"
              onClick={() => navigate("/login")}
            ></ButtonForm>
          </div>
        ) : (
          <div>
            <Formik
              key={"formCreateProvince"}
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("values on user login : ", values);
                handleSubmit(values);
              }}
            >
              {({}) => (
                <Form id="formCreateProduct">
                  <div className="flex flex-col gap-y-3">
                    <PasswordFormikForm
                      label="Mật khẩu mới"
                      name="password"
                      important={true}
                      placeholder="Nhập mật khẩu mới..."
                    ></PasswordFormikForm>
                    <PasswordFormikForm
                      label="Xác nhận mật khẩu"
                      name="confirmPassword"
                      important={true}
                      placeholder="Xác nhận mật khẩu..."
                    ></PasswordFormikForm>
                    <ButtonForm
                      className=""
                      label="Đổi mật khẩu"
                      loading={handlePost.isPending}
                      type="submit"
                    ></ButtonForm>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecoverPage;
