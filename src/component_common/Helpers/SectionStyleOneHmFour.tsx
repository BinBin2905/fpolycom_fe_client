import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import ProductCardStyleThree from "./Cards/ProductCardStyleThree";
import { SectionStyle } from "../../hooks/type";

// type SectionStyleOneHmFourProps = {
//   className: string | null;
//   sectionTitle: string;
//   seeMoreUrl: string;
//   products: [];
// };

export default function SectionStyleOneHmFour({
  className,
  sectionTitle,
  seeMoreUrl,
  products,
}: SectionStyle) {
  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <DataIteration
              datas={products}
              startLength={0}
              endLength={products.length}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleThree datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
