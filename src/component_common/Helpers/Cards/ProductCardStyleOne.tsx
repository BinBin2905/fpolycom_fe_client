import { NavLink } from "react-router-dom";
import Star from "../icons/Star";

type CommonObject = {
  [key: string]: any;
};

export default function ProductCardStyleOne({
  item,
  id,
  name,
  image,
  status,
  typeGoodName,
  typeGoodCode,
  numberOfLikes,
  numberOfEvaluates,
  pointEvaluate,
  minPrice,
  maxPrice,
  provinceCode,
  provinceName,
}: {
  item: CommonObject;
  id: keyof CommonObject;
  name?: keyof CommonObject;
  image?: keyof CommonObject;
  status?: keyof CommonObject;
  typeGoodName?: keyof CommonObject;
  typeGoodCode?: keyof CommonObject;
  numberOfLikes?: keyof CommonObject;
  numberOfEvaluates?: keyof CommonObject;
  pointEvaluate?: keyof CommonObject;
  minPrice?: keyof CommonObject;
  maxPrice?: keyof CommonObject;
  provinceCode?: keyof CommonObject;
  provinceName?: keyof CommonObject;
}) {
  // const available =
  //   (datas.cam_product_sale /
  //     (datas.cam_product_available + datas.cam_product_sale)) *
  //   100;
  return (
    <NavLink to={"/single-product/" + (id && item[id] ? item[id] : "")}>
      <div
        className="product-card-one w-full h-full bg-white relative group overflow-hidden"
        style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="product-card-img h-[300px] border-b border-slate-100 mb-2 relative flex items-center justify-center overflow-hidden my-auto">
        <img
          src={image ? item[image] : ""}
          alt="Product"
          className="w-full object-cover"
        />
          {/* {datas.campaingn_product && (
          <>
            <div className="px-[30px] absolute left-0 top-3 w-full">
              <div className="progress-title flex justify-between ">
                <p className="text-xs text-qblack font-400 leading-6">
                  Prodcuts Available
                </p>
                <span className="text-sm text-qblack font-600 leading-6">
                  {datas.cam_product_available}
                </span>
              </div>
              <div className="progress w-full h-[5px] rounded-[22px] bg-primarygray relative overflow-hidden">
                <div
                  style={{
                    width: `${datas.campaingn_product ? 100 - available : 0}%`,
                  }}
                  className={`h-full absolute left-0 top-0 bg-qyellow`}
                ></div>
              </div>
            </div>
          </>
        )} */}
          {/* product type */}
          {/* {datas.product_type && !datas.campaingn_product && (
          <div className="product-type absolute right-[14px] top-[17px]">
            <span
              className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${
                datas.product_type === "popular" ? "bg-[#19CC40]" : "bg-qyellow"
              }`}
            >
              {datas.product_type}
            </span>
          </div>
        )} */}
        </div>
        <div className="product-card-details px-[30px] pb-[10px] relative">
          {/* add to card button */}
          {/* <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
            <button type="button" className="yellow-btn">
              <div className="flex items-center space-x-3">
                <span>Chi tiết</span>
              </div>
            </button>
          </div> */}

          {/* <a href="/single-product"> */}
          <p
            title={name && item[name]}
            className="title text-[15px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600"
          >
            {name && item[name]}
          </p>
          <div className="reviews flex space-x-[1px] items-center mb-1">
            {pointEvaluate &&
              Array.from({ length: item[pointEvaluate] }).map((_, index) => (
                <span key={index}>
                  <i className="ri-star-fill text-yellow-500"></i>
                </span>
              ))}
            {pointEvaluate &&
              Array.from({ length: 5 - item[pointEvaluate] }).map(
                (_, index) => (
                  <span key={index}>
                    <i className="ri-star-line text-yellow-500"></i>
                  </span>
                )
              )}
            {numberOfEvaluates && (
              <span className="text-gray-500 text-xs">
                ({item[numberOfEvaluates]} đánh giá)
              </span>
            )}
          </div>
          {/* </a> */}
          <p className="price text-red-400 text-sm flex gap-x-2">
            {maxPrice && minPrice && item[maxPrice] == item[minPrice] && (
              <span className="offer-price  font-600 ">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item[maxPrice])}
              </span>
            )}
            {maxPrice && minPrice && item[maxPrice] > item[minPrice] && (
              <>
                <span className="offer-price  font-600 ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item[minPrice])}
                </span>
                <span>-</span>
                <span className="offer-price  font-600 ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item[maxPrice])}
                </span>
              </>
            )}
          </p>
          {typeGoodCode && item[typeGoodCode] && (
            <div className="text-[10px] border border-gray-400 rounded-md px-2 w-fit mt-2">
              {typeGoodName && item[typeGoodName]}
            </div>
          )}
          {/* {numberOfLikes && (
            <span className="text-gray-500 text-xs">
              ({item[numberOfLikes]} thích)
            </span>
          )} */}
        </div>
        {provinceName && item[provinceName] && (
          <div className="p-2 flex items-center gap-x-1 justify-end">
            <i className="ri-map-pin-line text-[12px]"></i>
            <span className="text-gray-500 text-[10px]">
              {item[provinceName]}
            </span>
          </div>
        )}
        {/* quick-access-btns */}

        {/* <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-20 top-20 transition-all duration-300 ease-in-out">
          {datas.cam_product_available === 0 ? (
            <span className="w-20 h-10 flex justify-center items-center bg-gray-100 rounded">
              <p className="text-[12px] text-qgray font-600">Hết hàng</p>
            </span>
          ) : (
            <>
              <a href="#">
                <span className="w-10 h-10 flex justify-center items-center bg-gray-100 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag-fill text-qgray"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                  </svg>
                </span>
              </a>
              <a href="#">
                <span className="w-10 h-10 flex justify-center items-center bg-gray-100 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-flag-fill text-qgray"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                  </svg>
                </span>
              </a>
            </>
          )}
        </div> */}
      </div>
    </NavLink>
  );
}
