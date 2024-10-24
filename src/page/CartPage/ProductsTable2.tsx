








<div className="relative w-full overflow-x-auto">
        {dataFilter.map((data) => {
          return (
            <table className="w-full text-sm border text-left text-gray-500 dark:text-gray-400 mb-4">
              <tbody>
                {/* table heading */}
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                  <td className="py-4 whitespace-nowrap text-center">
                    <input
                      className="accent-amber-600"
                      id={`ch${data.storeCode}`}
                      type="checkbox"
                      onChange={(e) => {
                        if (data.storeCode) {
                          checkAllProduct(data.storeCode, e.target.checked);
                        }
                      }}
                    />
                  </td>
                  <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                    <label
                      htmlFor={`ch${data.storeCode}`}
                      className="cursor-pointer"
                    >
                      {data.storeName}
                    </label>
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Lựa chọn
                  </td>
                  <td className="py-4 whitespace-nowrap text-center">Giá</td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Số lượng
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Tổng tiền
                  </td>
                  <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
                </tr>
                {/* table heading end */}
                {data.orderDetailList?.map((item) => {
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="text-center py-4 px-2">
                        <input
                          className="accent-amber-600"
                          type="checkbox"
                          id={`${item?.productDetailCode}`}
                          checked={item.checked}
                        />
                      </td>
                      <td className="pl-10 py-4 w-full">
                        <label
                          htmlFor={`${item?.productDetailCode}`}
                          className="flex space-x-6 items-center"
                        >
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                            <img
                              src={item.image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.productName} 
                            </p>
                          </div>
                        </label>
                      </td>

                      <td>
                        <div className="flex space-x-1">
                          <span className="text-[15px] font-normal">
                            {item.productDetailName}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="flex justify-center items-center">
                          <InputQuantityCom
                            item={item}
                            onBlurValue={onBlurValue}
                            increment={increment}
                            disableb={handleUpdateCart.isPending}
                            decrement={decrement}
                          />
                        </div>
                      </td>

                      <td>
                        <div className="flex space-x-1">
                          <span className="text-[15px] font-medium">
                            {item.finalTotal?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          <span className="text-[12px] font-normal line-through">
                            {item.totalDiscount?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </td>
                      
                      <td>
                        <div className="flex space-x-1 items-center justify-center">
                          <span
                            // onClick={() => removeCart(item)}
                            className="cursor-pointer"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                fill="#AAAAAA"
                              />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
          );
        })}
      </div>