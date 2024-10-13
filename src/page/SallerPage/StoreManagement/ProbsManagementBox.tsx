import { SanPham } from "../../../hooks/type";
import ProductCardBoxOwnerView from "./ProductCardBoxOwnerView";
import ProductRowOwnerView from "./ProductRowOwnerView";
import ProductRowOwnerView2nd from "./ProductRowOwnerView2nd";

export default function ProbsManagement({
  productsList,
  type,
}: {
  productsList: SanPham[];
  type: string;
}) {
  return (
    <div className="flex-1 mt-4">
      {type === "grid" && (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
          <button
            className="border-[2px] border-dashed border-blue-400 min-h-[100px] rounded-lg text-blue-600
            hover:border-0 hover:bg-blue-300 hover:text-white transition-colors ease-linear
            sm:block hidden"
          >
            <span>THÊM SẢN PHẨM</span>
          </button>

          {productsList.map((product) => (
            <div key={product.id} className="item">
              <ProductCardBoxOwnerView data={product} />
            </div>
          ))}
        </div>
      )}
      {type === "list" && (
        <div className="flex flex-col">
          <button
            className="border-[2px] border-dashed border-blue-400 min-h-[60px] rounded-lg text-blue-600
            hover:border-0 hover:bg-blue-300 hover:text-white transition-colors ease-linear mb-5
            sm:block hidden"
          >
            <span>THÊM SẢN PHẨM</span>
          </button>

          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-200 border-b-2 border-gray-200 font-semibold tracking-wide text-left ">
                <tr>
                  <th className="w-5 p-3 text-sm font-semibold tracking-wide text-left">
                    #
                  </th>
                  <th className="py-3 pl-1 text-sm">Sản phẩm</th>
                  <th className="w-12 p-3 text-sm">SL</th>
                  <th className="w-[30px] p-3 text-sm">Giá</th>
                  <th className="w-32 p-3 text-sm">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productsList.map((product, index) => (
                  <ProductRowOwnerView
                    key={product.id}
                    data={product}
                    int={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {productsList.map((product, index) => (
              <ProductRowOwnerView2nd
                key={product.id}
                data={product}
                int={index + 1}
              />
            ))}
          </div>

          {/* {productsList.map((product) => (

                <ProductRowOwnerView>

            //   <tr key={product.id} className="item border-b-[1px]">
            //     <td className="">Indiana</td>
            //     <td className="">Indianapolis</td>
            //   </tr>
            ))} */}

          {/* // <div key={product.id} className="item">
            //     <ProductCardBoxOwnerView data={product} />
            // </div> */}
        </div>
      )}

      <button className="min-h-[50px] text-white bg-blue-500 sm:hidden fixed bottom-0 w-full left-0">
        <span>THÊM SẢN PHẨM</span>
      </button>
    </div>
  );
}
