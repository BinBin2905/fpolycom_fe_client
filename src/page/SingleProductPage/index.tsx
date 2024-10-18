import { useEffect, useRef, useState } from "react";
import data from "../../data/products.json";

import ProductView from "./ProductView";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";
import { Comments } from "@/type/TypeCommon";
import BreadcrumbCom from "@/component_common/BreadcrumbCom";
import Layout from "@/component_common/Partials/Headers/Layout";
import DataIteration from "@/component_common/Helpers/DataIteration";
import ProductCardStyleOne from "@/component_common/Helpers/Cards/ProductCardStyleOne";
import InputCom from "@/component_common/Helpers/InputCom";
import { useUserStore } from "@/store";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postDataCommon } from "@/api/commonApi";
import Selectbox from "@/component_common/Helpers/Selectbox";
import { Item } from "@radix-ui/react-dropdown-menu";
import { SectionStyleOne } from "@/component_common";

type ProductDetailObject = {
  productDetailCode: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discountCode: number;
  percentDecrease: number;
};

type ProductAttrObject = {
  attrValue: string;
  typeGoodAttrCode: string;
  nameAttr: string;
  productCode: string;
  productAttrCode: string;
};

type ProductObject = {
  productCode: number;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  status: string;
  typeGoodName: string;
  typeGoodCode: string;
  numberOfLikes: number;
  numberOfEvaluates: number;
  pointEvaluate: number;
  minPrice: number;
  maxPrice: number;
  liked: boolean | null;
  storeCode: number;
  storeName: string;
  productDetailList?: ProductDetailObject[];
  productAttrList: ProductAttrObject[];
};

