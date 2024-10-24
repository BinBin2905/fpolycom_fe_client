import { postData, postDataStore } from "@/api/commonApi";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ProvinceObject,
  StoreBannerObject,
  VoucherObject,
} from "@/type/TypeCommon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const StoreBannerDeleteDialog = ({
  open = false,
  item = null,
  onClose,
}: {
  open: boolean;
  item: StoreBannerObject | null;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: (body: { [key: string]: any }) =>
      postDataStore(body, "/store/banner/delete"),
    onSuccess: (data: StoreBannerObject) => {
      if (queryClient.getQueryData(["store_banners"])) {
        queryClient.setQueryData(
          ["store_banners"],
          (oldData: StoreBannerObject[]) => {
            const resultData = data;
            console.log(resultData);
            return [
              ...oldData.filter(
                (item) => item.storeBannerCode != resultData.storeBannerCode
              ),
            ];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "store_banners",
        });
      }
    },
  });
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handleDelete.isPending) {
          onClose();
          setTimeout(() => {
            handleDelete.reset();
          }, 500);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thông báo</DialogTitle>
          <div className="w-full overflow-hidden">
            <div
              className={`${
                handleDelete.isSuccess ? "-translate-x-1/2" : "translate-x-0"
              } w-[200%] grid grid-cols-2 transition-transform`}
            >
              <div className="flex flex-col">
                <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                  {handleDelete.isPending ? (
                    <>
                      <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>
                      <span className="text-gray-700 text-base">
                        Đang xóa banner...
                      </span>
                    </>
                  ) : (
                    <>
                      <i className="ri-delete-bin-line text-gray-700 text-xl"></i>
                      <span className="text-gray-700 text-base">
                        Bạn có muốn xóa banner
                        <b className="text-gray-500"> {item?.title}</b> ?
                      </span>
                    </>
                  )}
                </DialogDescription>
                <div className="flex gap-x-2 justify-end">
                  <ButtonForm
                    type="button"
                    className="!w-28 !bg-primary"
                    label="Xác nhận"
                    loading={handleDelete.isPending}
                    onClick={async () => {
                      await handleDelete.mutateAsync({
                        storeBannerCode: item?.storeBannerCode,
                      });
                    }}
                  ></ButtonForm>
                  <ButtonForm
                    disabled={handleDelete.isPending}
                    type="button"
                    className="!w-28 !bg-red-500"
                    label="Hủy"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        handleDelete.reset();
                      }, 500);
                    }}
                  ></ButtonForm>
                </div>
              </div>
              <div className="flex flex-col">
                <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                  <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                  <span className="text-gray-700 text-base">
                    Xóa thành công!
                  </span>
                </DialogDescription>
                <div className="flex gap-x-2 justify-end">
                  <ButtonForm
                    type="button"
                    className="!w-28 !bg-red-500"
                    label="Đóng"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        handleDelete.reset();
                      }, 500);
                    }}
                  ></ButtonForm>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StoreBannerDeleteDialog;
