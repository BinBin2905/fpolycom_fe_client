import { postData, postDataStore } from "@/api/commonApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMessageStore, useStoreStore, useUserStore } from "@/store";
import { MessObject, UserNotifyObject } from "@/type/TypeCommon";
import {
  Client,
  Frame,
  IMessage,
  Stomp,
  StompSubscription,
} from "@stomp/stompjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { toast } from "sonner";
import { useStore } from "zustand";

const MessageComponent = () => {
  const { currentStore } = useStoreStore();
  const { addFrameMessage } = useMessageStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const fetchMessage = useQuery({
    queryKey: ["store_messages"],
    queryFn: () =>
      postDataStore(
        { storeCode: currentStore?.storeCode },
        "/store/group-message/all"
      ),
    enabled: currentStore != null,
  });

  const handlePostReaded = useMutation({
    mutationFn: (messageCode: number) =>
      postDataStore({ messageCode: messageCode }, "/store/message/read"),
    onSuccess: (data: MessObject) => {
      if (queryClient.getQueryData(["store_messages"])) {
        queryClient.setQueryData(
          ["store_messages"],
          (oldData: MessObject[]) => {
            const cloneData = oldData;
            const findItem = cloneData.findIndex(
              (item: MessObject) => item.messageCode == data.messageCode
            );
            cloneData[findItem] = data;
            return [...cloneData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "store_messages",
        });
      }
    },
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Thiết lập SockJS connection
    if (currentStore) {
      const socketUrl = import.meta.env.VITE_API_URL + "/ws"; // URL tới server WebSocket
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(socket);
      // Tạo một client STOMP

      stompClient.connect({}, (frame: Frame) => {
        console.log("Connected: " + frame);

        stompClient.subscribe(
          "/topic/message/store/" + currentStore?.storeCode,
          (message: IMessage) => {
            console.log(message);
            if (message.body) {
              const resultData: MessObject[] = JSON.parse(message.body);
              console.log(resultData);
              if (queryClient.getQueryData(["store_messages"])) {
                queryClient.setQueryData(
                  ["store_messages"],
                  (oldData: MessObject[]) => {
                    console.log(resultData);
                    return [
                      resultData.slice(-1)[0],
                      ...oldData.filter(
                        (item: MessObject) =>
                          item.groupMessageCode !=
                          resultData[0].groupMessageCode
                      ),
                    ];
                  }
                );
              } else {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === "store_messages",
                });
              }
              if (
                queryClient.getQueryData([
                  `store_group_message_${resultData[0].groupMessageCode}`,
                ])
              ) {
                queryClient.setQueryData(
                  [`store_group_message_${resultData[0].groupMessageCode}`],
                  (oldData: MessObject[]) => {
                    const resultData: MessObject[] = JSON.parse(message.body);
                    console.log(resultData);
                    return [...oldData, ...resultData];
                  }
                );
              } else {
                queryClient.invalidateQueries({
                  predicate: (query) =>
                    query.queryKey[0] ===
                    `store_group_message_${resultData[0].groupMessageCode}`,
                });
                console.log("không thêm thành công");
              }
              // toast.success("Bạn có một tinh nhắn mới!", {
              //   className: "p-4",
              // });
            }
          }
        );
      });
      // const stompClient = new Client({
      //   webSocketFactory: () => socket, // Chuyển đổi SockJS thành WebSocket
      //   debug: (str: string) => {
      //     console.log(str);
      //   },
      //   onConnect: (frame) => {
      //     console.log("STOMP client connected", currentStore?.storeCode);
      //     stompClient.subscribe(
      //       "/topic/message/store/" + currentStore?.storeCode,
      //       (message) => {
      //         console.log(message);
      //         if (message.body) {
      //           const resultData: MessObject[] = JSON.parse(message.body);
      //           console.log(resultData);
      //           if (queryClient.getQueryData(["store_messages"])) {
      //             queryClient.setQueryData(
      //               ["store_messages"],
      //               (oldData: MessObject[]) => {
      //                 console.log(resultData);
      //                 return [
      //                   resultData.slice(-1)[0],
      //                   ...oldData.filter(
      //                     (item: MessObject) =>
      //                       item.groupMessageCode !=
      //                       resultData[0].groupMessageCode
      //                   ),
      //                 ];
      //               }
      //             );
      //           } else {
      //             queryClient.invalidateQueries({
      //               predicate: (query) =>
      //                 query.queryKey[0] === "store_messages",
      //             });
      //           }
      //           if (
      //             queryClient.getQueryData([
      //               `store_group_message_${resultData[0].groupMessageCode}`,
      //             ])
      //           ) {
      //             queryClient.setQueryData(
      //               [`store_group_message_${resultData[0].groupMessageCode}`],
      //               (oldData: MessObject[]) => {
      //                 const resultData: MessObject[] = JSON.parse(message.body);
      //                 console.log(resultData);
      //                 return [...oldData, ...resultData];
      //               }
      //             );
      //           } else {
      //             queryClient.invalidateQueries({
      //               predicate: (query) =>
      //                 query.queryKey[0] ===
      //                 `store_group_message_${resultData[0].groupMessageCode}`,
      //             });
      //             console.log("không thêm thành công");
      //           }
      //           toast.success("Bạn có một tinh nhắn mới!", {
      //             className: "p-4",
      //           });
      //         }
      //       }
      //     );
      //   },
      //   onDisconnect: () => {
      //     console.log("STOMP client disconnected");
      //   },
      //   onStompError: (frame) => {
      //     console.error("STOMP error: ", frame);
      //   },
      // });

      // Xử lý khi kết nối thành công

      // Kích hoạt STOMP client
      stompClient.activate();

      // Hủy kết nối khi component bị unmount
      return () => {
        stompClient.deactivate();
      };
    }
  }, [currentStore]);
  console.log(fetchMessage.data);
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
            <i className="ri-message-2-line text-xl font-thin text text-gray-700"></i>
            {fetchMessage.data &&
              fetchMessage.data.filter(
                (item: MessObject) =>
                  item.readed == false && item.typeSender == "user"
              ).length > 0 && (
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-1 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow`}
                >
                  {
                    fetchMessage.data.filter(
                      (item: MessObject) => item.readed == false
                    ).length
                  }
                </span>
              )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 px-0 py-0 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <h5 className="font-semibold text-sm">Tin nhắn</h5>
            <span className="text-xs hover:underline cursor-pointer text-gray-600">
              Đánh dấu đã đọc
            </span>
          </div>
          <div className="w-full h-[400px] custom-scrollbar-wider overflow-y-scroll">
            {fetchMessage.data &&
              (fetchMessage.data.length > 0 ? (
                fetchMessage.data.map((item: MessObject) => {
                  return (
                    <div
                      onClick={async () => {
                        setOpen(false);
                        if (item.messageCode) {
                          if (!item.readed && item.typeSender == "user") {
                            await handlePostReaded.mutateAsync(
                              item.messageCode
                            );
                          }
                          addFrameMessage({
                            id: item.groupMessageCode,
                            name: item.username,
                            image: item.userImage,
                            minimizeFrame: false,
                            idReceive: item.userCode,
                          });
                        }
                      }}
                      className={`flex items-start hover:bg-gray-200 ${
                        item.typeSender == "store" || item.readed
                          ? "bg-white"
                          : "bg-gray-100"
                      } gap-x-2 border-b py-3 cursor-pointer px-2 `}
                    >
                      <div className="size-10 flex-shrink-0">
                        <Avatar>
                          <AvatarImage src={item.userImage} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-auto">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          {item?.username}
                        </p>
                        <p className="text-wrap w-60 ml-1 text-gray-700 line-clamp-1  text-xs">
                          {item.typeSender == "store" && <span>Bạn: </span>}{" "}
                          {item.typeMessage == "text" &&
                          (item.message.indexOf("https") >= 0 ||
                            item.message.indexOf("http") >= 0)
                            ? "Đã gửi một liên kết"
                            : item.typeMessage == "image"
                            ? "Đã gửi một hình ảnh"
                            : item.message}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="pb-3 px-3 text-xs text-gray-700">
                  Không có tin nhắn
                </div>
              ))}
          </div>
          <div className="text-xs py-2 text-center border-t hover:bg-gray-50 cursor-pointer text-gray-700">
            Xem tất cả tin nhắn
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MessageComponent;
