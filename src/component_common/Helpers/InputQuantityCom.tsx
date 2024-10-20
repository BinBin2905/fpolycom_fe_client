import { OrderDetailObject } from "@/type/TypeCommon";
import { useEffect, useState } from "react";

export default function InputQuantityCom({
  item,
  increment,
  decrement,
  onBlurValue,
  disableb = false,
}: {
  item: OrderDetailObject;
  increment: (item: OrderDetailObject) => void;
  decrement: (item: OrderDetailObject) => void;
  onBlurValue: (item: OrderDetailObject) => void;
  disableb: boolean;
}) {
  const [value, setValue] = useState(item?.quantity);
  useEffect(() => {
    setValue(item?.quantity);
  }, [item?.quantity]);
  return (
    <div className="w-[150px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => decrement(item)}
          type="button"
          disabled={disableb}
          className="text-base text-qgray w-4 h-full"
        >
          -
        </button>
        <input
          value={value}
          onBlur={(e) => {
            setValue(Number.parseInt(e.target.value));
            onBlurValue({ ...item, quantity: Number.parseInt(e.target.value) });
          }}
          onChange={(e) => setValue(Number.parseInt(e.target.value))}
          className="w-10 outline-none text-center bg-transparent"
        ></input>
        <button
          onClick={() => increment(item)}
          type="button"
          disabled={disableb}
          className="text-base text-qgray w-4 h-full"
        >
          +
        </button>
      </div>
    </div>
  );
}
