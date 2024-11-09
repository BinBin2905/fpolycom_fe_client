import { loginStore } from "@/api/authApi";
import { ButtonForm } from "@/component_common";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
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
  const { currentStore, setCurrentStore } = useStoreStore();
  const [openLogin, setOpenLogin] = useState(currentStore ? false : true);
  const { currentUser, setCurrentUser } = useUserStore();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Không để trống mật khẩu!"),
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
    console.log("store login before await handleLoginStore: ", body);
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
              {({}) => (
                <Form
                  id="formLoginStore"
                  className=" flex flex-col gap-y-4 items-center"
                >
                  <PasswordFormikForm
                    name="password"
                    placeholder="Nhập mật khẩu..."
                    important={true}
                    // disabled={handlePostProvince.isPending}
                  ></PasswordFormikForm>
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
