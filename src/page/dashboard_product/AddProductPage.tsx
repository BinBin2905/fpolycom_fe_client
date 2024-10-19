import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputFormikForm, SelectFormikForm } from "@/component_common";
import { useStoreStore } from "../../store/storeStore";


export type SanPhamChiTiet = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discountCode: number | null;
};

export type SanPham = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  typeGoodCode: number;
  storeCode: string;
  productDetailList: SanPhamChiTiet[];
};

const validationSchemaSP = Yup.object({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  image: Yup.string().url("Đường dẫn hình ảnh không hợp lệ").required("Hình ảnh là bắt buộc"),
  shortDescription: Yup.string().required("Mô tả ngắn là bắt buộc"),
  typeGoodCode: Yup.number().required("Loại hàng là bắt buộc"),
  storeCode: Yup.number().required("Mã cửa hàng là bắt buộc"),
});

const validationSchemaSPCT = Yup.object({
  name: Yup.string().required("Tên chi tiết sản phẩm là bắt buộc"),
  price: Yup.number().required("Giá là bắt buộc"),
  image: Yup.string().url("Đường dẫn hình ảnh không hợp lệ").required("Hình ảnh là bắt buộc"),
  quantity: Yup.number().required("Số lượng là bắt buộc"),
  discountCode: Yup.number().nullable(),
});

const NewProductPage = () => {
  const [spctList, setSpctList] = useState<SanPhamChiTiet[]>([]);
  const [editingSPCT, setEditingSPCT] = useState<SanPhamChiTiet | null>(null); // State cho chi tiết sản phẩm đang chỉnh sửa

  const handleAddProductDetail = (values: SanPhamChiTiet) => {
    if (editingSPCT) {
      setSpctList((prevList) =>
        prevList.map((spct) => (spct.id === editingSPCT.id ? { ...values, id: editingSPCT.id } : spct))
      );
      setEditingSPCT(null);
    } else {
      const newSPCT = {
        ...values,
        id: new Date().toISOString(),
      };
      setSpctList((prevList) => [...prevList, newSPCT]);
    }
  };

  const handleDeleteProductDetail = (id: string) => {
    setSpctList((prevList) => prevList.filter((spct) => spct.id !== id));
  };

  const handleEditProductDetail = (spct: SanPhamChiTiet) => {
    setEditingSPCT(spct);
  };

  const handleAddProduct = (values: SanPham) => {
    const newProduct: SanPham = {
      ...values,
      id: new Date().toISOString(),
      productDetailList: spctList,
    };
    console.log("Sản phẩm mới:", newProduct);
  };

  const typeGoodOptions = [
    { key: 1, value: "LoaiHang1" },
    { key: 2, value: "LoaiHang2" },
    { key: 3, value: "LoaiHang3" },
    { key: 4, value: "LoaiHang4" },
    { key: 5, value: "LoaiHang5" },
    { key: 6, value: "LoaiHang6" },
    { key: 7, value: "LoaiHang7" },
    { key: 8, value: "LoaiHang8" },
  ];

  const currentStore = useStoreStore((state) => state.currentStore);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-qblack p-4">THÊM SẢN PHẨM</h2>
      <div className="flex justify-around gap-6">
        <div className="rounded-md p-10 bg-white shadow-sm flex-1">
          <h2 className="text-xl font-medium text-qgray mb-4">Thông tin chung</h2>
          <Formik
            initialValues={{
              name: "",
              description: "",
              shortDescription: "",
              image: "",
              typeGoodCode: 0,
              storeCode: currentStore?.storeCode,
            }}
            validationSchema={validationSchemaSP}
            onSubmit={(values) => handleAddProduct(values)}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <div className="py-2">
                    <InputFormikForm label="Hình sản phẩm" name="image" placeholder="URL hình ảnh" important />
                  </div>
                  <div className="py-2">
                    <InputFormikForm label="Tên sản phẩm" name="name" placeholder="Nhập tên sản phẩm" important />
                  </div>
                  <div className="py-2">
                    <InputFormikForm label="Mô tả" name="description" placeholder="Nhập mô tả" important />
                  </div>
                  <div className="py-2">
                    <InputFormikForm label="Mô tả ngắn" name="shortDescription" placeholder="Nhập mô tả ngắn" important />
                  </div>
                  <div className="py-2">
                    <SelectFormikForm label="Loại hàng" name="typeGoodCode" options={typeGoodOptions} itemKey="key" itemValue="value" />
                  </div>
                  <div className="py-2">
                    <InputFormikForm label="Mã cửa hàng" name="storeCode" placeholder="Mã cửa hàng" disabled />
                  </div>
                  <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Tạo sản phẩm
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="rounded-md p-10 bg-white shadow-sm flex-1">
          <h2 className="text-xl font-medium text-qgray mb-4">Sản phẩm chi tiết</h2>
          <Formik
            initialValues={{
              name: editingSPCT ? editingSPCT.name : "",
              price: editingSPCT ? editingSPCT.price : 0,
              image: editingSPCT ? editingSPCT.image : "",
              quantity: editingSPCT ? editingSPCT.quantity : 0,
              discountCode: editingSPCT ? editingSPCT.discountCode : null,
            }}
            validationSchema={validationSchemaSPCT}
            onSubmit={(values, { resetForm }) => {
              handleAddProductDetail(values);
              resetForm(); // Reset form sau khi thêm chi tiết sản phẩm
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="py-2">
                <InputFormikForm label="Tên chi tiết sản phẩm" name="name" placeholder="Nhập tên chi tiết sản phẩm" important />
                </div>
                <div className="py-2">
                <InputFormikForm label="Giá" name="price" placeholder="Nhập giá" important />
                </div>
                <div className="py-2">
                <InputFormikForm label="Hình ảnh" name="image" placeholder="Link hình ảnh" important />
                </div>
                <div className="py-2">
                <InputFormikForm label="Số lượng" name="quantity" placeholder="Nhập số lượng" important />
                </div>
                <div className="py-2">
                <InputFormikForm label="Mã giảm giá" name="discountCode" placeholder="Nhập mã giảm giá (nếu có)" />
                </div>
                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                  {editingSPCT ? "Sửa chi tiết sản phẩm" : "Thêm chi tiết sản phẩm"}
                </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="rounded-md p-10 bg-white shadow-sm flex-1">
        <h3 className="text-xl font-medium text-qblack mb-4">Danh sách sản phẩm chi tiết</h3>
        {spctList.length > 0 ? (
          <table className="min-w-full divide-y-[1px] divide-gray-200 bg-white text-sm table-auto">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">HÌNH ẢNH</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">TÊN SPCT</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">GIÁ</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">SỐ LƯỢNG</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">  </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {spctList.map((spct, index) => (
                <tr key={spct.id}>
                  <td className="whitespace-nowrap px-4 py-2">{index + 1}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <img src={spct.image} alt={spct.name} className="h-16 w-16 object-cover" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">{spct.name}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{spct.price}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{spct.quantity}</td>
                  <td className="whitespace-nowrap px-4 py-2 flex gap-3 justify-end">
                    <button onClick={() => handleEditProductDetail(spct)} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white">
                      Sửa
                    </button>
                    <button onClick={() => handleDeleteProductDetail(spct.id)} className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Thêm các lựa chọn cho sản phẩm</p>
        )}
      </div>
    </div>
  );
};

export default NewProductPage;
