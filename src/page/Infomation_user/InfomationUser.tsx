import { postData, postDataCommon } from "@/api/commonApi";
import { ButtonForm } from "@/component_common";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/store";
import { UserCommonObject } from "@/type/TypeCommon";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const InfomationUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useUserStore();
  const [userInfomation, setUserInfomation] = useState<UserCommonObject | null>(
    null
  );
  const fetchCommonUser = useMutation({
    mutationFn: () =>
      postDataCommon(
        { userCodeMain: currentUser ? currentUser.userId : null, userCode: id },
        "/common/user"
      ),
    onSuccess: (data: UserCommonObject) => {
      setUserInfomation(data);
    },
  });

  const handleAddFriend = useMutation({
    mutationFn: () =>
      postData(
        { userLogin: currentUser?.userLogin, userCodeSecond: id },
        "/user/friend/request"
      ),
    onSuccess: () => {
      toast.success("Gửi yêu cầu kết bạn thành công!", {
        className: "p-4",
      });
      if (userInfomation) {
        setUserInfomation({
          ...userInfomation,
          friendshipStatus: "friendRequest",
        });
      }
    },
  });

  const handleAccept = useMutation({
    mutationFn: () =>
      postData(
        { userLogin: currentUser?.userLogin, userCodeSecond: id },
        "/user/friend/accepted"
      ),
    onSuccess: () => {
      toast.success("Gửi yêu cầu kết bạn thành công!", {
        className: "p-4",
      });
      if (userInfomation) {
        setUserInfomation({
          ...userInfomation,
          friendshipStatus: "accepted",
        });
      }
    },
  });

  const handleCancelFriend = useMutation({
    mutationFn: () =>
      postData(
        { userLogin: currentUser?.userLogin, userCodeSecond: id },
        "/user/friend/cancel"
      ),
    onSuccess: () => {
      toast.success("Gửi yêu cầu kết bạn thành công!", {
        className: "p-4",
      });
      if (userInfomation) {
        setUserInfomation({
          ...userInfomation,
          friendshipStatus: null,
        });
      }
    },
  });

  useEffect(() => {
    if (id == currentUser?.userId) {
      navigate("/profile#profile");
    } else {
      fetchCommonUser.mutateAsync();
    }
  }, [id]);
  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <img
          src={
            userInfomation?.bannerImage
              ? userInfomation.bannerImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnKzJBSfSt0d_6dStBT9YwiQZkvfCXUo3Cpw&s"
          }
          className="saller-info object-cover object-center w-full sm:h-[428px] sm:flex justify-between items-center overflow-hidden relative"
        />
        <div className="relative h-40 border-b border-r border-l rounded-md shadow-md border-gray-100 pb-2 mb-2">
          <div className="size-36 rounded-full border-4 border-gray-50 shadow-lg overflow-hidden absolute -top-5 left-3">
            <img
              src={
                userInfomation?.image
                  ? userInfomation.image
                  : "https://24hstore.vn/upload_images/images/hinh-nen-iphone-15/Hinh_nen_iPhone_15_de_thuong.jpg"
              }
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute right-2 top-2 flex gap-x-2">
            {userInfomation?.friendshipStatus == "accepted" ||
            userInfomation?.friendshipStatus == "friendRequest" ||
            userInfomation?.friendshipStatus == "pending" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <span
                    className={`${
                      true ? "bg-slate-400" : "bg-slate-700"
                    } px-2 rounded-md text-white py-2 flex gap-x-2 cursor-pointer text-sm`}
                  >
                    {userInfomation?.friendshipStatus == "accepted" && (
                      <i className="ri-check-line"></i>
                    )}
                    {userInfomation?.friendshipStatus == "accepted" && "Bạn bè"}
                    {userInfomation?.friendshipStatus == "friendRequest" &&
                      "Đã gửi yêu cầu kết bạn"}
                    {userInfomation?.friendshipStatus == "pending" &&
                      "Xác nhận kết bạn"}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-44 p-1" align="end">
                  {userInfomation?.friendshipStatus == "pending" && (
                    <div
                      className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                      onClick={() => {
                        handleAccept.mutateAsync();
                      }}
                    >
                      <span>Chấp nhận</span>
                    </div>
                  )}
                  <div
                    className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                    onClick={() => {
                      handleCancelFriend.mutateAsync();
                    }}
                  >
                    <span>
                      {userInfomation?.friendshipStatus == "accepted" ||
                      userInfomation?.friendshipStatus == "pending"
                        ? "Hủy kết bạn"
                        : "Hủy yêu cầu"}
                    </span>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <ButtonForm
                label={"Kết bạn"}
                loading={handleAddFriend.isPending}
                type="button"
                onClick={() => handleAddFriend.mutateAsync()}
                className="bg-primary !w-24 rounded-sm"
              ></ButtonForm>
            )}
            <ButtonForm
              label="Nhắn tin"
              //   loading={handlePostFollow.isPending}
              type="button"
              //   onClick={() => handleSendMessage()}
              className="bg-gray-400 !w-24 rounded-sm"
            ></ButtonForm>
          </div>
          <div className="pl-44 py-2 text-slate-700 w-full pt-5">
            <h5 className="text-3xl font-medium mb-2">
              {userInfomation?.name}
            </h5>
            <div className="grid grid-cols-3 pl-4 gap-x-20 gap-y-2 w-full">
              <span className="flex items-center gap-x-1">
                <i className="ri-map-pin-line"></i>
                {userInfomation?.districtName}, {userInfomation?.provinceName}
              </span>
              {userInfomation?.friendshipStatus == "accepted" && (
                <>
                  {" "}
                  <span className="flex items-center gap-x-1">
                    <i className="ri-mail-line"></i>
                    {userInfomation?.email}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <i className="ri-phone-line"></i>
                    {userInfomation?.phone}
                  </span>{" "}
                  <span className="flex items-center gap-x-1">
                    <span> Giới tính:</span>
                    {userInfomation?.gender ? "Nam" : "Nữ"}
                  </span>
                  <span className="flex items-center gap-x-1">
                    {" "}
                    <span> Tham gia từ: </span>
                    {userInfomation?.createdDate}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfomationUser;
