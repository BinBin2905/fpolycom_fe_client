import { loginStore } from "@/api/authApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useStoreStore } from "@/store/storeStore";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const HomePage = () => {
  const [openLogin, setOpenLogin] = useState(true);
  const { currentUser, setCurrentUser } = useUserStore();
  const { currentStore, setCurrentStore } = useStoreStore();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Không để trống mật khẩu!")
      .min(6, "Giá trị mặc định là 6 kí tự!"),
  });

  const handleLoginStore = useMutation({
    mutationFn: (body: typeof validationSchema) => loginStore(body),
    onSuccess: (data) => {
      setCurrentStore(data);
      setOpenLogin(false);
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    const body = {
      ...values,
      userLogin: currentUser?.userLogin,
    };
    console.log(body);
    await handleLoginStore.mutateAsync(body);
  };
  return (
    <>
      <Dialog open={openLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đăng nhập cửa hàng</DialogTitle>
          </DialogHeader>
          <div className="">
            <Formik
              key={"formCreateProvince"}
              initialValues={{ password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                handleSubmit(values);
              }}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form
                  id="formLoginStore"
                  className=" flex flex-col gap-y-4 items-center"
                >
                  <InputOTP
                    maxLength={6}
                    value={values.password}
                    onChange={(value) => setFieldValue("password", value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />

                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {errors.password && touched.password && (
                    <span className="error text-xs text-red-500">
                      {errors?.password}
                    </span>
                  )}
                  {handleLoginStore.isError && (
                    <span className="error text-xs text-red-500">
                      {handleLoginStore.error.message}
                    </span>
                  )}
                  <ButtonForm
                    label="Xác nhận"
                    type="submit"
                    className="!bg-black"
                  ></ButtonForm>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
      <div className="text-red-900 h-[200px] flex items-center justify-center pt-80 flex-col gap-y-5">
        <img
          src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/platform.svg"
          alt=""
          className=" w-96 h-96"
        />
        <span className="text-xl">Chào mừng bạn đến với quản trị cửa hàng</span>
      </div>
    </>
  );
};

export default HomePage;
