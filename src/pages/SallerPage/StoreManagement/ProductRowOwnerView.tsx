// import { useState, useRef, useEffect } from "react";

import Star from "../../../components/Helpers/icons/Star";
import { SanPham } from "../../../hooks/type";

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
    <tr
      data-aos="fade-left"
      className={`${int % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
    >
      <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
        {int}
      </td>

      <td className="py-4 pl-1 text-sm text-gray-700 truncate overflow-hidden sm:max-w-xs">
        <span className="text-xs font-bold text-qgray">{data.updatedDate}</span>
        <br />
        <a href="#" className="font-semibold text-blue-800 hover:underline">
          {data.tenSanPham}
        </a>
        <br />
        <p className="">
          <span className="text-qblacktext font-semibold">25</span> lượt mua
        </p>
      </td>

      <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
        {cal("quantity")}
      </td>

      <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
        <span className="offer-price text-qred">
          {cal("minPrice")} <span className="text-qgray h-5">-</span>{" "}
          {cal("maxPrice")}
        </span>
        <p className="title text-xs w-full font-semibold text-qgray">
          <span className="text-qblacktext font-semibold">
            {cal("spctCount")}{" "}
          </span>
          Lựa chọn sản phẩm
        </p>
      </td>

      <td className="px-3 py-4 text-xs text-qgray font-semibold whitespace-nowrap">
        <div className="flex">
          {Array.from({ length: Number(data.danhGia) }).map((_, index) => (
            <span className="h-5" key={index}>
              <Star />
            </span>
          ))}
        </div>
        <p className="mt-1 pl-1">
          <span className="text-qblacktext font-semibold">
            {cal("comments")}
          </span>{" "}
          đánh giá
        </p>
      </td>
    </tr>
  );
}
