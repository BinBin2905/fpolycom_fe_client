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
    <div className="w-[100px] h-[40px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => decrement(item)}
          type="button"
          disabled={disableb}
          className="text-base text-qgray h-full w-1/4"
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
          className="outline-none text-center bg-transparent w-1/2"
        ></input>
        <button
          onClick={() => increment(item)}
          type="button"
          disabled={disableb}
          className="text-base text-qgray h-full w-1/4"
        >
          +
        </button>
      </div>
    </div>
  );
}
