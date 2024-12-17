import { postData } from "@/api/commonApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";

const FriendTab = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useUserStore();
  const fetchFriend = useQuery({
    queryKey: ["friends"],
    queryFn: () =>
      postData({ userLogin: currentUser?.userLogin }, "/user/friend/all"),
  });
  const handleAccept = useMutation({
    mutationFn: (userCode: string) =>
      postData(
        { userLogin: currentUser?.userLogin, userCodeSecond: userCode },
        "/user/friend/accepted"
      ),
    onSuccess: (data: any) => {
      toast.success("Chấp nhận yêu cầu kết bạn thành công!", {
        className: "p-4",
      });
      if (queryClient.getQueryData(["friends"])) {
        queryClient.setQueryData(["friends"], (oldData: any[]) => {
          const resultData = data;
          console.log(resultData);
          return [...oldData, resultData];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "friends",
        });
      }
      if (queryClient.getQueryData(["friendRequest"])) {
        queryClient.setQueryData(["friendRequest"], (oldData: any[]) => {
          const resultData = data;
          console.log(resultData);
          return [
            ...oldData.filter((item: any) => item.userCode != data.userCode),
          ];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "friendRequest",
        });
      }
    },
  });

  const handleCancelFriend = useMutation({
    mutationFn: (userCode: string) =>
      postData(
        { userLogin: currentUser?.userLogin, userCodeSecond: userCode },
        "/user/friend/cancel"
      ),
    onSuccess: (data: any) => {
      toast.success("Xóa yêu cầu kết bạn thành công!", {
        className: "p-4",
      });
      if (queryClient.getQueryData(["friends"])) {
        queryClient.setQueryData(["friends"], (oldData: any[]) => {
          const resultData = data;
          console.log(resultData);
          return [
            ...oldData.filter((item: any) => item.userCode != data.userCode),
          ];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "friends",
        });
      }
      if (queryClient.getQueryData(["friendRequest"])) {
        queryClient.setQueryData(["friendRequest"], (oldData: any[]) => {
          const resultData = data;
          console.log(resultData);
          return [
            ...oldData.filter((item: any) => item.userCode != data.userCode),
          ];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "friendRequest",
        });
      }
    },
  });
  const fetchFriendRequest = useQuery({
    queryKey: ["friendRequest"],
    queryFn: () =>
      postData(
        { userLogin: currentUser?.userLogin },
        "/user/friend/all-pending"
      ),
  });

  useEffect(() => {
    if (currentUser?.userLogin) {
      fetchFriend.refetch();
      fetchFriendRequest.refetch();
    }
  }, [currentUser]);

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="account">Bạn bè</TabsTrigger>
        <TabsTrigger value="password">Yêu cầu kết bạn</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="grid grid-cols-2 gap-x-3">
        {fetchFriend.data && fetchFriend.data.length > 0 ? (
          fetchFriend.data.map((item: any) => {
            return (
              <div
                className={`h-fit border-gray-200 
                } cursor-pointer flex gap-x-2 relative items-start rounded-sm border p-2`}
              >
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="text-xs bg-slate-300 w-fit absolute bottom-2 py-1 px-3 right-2 rounded-sm flex items-center justify-center text-gray-800">
                        <i className="ri-check-line"></i> Bạn bè
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-1" align="end">
                      {item?.status == "accepted" && (
                        <>
                          <div
                            className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                            onClick={() => {
                              if (item && item.userCode) {
                                handleCancelFriend.mutateAsync(item.userCode);
                              }
                            }}
                          >
                            <span>Hủy kết bạn</span>
                          </div>
                        </>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ00dn9Pydr5-Mv1DIo4Vx0x9gOXSO-kIGYgCTZf4uIWBGCqNju6--rMgEsGm0yQx1Y8cQ&usqp=CAU"
                  }
                  className="size-10 object-cover object-top rounded-full"
                  alt=""
                />
                <div className="text-gray-600">
                  <span>{item.username}</span>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-sm text-gray-600">Không có bạn bè</span>
        )}
      </TabsContent>
      <TabsContent value="password" className="grid grid-cols-2 gap-3">
        {fetchFriendRequest.data && fetchFriendRequest.data.length > 0 ? (
          fetchFriendRequest.data.map((item: any) => {
            return (
              <div
                className={`h-fit border-gray-200 
                } cursor-pointer flex gap-x-2 relative items-start rounded-sm border p-2`}
              >
                <div className="text-sm w-fit absolute bottom-2 right-2 rounded-sm flex items-center justify-center text-gray-800">
                  <Popover>
                    <PopoverTrigger asChild>
                      <span
                        className={`${
                          true ? "bg-slate-400" : "bg-slate-700"
                        } px-2 rounded-md text-white py-1 flex gap-x-2 cursor-pointer text-xs items-center`}
                      >
                        {item?.status == "pending" && "Yêu cầu kết bạn"}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-1" align="end">
                      {item?.status == "pending" && (
                        <>
                          <div
                            className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                            onClick={() => {
                              if (item && item.userCode) {
                                handleAccept.mutateAsync(item.userCode);
                              }
                            }}
                          >
                            <span>Chấp nhận</span>
                          </div>
                          <div
                            className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                            onClick={() => {
                              if (item && item.userCode) {
                                handleCancelFriend.mutateAsync(item.userCode);
                              }
                            }}
                          >
                            <span>Hủy kết bạn</span>
                          </div>
                        </>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ00dn9Pydr5-Mv1DIo4Vx0x9gOXSO-kIGYgCTZf4uIWBGCqNju6--rMgEsGm0yQx1Y8cQ&usqp=CAU"
                  }
                  className="size-10 object-cover object-top rounded-full"
                  alt=""
                />
                <div className="text-gray-600">{item.username}</div>
              </div>
            );
          })
        ) : (
          <span className="text-gray-500 text-sm">
            Không có yêu cầu kết bạn...
          </span>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default FriendTab;
