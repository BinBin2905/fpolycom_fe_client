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
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Form } from "formik";
import React, { useEffect, useState } from "react";

const FriendGiftDialog = ({
  open = false,
  item = null,
  onClose,
}: {
  open: boolean;
  item: string | null;
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState<any>(null);
  const { currentUser } = useUserStore();
  const handlePost = useMutation({
    mutationFn: () => postData({ hello: "hello" }, "fsdf"),
  });

  const fetchFriendAll = useMutation({
    mutationFn: () =>
      postData({ userLogin: currentUser?.userLogin }, "/user/friend/all"),
  });
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
              <DialogDescription className="flex flex-col gap-y-3 h-40 overflow-y-scroll custom-scrollbar-wider">
                <div className="grid grid-cols-2 gap-3">
                  {fetchFriendAll.data &&
                    fetchFriendAll.data.map((item: any) => {
                      return (
                        <div
                          onClick={() => {
                            if (selected && selected.userCode == item.userCode) {
                              setSelected(null);
                            } else {
                              setSelected(item);
                            }
                          }}
                          className={`${
                            selected && item.userCode == selected.userCode
                              ? "border-yellow-500"
                              : "border-gray-400 "
                          } cursor-pointer flex gap-x-2 items-center rounded-sm border p-2`}
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
              </DialogDescription>
              <DialogFooter>
                <div className="flex gap-x-2 justify-end">
                  <ButtonForm
                    type="submit"
                    className="!w-28 !bg-primary"
                    label="Tặng quà"
                    //   loading={handlePost.isPending}
                    // disabled={false}
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
                  onClick={() => {
                    //   handlePost.reset();
                    // resetForm();
                  }}
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
