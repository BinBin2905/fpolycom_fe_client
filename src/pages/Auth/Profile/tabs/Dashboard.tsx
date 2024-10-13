import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="welcome-msg w-full">
        <div>
          <h1 className="font-bold text-[24px] text-qblack">
            Lượt mua
          </h1>
        </div>
      </div>
      <div className="quick-view-grid w-full flex justify-start space-x-10 items-center mt-3 ">
        <div className="qv-item h-[208px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <svg
                width="36"
                height="37"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.4473 8.03086C32.482 8.37876 32.5 8.73144 32.5 9.08829C32.5 14.919 27.7564 19.6625 21.9258 19.6625C16.0951 19.6625 11.3516 14.919 11.3516 9.08829C11.3516 8.73144 11.3695 8.37876 11.4042 8.03086H8.98055L8.05537 0.628906H0.777344V2.74375H6.18839L8.56759 21.7774H34.1868L35.8039 8.03086H32.4473Z"
                  fill="#FFBB38"
                />
                <path
                  d="M9.09669 26.0074H6.06485C4.31566 26.0074 2.89258 27.4305 2.89258 29.1797C2.89258 30.9289 4.31566 32.352 6.06485 32.352H6.24672C6.12935 32.6829 6.06485 33.0386 6.06485 33.4094C6.06485 35.1586 7.48793 36.5816 9.23711 36.5816C11.4247 36.5816 12.9571 34.4091 12.2274 32.352H22.1081C21.377 34.413 22.9157 36.5816 25.0985 36.5816C26.8476 36.5816 28.2707 35.1586 28.2707 33.4094C28.2707 33.0386 28.2061 32.6829 28.0888 32.352H30.3856V30.2371H6.06485C5.48178 30.2371 5.00742 29.7628 5.00742 29.1797C5.00742 28.5966 5.48178 28.1223 6.06485 28.1223H33.4407L33.9384 23.8926H8.83233L9.09669 26.0074Z"
                  fill="#FFBB38"
                />
                <path
                  d="M21.9262 17.5477C26.5907 17.5477 30.3856 13.7528 30.3856 9.08829C30.3856 4.42378 26.5907 0.628906 21.9262 0.628906C17.2616 0.628906 13.4668 4.42378 13.4668 9.08829C13.4668 13.7528 17.2617 17.5477 21.9262 17.5477ZM20.8688 5.91602H22.9836V8.6503L24.7886 10.4554L23.2932 11.9508L20.8687 9.5262V5.91602H20.8688Z"
                  fill="#FFBB38"
                />
              </svg>
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Đơn hàng
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            656
          </span>
        </div>
        <div className="qv-item h-[208px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <svg
                width="33"
                height="27"
                viewBox="0 0 33 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.2253 12.8816H29.4827L28.6701 9.36514C28.376 8.10431 27.2552 7.22168 25.9662 7.22168H21.8474V3.84528C21.8474 2.03804 20.3764 0.581055 18.5831 0.581055H3.17237C1.46313 0.581055 0.0761719 1.96801 0.0761719 3.67717V20.0967C0.0761719 21.8058 1.46313 23.1928 3.17237 23.1928H4.29313C4.89555 25.1962 6.74485 26.6533 8.93037 26.6533C11.1159 26.6533 12.9792 25.1962 13.5816 23.1928C13.8455 23.1928 20.3459 23.1928 20.1942 23.1928C20.7966 25.1962 22.6459 26.6533 24.8315 26.6533C27.031 26.6533 28.8803 25.1962 29.4827 23.1928H30.2253C31.7663 23.1928 32.9992 21.9599 32.9992 20.4189V15.6555C32.9992 14.1145 31.7663 12.8816 30.2253 12.8816ZM8.93037 23.8513C7.78968 23.8513 6.88491 22.8969 6.88491 21.7918C6.88491 20.657 7.79558 19.7324 8.93037 19.7324C10.0652 19.7324 10.9898 20.657 10.9898 21.7918C10.9898 22.9151 10.0692 23.8513 8.93037 23.8513ZM13.9739 8.06224L9.79897 11.3125C9.20227 11.7767 8.30347 11.6903 7.82363 11.0604L6.21247 8.94486C5.7361 8.32843 5.86222 7.4458 6.47866 6.98346C7.08107 6.50717 7.96369 6.63321 8.44006 7.24965L9.19656 8.23035L12.2507 5.84867C12.8531 5.3864 13.7357 5.48448 14.2121 6.10092C14.6884 6.71727 14.5763 7.58595 13.9739 8.06224ZM24.8315 23.8513C23.6906 23.8513 22.7861 22.8969 22.7861 21.7918C22.7861 20.657 23.7107 19.7324 24.8315 19.7324C25.9662 19.7324 26.8909 20.657 26.8909 21.7918C26.8909 22.9166 25.9683 23.8513 24.8315 23.8513ZM22.618 10.0236H25.2798C25.6021 10.0236 25.8962 10.2337 26.0083 10.542L26.8629 13.0497C27.031 13.5541 26.6667 14.0724 26.1344 14.0724H22.618C22.1976 14.0724 21.8474 13.7222 21.8474 13.3019V10.7942C21.8474 10.3739 22.1976 10.0236 22.618 10.0236Z"
                  fill="#FFBB38"
                />
              </svg>
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Đang giao
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            656
          </span>
        </div>
      </div>
      
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
      <p className="title text-[22px] font-semibold mb-1 mt-10 w-100">Đơn hàng</p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Mã đơn
              </td>
              <td className="py-4 whitespace-nowrap text-center">Ngày</td>
              <td className="py-4 whitespace-nowrap text-center">Trạng thái</td>
              <td className="py-4 whitespace-nowrap text-center">Tổng tiền</td>
              <td className="py-4 whitespace-nowrap text-center">Hành động</td>
            </tr>
            {/* table heading end */}
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="text-center py-4">
                <span className="text-lg text-qgray font-medium">#354</span>
              </td>
              <td className="text-center py-4 px-2">
                <span className="text-base text-qgray  whitespace-nowrap">
                  Fub 05,2021
                </span>
              </td>
              <td className="text-center py-4 px-2">
                <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                  Complated
                </span>
              </td>
              <td className="text-center py-4 px-2">
                <span className="text-base text-qblack whitespace-nowrap px-2 ">
                  $757
                </span>
              </td>
              <td className="text-center py-4">
                <button
                  type="button"
                  className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
}