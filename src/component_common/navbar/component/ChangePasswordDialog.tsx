import { postDataStore } from "@/api/commonApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
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
    storeCode: currentStore?.storeCode,
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
  });

  const handlePost = useMutation({
    mutationFn: (body: any) => postDataStore(body, "/store/change-password"),
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
    await handlePost.mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
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
          {({ setFieldValue, isValid, values, errors, touched }) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle>Đổi mật khẩu cửa hàng hàng</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <InputFormikForm
                  label="Tên đăng nhập"
                  name="username"
                  placeholder="Nhập tên đăng nhập..."
                  important={true}
                  // disabled={handlePostProvince.isPending}
                ></InputFormikForm>
              </div>
              <DialogFooter>
                <ButtonForm
                  label="Đổi mật khẩu"
                  type="submit"
                  className="!w-fit"
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
