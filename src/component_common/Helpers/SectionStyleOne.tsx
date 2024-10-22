import { useState } from "react";
import CategoryCard from "./Cards/CategoryCard";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import { Product, SectionStyle } from "@/type/TypeCommon";

// type SectionStyleOneProps = {
//   className?: string;
//   categoryTitle: string;
//   sectionTitle: string;
//   seeMoreUrl: string;
//   brands?: any[];
//   products?: [];
//   categoryBackground: string;
// };

export default function SectionStyleOne({
  className,
  sectionTitle,
  seeMoreUrl,
  products,
}: {
  className: string;
  categoryTitle: string;
  sectionTitle: string;
  seeMoreUrl: string;
  products: Product[];
  categoryBackground?: [];
}) {
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            {/* <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                brands={filterBrands}
              />
            </div> */}

            {products &&
              products.length > 0 &&
              products.map((item, index) => {
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
      </ViewMoreTitle>
    </div>
  );
}
