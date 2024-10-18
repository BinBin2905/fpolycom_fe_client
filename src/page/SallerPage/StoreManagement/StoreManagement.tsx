import { useRef, useState, useEffect } from "react";
import productDatas from "../../../data/dataSP.json";
import shopInfo from "../../../data/shopInfo.json";
import ProbsManagement from "./ProbsManagementBox";
import Layout from "../../../components/Partials/Headers/Layout";
import { SanPham } from "@/type/TypeCommon";
// import Star from "../Helpers/icons/Star";

// import ProductsFilter from "../../AllProductPage/ProductsFilter";

export default function SallerPage() {
  const reviewElement = useRef(null);
  const [tab, setTab] = useState("des");
  const [gridOrList, setGridOrList] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const products: SanPham[] = productDatas.SanPham;
  const shop = shopInfo;

  const info = shop.shop[0];
  const shopProbs = shop.sanPham;

  const shopRate = () => {
    if (shopProbs.length === 0) return 0;

    const totalRating = shopProbs.reduce((sum, product) => {
      return sum + parseInt(product.danhGia, 10);
    }, 0);

    return (totalRating / shopProbs.length).toFixed(1);
  };

  const totalRatingSum = () => {
    if (shopProbs.length === 0) return 0;

    const totalRating = shopProbs.reduce((sum, product) => {
      return sum + parseInt(product.soLuotDanhgia, 10);
    }, 0);

    return totalRating;
  };

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <div
              data-aos="fade-right"
              className="saller-info w-full mb-[15px] sm:h-[428px] sm:flex justify-between items-center px-11 overflow-hidden relative py-20 sm:py-0"
              style={{
                background: `url(/assets/images/shopBanner.jpg) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              {/* PC */}

              <div className="absolute right-3 top-5">
                <button className="rounded-lg bg-white bg-opacity-70 px-4 py-2 flex items-center justify-center text-gray-800 font-semibold hover:bg-white transition-colors ease-linear">
                  Chỉnh sửa thông tin
                </button>
              </div>

              <div className="store-status w-[320px] h-[220px] flex-col justify-center items-center rounded-full absolute -left-[30px] glass hidden sm:flex">
                <div className="saller-logo flex flex-col items-center">
                  <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-white mb-2 p-1">
                    <img
                      src={`/assets/images/shopLogo.jpg`}
                      alt="logo"
                      className="object-cover rounded-full h-full"
                    />
                  </div>
                  <span className="text-[26px] font-medium text-center text-white">
                    {info.tenShop}
                  </span>
                </div>
              </div>

              <div className="store-status w-[320px] h-[220px] justify-start items-center rounded-full absolute -right-[30px] glass hidden sm:flex">
                <span className="text-[12px] items-center font-600 text-white font-medium ml-[20px] w-72">
                  <ul>
                    <li className="flex space-x-3 items-center py-3 text-base font-normal">
                      <span>
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.00250844 3.36719C0.156817 3.46656 0.260523 3.53094 0.362354 3.59906C2.3971 4.95656 4.43123 6.31406 6.46598 7.67156C7.55426 8.39781 8.44825 8.39844 9.53591 7.67281C11.5794 6.30969 13.6217 4.94531 15.6652 3.58219C15.7582 3.52031 15.8544 3.46219 15.9856 3.37969C15.9913 3.50031 15.9994 3.58781 15.9994 3.67594C16 5.91656 16.0013 8.15656 15.9994 10.3972C15.9988 11.3853 15.3903 11.9984 14.4038 11.9991C10.135 12.0009 5.86624 12.0009 1.59682 11.9991C0.612871 11.9984 0.00313317 11.3834 0.00250844 10.3959C0.00125898 8.15469 0.00250844 5.91469 0.00250844 3.67406C0.00250844 3.59156 0.00250844 3.50844 0.00250844 3.36719Z"
                            fill="white"
                          />
                          <path
                            d="M8.00103 0.00122449C10.1557 0.00122449 12.3104 -0.00252551 14.4651 0.00309949C15.366 0.00559949 16.0345 0.6806 15.9963 1.53997C15.9732 2.05935 15.7058 2.4331 15.2792 2.71622C13.4156 3.95435 11.5564 5.1981 9.6953 6.43998C9.42729 6.61873 9.15928 6.79873 8.89002 6.97685C8.29715 7.3706 7.70428 7.37185 7.11141 6.97623C4.97483 5.54935 2.83637 4.12435 0.699789 2.6956C0.100046 2.29435 -0.126731 1.68935 0.0681849 1.04747C0.256229 0.42685 0.820362 0.00559949 1.50507 0.00372449C3.33741 -0.00252551 5.16912 0.00122449 7.00146 0.00122449C7.33506 0.00122449 7.66805 0.00122449 8.00103 0.00122449Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>{info.email}</span>
                    </li>
                    <li className="flex space-x-3 items-center py-3 text-base font-normal">
                      <span>
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5085 14.0001C10.5529 13.9553 9.6013 13.6377 8.6926 13.1988C6.27351 12.0295 4.30056 10.3639 2.60467 8.39981C1.65664 7.30216 0.854189 6.11977 0.351704 4.78105C0.0963526 4.09939 -0.084448 3.40133 0.0405862 2.66719C0.106332 2.27908 0.266587 1.9347 0.568313 1.65372C1.00388 1.24812 1.43592 0.838683 1.87618 0.437996C2.50077 -0.129964 3.37366 -0.152376 4.00587 0.410664C4.71205 1.03985 5.40649 1.68215 6.07862 2.34304C6.80124 3.05367 6.54589 4.09666 5.5826 4.47384C4.70383 4.81768 4.37452 5.42773 4.72966 6.25151C5.4106 7.8324 6.63746 8.94153 8.32865 9.57454C9.12171 9.87137 9.85842 9.52698 10.1918 8.7923C10.6145 7.86082 11.7292 7.63069 12.5129 8.33093C13.2114 8.9552 13.8936 9.59477 14.5669 10.2425C15.1533 10.8067 15.1416 11.6299 14.5475 12.2077C14.1014 12.6417 13.64 13.0627 13.1792 13.483C12.7383 13.8864 12.1842 13.999 11.5085 14.0001Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>{info.sdt}</span>
                    </li>
                    <li className="flex space-x-3 items-center py-3 text-base font-normal">
                      <span>
                        <svg
                          width="14"
                          height="19"
                          viewBox="0 0 14 19"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.97116 2.68819e-05C2.96055 0.0118815 -0.248362 3.57049 0.0150623 7.72998C0.107867 9.19477 0.60259 10.5136 1.45069 11.6909C3.13831 14.0337 4.82379 16.3787 6.5107 18.7214C6.77412 19.0875 7.21745 19.0934 7.47659 18.734C9.17135 16.3816 10.8761 14.0359 12.5566 11.6724C15.2879 7.83075 14.0101 2.65546 9.84454 0.632026C9.03428 0.239342 7.93562 -0.00293677 6.97116 2.68819e-05ZM6.99257 9.29479C5.81395 9.29035 4.85877 8.29975 4.85734 7.08094C4.85592 5.8614 5.80752 4.86931 6.98686 4.86116C8.17762 4.85301 9.14708 5.85769 9.13994 7.09428C9.13351 8.3116 8.16977 9.29924 6.99257 9.29479Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>{info.diaChi}</span>
                    </li>
                  </ul>
                </span>
              </div>
              {/* /PC */}

              {/* Mobile */}
              <div className="store-status h-[200px] justify-around -mx-8 p-3 items-center glass flex sm:hidden ">
                <div className="flex-col justify-items-center">
                  <div className="rounded-full p-1 bg-white mb-1 w-[100px] h-[100px]">
                    <img
                      src={`/assets/images/shopLogo.jpg`}
                      alt="logo"
                      className="object-cover rounded-full h-full"
                    />
                  </div>
                </div>

                <span className="text-[13px] text-white font-thin p-3">
                  <span className="text-[20px] font-medium text-center text-white">
                    {info.tenShop}
                  </span>

                  <ul className="mt-1 border-t">
                    <li className="flex space-x-3 items-center leading-7 text-base">
                      <span>
                        <svg
                          width="12"
                          height="9"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.00250844 3.36719C0.156817 3.46656 0.260523 3.53094 0.362354 3.59906C2.3971 4.95656 4.43123 6.31406 6.46598 7.67156C7.55426 8.39781 8.44825 8.39844 9.53591 7.67281C11.5794 6.30969 13.6217 4.94531 15.6652 3.58219C15.7582 3.52031 15.8544 3.46219 15.9856 3.37969C15.9913 3.50031 15.9994 3.58781 15.9994 3.67594C16 5.91656 16.0013 8.15656 15.9994 10.3972C15.9988 11.3853 15.3903 11.9984 14.4038 11.9991C10.135 12.0009 5.86624 12.0009 1.59682 11.9991C0.612871 11.9984 0.00313317 11.3834 0.00250844 10.3959C0.00125898 8.15469 0.00250844 5.91469 0.00250844 3.67406C0.00250844 3.59156 0.00250844 3.50844 0.00250844 3.36719Z"
                            fill="white"
                          />
                          <path
                            d="M8.00103 0.00122449C10.1557 0.00122449 12.3104 -0.00252551 14.4651 0.00309949C15.366 0.00559949 16.0345 0.6806 15.9963 1.53997C15.9732 2.05935 15.7058 2.4331 15.2792 2.71622C13.4156 3.95435 11.5564 5.1981 9.6953 6.43998C9.42729 6.61873 9.15928 6.79873 8.89002 6.97685C8.29715 7.3706 7.70428 7.37185 7.11141 6.97623C4.97483 5.54935 2.83637 4.12435 0.699789 2.6956C0.100046 2.29435 -0.126731 1.68935 0.0681849 1.04747C0.256229 0.42685 0.820362 0.00559949 1.50507 0.00372449C3.33741 -0.00252551 5.16912 0.00122449 7.00146 0.00122449C7.33506 0.00122449 7.66805 0.00122449 8.00103 0.00122449Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-[12px]">{info.email}</span>
                    </li>
                    <li className="flex space-x-3 items-center leading-7 text-base">
                      <span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 15 14"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5085 14.0001C10.5529 13.9553 9.6013 13.6377 8.6926 13.1988C6.27351 12.0295 4.30056 10.3639 2.60467 8.39981C1.65664 7.30216 0.854189 6.11977 0.351704 4.78105C0.0963526 4.09939 -0.084448 3.40133 0.0405862 2.66719C0.106332 2.27908 0.266587 1.9347 0.568313 1.65372C1.00388 1.24812 1.43592 0.838683 1.87618 0.437996C2.50077 -0.129964 3.37366 -0.152376 4.00587 0.410664C4.71205 1.03985 5.40649 1.68215 6.07862 2.34304C6.80124 3.05367 6.54589 4.09666 5.5826 4.47384C4.70383 4.81768 4.37452 5.42773 4.72966 6.25151C5.4106 7.8324 6.63746 8.94153 8.32865 9.57454C9.12171 9.87137 9.85842 9.52698 10.1918 8.7923C10.6145 7.86082 11.7292 7.63069 12.5129 8.33093C13.2114 8.9552 13.8936 9.59477 14.5669 10.2425C15.1533 10.8067 15.1416 11.6299 14.5475 12.2077C14.1014 12.6417 13.64 13.0627 13.1792 13.483C12.7383 13.8864 12.1842 13.999 11.5085 14.0001Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-[12px]">{info.sdt}</span>
                    </li>
                    <li className="flex space-x-3 items-center leading-7 text-base">
                      <span>
                        <svg
                          width="10"
                          height="14"
                          viewBox="0 0 14 19"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.97116 2.68819e-05C2.96055 0.0118815 -0.248362 3.57049 0.0150623 7.72998C0.107867 9.19477 0.60259 10.5136 1.45069 11.6909C3.13831 14.0337 4.82379 16.3787 6.5107 18.7214C6.77412 19.0875 7.21745 19.0934 7.47659 18.734C9.17135 16.3816 10.8761 14.0359 12.5566 11.6724C15.2879 7.83075 14.0101 2.65546 9.84454 0.632026C9.03428 0.239342 7.93562 -0.00293677 6.97116 2.68819e-05ZM6.99257 9.29479C5.81395 9.29035 4.85877 8.29975 4.85734 7.08094C4.85592 5.8614 5.80752 4.86931 6.98686 4.86116C8.17762 4.85301 9.14708 5.85769 9.13994 7.09428C9.13351 8.3116 8.16977 9.29924 6.99257 9.29479Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-[12px]">{info.diaChi}</span>
                    </li>
                  </ul>
                </span>
              </div>
              {/* /mobile */}
            </div>

            <div
              className="product-des-wrapper w-full relative pb-[30px]"
              ref={reviewElement}
            >
              <div className="tab-buttons w-full mb-5 mt-5 sm:mt-0">
                <div className="container-x mx-auto">
                  <ul className="flex space-x-12 ">
                    <li>
                      <span
                        onClick={() => setTab("des")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          tab === "des"
                            ? "border-qyellow text-qblack"
                            : "border-transparent text-qgray"
                        }`}
                      >
                        Thông tin cửa hàng
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => setTab("quanLy")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          tab === "quanLy"
                            ? "border-qyellow text-qblack "
                            : "border-transparent text-qgray"
                        }`}
                      >
                        Quản lý sản phẩm
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
              </div>
              <div className="tab-contents w-full min-h-[100px] ">
                <div className="container-x mx-auto">
                  {tab === "des" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <div>
                        <ul className="list-disc text-sm ml-[20px]">
                          <li className="text-qblack leading-9">
                            Ngày tham gia:{" "}
                            <span className="text-yellow-600">
                              {info.ngayThamGia}
                            </span>
                          </li>
                          <li className="text-qblack leading-9">
                            Đánh giá:{" "}
                            <span className="text-yellow-600">
                              {shopRate()}{" "}
                            </span>{" "}
                            <span className="text-qgray">
                              ({totalRatingSum()} lượt đánh giá)
                            </span>
                          </li>
                          <li className="text-qblack leading-9">
                            Sản phẩm:{" "}
                            <span className="text-yellow-600">
                              {shopProbs.length}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <p className="mt-5 mb-1 px-2">Mô tả</p>

                      <hr className="mb-3 border-qyellow" />
                      <p className="text-[13px] px-2 text-qgray text-justify mb-10">
                        {info.moTa}
                      </p>
                    </div>
                  )}
                  {tab === "info" && (
                    <div
                      data-aos="fade-up"
                      className="w-full tab-content-item"
                    ></div>
                  )}
                  {tab == "quanLy" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <div className="flex justify-between w-full py-4 space-x-3">
                        <div className="w-full lg:w-fill flex items-center border border-gray-200 bg-white mr-4 rounded-1">
                          <div className="flex-1">
                            <form action="#">
                              <input
                                type="text"
                                className="search-input"
                                placeholder="Nhập tên sản phẩm"
                              />
                            </form>
                          </div>
                          {/* <button
                        className="h-full text-sm font-600 search-btn bg-gray-100 rounded-1 px-4 text-gray-500 hover:text-blue-400 transition-colors duration-300 ease-in"
                        type="button"
                      >
                        Tìm kiếm
                      </button> */}
                        </div>

                        <div className="bg-gray-100 text-sm text-gray-500 leading-none rounded-full inline-flex">
                          <button
                            onClick={() => setGridOrList("grid")}
                            className={`inline-flex items-center transition-colors duration-300 ease-in hover:text-blue-200 rounded-l-full px-3 lg:px-6 py-2 ${
                              gridOrList === "grid"
                                ? "outline-none text-white bg-blue-400"
                                : ""
                            }`}
                            id="grid"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="fill-current w-4 h-4 mx-auto"
                            >
                              <rect x="3" y="3" width="7" height="7"></rect>
                              <rect x="14" y="3" width="7" height="7"></rect>
                              <rect x="14" y="14" width="7" height="7"></rect>
                              <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                          </button>
                          <button
                            onClick={() => setGridOrList("list")}
                            className={`inline-flex items-center transition-colors duration-300 ease-in hover:text-blue-200 rounded-r-full px-3 lg:px-6 py-2 ${
                              gridOrList === "list"
                                ? "outline-none text-white bg-blue-400"
                                : ""
                            }`}
                            id="list"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="fill-current w-4 h-4 mx-auto"
                            >
                              <line x1="8" y1="6" x2="21" y2="6"></line>
                              <line x1="8" y1="12" x2="21" y2="12"></line>
                              <line x1="8" y1="18" x2="21" y2="18"></line>
                              <line x1="3" y1="6" x2="3.01" y2="6"></line>
                              <line x1="3" y1="12" x2="3.01" y2="12"></line>
                              <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="products-sorting w-full flex flex-row justify-between py-4">
                        <div>
                          <p className="font-500 text-[13px] text-qgray">
                            Hiện{" "}
                            <span className="text-qblack">
                              {products.length}
                            </span>{" "}
                            kết quả
                          </p>
                        </div>
                        <div
                          className="relative inline-flex text-left"
                          ref={dropdownRef}
                        >
                          <span className="font-500 text-[13px] text-qgray mr-2">
                            Sắp xếp:
                          </span>
                          <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-qblack border-b-[1px] border-gray-400 text-[14px] text-center flex items-center w-[110px] justify-between"
                            type="button"
                            onClick={toggleDropdown}
                          >
                            Ngày thêm
                            <svg
                              className="w-2.5 h-2.5 ms-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>

                          {isOpen && (
                            <div
                              id="dropdown"
                              className="z-10 absolute bg-white shadow-2xl w-44 right-0 top-[22px]"
                            >
                              <ul
                                className="py-2 text-sm text-qgray "
                                aria-labelledby="dropdownDefaultButton"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-200"
                                  >
                                    ABC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-200"
                                  >
                                    ABC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-200"
                                  >
                                    ABC
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <ProbsManagement
                        productsList={products}
                        type={gridOrList}
                      ></ProbsManagement>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
