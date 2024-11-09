import { postData } from "@/api/commonApi";
import VoucherApply from "@/component_common/voucher/VoucherApply";
import VoucherComponent from "@/component_common/voucher/VoucherComponent";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

const VoucherTab = () => {
  const { currentUser } = useUserStore();
  const fetchVoucher = useMutation({
    mutationFn: (userLogin: string) =>
      postData({ userLogin: userLogin }, "/user/voucher/all"),
  });

  useEffect(() => {
    if (currentUser?.userLogin) {
      fetchVoucher.mutateAsync(currentUser.userLogin);
    }
  }, [currentUser]);
  return (
    <div className="grid grid-cols-2 gap-2">
      {fetchVoucher.isSuccess &&
        fetchVoucher.data &&
        fetchVoucher.data.map((item: any) => {
          return (
            <VoucherComponent
              item={item}
              amount={"amount"}
              name={"voucherName"}
              percent={"percentDecrease"}
              dateEnd={"endDate"}
              loading={false}
              priceApply={"priceApply"}
              save={true}
            ></VoucherComponent>
          );
        })}
    </div>
  );
};

export default VoucherTab;
