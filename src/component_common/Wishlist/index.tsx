import { useMutation, useQuery } from "@tanstack/react-query";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import { useUserStore } from "@/store";
import { getUserWishList, postData } from "@/api/commonApi";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "..";
import { WishListProps } from "@/type/TypeCommon";
import { useCartStore } from "@/store/cartStore";

// type WishListProps = {
//   productCode: number;
//   productName: string;
//   productImage: string;
//   typeGoodName: string;
//   typeGoodCode: string;
// };

export default function Wishlist() {
  const { currentUser } = useUserStore();
  const { updateCart } = useCartStore();
  const [list, setList] = useState<WishListProps[]>([]);

  const wishtList = useQuery({
    queryKey: ["wishList"],
    queryFn: async () => getUserWishList({ userLogin: currentUser?.userLogin }),
  });

  useEffect(() => {
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
          {" "}
          {!wishtList.data ? (
            <div className="wishlist-page-wrapper w-full">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "wishlist", path: "/wishlist" },
                  ]}
                />
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
