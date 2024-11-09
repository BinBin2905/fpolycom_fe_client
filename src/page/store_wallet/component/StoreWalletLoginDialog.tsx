import { postDataStore } from "@/api/commonApi";
import { ButtonForm } from "@/component_common";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStoreStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const StoreWalletLoginDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { currentStore } = useStoreStore();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Không để trống mật khẩu!"),
  });

  const handleLoginStore = useMutation({
    mutationFn: (body: any) => postDataStore(body, "/store/store-wallet/login"),
    onSuccess: (data) => {
      toast.success("Đăng nhập ví thành công!", {
        className: "p-4",
      });
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    const body = {
      storeCode: currentStore?.storeCode,
      ...values,
    };
    console.log("store login before await handleLoginStore: ", body);
    await handleLoginStore.mutateAsync(body);
  };
  useEffect(() => {
    if (handleLoginStore.isSuccess && handleLoginStore.data) {
      onClose();
    }
  }, [handleLoginStore.isSuccess]);
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng nhập ví</DialogTitle>
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
                  label="Đăng nhập"
                  type="submit"
                  className="!bg-black"
                ></ButtonForm>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreWalletLoginDialog;
