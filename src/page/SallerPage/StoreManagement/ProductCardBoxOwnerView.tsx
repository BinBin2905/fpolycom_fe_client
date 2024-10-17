import { useState, useRef, useEffect } from "react";
import Detail from "@/component_common/Helpers/icons/Detail";
import Star from "@/component_common/Helpers/icons/Star";
import { SanPham } from "@/type/TypeCommon";

export default function ProductCardBoxOwnerView({ data }: { data: SanPham }) {
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      data-aos="fade-left"
      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="product-card-img w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img
          className="max-h-52 w-auto"
          src={`/assets/images/${data.hinhAnh}`}
          alt="Product"
        />
      </div>
      <div className="product-card-details px-[30px] pb-[30px] flex flex-col space-y-2">
        <div className="w-full h-12 left-0 mb-2">
          <hr />
          <div className="px-2 space-x-1 w-full text-xs text-qgray flex justify-center items-center h-full">
            <span className="text-center flex-1">
              <p>Tổng tồn kho</p>
              <p className="text-qblacktext font-semibold mt-1">
                {cal("quantity")}
              </p>
            </span>
            <span className="w-[1px] h-2/4 bg-gray-300"></span>
            <span className="text-center flex-1">
              <p>Lượt mua</p>
              <p className="text-qblacktext font-semibold mt-1">25</p>
            </span>
            <span className="w-[1px] h-2/4 bg-gray-300"></span>
            <span className="text-center flex-1">
              <p>Ngày thêm</p>
              <p className="text-qblacktext font-semibold mt-1 ">
                {data.updatedDate}
              </p>
            </span>
          </div>
          <hr />
        </div>

        <span>
          <p className="title text-base w-full font-600 text-qblack truncate overflow-hidden">
            {data.tenSanPham}
          </p>
          <p className="text-xs text-qgray">
            Tùy chọn sản phẩm:{" "}
            <span className="text-qblacktext font-semibold">
              {cal("spctCount")}
            </span>
          </p>
        </span>

        <p className="price">
          <span className="offer-price text-qred font-600 text-lg">
            {cal("minPrice")} <span className="text-qgray">-</span>{" "}
            {cal("maxPrice")}
          </span>
        </p>

        <div className="reviews flex justify-between pt-1">
          <div className="flex">
            {Array.from({ length: Number(data.danhGia) }).map((_, index) => (
              <span key={index}>
                <Star />
              </span>
            ))}
          </div>
          <p className="text-xs text-qgray">
            <span className="text-qblacktext font-semibold">
              {cal("comments")}
            </span>{" "}
            lượt đánh giá
          </p>
        </div>
      </div>
      {/* quick-access-btns */}

      <div
        className="quick-access-btns flex flex-col space-y-2 absolute right-5 top-5 transition-all duration-300 ease-in-out"
        ref={buttonRef}
      >
        <button onClick={handleButtonClick}>
          <span className="w-12 h-12 flex justify-center items-center rounded">
            <Detail />
          </span>
        </button>
        {isDropdownOpen && (
          <div
            className="dropdown-menu absolute right-2 top-6 w-20 bg-white shadow-lg rounded-md py-2 text-gray-800 text-sm"
            ref={dropdownRef}
          >
            <a
              href={`my-Store/single-product`}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Chi tiết
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              Xóa
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
