import { postData } from "@/api/commonApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/store";
import { UserNotifyObject } from "@/type/TypeCommon";
import { Client, Frame, StompSubscription } from "@stomp/stompjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { toast } from "sonner";

const FriendNotify = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const fetchRequest = useQuery({
    queryKey: ["friendRequest"],
    queryFn: () =>
      postData(
        { userLogin: currentUser?.userLogin },
        "/user/friend/all-pending"
      ),
    enabled: currentUser != null,
  });
  const [notifications, setNotifications] = useState<any[]>([]);
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
  useEffect(() => {
    if (currentUser?.userLogin) {
      fetchRequest.refetch();
    }
  }, [currentUser?.userLogin]);
  useEffect(() => {
    // Thiết lập SockJS connection
    if (currentUser) {
      const socketUrl = "http://localhost:8080/ws"; // URL tới server WebSocket
      const socket = new SockJS(socketUrl);

      // Tạo một client STOMP
      const stompClient = new Client({
        webSocketFactory: () => socket as WebSocket, // Chuyển đổi SockJS thành WebSocket
        debug: (str: string) => {
          console.log(str);
        },
      });

      // Xử lý khi kết nối thành công
      stompClient.onConnect = (frame: Frame) => {
        console.log("Connected: " + frame);

        // Đăng ký nhận thông báo từ endpoint "/topic/notifications"
        const subscription: StompSubscription = stompClient.subscribe(
          "/topic/notifications/friend/" + currentUser?.userId,
          (message) => {
            if (message.body) {
              if (queryClient.getQueryData(["friendRequest"])) {
                queryClient.setQueryData(
                  ["friendRequest"],
                  (oldData: any[]) => {
                    const resultData = JSON.parse(message.body);
                    console.log(resultData);
                    return [resultData, ...oldData];
                  }
                );
              } else {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === "friendRequest",
                });
              }
              toast.success("Bạn có một lượt kết bạn mới!", {
                className: "p-4",
              });
            }
          }
        );

        return () => {
          // Hủy đăng ký khi component bị unmount
          subscription.unsubscribe();
        };
      };

      // Kích hoạt STOMP client
      stompClient.activate();

      // Hủy kết nối khi component bị unmount
      return () => {
        stompClient.deactivate();
      };
    }
  }, [currentUser]);
  console.log(fetchRequest.data);
  return (
    <div className="relative">
      <Popover
        open={open}
        onOpenChange={() => {
          if (open) setOpen(false);
        }}
      >
        <PopoverTrigger
          onClick={() => setOpen(true)}
          asChild
          className="group cart relative cursor-pointer"
        >
          <div>
            <i className="ri-user-add-line text-xl font-thin text text-gray-700"></i>
            {fetchRequest.data && fetchRequest.data.length > 0 && (
              <span
                className={`w-[18px] h-[18px] rounded-full  absolute -top-1 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow`}
              >
                {fetchRequest.data.length}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-96 px-0 py-0 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <h5 className="font-semibold text-sm">Yêu cầu kết bạn</h5>
          </div>
          <div className="w-full h-[400px] custom-scrollbar-wider overflow-y-scroll">
            {fetchRequest.data &&
              (fetchRequest.data.length > 0 ? (
                fetchRequest.data.map((item: any) => {
                  return (
                    <div
                      className={`flex items-start  bg-white
                      gap-x-2 border-b py-3 cursor-pointer px-2 relative`}
                    >
                      <div
                        className="size-10 flex-shrink-0"
                        onClick={() => navigate("/user/" + item.userCode)}
                      >
                        <img
                          src={
                            item.image
                              ? item.image
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ00dn9Pydr5-Mv1DIo4Vx0x9gOXSO-kIGYgCTZf4uIWBGCqNju6--rMgEsGm0yQx1Y8cQ&usqp=CAU"
                          }
                          className="size-10 object-cover object-top rounded-full"
                          alt=""
                        />
                      </div>

                      <div
                        className="flex-auto"
                        onClick={() => navigate("/user/" + item.userCode)}
                      >
                        <p className="text-sm text-gray-700 font-medium">
                          {item && item?.username}
                        </p>
                        <p className="text-wrap h-7 w-60 text-gray-700 line-clamp-2  text-xs">
                          {item.content}
                        </p>
                      </div>
                      <div className="absolute bottom-2 right-2 flex gap-x-2">
                        <ButtonForm
                          type="button"
                          label="Chấp nhận"
                          className="text-xs !bg-qyellow px-2 !py-1 !text-gray-600 h-fit !w-fit"
                          onClick={() => {
                            if (item && item.userCode) {
                              console.log(item.userCode);
                                handleAccept.mutateAsync(item.userCode);
                            }
                          }}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          label="Hủy kết bạn"
                          className="text-xs !bg-gray-300 px-2 !py-1 !text-gray-600 h-fit !w-fit"
                          onClick={() => {
                            if (item && item.userCode) {
                              handleCancelFriend.mutateAsync(item.userCode);
                            }
                          }}
                        ></ButtonForm>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="pb-3 px-3 text-xs text-gray-700">
                  Không có yêu cầu kết bạn...
                </div>
              ))}
          </div>
          <div
            onClick={() => {
              navigate("/profile#friend");
            }}
            className="text-xs py-2 text-center border-t hover:bg-gray-50 cursor-pointer text-gray-700"
          >
            Xem danh sách bạn bè
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FriendNotify;
