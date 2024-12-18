import { useEffect, useRef, useState } from "react";
import productDatas from "../../data/products.json";
import shopInfo from "../../data/shopInfo.json";

// import Star from "../Helpers/icons/Star";

import ProductsFilter from "../AllProductPage/ProductsFilter";
import Layout from "@/component_common/Partials/Headers/Layout";
import DataIteration from "@/component_common/Helpers/DataIteration";
import ProductCardStyleOne from "@/component_common/Helpers/Cards/ProductCardStyleOne";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataCommon, postData, postDataCommon } from "@/api/commonApi";
import { useUserStore } from "@/store";
import {
  BannerObject,
  GroupMessageObject,
  StoreDetailObject,
  StoreFollowObject,
  VoucherObject,
} from "@/type/TypeCommon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonForm } from "@/component_common";
import { toast } from "sonner";
import VoucherComponent from "@/component_common/voucher/VoucherComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageObject, useMessageUserStore } from "@/store/messageUserStore";
import BannerComponent from "@/component_common/banner/BannerComponent";

type FilterState = {
  [key: string]: boolean;
};

export default function SallerPage() {
  const queryClient = useQueryClient();
  const { currentUser } = useUserStore();
  const { messages, addFrameMessage, openFrameMessage, setMessages } =
    useMessageUserStore();
  const [store, setStore] = useState<StoreDetailObject | null>(null);

  const { id } = useParams();
  const fetchStore = useMutation({
    mutationFn: (body: any) => postDataCommon(body, "/common/store/detail"),
  });

  const handlePostFollow = useMutation({
    mutationFn: (body: any) => postData(body, "/user/store/follow"),
    onSuccess: (data: StoreFollowObject) => {
      if (store) {
        setStore({ ...store, followed: true });
      }
      if (queryClient.getQueryData(["storeFollows"])) {
        queryClient.setQueryData(
          ["storeFollows"],
          (oldData: StoreFollowObject[]) => {
            return [data, ...oldData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "storeFollows",
        });
      }
    },
  });

  const handleFetchVoucher = useQuery({
    queryKey: ["vouchers_store"],
    queryFn: () =>
      postDataCommon(
        {
          userLogin: currentUser?.userLogin ? currentUser.userLogin : null,
          storeCode: id,
        },
        "/common/store/all-voucher"
      ),
  });
  const fetchTypeGood = useQuery({
    queryKey: ["typeGoods"],
    queryFn: () => fetchDataCommon("/common/type-good/all"),
  });

  const handleFetchBanner = useQuery({
    queryKey: ["banner_store"],
    queryFn: () =>
      postDataCommon(
        {
          storeCode: id,
        },
        "/common/store/all-banner"
      ),
    enabled: id != null,
  });

  const handleFetchProduct = useQuery({
    queryKey: ["store_products"],
    queryFn: () =>
      postDataCommon(
        {
          storeCode: id,
        },
        "/common/store/all-product"
      ),
    enabled: id != null,
  });

  const handlePostUnFollow = useMutation({
    mutationFn: (body: any) => postData(body, "/user/store/unfollow"),
    onSuccess: (data: StoreFollowObject) => {
      if (store) {
        setStore({ ...store, followed: false });
      }
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

  const handleCreateGroup = useMutation({
    mutationFn: (body: any) => postData(body, "/user/message/create-group"),
    onSuccess: (data: GroupMessageObject) => {
      const message: MessageObject = {
        id: data.groupCode,
        image: data.storeImage,
        minimizeFrame: true,
        name: data.storeName,
        idReceive: data.storeCode,
      };
      setMessages([...messages, message]);
      // if (store) {
      //   setStore({ ...store, followed: false });
      // }
      // if (queryClient.getQueryData(["storeFollows"])) {
      //   queryClient.setQueryData(
      //     ["storeFollows"],
      //     (oldData: StoreFollowObject[]) => {
      //       return [
      //         ...oldData.filter(
      //           (item: StoreFollowObject) => item.storeCode != data.storeCode
      //         ),
      //       ];
      //     }
      //   );
      // } else {
      //   queryClient.invalidateQueries({
      //     predicate: (query) => query.queryKey[0] === "storeFollows",
      //   });
      // }
    },
  });

  const handlePostSaveVoucher = useMutation({
    mutationFn: (body: any) => postData(body, "/user/voucher/new"),
    onSuccess: (data: VoucherObject) => {
      console.log(queryClient.getQueryData(["vouchers_store"]));
      if (queryClient.getQueryData(["vouchers_store"])) {
        queryClient.setQueryData(
          ["vouchers_store"],
          (oldData: VoucherObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [
              ...oldData.filter((item) => item.voucherCode != data.voucherCode),
            ];
          }
        );
        toast.success("Lưu voucher thành công!", {
          className: "p-4",
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "vouchers",
        });
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStore.mutateAsync({
        storeCode: id,
        userLogin: currentUser?.userLogin ? currentUser?.userLogin : null,
      });
      setStore(data);
    };
    if (id) {
      fetchData();
    }
    handleFetchVoucher.refetch();
    handleFetchBanner.refetch();
    handleFetchProduct.refetch();
  }, [id]);

  const handleFollow = (): void => {
    if (currentUser) {
      handlePostFollow.mutateAsync({
        userLogin: currentUser?.userLogin,
        storeCode: store?.storeCode,
      });
    } else {
      toast.warning("Vui lòng đăng nhập để sử dụng tính năng này!", {
        className: "p-4",
      });
    }
  };

  const handleUnFollow = (): void => {
    handlePostUnFollow.mutateAsync({
      userLogin: currentUser?.userLogin,
      storeCode: store?.storeCode,
    });
  };

  const handleSaveVoucher = (item: any) => {
    if (currentUser) {
      handlePostSaveVoucher.mutateAsync({
        userLogin: currentUser.userLogin,
        voucherCode: item.voucherCode,
      });
    } else {
      toast.warning("Vui lòng đăng nhập để sử dụng tính năng này!", {
        className: "p-4",
      });
    }
  };

  const [filters, setFilter] = useState<FilterState>({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });
  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState<number[]>([200, 500]);

  const [storage, setStorage] = useState<string | null>(null);
  const filterStorage = (value: string) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  const handleSendMessage = () => {
    const findItem = messages.find(
      (item: MessageObject) => item.idReceive == store?.storeCode
    );
    if (findItem) {
      openFrameMessage(findItem.id);
    } else {
      handleCreateGroup.mutateAsync({
        userCode: currentUser?.userId,
        storeCode: store?.storeCode,
      });
    }
  };
  return (
    <>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <img
            src={store?.bannerImage ? store?.bannerImage : ""}
            className="saller-info object-cover object-center w-full sm:h-[428px] sm:flex justify-between items-center overflow-hidden relative"
          />
          {/* Mobile */}

          {/* /mobile */}

          <div className="relative h-40 border-b border-r border-l rounded-md shadow-md border-gray-100 pb-2 mb-2">
            <div className="size-36 rounded-full border-4 border-gray-50 shadow-lg overflow-hidden absolute -top-5 left-3">
              <img
                src={store?.image ? store?.image : ""}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute right-2 top-2 flex gap-x-2">
              {store?.followed ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <span
                      className={`${
                        store?.followed ? "bg-slate-400" : "bg-slate-700"
                      } px-2 rounded-md text-white py-2 flex gap-x-2 cursor-pointer text-sm`}
                    >
                      {store?.followed && <i className="ri-check-line"></i>}
                      {store?.followed ? `Đang theo dõi` : "Theo dõi"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-1" align="end">
                    <div
                      className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                      onClick={() => {
                        if (!handlePostUnFollow.isPending) {
                          handleUnFollow();
                        }
                      }}
                    >
                      <span>Hủy theo dõi</span>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <ButtonForm
                  label="Theo dõi"
                  loading={handlePostFollow.isPending}
                  type="button"
                  onClick={() => handleFollow()}
                  className="bg-primary !w-24 rounded-sm"
                ></ButtonForm>
              )}
              <ButtonForm
                label="Nhắn tin"
                loading={handlePostFollow.isPending}
                type="button"
                onClick={() => handleSendMessage()}
                className="bg-gray-400 !w-24 rounded-sm"
              ></ButtonForm>
            </div>
            <div className="pl-44 py-2 text-slate-700 w-full pt-5">
              <h5 className="text-3xl font-medium mb-2">{store?.name}</h5>
              <div className="grid grid-cols-3 pl-4 gap-x-20 gap-y-2 w-full">
                <span className="flex items-center gap-x-1">
                  <i className="ri-map-pin-line"></i> {store?.districtName},{" "}
                  {store?.provinceName}
                </span>
                <span className="flex items-center gap-x-1">
                  <i className="ri-mail-line"></i>
                  {store?.email}
                </span>
                <span className="flex items-center gap-x-1">
                  <i className="ri-phone-line"></i>
                  {store?.phone}
                </span>
                <span className="flex items-center gap-x-1">
                  {" "}
                  <span> Lượt theo dõi:</span>
                  {store?.numberOfFollowed} <i className="ri-user-fill"></i>
                </span>
                <span className="flex items-center gap-x-1">
                  <span> Lượt thích:</span>
                  {store?.numberOfLiked} <i className="ri-thumb-up-fill"></i>
                </span>
              </div>
            </div>
          </div>

          {/* {handleFetchBanner.data &&
            handleFetchBanner.data
              .filter((item: any) => item.bannerPosition == "top")
              .slice(0, 1)
              .map((item: any) => {
                return (
                  <NavLink to={`/single-product/` + item.productCode}>
                    <img
                      src={item.image}
                      className="h-44 w-full object-cover object-top"
                      alt=""
                    />
                  </NavLink>
                );
              })} */}

          <div className="grid grid-cols-[1fr_4fr] gap-[30px] mt-10">
            {/* <div className="!bg-white border-r border-gray-200">
              <h5 className="text-gray-700 mb-3">Loại hàng</h5>
              <div>
                {fetchTypeGood.data &&
                  fetchTypeGood.data.map((item: any) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" className="!checked:bg-gray-500" />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div> */}
            <div className="lg:w-[270px]">
              <ProductsFilter
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                filters={filters}
                checkboxHandler={checkboxHandler}
                volume={volume}
                volumeHandler={(value: number[]) => setVolume(value)}
                storage={storage}
                filterstorage={filterStorage}
                className="mb-[30px]"
              />
              {/* ads */}
              <div className="w-full hidden lg:block h-[295px]">
                <img
                  src={`/assets/images/ads-5.png`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-3 gap-[30px]">
                {handleFetchProduct.data &&
                  handleFetchProduct.data?.length > 0 &&
                  handleFetchProduct.data
                    ?.slice(0, 6)
                    .map((item: any, index: number) => {
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
              </div>{" "}
              <div className="grid grid-cols-2 gap-2">
                {handleFetchVoucher.data &&
                  handleFetchVoucher.data?.slice(0, 2).map((item: any) => {
                    return (
                      <VoucherComponent
                        priceApply={"priceApply"}
                        item={item}
                        onSave={(value) => {
                          handleSaveVoucher(value);
                        }}
                        save={false}
                        loading={handlePostSaveVoucher.isPending}
                        amount={"amount"}
                        name={"name"}
                        dateBegin={"beginDate"}
                        dateEnd={"endDate"}
                      ></VoucherComponent>
                    );
                  })}
              </div>
              <div className="grid grid-cols-3 gap-[30px]">
                {handleFetchProduct.data &&
                  handleFetchProduct.data?.length > 0 &&
                  handleFetchProduct.data
                    ?.slice(6)
                    .map((item: any, index: number) => {
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
              {handleFetchBanner.data &&
                handleFetchBanner.data.slice(0, 1).map((item: BannerObject) => {
                  return (
                    <BannerComponent
                      typeGood={item.typeGoodName ? item.typeGoodName : ""}
                      className="w-full h-[500px]"
                      link={"/single-product/" + item.productCode}
                      title={item.title ? item.title : ""}
                      url={item.image ? item.image : ""}
                    ></BannerComponent>
                  );
                })}
            </div>
          </div>

          {/* Voucher  */}

          {/* Banner  */}
          {/* {handleFetchBanner.data &&
            handleFetchBanner.data
              .filter((item: any) => item.bannerPosition == "bottom")
              .slice(0, 1)
              .map((item: any) => {
                return (
                  <NavLink to={`/single-product/` + item.productCode}>
                    <img
                      src={item.image}
                      className="h-44 w-full object-cover object-top"
                      alt=""
                    />
                  </NavLink>
                );
              })} */}
        </div>
      </div>
    </>
  );
}
