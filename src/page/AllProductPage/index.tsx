import { useState } from "react";
import productDatas from "../../data/products.json";
import ProductsFilter from "./ProductsFilter";
import Layout from "@/component_common/Partials/Headers/Layout";
import BreadcrumbCom from "@/component_common/BreadcrumbCom";
import DataIteration from "@/component_common/Helpers/DataIteration";
import ProductCardStyleOne from "@/component_common/Helpers/Cards/ProductCardStyleOne";
import { useQuery } from "@tanstack/react-query";
import { fetchDataCommon } from "@/api/commonApi";
import { PageTitle } from "@/component_common";
import { BannerObject } from "@/type/TypeCommon";
import BannerComponent from "@/component_common/banner/BannerComponent";

type FilterState = {
  [key: string]: boolean;
};

export default function AllProductPage() {
  const {
    data: dataProducts,
    isSuccess: isSuccessProducts,
    isError: isErrorProducts,
    isFetching: isFetchingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchDataCommon("/common/product/all"),
  });
  const [filters, setFilter] = useState<FilterState>({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState<number[]>([200, 500]);

  const [storage, setStorage] = useState<string | null>(null);
  const filterStorage = (value: string) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  const handleFetchBanner = useQuery({
    queryKey: ["bannerAll"],
    queryFn: () => fetchDataCommon("/common/all-banner"),
  });

  const { products } = productDatas;

  return (
    <>
      {/* <Layout> */}
      <div className="products-page-wrapper w-full">
        {/* <PageTitle
          title="Mua sắm"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Cửa hàng", path: "/Mua sắm" },
          ]}
        /> */}
        <div className="container-x mx-auto">
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-[270px]">
              <ProductsFilter
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                filters={filters}
                checkboxHandler={checkboxHandler}
                volume={volume}
                volumeHandler={(value: number[]) => setVolume(value)}
                storage={storage}
                filterstorage={filterStorage}
                className="mb-[30px]"
              />
              {/* ads */}
              <div className="w-full hidden lg:block h-[295px]">
                <img
                  src={`/assets/images/ads-5.png`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 md:justify-between md:items-center">
                <div>
                  <p className="font-400 text-[13px]">
                    {dataProducts && dataProducts.length} Sản phẩm
                  </p>
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="font-400 text-[13px]">Sort by:</span>
                  <div className="flex space-x-3 items-center border-b border-b-qgray">
                    <span className="font-400 text-[13px] text-qgray">
                      Default
                    </span>
                    <span>
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                      </svg>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setToggle(!filterToggle)}
                  type="button"
                  className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-[30px]">
                {dataProducts &&
                  dataProducts?.length > 0 &&
                  dataProducts?.slice(0, 6).map((item: any, index: number) => {
                    return (
                      <ProductCardStyleOne
                        key={item.id || index}
                        item={item}
                        id={"productCode"}
                        name={"name"}
                        image={"image"}
                        pointEvaluate={"pointEvaluate"}
                        minPrice={"minPrice"}
                        maxPrice={"maxPrice"}
                        typeGoodName={"typeGoodName"}
                        typeGoodCode={"typeGoodCode"}
                        numberOfEvaluates={"numberOfEvaluates"}
                        numberOfLikes={"numberOfLikes"}
                        provinceName={"provinceName"}
                        provinceCode={"provinceCode"}
                      />
                    );
                  })}
              </div>
              <div className="py-2 grid grid-cols-2 gap-3">
                {handleFetchBanner.data &&
                  handleFetchBanner.data
                    .slice(0, 4)
                    .map((item: BannerObject) => {
                      return (
                        <BannerComponent
                          typeGood={item.typeGoodName ? item.typeGoodName : ""}
                          className="w-full h-[200px]"
                          link={"/single-product/" + item.productCode}
                          title={item.title ? item.title : ""}
                          url={item.image ? item.image : ""}
                        ></BannerComponent>
                      );
                    })}
              </div>
              <div className="grid grid-cols-3 gap-[30px]">
                {dataProducts &&
                  dataProducts?.length > 0 &&
                  dataProducts?.slice(6).map((item: any, index: number) => {
                    return (
                      <ProductCardStyleOne
                        key={item.id || index}
                        item={item}
                        id={"productCode"}
                        name={"name"}
                        image={"image"}
                        pointEvaluate={"pointEvaluate"}
                        minPrice={"minPrice"}
                        maxPrice={"maxPrice"}
                        typeGoodName={"typeGoodName"}
                        typeGoodCode={"typeGoodCode"}
                        numberOfEvaluates={"numberOfEvaluates"}
                        numberOfLikes={"numberOfLikes"}
                        provinceName={"provinceName"}
                        provinceCode={"provinceCode"}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
}
