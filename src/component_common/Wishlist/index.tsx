import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import { useUserStore } from "@/store";
import { getUserWishList, postData } from "@/api/commonApi";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "..";
import { WishListProps } from "@/type/TypeCommon";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export default function Wishlist() {
  const queryClient = useQueryClient();
  const { currentUser } = useUserStore();
  const { updateCart } = useCartStore();
  const [list, setList] = useState<WishListProps[]>([]);

  const wishtList = useQuery({
    queryKey: ["wishList"],
    queryFn: async () => getUserWishList({ userLogin: currentUser?.userLogin }),
  });

  const handlePostUnLikeProduct = useMutation({
    mutationFn: async (body: any) =>
      await postData(body, "/user/product/unliked"),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["wishList"] });
      toast.success("Đã bỏ thích thành công", {
        className: "p-4",
      });
    },
    onError: (data) => {
      toast.error(data.message, {
        className: "p-4",
      });
    },
  });

  useEffect(() => {
    console.log("wishtList.data: ", wishtList.data);
    if (wishtList.data) {
      setList(wishtList.data);
    }
  }, [wishtList.data]);

  const handleUpdateCart = useMutation({
    mutationFn: (body: any) => postData(body, "/user/cart/new"),
    onSuccess: (data, variables) => {
      updateCart(data);
    },
  });

  const handleUnlikeAll = async () => {
    if (list.length <= 1) {
      await handlePostUnLikeProduct.mutateAsync({
        userLogin: currentUser?.userLogin,
        productCode: list[0].productCode,
      });
    } else {
      list.map(async (item) => {
        await handlePostUnLikeProduct.mutateAsync({
          userLogin: currentUser?.userLogin,
          productCode: item.productCode,
        });
      });
    }
  };

  return (
    <div
      className={`container-x  mx-auto ${
        !wishtList.isLoading ? "" : "relative opacity-40"
      } `}
    >
      <div className="w-full">
        <PageTitle
          title="Wishlist"
          breadcrumb={[
            { name: "home", path: "/" },
            { name: "wishlist", path: "/wishlist" },
          ]}
        />
      </div>
      {!wishtList.isLoading ? (
        <>
          {wishtList.data.length == 0 ? (
            <div className="wishlist-page-wrapper w-full">
              <div className="container-x mx-auto my-3">
                {/* <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "wishlist", path: "/wishlist" },
                  ]}
                /> */}
                <EmptyWishlistError />
              </div>
            </div>
          ) : (
            <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
              {/* <div className="w-full">
                <PageTitle
                  title="Wishlist"
                  breadcrumb={[
                    { name: "home", path: "/" },
                    { name: "wishlist", path: "/wishlist" },
                  ]}
                />
              </div> */}
              <div className="w-full mt-[23px]">
                <div className="container-x mx-auto">
                  <ProductsTable list={list} className="mb-[30px]" />
                  <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                    <div className="sm:flex sm:space-x-[30px] items-center">
                      {/* <button  type="button">
                        <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                          Bỏ thích tất cả
                        </div>
                      </button> */}
                      <div className="w-[180px] h-[50px]">
                        <button
                          onClick={() => handleUnlikeAll()}
                          type="button"
                          className="yellow-btn"
                        >
                          <div className="w-full text-sm font-semibold">
                            Bỏ thích tất cả
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <SpinnerLoading></SpinnerLoading>
        </div>
      )}
    </div>
  );
}
