import { postDataStore } from "@/api/commonApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStoreStore, useUserStore } from "@/store";
import { ChangePasswordObject } from "@/type/TypeCommon";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const ChangePasswordDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { currentStore } = useStoreStore();
  const [initialValue, setInitialValue] = useState<ChangePasswordObject>({
    storeCode: "",
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
  });

  const handlePost = useMutation({
    mutationFn: (body: any) => postDataStore(body, "/store/change-password"),
    onSuccess: (data) => {
      toast.success("Đổi mật khẩu thành công!", {
        className: "p-4",
      });
    },
  });
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Không để trống mật khẩu mới!"),
    currentPassword: Yup.string().required("Không để trống mật khẩu hiện tại!"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), undefined],
        "Xác nhận password không đúng!"
      )
      .required("Không để trống xác nhận pasword!"),
  });

  const handleSubmit = async (values: ChangePasswordObject) => {
    console.log(values);
    await handlePost.mutateAsync({
      ...values,
      storeCode: currentStore?.storeCode,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handlePost.isPending) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Formik
          key={"formCreateProvince"}
          initialValues={initialValue}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({}) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle>Đổi mật khẩu cửa hàng hàng</DialogTitle>
                <DialogDescription>
                  Nhập đúng mật khẩu hiện tại và mật khẩu mới.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <PasswordFormikForm
                  label="Mật khẩu hiện tại"
                  name="currentPassword"
                  placeholder="Nhập mật khẩu hiện tại..."
                  important={true}
                  // disabled={handlePostProvince.isPending}
                ></PasswordFormikForm>
                <PasswordFormikForm
                  label="Mật khẩu mới"
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới..."
                  important={true}
                  // disabled={handlePostProvince.isPending}
                ></PasswordFormikForm>
                <PasswordFormikForm
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  placeholder="Nhập xác nhận mật khẩu mới..."
                  important={true}
                  // disabled={handlePostProvince.isPending}
                ></PasswordFormikForm>
              </div>
              <DialogFooter>
                <ButtonForm
                  label="Đổi mật khẩu"
                  type="submit"
                  loading={handlePost.isPending}
                  className="!w-28 !bg-primary"
                ></ButtonForm>
                <ButtonForm
                  label="Hủy"
                  disabled={handlePost.isPending}
                  type="button"
                  onClick={() => onClose()}
                  className="!w-16 !bg-red-500"
                ></ButtonForm>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
