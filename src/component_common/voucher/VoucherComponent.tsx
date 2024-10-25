import React from "react";
import SpinnerLoading from "../loading/SpinnerLoading";

type ObjectCommon = {
  [key: string]: any;
};

const VoucherComponent = ({
  keySelected,
  item,
  key,
  name,
  percent,
  amount,
  loading = false,
  dateBegin,
  dateEnd,
  onSave,
  save = false,
}: {
  keySelected?: number | string;
  item: ObjectCommon;
  key?: keyof ObjectCommon;
  name?: keyof ObjectCommon;
  percent?: keyof ObjectCommon;
  amount?: keyof ObjectCommon;
  loading: boolean;
  dateBegin?: keyof ObjectCommon;
  dateEnd?: keyof ObjectCommon;
  save?: boolean;
  onSave?: (value: ObjectCommon) => void;
}) => {
  return (
    <div
      className={`${
        key && keySelected && keySelected == item[key]
          ? "border-primary"
          : "border-gray-200"
      } border w-full bg-white shadow-sm h-24 relative rounded-md overflow-hidden flex`}
    >
      {/* {amount && item[amount] && ( */}
      <div className="absolute top-0 left-0 rounded-ee-md p-1 px-2 text-[10px] flex items-center justify-center  bg-yellow-400 text-white">
        Có hạn
      </div>
      {/* )} */}

      {save ? (
        <button className="cursor-pointer absolute top-1 right-1 py-1 px-4 text-xs flex items-center justify-center  bg-slate-400 text-white rounded-sm">
          Đã lưu
        </button>
      ) : (
        <button
          onClick={() => {
            if (onSave) onSave(item);
          }}
          disabled={loading}
          className="cursor-pointer absolute top-1 right-1 py-1 px-4 text-xs flex items-center justify-center  bg-amber-400 text-white rounded-sm"
        >
          Lưu
        </button>
      )}

      <div className="bg-primary flex items-center justify-center w-28 h-full shrink-0">
        <i className="ri-coupon-2-fill text-xl text-white"></i>
      </div>
      <div className="text-sm text-gray-600  px-2 py-3 flex-auto">
        <h5 className="line-clamp-1 w-full mb-1 pr-14">
          {name ? item[name] : "Tên voucher 2 2 "}
        </h5>
        <p className="text-gray-900 font-extralight text-xs pl-2 mb-1">
          Giảm {percent ? item[percent] : "10"}%
        </p>

        <p className="text-primary font-light text-xs pl-2">
          Hiệu lực từ {dateBegin ? item[dateBegin] : "2024/07/01"} dến{" "}
          {dateEnd ? item[dateEnd] : "2024/07/01"}
        </p>
      </div>
    </div>
  );
};

export default VoucherComponent;
