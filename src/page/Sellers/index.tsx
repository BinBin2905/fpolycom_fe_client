import { fetchDataCommon } from "@/api/commonApi";
import PageTitle from "@/component_common/Helpers/PageTitle";
import Star from "@/component_common/Helpers/icons/Star";
import { StoreObject } from "@/type/TypeCommon";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Sallers() {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["stores"],
    queryFn: () => fetchDataCommon("/common/store/all"),
  });

  return (
    <div>
      <div className="sallers-page-wrapper w-full mb-[60px]">
        <PageTitle
          title="Cửa hàng đang hoạt động"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Cửa hàng", path: "/sallers" },
          ]}
        />
      </div>
      <div className="content-wrapper w-full mb-[60px]">
        <div className="container-x mx-auto w-full">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
            {data &&
              data.map((item: StoreObject) => {
                return (
                  <div className="item w-full">
                    <div
                      className="w-full sm:h-[328px] sm:p-[30px] p-5"
                      style={{
                        backgroundImage: `linear-gradient(0,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(${item.bannerImage})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between w-full h-full">
                        <div className="flex flex-col justify-between h-full">
                          <div className="">
                            <h1 className="text-[30px] font-semibold  text-white">
                              {item.name}
                            </h1>
                            <div className="saller-text-details">
                              <ul className="pl-7">
                                <li className="text-black flex gap-x-1 font-extralight items-center leading-9 text-base">
                                  <span>
                                    <i className="ri-map-pin-line text-white"></i>
                                  </span>
                                  <span className="text-white">
                                    {item.districtName},{item.provinceName}
                                  </span>
                                </li>
                                <li className="text-black flex gap-x-1 font-extralight items-center leading-9 text-base">
                                  <span>
                                    <i className="ri-mail-line text-white"></i>
                                  </span>
                                  <span className="text-white">
                                    {item.email}
                                  </span>
                                </li>
                                <li className="text-black flex gap-x-1 font-extralight items-center leading-9 text-base">
                                  <span>
                                    <i className="ri-phone-line text-white"></i>
                                  </span>
                                  <span className="text-white">
                                    {item.phone}
                                  </span>
                                </li>
                                <li className="flex items-center gap-x-5">
                                  <div className="text-black flex gap-x-1 font-extralight items-center leading-9 text-base">
                                    <span>
                                      <i className="ri-thumb-up-fill text-white"></i>
                                    </span>
                                    <span className="text-white">
                                      {item.numberOfLiked}
                                    </span>
                                  </div>
                                  <div className="text-black flex gap-x-1 font-extralight items-center leading-9 text-base">
                                    <span>
                                      <i className="ri-user-add-line text-white"></i>
                                    </span>
                                    <span className="text-white">
                                      {item.numberOfFollowed}
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div>
                              <div className="w-[116px] h-[40px]">
                                <div className="yellow-btn flex justify-center">
                                  <div
                                    onClick={() => {
                                      document
                                        .getElementById("appLoginUser")
                                        ?.scrollTo(0, 0);
                                      navigate(
                                        `/saller-page/${item.storeCode}`
                                      );
                                    }}
                                    className="flex space-x-2 items-center cursor-pointer"
                                  >
                                    <span>Xem chi tiết</span>
                                    <span>
                                      <svg
                                        width="7"
                                        height="11"
                                        viewBox="0 0 7 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          x="1.0918"
                                          y="0.636719"
                                          width="6.94219"
                                          height="1.54271"
                                          transform="rotate(45 1.0918 0.636719)"
                                          fill="#1D1D1D"
                                        />
                                        <rect
                                          x="6.00195"
                                          y="5.54492"
                                          width="6.94219"
                                          height="1.54271"
                                          transform="rotate(135 6.00195 5.54492)"
                                          fill="#1D1D1D"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex sm:justify-center justify-start">
                            <div className="w-[170px] h-[170px] overflow-hidden rounded-full bg-white mb-[20px] flex justify-center items-center">
                              <img
                                src={item.image ? item.image : ""}
                                alt=""
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
