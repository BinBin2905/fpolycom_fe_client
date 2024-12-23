import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MessageObject = {
  id: number;
  name: string;
  image: string;
  minimizeFrame: boolean;
  idReceive?: number;
};


type MessageStoreObject = {
  messages: MessageObject[];
  minimizeFrameMessage: (id: number) => void;
  deleteFrameMessage: (id: number) => void;
  addFrameMessage: (data: MessageObject) => void;
  setMessages: (data: MessageObject[]) => void;
  openFrameMessage: (id: number) => void;
};

export const useMessageStore = create<MessageStoreObject>()((set) => ({
  messages: [],
  minimizeFrameMessage: (id) =>
    set((state) => {
      const messageList = state.messages;
      const message = messageList.find((item) => item.id == id);
      const index = messageList.findIndex((item) => item.id == id);
      if (message?.minimizeFrame) {
        message.minimizeFrame = false;
        messageList[index] = message;
      }
      return {
        messages: messageList,
      };
    }),
  openFrameMessage: (id) =>
    set((state) => {
      if (
        state.messages.filter((item) => item.minimizeFrame == true).length == 4
      ) {
        toast("Thông báo!", {
          description: "Mở được tối đa 4 hộp thoại.",
          duration: 1000,
        });
        return state;
      }
      const messageList = state.messages;
      const message = messageList.find((item) => item.id == id);
      const index = messageList.findIndex((item) => item.id == id);
      if (message && !message?.minimizeFrame) {
        message.minimizeFrame = true;
        messageList[index] = message;
      }
      return {
        messages: messageList,
      };
    }),
  deleteFrameMessage: (id) =>
    set((state) => ({
      messages: [...state.messages.filter((item) => item.id != id)],
    })),
  setMessages: (data) =>
    set((state) => ({
      messages: [...data],
    })),
  addFrameMessage: (data) =>
    set((state) => {
      const findMessage = state.messages.find((item) => item.id == data.id);
      if (
        state.messages.filter((item) => item.minimizeFrame == true).length == 4
      ) {
        toast("Thông báo!", {
          description: "Mở được tối đa 4 hộp thoại.",
          duration: 1000,
        });
        return state;
      }
      if (findMessage) {
        if (findMessage.minimizeFrame) {
          return state;
        }
        return {
          messages: [
            { ...findMessage, minimizeFrame: true },
            ...state.messages.filter((item) => item.id != data.id),
          ],
        };
      }
      return {
        messages: [{ ...data, minimizeFrame: true }, ...state.messages],
      };
    }),
}));