export default function SingleProductPage() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<ProductObject | null>(
    null
  );
  const [selected, setSelected] = useState<ProductDetailObject | null>(null);
  const { currentUser } = useUserStore();
  const handleFetchProduct = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/common/product/detail"),
    onSuccess: (data, variables) => {},
  });

  const handleFetchStore = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/common/store/detail"),
    onSuccess: (data, variables) => {},
  });

  const handleFetchEvaludate = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/product/evaluate/all"),
    onSuccess: (data, variables) => {},
  });

  const handleFetchProductByStore = useMutation({
    mutationFn: (body: any) =>
      postDataCommon(body, "/common/store/all-product"),
    onSuccess: (data, variables) => {},
  });
  const [tab, setTab] = useState<string>("des");
  const reviewElement = useRef<HTMLDivElement | null>(null);
  const [report, setReport] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (id != "") {
        await handleFetchProduct.mutateAsync({
          productCode: id,
          userLogin: currentUser ? currentUser.userLogin : "",
        });
        await handleFetchEvaludate.mutateAsync({
          productCode: id,
        });
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (handleFetchProduct.isSuccess && handleFetchProduct.data) {
      setProductDetail(handleFetchProduct.data);
      handleFetchStore.mutateAsync({
        storeCode: handleFetchProduct.data?.storeCode,
      });
      handleFetchProductByStore.mutateAsync({
        storeCode: handleFetchProduct.data?.storeCode,
      });
    }
  }, [handleFetchProduct.isSuccess]);
  console.log(
    handleFetchEvaludate.data
      ? handleFetchEvaludate.data[0]?.imageList.length
      : 0
  );
  return (
    <>
      <div className="single-product-wrapper w-full ">
        <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
          <div className="breadcrumb-wrapper w-full ">
            <div className="container-x mx-auto">
              <BreadcrumbCom
                paths={[
                  { name: "Sản phẩm", path: "/" },
                  {
                    name: handleFetchProduct.data
                      ? handleFetchProduct.data?.name
                      : "",
                    path: "/single-product",
                  },
                ]}
              />
            </div>
          </div>
          <div className="w-full bg-white pb-[60px]">
            <div className="container-x mx-auto">
              <div className={`product-view w-full lg:flex justify-between`}>
                <div className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
                  <div className="w-full">
                    <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
                      <img
                        src={`${
                          selected ? selected.image : productDetail?.image
                        }`}
                        alt=""
                        className="object-contain"
                      />
                      {selected && (
                        <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                          <span>-{selected.percentDecrease}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <div
                        onClick={() => setSelected(null)}
                        // key={item.productDetailCode}
                        className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                      >
                        <img
                          src={productDetail ? productDetail.image : ""}
                          alt=""
                          className={`w-full h-full object-contain ${
                            selected == null ? "opacity-100" : "opacity-50"
                          }`}
                        />
                      </div>
                      {productDetail?.productDetailList &&
                        productDetail.productDetailList.length > 0 &&
                        productDetail.productDetailList.map((item) => (
                          <div
                            onClick={() => setSelected(item)}
                            key={item.productDetailCode}
                            className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                          >
                            <img
                              src={item?.image}
                              alt=""
                              className={`w-full h-full object-contain ${
                                selected?.productDetailCode ==
                                item.productDetailCode
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="product-details w-full mt-10 lg:mt-0">
                    <span className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block">
                      {productDetail?.typeGoodName}
                    </span>
                    <p
                      data-aos="fade-up"
                      className="text-xl font-medium text-qblack mb-2"
                    >
                      {productDetail?.name}
                    </p>
                    <div className="flex space-x-[10px] items-center mb-2">
                      <div className="flex">
                        {productDetail &&
                          Array.from({
                            length: productDetail.pointEvaluate,
                          }).map((_, index) => (
                            <span key={index}>
                              <i className="ri-star-fill text-yellow-500"></i>
                            </span>
                          ))}
                        {productDetail &&
                          Array.from({
                            length: 5 - productDetail.pointEvaluate,
                          }).map((_, index) => (
                            <span key={index}>
                              <i className="ri-star-line text-yellow-500"></i>
                            </span>
                          ))}

                        {/* <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star /> */}
                      </div>
                      {productDetail && (
                        <span className="text-gray-500 text-xs">
                          ({productDetail.numberOfEvaluates} đánh giá)
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2 mb-5 text-red-500">
                      {productDetail &&
                        productDetail.maxPrice == productDetail.minPrice && (
                          <span className="offer-price  font-600 ">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(productDetail.maxPrice)}
                          </span>
                        )}
                      {productDetail &&
                        productDetail.maxPrice > productDetail.minPrice && (
                          <>
                            <span className="offer-price  font-600 ">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(productDetail.minPrice)}
                            </span>
                            <span>-</span>
                            <span className="offer-price  font-600 ">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(productDetail.maxPrice)}
                            </span>
                          </>
                        )}
                    </div>

                    <p
                      data-aos="fade-up"
                      className="text-qgray text-sm text-normal mb-[30px] leading-7"
                    >
                      {productDetail && productDetail?.description}
                    </p>

                    {/* <div data-aos="fade-up" className="colors mb-[30px]">
            <span className="text-sm font-normal uppercase text-qblack mb-[14px] inline-block">
              Lựa chọn:
            </span>

            <div className="flex space-x-4 items-center">
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img) => (
                  <div key={img.id}>
                    {img.color && img.color !== "" && (
                      <button
                        onClick={() => changeImgHandler(img.src)}
                        type="button"
                        style={{ "--tw-ring-color": `${img.color}` }}
                        className="w-[20px] h-[20px]  rounded-full focus:ring-2  ring-offset-2 flex justify-center items-center"
                      >
                        <span
                          style={{ background: `${img.color}` }}
                          className="w-[20px] h-[20px] block rounded-full border"
                        ></span>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div> */}

                    <div className="product-size mb-[30px]">
                      <span className="text-sm font-normal uppercase text-qblack mb-[14px] inline-block">
                        Lựa chọn
                      </span>
                      <div className="w-ful flex flex-wrap gap-2">
                        {productDetail &&
                          productDetail.productDetailList &&
                          productDetail.productDetailList.map((item) => {
                            return (
                              <div
                                onClick={() => setSelected(item)}
                                className={`${
                                  selected?.productDetailCode ==
                                  item.productDetailCode
                                    ? "border-red-300 shadow-md"
                                    : "border-gray-200"
                                } border relative px-2 py-2 rounded-md flex items-center gap-x-2 w-fit cursor-pointer`}
                              >
                                <img
                                  src={item.image}
                                  alt=""
                                  className="size-8"
                                />
                                <span className="text-sm w-16">
                                  {item.name}
                                </span>
                                {item.percentDecrease && (
                                  <div className="absolute -top-3 bg-red-500 -right-2 text-white rounded-full border border-gray-100 shadow-md size-8 text-[9px] flex items-center justify-center">
                                    -{item.percentDecrease}%
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
                      <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                        <div className="flex justify-between items-center w-full">
                          <button
                            onClick={decrement}
                            type="button"
                            className="text-base text-qgray"
                          >
                            -
                          </button>
                          <span className="text-qblack">{quantity}</span>
                          <button
                            onClick={increment}
                            type="button"
                            className="text-base text-qgray"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                        <button type="button">
                          {productDetail?.liked ? (
                            <i className="ri-heart-fill text-red-500  text-xl"></i>
                          ) : (
                            <i className="ri-heart-line text-xl"></i>
                          )}
                        </button>
                      </div>
                      <div className="flex-1 h-full">
                        <button
                          type="button"
                          className="black-btn text-sm font-semibold w-full h-full"
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>

                    <div data-aos="fade-up" className="mb-[20px]">
                      <p className="text-[13px] text-qgray leading-7">
                        <span className="text-qblack">Mã sản phẩm:</span> #
                        {productDetail && productDetail.productCode}
                      </p>
                      <p className="text-[13px] text-qgray leading-7">
                        <span className="text-qblack">Tồn kho :</span>{" "}
                        {productDetail &&
                          productDetail.productDetailList &&
                          productDetail.productDetailList.reduce(
                            (accumulator, currentValue) => {
                              return accumulator + currentValue.quantity;
                            },
                            0
                          )}
                      </p>
                      <p className="text-[13px] text-blue-900 leading-7">
                        <span className="text-qblack">Tags :</span>{" "}
                        {productDetail && productDetail.typeGoodName}
                      </p>
                    </div>

                    <div
                      data-aos="fade-up"
                      className="flex space-x-2 items-center mb-[20px]"
                    >
                      <span>
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z"
                            fill="#EB5757"
                          />
                        </svg>
                      </span>

                      <button
                        type="button"
                        // onClick={reportHandler}
                        className="text-qred font-semibold text-[13px]"
                      >
                        Báo cáo sản phẩm
                      </button>
                    </div>

                    <div
                      data-aos="fade-up"
                      className="social-share flex  items-center w-full"
                    >
                      <span className="text-qblack text-[13px] mr-[17px] inline-block">
                        Chia sẻ
                      </span>

                      <div className="flex space-x-5 items-center">
                        <span>
                          <svg
                            width="10"
                            height="16"
                            viewBox="0 0 10 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                              fill="#3E75B2"
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

        <div
          className="product-des-wrapper w-full relative pb-[60px]"
          ref={reviewElement}
        >
          <div className="tab-buttons w-full mb-5 mt-5 sm:mt-0">
            <div className="container-x mx-auto">
              <ul className="flex border-b border-gray-100">
                <li>
                  <span
                    onClick={() => setTab("des")}
                    className={`py-[15px] px-4 sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                      tab === "des"
                        ? "border-qyellow text-qblack "
                        : "border-transparent text-qgray"
                    }`}
                  >
                    Chi tiết sản phẩm
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setTab("review")}
                    className={`py-[15px] px-4 sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                      tab === "review"
                        ? "border-qyellow text-qblack "
                        : "border-transparent text-qgray"
                    }`}
                  >
                    Đánh giá
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setTab("info")}
                    className={`py-[15px] px-4 sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                      tab === "info"
                        ? "border-qyellow text-qblack "
                        : "border-transparent text-qgray"
                    }`}
                  >
                    Thông tin người bán
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
          </div>
          <div className="tab-contents w-full min-h-[400px] ">
            <div className="container-x mx-auto">
              {tab === "des" && (
                <div data-aos="fade-up" className="w-full tab-content-item">
                  <h6 className="text-base font-medium text-gray-800 italic mb-2">
                    Mô tả sản phẩm
                  </h6>
                  <p className="text-[15px] text-qgray text-normal mb-10">
                    {productDetail && productDetail.description}
                  </p>
                  <div>
                    <h6 className="text-base text-gray-800 italic font-medium mb-4">
                      Thông tin chi tiết:
                    </h6>
                    <ul className="ml-[15px]">
                      {productDetail &&
                        productDetail.productAttrList &&
                        productDetail.productAttrList.map((item) => {
                          return (
                            <li className="font-normal text-gray-700 leading-9 text-xs">
                              <span className="font-semibold">
                                {item?.nameAttr}:{" "}
                              </span>
                              {item?.attrValue}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              )}
              {tab === "review" && (
                <div className="w-full tab-content-item">
                  {/* review-comments */}
                  <div className="w-full">
                    {handleFetchEvaludate.data &&
                      handleFetchEvaludate.data.map((item: any) => {
                        return (
                          <div>
                            <div
                              // key={reply.id}
                              className="sub-comment-item bg-white px-10 py-4 border-b border-slate-100"
                            >
                              <div className="comment-author  mb-3">
                                <div className="flex gap-x-3 items-start">
                                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                    <img
                                      src={
                                        item?.userImage ? item?.userImage : ""
                                      }
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-qblack">
                                      {item?.username ? item?.username : ""}
                                    </p>
                                    <p className="text-[10px] italic font-normal text-qgray">
                                      {item?.dateEvaluate
                                        ? item?.dateEvaluate
                                        : ""}
                                    </p>
                                    <div className="ml-3 mt-2 text-gray-700 text-xs flex flex-col gap-y-2 mb-2">
                                      <p>"{item?.title ? item?.title : ""}"</p>
                                      <p>
                                        {item?.content ? item?.content : ""}
                                      </p>
                                    </div>
                                    <div className="flex gap-x-2">
                                      {item?.imageList &&
                                        item?.imageList?.map((i: any) => {
                                          return (
                                            <img
                                              src={i?.image}
                                              className="w-28 h-14 object-cover object-top border border-gray-100"
                                              alt=""
                                            />
                                          );
                                        })}
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
              )}
              {tab === "info" && (
                <div className="w-full tab-content-item">
                  {handleFetchStore.data && (
                    <div className="saller-info sm:flex justify-between items-center pb-[30px] border-[#E8E8E8]">
                      <div className="sm:flex sm:space-x-5 items-center sm:w-1/4">
                        <div className="saller w-[73px] h-[73px] rounded-full overflow-hidden">
                          <img
                            src={handleFetchStore.data.image}
                            alt="saller"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h6 className="text-[18px] font-medium leading-[30px]">
                            {handleFetchStore.data.name}
                          </h6>
                          <p className="text-[13px] font-normal text-qgray leading-[30px]">
                            {handleFetchStore.data.districtName},
                            {handleFetchStore.data.provinceName}
                          </p>
                          <div className="flex items-center mt-4">
                            <div className="flex">
                              {/* <Star w="15" h="15" />
                            <Star w="15" h="15" />
                            <Star w="15" h="15" />
                            <Star w="15" h="15" />
                            <Star w="15" h="15" /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] border-b mt-5 sm:mt-0">
                        <div className="w-full mb-5 sm:mb-0">
                          <ul>
                            <li className="text-qgray leading-[30px]">
                              <span className="text-[15px] text-gray-700 font-medium">
                                Số điện thoại:
                              </span>
                              {handleFetchStore.data.phone}
                            </li>
                            <li className="text-qgray leading-[30px] text-xs">
                              <span className="text-[15px] text-gray-700 font-medium">
                                Email:{" "}
                              </span>
                              {handleFetchStore.data.email}
                            </li>
                            <li className="text-qgray leading-[30px] text-xs">
                              <span className="text-[15px] text-gray-700 font-medium">
                                Trạng thái:{" "}
                              </span>
                              {handleFetchStore.data.status == "active" &&
                                "Đang hoạt động"}
                            </li>
                          </ul>
                        </div>
                        <div className="w-full ">
                          <ul>
                            <li className="text-qgray leading-[30px] text-xs">
                              <span className="text-[15px] text-gray-700 font-medium">
                                Lượt theo dõi:{" "}
                              </span>
                              {handleFetchStore.data.numberOfFollowed}
                            </li>
                            <li className="text-qgray leading-[30px] text-xs">
                              <span className="text-[15px] text-gray-700 font-medium">
                                Lượt thích:{" "}
                              </span>
                              {handleFetchStore.data.numberOfLiked}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="related-product w-full bg-white">
          <div className="container-x mx-auto">
            <div className="w-full py-[60px]">
              <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                Sản phẩm liên quan
              </h1>
              <div
                data-aos="fade-up"
                className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
              >
                <DataIteration
                  datas={data.products}
                  startLength={5}
                  endLength={9}
                >
                  {({ datas }) => (
                    <div key={datas.id} className="item">
                      <ProductCardStyleOne datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div> */}

        <SectionStyleOne
          products={
            handleFetchProductByStore.data ? handleFetchProductByStore.data : []
          }
          categoryTitle="Mobile & Tablet"
          sectionTitle="Sản phẩm liên quan"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </div>
      {/* {report && (
        <div className="w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center">
          <div
            onClick={() => setReport(!report)}
            className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
          ></div>
          <div
            data-aos="fade-up"
            className="sm:w-[548px] sm:h-[509px] w-full h-full bg-white relative py-[40px] px-[38px]"
            style={{ zIndex: "999" }}
          >
            <div className="title-bar flex items-center justify-between mb-3">
              <h6 className="text-2xl font-medium">Báo cáo sản phẩm</h6>
              <span
                className="cursor-pointer"
                onClick={() => setReport(!report)}
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                    fill="#F34336"
                  />
                </svg>
              </span>
            </div>

            <div className="inputs w-full">
              <div className="w-full mb-5">
                <InputCom
                  label="Tiêu đề"
                  placeholder=""
                  type="text"
                  name="name"
                  inputClasses="h-[50px]"
                  labelClasses="text-[13px] font-600 leading-[24px] text-qblack"
                />
              </div>
              <div className="w-full mb-[40px]">
                <h6 className="input-label  capitalize text-[13px] font-600 leading-[24px] text-qblack block mb-2 ">
                  Mô tả:
                </h6>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={6}
                  className="w-full focus:ring-0 focus:outline-none py-3 px-4 border border-qgray-border  placeholder:text-sm text-sm"
                  placeholder=""
                ></textarea>
              </div>

              <button type="button" className="w-full h-[50px] black-btn">
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
