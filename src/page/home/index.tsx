// import { useEffect, useState } from "react";

// import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import datas from "../../data/products.json";
// import Layout from "@/component_common/Partials/Headers/Layout";
import {
  SectionStyleOne,
  ViewMoreTitle,
  SectionStyleTwo,
  SectionStyleThree,
  SectionStyleFour,
} from "@/component_common";
import { fetchDataCommon, postDataCommon } from "@/api/commonApi";
import { useQuery } from "@tanstack/react-query";
import ProductCardStyleOne from "@/component_common/Helpers/Cards/ProductCardStyleOne";
import BannerComponent from "@/component_common/banner/BannerComponent";
import { BannerObject } from "@/type/TypeCommon";
import { useEffect, useState } from "react";

type ListObject = {
  typeGoodCode?: string;
  data?: any[];
};

export default function Home() {
  const { products } = datas;
  const brands: any = [];
  // JSON.parse(sessionStorage.getItem("user"));
  products.forEach((product) => {
    brands.push(product.brand);
  });
  const [dataFilter, setDataFilter] = useState<ListObject[]>([]);

  const {
    data: dataProducts,
    isSuccess: isSuccessProducts,
    isError: isErrorProducts,
    isFetching: isFetchingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchDataCommon("/common/product/all"),
  });

  useEffect(() => {
    if (isSuccessProducts && dataProducts && dataProducts.length > 0) {
      let newDataList: ListObject[] = [];
      dataProducts?.forEach((item: any) => {
        if (newDataList.find((i) => i.typeGoodCode == item.typeGoodCode)) {
          newDataList
            .find((i) => i.typeGoodCode == item.typeGoodCode)
            ?.data?.push(item);
        } else {
          newDataList.push({ typeGoodCode: item.typeGoodCode, data: [item] });
        }
      });
      setDataFilter(newDataList);
    }
  }, [isSuccessProducts, dataProducts]);
  const handleFetchBanner = useQuery({
    queryKey: ["bannerAll"],
    queryFn: () => fetchDataCommon("/common/all-banner"),
  });

  // const setUser = actors.

  // const [ads, setAds] = useState(false);
  // const adsHandle = () => {
  //   setAds(false);
  // };
  // useEffect(() => gs
  // {
  //   setAds(true);
  // }, []);
  return (
    <>
      {/* {ads && <Ads handler={adsHandle} />} */}
      <div className="btn w-5 h-5 "></div>
      <div className="mx-auto container-x relative grid grid-cols-[3fr_2fr] gap-3 mb-10 w-full">
        {handleFetchBanner.data &&
          handleFetchBanner.data.slice(0, 1).map((item: BannerObject) => {
            return (
              <BannerComponent
                typeGood={item.typeGoodName ? item.typeGoodName : ""}
                className="w-full h-[500px]"
                link={"/single-product/" + item.productCode}
                title={item.title ? item.title : ""}
                url={item.image ? item.image : ""}
              ></BannerComponent>
            );
          })}
        <div className="grid grid-rows-2 gap-3 h-[500px]">
          {handleFetchBanner.data &&
            handleFetchBanner.data.slice(1, 3).map((item: BannerObject) => {
              return (
                <BannerComponent
                  typeGood={item.typeGoodName ? item.typeGoodName : ""}
                  className="w-full h-full"
                  link={"/single-product/" + item.productCode}
                  title={item.title ? item.title : ""}
                  url={item.image ? item.image : ""}
                ></BannerComponent>
              );
            })}
        </div>
      </div>

      {dataFilter &&
        dataFilter.length > 0 &&
        dataFilter.map((item) => {
          return (
            <SectionStyleOne
              products={item.data ? item.data : []}
              categoryTitle="Mobile & Tablet"
              sectionTitle={item.data ? item.data[0].typeGoodName : ""}
              seeMoreUrl="/all-products"
              className="category-products mb-[60px]"
            />
          );
        })}
      {/* <BrandSection
        sectionTitle="Shop by Brand"
        className="brand-section-wrapper mb-[60px]"
        categoryTitle={null}
        categoryBackground={null}
      />
      <CampaignCountDown className="mb-[60px]" lastDate="2023-10-04 4:00:00" />
      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo
          products={products.slice(3, products.length)}
          categoryTitle={null}
          categoryBackground={null}
        />
      </ViewMoreTitle>
      <ViewMoreTitle
        className="best-sallers-section mb-[60px]"
        seeMoreUrl="/sallers"
        categoryTitle="Best Saller"
      >
        <BestSellers />
      </ViewMoreTitle>
      <ProductsAds
        ads={[`/assets/images/ads-1.png`, `/assets/images/ads-2.png`]}
        sectionHeight="sm:h-[295px] h-full"
        className="products-ads-section mb-[60px]"
      /> */}
      {/* <SectionStyleOne
        categoryBackground={`/assets/images/BannerDrinks.png`}
        products={products.slice(4, products.length)}
        brands={brands}
        categoryTitle="Trà sữa"
        sectionTitle="Đồ uống"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      /> */}
      {/* <ProductsAds
        ads={[`/assets/images/ads-3.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleThree
        products={products}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
        categoryTitle={null}
        categoryBackground={null}
      />
      <ProductsAds
        sectionHeight="164"
        ads={[`/assets/images/ads-4.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleFour
        products={products}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
        categoryTitle={null}
        categoryBackground={null}
      /> */}
    </>
  );
}
