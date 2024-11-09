import { postData } from "@/api/commonApi";
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

const NotifyUser = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const fetchNotify = useQuery({
    queryKey: ["user_notifys"],
    queryFn: () =>
      postData({ userLogin: currentUser?.userLogin }, "/user/notify/all"),
    enabled: currentUser != null,
  });

  const handlePostReaded = useMutation({
    mutationFn: (notifyUserCode: number) =>
      postData({ notifyUserCode: notifyUserCode }, "/user/notify/readed"),
    onSuccess: (data: UserNotifyObject) => {
      if (queryClient.getQueryData(["user_notifys"])) {
        queryClient.setQueryData(
          ["user_notifys"],
          (oldData: UserNotifyObject[]) => {
            const cloneData = oldData;
            const findItem = cloneData.findIndex(
              (item: UserNotifyObject) =>
                item.notifyUserCode == data.notifyUserCode
            );
            cloneData[findItem] = data;
            return [...cloneData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "user_notifys",
        });
      }
    },
  });

  const [notifications, setNotifications] = useState<any[]>([]);

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
          "/topic/notifications/" + currentUser?.userId,
          (message) => {
            if (message.body) {
              if (queryClient.getQueryData(["user_notifys"])) {
                queryClient.setQueryData(
                  ["user_notifys"],
                  (oldData: UserNotifyObject[]) => {
                    const resultData = JSON.parse(message.body);
                    console.log(resultData);
                    return [resultData, ...oldData];
                  }
                );
              } else {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === "user_notifys",
                });
              }
              toast.success("Bạn có thông báo mới!", {
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
  console.log(fetchNotify.data);
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
            <i className="ri-notification-line text-xl font-thin text text-gray-700"></i>
            {fetchNotify.data &&
              fetchNotify.data.filter((item: any) => item.readed == false)
                .length > 0 && (
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-1 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow`}
                >
                  {
                    fetchNotify.data.filter((item: any) => item.readed == false)
                      .length
                  }
                </span>
              )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 px-0 py-0 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <h5 className="font-semibold text-sm">Thông báo</h5>
            <span className="text-xs hover:underline cursor-pointer text-gray-600">
              Đánh dấu đã đọc
            </span>
          </div>
          <div className="w-full h-[400px] custom-scrollbar-wider">
            {fetchNotify.data &&
              (fetchNotify.data.length > 0 ? (
                fetchNotify.data.map((item: UserNotifyObject) => {
                  return (
                    <div
                      onClick={async () => {
                        setOpen(false);
                        if (item.notifyUserCode) {
                          if (!item.readed) {
                            await handlePostReaded.mutateAsync(
                              item.notifyUserCode
                            );
                          }
                          navigate(
                            item.typeNotifycation == "order"
                              ? "/order-detail/" + item.linkContent
                              : "/home"
                          );
                        }
                      }}
                      className={`flex items-start hover:bg-gray-200 ${
                        item.readed ? "bg-white" : "bg-gray-100"
                      } gap-x-2 border-b py-3 cursor-pointer px-2 `}
                    >
                      <div className="size-10 flex-shrink-0">
                        <img
                          className="w-full h-full object-center object-cover"
                          src={item.image}
                          alt=""
                        />
                      </div>

                      <div className="flex-auto">
                        <p className="text-sm text-gray-700 font-medium">
                          {item?.title}
                        </p>
                        <p className="text-wrap h-7 w-60 text-gray-700 line-clamp-2  text-xs">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="pb-3 px-3 text-xs text-gray-700">
                  Không có thông báo
                </div>
              ))}
          </div>
          <div className="text-xs py-2 text-center border-t hover:bg-gray-50 cursor-pointer text-gray-700">
            Xem tất cả thông báo
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotifyUser;
