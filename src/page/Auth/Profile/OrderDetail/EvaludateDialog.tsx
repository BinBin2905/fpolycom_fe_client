import { fetchData, postData, uploadImage } from "@/api/commonApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import SelectFormikForm from "@/component_common/commonForm/SelectFormikForm";
import TextareaFormikForm from "@/component_common/commonForm/TextareaFormikForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store";
import {
  OrderDetailList,
  OrderDetailObject,
  OrderListObject,
  ProvinceObject,
} from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

type typeEvaluate = {
  userLogin?: string;
  title?: string;
  content?: string;
  quality?: number;
  imageView?: string;
  productName?: string;
  imageList?: { image: string; newImage: File | null }[];
  productCode?: string;
};

const EvaludateDialog = ({
  open = false,
  item = [],
  onUpdateEvalute,
  onClose,
}: {
  open: boolean;
  item?: OrderDetailObject[];
  onClose: () => void;
  onUpdateEvalute: () => void;
}) => {
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [initialValue, setInitialValue] = useState<typeEvaluate[]>([]);
  const validationSchema = Yup.object().shape({
    data: Yup.array().of(
      Yup.object({
        content: Yup.string().required("Không để trống nội dung đánh giá!"),
        quality: Yup.number()
          .min(1, "Chất lượng thấp nhất là 1!")
          .max(5, "Chất lượng cao nhất là 5!"),
        imageList: Yup.array().of(
          Yup.object({
            newImage: Yup.mixed()
              .required("File là bắt buộc")
              .test(
                "fileSize",
                "Kích thước file quá lớn, tối đa 2MB",
                (value: any) => value && value.size <= FILE_SIZE
              )
              .test(
                "fileFormat",
                "Chỉ chấp nhận định dạng file .jpg, .jpeg, .png",
                (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
              ),
          })
        ),
      })
    ),
  });

  const handlePost = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postData(body, "/user/evaluate/new"),
    // onSuccess: (data: any) => {
    //   if (queryClient.getQueryData(["bankbranchs"])) {
    //     queryClient.setQueryData(["bankbranchs"], (oldData: any[]) => {
    //       const resultData = data;
    //       console.log(resultData);
    //       return [resultData, ...oldData];
    //     });
    //   } else {
    //     queryClient.invalidateQueries({
    //       predicate: (query) => query.queryKey[0] === "bankbranchs",
    //     });
    //   }
    // },
  });

  const handleSubmit = (values: typeEvaluate[]) => {
    setLoading(true);
    if (values.length > 0) {
      values.forEach(async (item) => {
        if (item.imageList && item.imageList?.length > 0) {
          await Promise.all(
            item.imageList.map(async (i) => {
              if (i.newImage) {
                const url = await uploadImage(i.newImage, "common");
                i.image = url ? url : "";
                i.newImage = null;
              }
            })
          );
        }
        await handlePost.mutateAsync(item);
        onUpdateEvalute();
        toast.success("Gửi đánh giá thành công", {
          className: "p-4",
        });
        setLoading(false);
        onClose();
      });
    }
  };

  useEffect(() => {
    const newList: typeEvaluate[] = [];
    item.forEach((item) => {
      if (!newList.find((item) => item.productCode == item.productCode)) {
        newList.push({
          content: "",
          title: "Chất lượng cực tốt!",
          userLogin: currentUser?.userLogin,
          imageView: item.image,
          productName: item.productName,
          imageList: [],
          productCode: item.productCode,
          quality: 5,
        });
      }
    });
    if (newList.length > 0) {
      setInitialValue(newList);
    }
  }, [item]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[800px]">
        <Formik
          key={"formCreateWard"}
          initialValues={{ data: initialValue }}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values: any) => {
            console.log(values.data);
            handleSubmit(values.data);
          }}
        >
          {({
            setFieldValue,
            handleChange,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle className="mb-5">Đánh giá sản phẩm</DialogTitle>
                <div className="flex flex-col gap-y-4 px-1">
                  <DialogDescription className="flex flex-col gap-y-3 border-y">
                    <div className="h-[450px] overflow-y-scroll custom-scrollbar-wider px-1  py-2">
                      {values.data.map((item: typeEvaluate, index: number) => {
                        return (
                          <div>
                            <div className="flex gap-x-2">
                              <img
                                src={item.imageView}
                                className="size-16 object-cover object-center"
                              ></img>
                              <h5>{item.productName}</h5>
                            </div>
                            <div>
                              <h5>Chất lượng đánh giá</h5>
                              {values.data != null &&
                                values.data[index].quality >= 0 &&
                                Array.from({
                                  length: values.data[index].quality,
                                }).map((_, i) => (
                                  <span
                                    key={i}
                                    onClick={() => {
                                      setFieldValue(
                                        `data[${index}].quality`,
                                        i + 1
                                      );
                                      setFieldValue(
                                        `data[${index}].title`,
                                        i + 1 == 5
                                          ? "Chất lượng cực tốt!"
                                          : i + 1 == 4
                                          ? "Chất lượng tốt!"
                                          : i + 1 == 3
                                          ? "Chất lượng trung bình!"
                                          : i + 1 == 2
                                          ? "Chất lượng cực kém!"
                                          : "Chất lượng tệ!"
                                      );
                                    }}
                                  >
                                    <i className="ri-star-fill text-xl text-yellow-500"></i>
                                  </span>
                                ))}
                              {values.data &&
                                values.data[index].quality >= 0 &&
                                Array.from({
                                  length: 5 - values.data[index].quality,
                                }).map((_, i) => (
                                  <span
                                    key={i}
                                    onClick={() => {
                                      console.log(i);
                                      setFieldValue(
                                        `data[${index}].quality`,
                                        values.data[index].quality + i + 1
                                      );
                                      setFieldValue(
                                        `data[${index}].title`,
                                        values.data[index].quality + i + 1 == 5
                                          ? "Chất lượng cực tốt!"
                                          : values.data[index].quality +
                                              i +
                                              1 ==
                                            4
                                          ? "Chất lượng tốt!"
                                          : values.data[index].quality +
                                              i +
                                              1 ==
                                            3
                                          ? "Chất lượng trung bình!"
                                          : values.data[index].quality +
                                              i +
                                              1 ==
                                            2
                                          ? "Chất lượng cực kém!"
                                          : "Chất lượng tệ!"
                                      );
                                    }}
                                  >
                                    <i className="ri-star-line text-xl text-yellow-500"></i>
                                  </span>
                                ))}
                              ({values.data[index].title})
                            </div>

                            <div>
                              <TextareaFormikForm
                                row={3}
                                name={`data[${index}].content`}
                                placeholder="Nhập đánh giá..."
                              ></TextareaFormikForm>
                            </div>
                            <div className="grid grid-cols-6 gap-2 mt-2">
                              <input
                                type="file"
                                id={"file" + values.data[index].productCode}
                                multiple
                                hidden
                                onChange={(e) => {
                                  setFieldValue(
                                    `data[${index}].imageList`,
                                    e.target.files
                                      ? [
                                          ...values.data[index].imageList,
                                          ...Array.from(e.target.files).map(
                                            (item) => ({
                                              newImage: item,
                                            })
                                          ),
                                        ]
                                      : []
                                  );
                                }}
                              />
                              {values.data[index].imageList.map((item: any) => {
                                return (
                                  <img
                                    src={
                                      item.newImage instanceof File
                                        ? URL.createObjectURL(item.newImage)
                                        : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                                    }
                                    alt=""
                                    className="w-full h-28 rounded-sm object-cover object-center"
                                  />
                                );
                              })}

                              <label
                                className="h-28 w-full border border-gray-200 rounded-sm flex items-center justify-center"
                                htmlFor={
                                  "file" + values.data[index].productCode
                                }
                              >
                                <i className="ri-add-line text-xl"></i>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </DialogDescription>
                  <DialogFooter>
                    <div className="flex gap-x-2 justify-end">
                      <ButtonForm
                        type="submit"
                        className="!w-28 !bg-primary"
                        label="Gửi đánh giá"
                        loading={loading}
                        // disabled={false}
                      ></ButtonForm>
                      <ButtonForm
                        type="button"
                        className="!w-28 !bg-red-500"
                        label="Hủy"
                        disabled={handlePost.isPending}
                        onClick={() => {
                          onClose();
                        }}
                      ></ButtonForm>
                    </div>
                  </DialogFooter>
                </div>
              </DialogHeader>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EvaludateDialog;
