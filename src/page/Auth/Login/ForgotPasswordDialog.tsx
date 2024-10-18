import { forgotPassword, loginUser } from "@/api/authApi";
import { ButtonForm, InputFormikForm } from "@/component_common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ForgotPasswordDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Không để trống email!"),
  });
  const handlePost = useMutation({
    mutationFn: (body: any) => forgotPassword(body),
    onSuccess: (data, variables) => {
      console.log(data);
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    const data = await handlePost.mutateAsync(values);
  };
  useEffect(() => {
    if (handlePost.isSuccess) {
    }
  }, [handlePost.isSuccess]);
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
      <DialogContent className="sm:max-w-[425px]">
        <Formik
          key={"formCreateProvince"}
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("values on user login : ", values);
            handleSubmit(values);
          }}
        >
          {({}) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle>Quên mật khẩu</DialogTitle>
                <DialogDescription>
                  Vui lòng nhập địa chỉ email để khôi phục mật khẩu!
                </DialogDescription>
              </DialogHeader>
              {handlePost.isSuccess ? (
                <>
                  <div className="grid gap-4 py-4">
                    <h5 className="text-center font-semibold text-gray-700">
                      Đã gửi liên kết reset mật khẩu!
                    </h5>
                  </div>
                  <DialogFooter>
                    <ButtonForm
                      label="Đi đến mail"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://mail.google.com/mail/u/0/#inbox",
                          "_blank"
                        );
                      }}
                      className="!w-fit px-4"
                    ></ButtonForm>
                    <ButtonForm
                      label="Hủy"
                      type="button"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          handlePost.reset();
                        }, 500);
                      }}
                      className="bg-red-500 !w-fit px-4"
                    ></ButtonForm>
                  </DialogFooter>
                </>
              ) : (
                <>
                  {" "}
                  <div className="grid gap-4 py-4">
                    <InputFormikForm
                      name="email"
                      label="Email"
                      important={true}
                    ></InputFormikForm>
                  </div>
                  <DialogFooter>
                    <ButtonForm
                      label="Xác nhận"
                      type="submit"
                      className="!w-24 px-4"
                      loading={handlePost.isPending}
                    ></ButtonForm>
                    <ButtonForm
                      label="hủy"
                      type="button"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          handlePost.reset();
                        }, 500);
                      }}
                      className="bg-red-500 !w-fit px-4"
                    ></ButtonForm>
                  </DialogFooter>
                </>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
