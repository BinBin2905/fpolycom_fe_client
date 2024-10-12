// import { useEffect, useState } from "react";

// import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import datas from "../../data/products.json";
import Layout from "@/component_common/Partials/Headers/Layout";
import SectionStyleOne from "@/component_common/Helpers/SectionStyleOne";
import ViewMoreTitle from "@/component_common/Helpers/ViewMoreTitle";
import SectionStyleTwo from "@/component_common/Helpers/SectionStyleTwo";
import SectionStyleThree from "@/component_common/Helpers/SectionStyleThree";
import SectionStyleFour from "@/component_common/Helpers/SectionStyleFour";

export default function Home() {
  const { products } = datas;
  const brands: any = [];
  // JSON.parse(sessionStorage.getItem("user"));
  products.forEach((product) => {
    brands.push(product.brand);
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
      <Banner className="banner-wrapper mb-[60px]" />
      <SectionStyleOne
        products={products}
        brands={brands}
        categoryTitle="Mobile & Tablet"
        sectionTitle="Gamer World"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />
      <BrandSection
        sectionTitle="Shop by Brand"
        className="brand-section-wrapper mb-[60px]"
      />
      <CampaignCountDown className="mb-[60px]" lastDate="2023-10-04 4:00:00" />
      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo products={products.slice(3, products.length)} />
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
      />
      <SectionStyleOne
        categoryBackground={`/assets/images/BannerDrinks.png`}
        products={products.slice(4, products.length)}
        brands={brands}
        categoryTitle="Trà sữa"
        sectionTitle="Đồ uống"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />
      <ProductsAds
        ads={[`/assets/images/ads-3.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleThree
        products={products}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
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
      />
    </>
  );
}
