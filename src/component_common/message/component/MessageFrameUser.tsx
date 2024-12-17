import { postData, uploadImage } from "@/api/commonApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/store";
import { useMessageStore } from "@/store/messageStore";
import { useMessageUserStore } from "@/store/messageUserStore";
import { MessObject, MessageRequestObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
type MessageObject = {
  [key: string]: any;
};

const MessageFrameUser = ({
  messageObject,
  name,
  id,
  idReceive,
  image,
}: {
  messageObject: MessageObject;
  name: keyof MessageObject;
  id: keyof MessageObject;
  idReceive: keyof MessageObject;
  image: keyof MessageObject;
}) => {
  const { currentUser } = useUserStore();
  const refMessage = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const fetchMessage = useQuery({
    queryKey: [`group_message_${messageObject[id]}`],
    queryFn: () =>
      postData({ groupCode: messageObject[id] }, "/user/message/all"),
    enabled: messageObject[id] != null,
  });
  const [fileItem, setFileItem] = useState<File[]>([]);
  const { deleteFrameMessage, minimizeFrameMessage } = useMessageUserStore();

  const hanldePostMessage = useMutation({
    mutationFn: (body: MessageRequestObject[]) =>
      postData(body, "/user/message/send"),
    onSuccess: (data: MessObject[]) => {
      if (queryClient.getQueryData(["user_messages"])) {
        queryClient.setQueryData(["user_messages"], (oldData: MessObject[]) => {
          console.log(data);
          return [
            data.slice(-1)[0],
            ...oldData.filter(
              (item: MessObject) =>
                item.groupMessageCode != data[0].groupMessageCode
            ),
          ];
        });
        console.log(`group_message_${data[0].groupMessageCode}`);
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "user_messages",
        });
      }
      if (
        queryClient.getQueryData([`group_message_${data[0].groupMessageCode}`])
      ) {
        queryClient.setQueryData(
          [`group_message_${data[0].groupMessageCode}`],
          (oldData: MessObject[]) => {
            console.log(data);
            return [...oldData, ...data];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === `group_message_${data[0].groupMessageCode}`,
        });
      }
      if (refMessage.current?.value) {
        refMessage.current.value = "";
      }
      setFileItem([]);
    },
  });

  useEffect(() => {
    if (fetchMessage.isSuccess && chatEndRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    console.log("hello");
  }, [
    fetchMessage.isSuccess,
    queryClient.getQueryData([`group_message_${messageObject[id]}`]),
  ]);

  const handleSendMessage = async () => {
    if (refMessage.current?.value == "" && fileItem.length == 0) {
      return;
    }
    const body: MessageRequestObject[] = [];
    if (fileItem.length > 0) {
      await Promise.all(
        fileItem.map(async (item: File) => {
          const url = await uploadImage(item, "common");
          body.push({
            message: url ? url : "",
            typeMessage: "image",
            idSender: Number.parseInt(
              currentUser?.userId ? currentUser?.userId : "0"
            ),
            groupMessageCode: messageObject[id],
            typeSender: "user",
            storeCode: messageObject[idReceive],
          });
        })
      );
    }
    if (refMessage.current?.value) {
      body.push({
        message: refMessage.current.value,
        typeMessage: "text",
        idSender: Number.parseInt(
          currentUser?.userId ? currentUser?.userId : "0"
        ),
        groupMessageCode: messageObject[id],
        typeSender: "user",
        storeCode: messageObject[idReceive],
      });
    }
    if (body) {
      await hanldePostMessage.mutateAsync(body);
    }
    console.log(body);
  };
  return (
    <div>
      <div className="w-80 h-[400px] border border-gray-200 flex flex-col">
        <div className="text-white bg-qyellow flex items-center px-3 py-2 justify-between">
          <div className="flex items-center gap-x-2">
            <div className="relative cursor-pointer ">
              <div className="absolute top-0 -right-1 z-10 h-3 w-3 rounded-full bg-green-500 border border-white"></div>
              <Avatar className="size-7 border border-slate-200 bg-white">
                <AvatarImage src={messageObject[image]} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm">{messageObject[`${name}`]}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="cursor-pointer">
              <i className="ri-phone-fill"></i>
            </div>
            <div className="cursor-pointer">
              <i className="ri-video-on-fill"></i>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => minimizeFrameMessage(messageObject[id])}
            >
              <i className="ri-subtract-line"></i>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => deleteFrameMessage(messageObject[id])}
            >
              <i className="ri-close-line"></i>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-auto w-full  rounded-md py-2 px-1 bg-gray-100">
          {fetchMessage.data && fetchMessage.isSuccess ? (
            <div className="flex flex-col gap-y-2 px-2">
              {fetchMessage.data.map((item: MessObject) => (
                <>
                  {item.typeMessage == "text" ? (
                    <div
                      className={`border break-words bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 ${
                        item.typeSender == "user" ? "self-end" : "self-start"
                      }`}
                    >
                      {item.message.indexOf("https") >= 0 ||
                      item.message.indexOf("http") >= 0 ? (
                        <a
                          href={`${item.message}`}
                          target="_blank"
                          className="underline text-primary"
                        >
                          {item.message}
                        </a>
                      ) : (
                        <span> {item.message}</span>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`w-40 h-28 ${
                        item.typeSender == "user" ? "self-end" : "self-start"
                      }`}
                    >
                      <img
                        src={item.message}
                        className="h-full w-full object-cover object-center"
                        alt=""
                      />
                    </div>
                  )}
                </>
              ))}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <div>Không có tin nhắn.</div>
          )}
        </ScrollArea>
        <div className="bg-white border-t border-gray-200 py-1 px-3 flex-col items-center gap-y-10 shrink-0">
          {fileItem.length >= 1 && (
            <div className="flex gap-x-2 overflow-x-scroll custom-scrollbar-wider-x py-2">
              {fileItem.map((item: File, index: number) => {
                console.log(item);
                if (item.type.indexOf("image") >= 0) {
                  return (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 relative group w-fit rounded-lg shrink-0"
                    >
                      <div
                        onClick={() =>
                          setFileItem([
                            ...fileItem.filter((i) => i.name != item.name),
                          ])
                        }
                        className="invisible opacity-0 group-hover:visible  group-hover:opacity-100 transition-[opacity_visibility] cursor-pointer absolute -top-2 -right-2 z-10 text-gray-800  hover:text-gray-700"
                      >
                        <i className="ri-close-circle-line text-lg"></i>
                      </div>
                      <img
                        className="w-20 h-11 object-cover object-center"
                        src={URL.createObjectURL(item)}
                        alt=""
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="p-2 shrink-0 bg-gray-100 relative group w-fit flex gap-x-1  rounded-lg"
                    >
                      <div
                        onClick={() =>
                          setFileItem([
                            ...fileItem.filter((i) => i.name != item.name),
                          ])
                        }
                        className="invisible opacity-0 group-hover:visible  group-hover:opacity-100 transition-[opacity_visibility] cursor-pointer absolute -top-2 -right-2 z-10 text-gray-800  hover:text-gray-700"
                      >
                        <i className="ri-close-circle-line text-lg"></i>
                      </div>
                      <img
                        className="w-10 h-11 object-cover object-center"
                        src="https://static.vecteezy.com/system/resources/thumbnails/006/432/936/small/file-icon-design-vector.jpg"
                        alt=""
                      />
                      <div
                        className="w-24 break-words text-sm"
                        title="Quanlycongviec.docx"
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="text-gray-500">
              <input
                type="file"
                id={messageObject[id] + "files"}
                hidden
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0) {
                    setFileItem([...Array.from(e.target.files)]);
                  }
                }}
              />
              <label
                htmlFor={messageObject[id] + "files"}
                className="cursor-pointer"
              >
                <i className="ri-add-circle-fill text-2xl"></i>
              </label>
            </div>
            <input
              ref={refMessage}
              type="text"
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSendMessage();
                }
              }}
              className="text-sm outline-none flex-auto text-gray-600"
            />
            <div
              className={`cursor-pointer ${
                hanldePostMessage.isPending ? "text-gray-500" : "text-primary"
              }`}
              onClick={() => {
                if (!hanldePostMessage.isPending) {
                  handleSendMessage();
                }
              }}
            >
              <i className="ri-send-plane-fill text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFrameUser;
