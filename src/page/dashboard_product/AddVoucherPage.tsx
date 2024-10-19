import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputFormikForm, SelectFormikForm  } from "@/component_common";
import DatePickerFormikForm from "@/component_common/commonForm/DatePickerFormikForm";
import { useStoreStore } from "../../store/storeStore";
import { format } from "date-fns";

export type Voucher = {
    code: string
    name: string
    priceApply: number
    percentDecrease: number
    voucherType: string
    beginDate: string
    endDate: string
    storeCode: string
};

const validationSchema = Yup.object({
  name: Yup.string().required("Tên voucher là bắt buộc"),
  priceApply: Yup.number().required("Giá áp dụng là bắt buộc"),
  percentDecrease: Yup.number()
    .required("Phần trăm giảm giá là bắt buộc")
    .min(0, "Giảm giá không thể nhỏ hơn 0")
    .max(100, "Giảm giá không thể lớn hơn 100"),
  voucherType: Yup.string().required("Loại voucher là bắt buộc"),
  beginDate: Yup.string().required("Ngày bắt đầu là bắt buộc"),
  endDate: Yup.string().required("Ngày kết thúc là bắt buộc"),
});

const NewVoucherPage = () => {
  // const [voucherList, setVoucherList] = useState<Voucher[]>([]);

  const TypeVoucherOptions = [
    { key: 1, value: "VoucherType1" },
    { key: 2, value: "VoucherType2" },
    { key: 3, value: "VoucherType3" },
    { key: 4, value: "VoucherType4" },
    { key: 5, value: "VoucherType5" },
    { key: 6, value: "VoucherType6" },
    { key: 7, value: "VoucherType7" },
    { key: 8, value: "VoucherType8" },
  ];

  const handleAddVoucher = (values: Voucher) => {
    const formattedBeginDate = format(new Date(values.beginDate), "dd/MM/yyyy");
    const formattedEndDate = format(new Date(values.endDate), "dd/MM/yyyy");

    const newVoucher: Voucher = {
      ...values,
      code: new Date().toISOString(),
      beginDate: formattedBeginDate, 
      endDate: formattedEndDate,
    };
    // setVoucherList((prevList) => [...prevList, newVoucher]);
    console.log(newVoucher);
  };

  const currentStore = useStoreStore((state) => state.currentStore);


  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-qblack p-4">THÊM VOUCHER</h2>
      <Formik
        initialValues={{
            code:"",
            name: "",
            priceApply: 0,
            percentDecrease: 0,
            voucherType: "",
            beginDate: "",
            endDate: "",
            storeCode: currentStore?.storeCode,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddVoucher}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="rounded-md p-10 bg-white shadow-sm">
            <div className="flex flex-col gap-4">
              <InputFormikForm
                label="Mã Voucher"
                name="code"
                placeholder="Nhập mã giảm giá"
                important
              />
              <InputFormikForm
                label="Tên voucher"
                name="name"
                placeholder="Nhập tên voucher"
                important
              />
              <InputFormikForm
                label="Giá áp dụng"
                name="priceApply"
                placeholder="Nhập giá áp dụng"
                important
              />
              <InputFormikForm
                label="Phần trăm giảm giá"
                name="percentDecrease"
                placeholder="Nhập phần trăm giảm giá"
                important
              />
              <SelectFormikForm 
                label="Loại voucher" 
                name="voucherType" 
                options={TypeVoucherOptions} 
                itemKey="key" 
                itemValue="value" 
              />
              <DatePickerFormikForm
                label="Ngày bắt đầu"
                name="beginDate"
                important
                disabled={false}
              />
              <DatePickerFormikForm
                label="Ngày kết thúc"
                name="endDate"
                important
                disabled={false}
              />
              <InputFormikForm 
                label="Mã cửa hàng" 
                name="storeCode" 
                placeholder="Mã cửa hàng" 
                disabled 
              />

              <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Tạo voucher
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewVoucherPage;
