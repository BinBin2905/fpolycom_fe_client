// import { useState, useRef, useEffect } from "react";

import Star from "../../../components/Helpers/icons/Star";
import { SanPham } from "@/type/TypeCommon";

// import Detail from "../../Helpers/icons/detail";

export default function ProductCardBoxOwnerView({
  data,
  int,
}: {
  data: SanPham;
  int: number;
}) {
  const cal = (args: string) => {
    const result =
      args === "spctCount"
        ? data.SanPhamChiTiet.reduce((total) => total + 1, 0)
        : args === "comments"
        ? data.SanPhamChiTiet.reduce(
            (total, item) => total + item.binhLuan.length,
            0
          )
        : args === "quantity"
        ? data.SanPhamChiTiet.reduce(
            (total, item) => total + parseInt(item.soLuong, 10),
            0
          )
        : args === "minPrice"
        ? data.SanPhamChiTiet.reduce((min, item) => {
            const price = parseInt(item.gia, 10);
            return price < min ? price : min;
          }, Infinity)
        : args === "maxPrice"
        ? data.SanPhamChiTiet.reduce((max, item) => {
            const price = parseInt(item.gia, 10);
            return price > max ? price : max;
          }, -Infinity)
        : 0;
    return args === "minPrice" || args === "maxPrice"
      ? formatCurrency(result)
      : result;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);
  // const buttonRef = useRef(null);

  // const handleButtonClick = () => {
  //   setDropdownOpen((prev) => !prev);
  // };

  // const handleClickOutside = (event) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target) &&
  //     buttonRef.current &&
  //     !buttonRef.current.contains(event.target)
  //   ) {
  //     setDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div
      data-aos="fade-left"
      className="bg-white space-y-2 p-4 rounded-lg shadow"
    >
      <div className="flex justify-between">
        <div className="w-full text-xs text-qgray flex-1 text-start">
          <p className="title text-xs w-full font-600 text-qblack">#{int}</p>
        </div>

        <div className="text-xs flex-1 text-end text-qgray">
          <p className="title text-xs w-full font-500 text-qgray">
            {data.updatedDate}
          </p>
        </div>
      </div>

      <div className="text-md text-gray-700 truncate overflow-hidden">
        <a href="#" className="font-semibold text-blue-800 hover:underline">
          {data.tenSanPham}
        </a>
        <p className="title text-xs w-full font-500 text-qgray">
          {data.loaiHang}
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <div className="w-2/3 text-xs text-qgray flex-1 text-start font-500 space-y-1">
          <p className="text-qred text-base">
            {cal("minPrice")} - {cal("maxPrice")}
          </p>
          <p className="text-qgray">
            Tùy chọn:{" "}
            <span className="text-qblacktext font-semibold">
              {cal("spctCount")}
            </span>
          </p>
          <p className="text-qgray">
            Số lượng:{" "}
            <span className="text-qblacktext font-semibold mt-1">
              {cal("quantity")}
            </span>
          </p>
        </div>

        <div className="w-1/3 text-xs space-y-1 text-end text-qgray">
          <div className="flex justify-end h-[24px] items-center">
            {Array.from({ length: Number(data.danhGia) }).map((_, index) => (
              <span key={index}>
                <Star />
              </span>
            ))}
          </div>
          <p>
            Đánh giá:{" "}
            <span className="text-qblacktext font-semibold">
              {cal("comments")}
            </span>
          </p>
          <p>
            Lượt mua: <span className="text-qblacktext font-semibold">25</span>
          </p>
        </div>
      </div>
    </div>
  );
}
