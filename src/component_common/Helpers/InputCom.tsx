import React, { forwardRef } from "react";

type InputComProps = {
  label?: string;
  subLabel?: React.ReactNode;
  type?: string;
  name?: string;
  placeholder?: string;
  children?: React.ReactNode;
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputClasses?: string;
  labelClasses?: string;
};

// Sử dụng forwardRef để có thể truyền ref vào input
const InputCom = forwardRef<HTMLInputElement, InputComProps>(
  (
    {
      label,
      subLabel,
      type,
      name,
      placeholder,
      children,
      inputHandler,
      value,
      inputClasses,
      labelClasses = "text-qblack text-[13px] font-normal",
    },
    ref // Nhận ref từ parent component
  ) => {
    return (
      <div className="input-com w-full h-full">
        {label && (
          <label className={`input-label block ${labelClasses}`} htmlFor={name}>
            {label}
          </label>
        )}
        <label className="text-[11px] text-gray-400 mt-1 mb-2 flex">
          <span className="text-red-600 mr-1">{subLabel && `*`}</span>
          {subLabel}
        </label>
        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative">
          <input
            ref={ref} // Đặt ref vào input để có thể dùng useRef từ bên ngoài
            placeholder={placeholder}
            value={value}
            onChange={inputHandler}
            className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${inputClasses}`}
            type={type}
            id={name}
          />
          {children && children}
        </div>
      </div>
    );
  }
);

export default InputCom;
