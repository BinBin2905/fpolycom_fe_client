import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Arrow from "../../Helpers/icons/Arrow";
import { useUserStore } from "@/store/userStore";

export default function Navbar() {
  const { currentUser, logoutUser } = useUserStore();
  const isSaller = true;
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }
  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div className="nav-widget-wrapper w-full hidden lg:block  h-[60px] relative z-30 bg-qyellow">
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      Loại hàng
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">
                              Đồ ăn & thức uống
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">Thời trang</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">Làm đẹp</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">
                              Công nghệ & phụ kiện
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">
                              Thể thao & sức khỏe
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="category-item">
                      <a href="/all-products">
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                        >
                          <div className="flex items-center space-x-6">
                            <span className="text-xs font-400">
                              Gia dụng & đời sống
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li>
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext
                      }`}
                    >
                      <span>Mua sắm</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-full absolute left-0 top-[60px]">
                      <div
                        className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                        style={{
                          minHeight: "295px",
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                Chung
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Tất cả sản phẩm
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Danh sách cửa hàng
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                Sản phẩm
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Thực phẩm dùng liền (PTCN2)
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Đồ ăn
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Thức uống
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Quần & áo
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Giày
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Làm đẹp
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-white uppercase mb-[13px]">
                                {" "}
                                _{" "}
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Đồ gia dụng
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Đồ dùng công nghệ
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Dụng cụ thể thao
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnil w-[348px] h-full">
                          <div className="category">
                            <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                              {" "}
                              Nổi bật{" "}
                            </h1>
                          </div>
                          <div className="w h-[205px]">
                            <img
                              width=""
                              src={`/assets/images/mega-menu-thumb.jpg`}
                              alt=""
                              className="h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative">
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext
                      }`}
                    >
                      <span>Khác</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <a href="/privacy-policy">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Chính sách bảo mật
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/terms-condition">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Điều khoản và điều kiện
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="/faq">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow
                                      }`}
                                    >
                                      Câu hỏi thường gặp
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext
                        }`}
                      >
                        <span>Về chúng tôi</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer text-white" : "text-qblacktext
                        }`}
                      >
                        <span>Bài viết</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext
                        }`}
                      >
                        <span>Liên hệ</span>
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/login">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext
                        }`}
                      >
                        <span>Đăng nhập</span>
                      </span>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="become-seller-btn">
              <div>
                <div className="black-btn w-[200px] h-[40px] flex justify-center items-center cursor-pointer">
                  <div className="flex space-x-2 items-center">
                    {currentUser?.storeStatus == null ? (
                      <NavLink
                        className="font-600 text-xs"
                        to={"/become-saller"}
                      >
                        Đăng kí cửa hàng
                      </NavLink>
                    ) : currentUser?.storeStatus == "active" ? (
                      <NavLink className="font-600 text-xs" to={"/store"}>
                        Truy cập cửa hàng
                      </NavLink>
                    ) : (
                      <NavLink
                        className="font-600 text-xs"
                        to={"/infomation-store"}
                      >
                        {currentUser?.storeStatus == "pending"
                          ? "Cửa hàng đợi xét duyệt"
                          : "Xét duyệt thất bại"}
                      </NavLink>
                    )}

                    <span>
                      <svg
                        className="fill-current"
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.08984"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(45 1.08984 0)"
                          fill="white"
                        />
                        <rect
                          x="6"
                          y="4.9082"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(135 6 4.9082)"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
