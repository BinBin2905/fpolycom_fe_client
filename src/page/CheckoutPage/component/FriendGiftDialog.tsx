import { postData } from "@/api/commonApi";
import { ButtonForm } from "@/component_common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const FriendGiftDialog = ({
  open = false,
  item = null,
  onClose,
  onGift,
}: {
  open: boolean;
  item: string | null;
  onClose: () => void;
  onGift: (item: string) => void;
}) => {
  const [selected, setSelected] = useState<any>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [currentList, setCurrentList] = useState<any[]>([]);
  const { currentUser } = useUserStore();
  const handlePost = useMutation({
    mutationFn: () => postData({ hello: "hello" }, "fsdf"),
  });

  const fetchFriendAll = useMutation({
    mutationFn: () =>
      postData({ userLogin: currentUser?.userLogin }, "/user/friend/all"),
    onSuccess: (data: any[]) => {
      setCurrentList(data);
    },
  });

  const handlePostGift = useMutation({
    mutationFn: ({
      userLogin,
      userCode,
      orderCode,
      content,
    }: {
      userLogin: string;
      userCode: string;
      orderCode: string;
      content: string;
    }) =>
      postData(
        {
          userLogin: userLogin,
          userCode: userCode,
          orderCode: orderCode,
          content: content,
        },
        "/user/gift/new"
      ),
    onSuccess: () => {
      toast.warning(
        "Tặng thành công đơn hàng #" + item + " cho " + selected.username + "!",
        {
          className: "p-4",
        }
      );
      if (item) {
        onGift(item);
      }
    },
  });

  const onClickPostGift = async () => {
    if (contentRef.current?.value == "") {
      toast.warning("Vui lòng nhập nội dung tặng quà!", {
        className: "p-4",
      });
      return;
    }
    if (selected == null) {
      toast.warning("Vui lòng chọn bạn để tặng!", {
        className: "p-4",
      });
      return;
    }
    if (item && contentRef.current?.value && currentUser?.userLogin) {
      await handlePostGift.mutateAsync({
        orderCode: item,
        content: contentRef.current?.value,
        userCode: selected.userCode,
        userLogin: currentUser?.userLogin,
      });
    }
  };

  useEffect(() => {
    if (open) fetchFriendAll.mutateAsync();
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handlePost.isSuccess && !handlePost.isPending) {
          onClose();
          setTimeout(() => {
            handlePost.reset();
          }, 1000);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-5">Tặng đơn hàng #{item}</DialogTitle>

          {!handlePost.isSuccess ? (
            <div className="flex flex-col gap-y-4 px-1">
              <DialogDescription className="flex flex-col">
                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">
                    Ghi chú tặng quà:
                  </h5>
                  <Textarea
                    placeholder="Nhập nội dung gửi..."
                    className="mb-2"
                    ref={contentRef}
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Chọn bạn bè:</h5>
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bạn bè..."
                    className="mb-2"
                    ref={searchRef}
                    onChange={() => {
                      if (searchRef.current?.value == "") {
                        if (fetchFriendAll.data) {
                          setCurrentList(fetchFriendAll.data);
                        }
                      } else {
                        if (fetchFriendAll.data) {
                          setCurrentList(
                            fetchFriendAll.data.filter(
                              (item: any) =>
                                item.username
                                  .toLowerCase()
                                  .indexOf(
                                    searchRef.current?.value.toLowerCase()
                                  ) >= 0
                            )
                          );
                        }
                      }
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3 h-52 overflow-y-scroll gap-y-3 custom-scrollbar-wider">
                    {currentList &&
                      currentList.map((item: any) => {
                        return (
                          <div
                            onClick={() => {
                              if (
                                selected &&
                                selected.userCode == item.userCode
                              ) {
                                setSelected(null);
                              } else {
                                setSelected(item);
                              }
                            }}
                            className={`h-fit ${
                              selected && item.userCode == selected.userCode
                                ? "border-yellow-500"
                                : "border-gray-400 "
                            } cursor-pointer flex gap-x-2  items-center rounded-sm border p-2`}
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
                            <span>{item.username}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter>
                <div className="flex gap-x-2 justify-end">
                  <ButtonForm
                    type="submit"
                    className="!w-28 !bg-primary"
                    label="Tặng quà"
                    onClick={() => {
                      onClickPostGift();
                    }}
                  ></ButtonForm>
                  <ButtonForm
                    type="button"
                    className="!w-28 !bg-red-500"
                    label="Hủy"
                    //   disabled={handlePost.isPending}
                    //   onClick={() => {
                    //     onClose();
                    //     setTimeout(() => {
                    //       handlePost.reset();
                    //       resetForm();
                    //     }, 1000);
                    //   }}
                  ></ButtonForm>
                </div>
              </DialogFooter>
            </div>
          ) : (
            <div className="flex flex-col px-1">
              <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                <span className="text-gray-700 text-base">
                  Tặng quà thành công
                </span>
              </DialogDescription>
              <div className="flex gap-x-2 justify-end">
                <ButtonForm
                  type="button"
                  className="!w-28 !bg-primary"
                  label="Thêm mới"
                ></ButtonForm>
                <ButtonForm
                  type="button"
                  className="!w-28 !bg-red-500"
                  label="Hủy"
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      // handlePost.reset();
                      //   resetForm();
                    }, 1000);
                  }}
                ></ButtonForm>
              </div>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FriendGiftDialog;
