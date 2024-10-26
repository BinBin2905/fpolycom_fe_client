import { postData } from "@/api/commonApi";
import InputQuantityCom from "@/component_common/Helpers/InputQuantityCom";
import { useUserStore } from "@/store";
import { StoreFollowObject, WishListObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const StoreFollowTab = () => {
  const { currentUser } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["storeFollows"],
    queryFn: () =>
      postData(
        { userLogin: currentUser?.userLogin ? currentUser.userLogin : null },
        "/user/store/all-follow"
      ),
    enabled: currentUser != null,
  });
  const handlePostUnFollow = useMutation({
    mutationFn: (body: any) => postData(body, "/user/store/unfollow"),
    onSuccess: (data: StoreFollowObject) => {
      if (queryClient.getQueryData(["storeFollows"])) {
        queryClient.setQueryData(
          ["storeFollows"],
          (oldData: StoreFollowObject[]) => {
            return [
              ...oldData.filter(
                (item: StoreFollowObject) => item.storeCode != data.storeCode
              ),
            ];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "storeFollows",
        });
      }
    },
  });
  return (
    <>
      <div className={`w-full`}>
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {/* table heading */}
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                  Cửa hàng
                </td>

                <td className="whitespace-nowrap text-right w-[200px]  bg-transparentk"></td>
              </tr>
              {/* table heading end */}
              {data && data.length > 0 ? (
                data.map((item: StoreFollowObject) => {
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="pl-10  py-4 ">
                        <div
                          onClick={() => {
                            document
                              .getElementById("appLoginUser")
                              ?.scrollTo(0, 0);
                            navigate("/saller-page/" + item.storeCode);
                          }}
                          className="cursor-pointer flex space-x-6 items-center"
                        >
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                            <img
                              src={item.storeImage ? item.storeImage : ""}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.storeName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="text-right py-4">
                        <div
                          onClick={() => {
                            if (currentUser && item.storeCode) {
                              handlePostUnFollow.mutateAsync({
                                userLogin: currentUser?.userLogin,
                                storeCode: item.storeCode,
                              });
                            }
                          }}
                          className="cursor-pointer flex space-x-1 items-center justify-center"
                        >
                          <span>
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
                })
              ) : (
                <div className="py-3 px-5">Không có cửa hàng theo dõi!</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="w-full mt-[30px] flex sm:justify-end justify-start">
      <div className="sm:flex sm:space-x-[30px] items-center">
        <button type="button">
          <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
            Clean Wishlist
          </div>
        </button>
        <div className="w-[180px] h-[50px]">
          <button type="button" className="yellow-btn">
            <div className="w-full text-sm font-semibold">
              Add to Cart All
            </div>
          </button>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default StoreFollowTab;
