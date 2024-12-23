import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
import MessageFrame from "./component/MessageFrame";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessageFrameUser from "./component/MessageFrameUser";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store";
import { GroupMessageObject } from "@/type/TypeCommon";
import { useMessageUserStore, MessageObject } from "@/store/messageUserStore";
import { useEffect, useState } from "react";
import { postData } from "@/api/commonApi";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

const ComponentFrameMessageUser = () => {
  const { currentUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const fetchGroup = useQuery({
    queryKey: ["user_groups"],
    queryFn: () =>
      postData({ userCode: currentUser?.userId }, "/user/group/all"),
    enabled: currentUser != null,
  });
  const { addFrameMessage, messages, setMessages, openFrameMessage } =
    useMessageUserStore((state) => state);
  const addFrame = (id: number): void => {
    const findItem: GroupMessageObject = fetchGroup.data.find(
      (item: GroupMessageObject) => item.groupCode == id
    );
    if (findItem) {
      addFrameMessage({
        id: findItem.groupCode,
        image: findItem.storeImage,
        name: findItem.storeName,
        minimizeFrame: true,
        idReceive: findItem.storeCode,
      });
    }
    setOpen(false);
  };
  // useEffect(() => {
  //   if (fetchGroup.isSuccess && fetchGroup.data) {
  //     setMessages([
  //       ...fetchGroup.data.map((item: GroupMessageObject) => ({
  //         id: item.groupCode,
  //         name: item.storeName,
  //         image: item.storeImage,
  //         idReceive: item.storeCode,
  //         minimizeFrame: false,
  //       })),
  //     ]);
  //   }
  // }, [fetchGroup.isSuccess]);
  return (
    <div className="fixed bottom-0 right-0 z-50 flex items-end">
      <div className="flex gap-x-2 items-end">
        {messages &&
          messages
            .filter((item) => item.minimizeFrame == true)
            .map((item: MessageObject) => {
              return (
                <MessageFrameUser
                  key={item.id}
                  name={"name"}
                  idReceive={"idReceive"}
                  id={"id"}
                  messageObject={item}
                  image={"image"}
                ></MessageFrameUser>
              );
            })}
      </div>
      <div className="px-8 pb-10 flex flex-col gap-y-3 h-fit">
        {messages &&
          messages.map((item: MessageObject) => {
            return (
              <div
                className={`relative cursor-pointer ${
                  item.minimizeFrame ? "opacity-0 hidden" : "opacity-100 block"
                }`}
                onClick={() => {
                  openFrameMessage(item.id);
                  // addFrameMessage({id:item.id,image:item.image,minimizeFrame:false,name,})
                }}
              >
                {/* <div className="absolute -top-1 right-0 z-20 border border-white">
                <i className="ri-close-line text-gray-600"></i>
              </div> */}
                <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                <Avatar className="size-12 border border-slate-400 bg-white">
                  <AvatarImage src={item.image} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            );
          })}

        <Popover open={open} onOpenChange={() => setOpen(!open)}>
          <PopoverTrigger asChild onClick={() => setOpen(true)}>
            <div className="relative cursor-pointer">
              <div className="size-12 flex items-center justify-center shadow-md bg-gray-400 rounded-full">
                <i className="ri-message-3-fill text-gray-100"></i>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col p-4 mr-10 z-50">
            <h5 className="text-gray-600 mb-2">Danh sách nhắn tin</h5>
            {fetchGroup.data &&
              fetchGroup.data.map((item: GroupMessageObject) => {
                return (
                  <div
                    className="flex cursor-pointer gap-x-2 p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => addFrame(item.groupCode)}
                  >
                    <div className="relative cursor-pointer w-fit">
                      <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                      <Avatar className="size-9 border border-slate-400  bg-white">
                        <AvatarImage src={item.storeImage} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-gray-600">{item.storeName}</span>
                  </div>
                );
              })}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ComponentFrameMessageUser;
