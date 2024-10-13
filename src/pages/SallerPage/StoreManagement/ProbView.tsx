import Layout from "../../../components/Partials/Headers/Layout";
import datas from "../../../data/dataSP.json";

export default function ProbView() {
  const data = datas.SanPham[0];

  return (
    <>
      <Layout>
        <div className="product-view w-full lg:flex justify-between container-x mx-auto bg-white pb-[60px] pt-[20px]">
          <div
            data-aos="fade-right"
            className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]"
          >
            <div className="w-full">
              <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
                <img
                  src={`/assets/images/${data.hinhAnh}`}
                  alt=""
                  className="object-contain"
                />
              </div>
              <div className="flex flex-wrap">
                {data.SanPhamChiTiet.map((product) => (
                  <img
                    key={product.id}
                    src={`/assets/images/${product.hinhAnh}`}
                    alt=""
                    className="object-contain w-1/4 h-auto p-2"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 px-3 lg:px-0">
            <div className="product-details w-full mt-10 lg:mt-0">
              <span
                data-aos="fade-up"
                className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
              >
                Điện thoại
              </span>
              <p
                data-aos="fade-up"
                className="text-xl font-medium text-qblack mb-4"
              >
                Samsung Galaxy Z Fold3 5G - Phiên bản 8GB RAM
              </p>

              <div data-aos="fade-up" className="flex space-x-2 mb-7">
                <span className="text-sm font-500 text-qgray line-through mt-2">
                  12 300 000
                </span>
                <span className="text-2xl font-500 text-qred">
                  9.000.000
                  <i className="font-400 text-[12px]">vnđ</i>
                </span>
              </div>

              <p
                data-aos="fade-up"
                className="text-qgray text-sm text-normal mb-[30px] leading-7"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <div data-aos="fade-up" className="colors mb-[30px]">
                <span className="text-sm font-normal uppercase text-qblack mb-[14px] inline-block">
                  Lựa chọn:
                </span>

                <div className="overflow-auto rounded-lg shadow">
                  <table className="w-full">
                    <thead className="bg-gray-200 border-b-2 border-gray-200 font-semibold tracking-wide text-left ">
                      <tr>
                        <th className="py-3 pl-1 text-sm">Tùy chọn</th>
                        <th className="w-[30px] p-3 text-sm">SL</th>
                        <th className="w-[30px] p-3 text-sm">Giá</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr data-aos="fade-left" className="bg-white">
                        <td className="py-4 pl-1 text-sm text-gray-700 truncate overflow-hidden sm:max-w-xs">
                          <p className="font-semibold hover:underline">ABC</p>
                        </td>

                        <td className="px-3 py-4 text-sm text-qblacktext whitespace-nowrap">
                          15
                        </td>

                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                          <span className="text-qblacktext font-semibold">
                            120.000
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                data-aos="fade-up"
                className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
              >
                <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                  <button type="button">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                          stroke="#D5D5D5"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
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
                  <span className="text-qblack">Mã sản phẩm:</span>{" "}
                  SP_SGZF35G_8GB
                </p>
                <p className="text-[13px] text-qgray leading-7">
                  <span className="text-qblack">Tồn kho :</span> 50
                </p>
                <p className="text-[13px] text-blue-900 leading-7">
                  <span className="text-qblack">Tags :</span> Điện thoại, Tai
                  nghe, Phụ kiện
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
      </Layout>
    </>
  );
}
