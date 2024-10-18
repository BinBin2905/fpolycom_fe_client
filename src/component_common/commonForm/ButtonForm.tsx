import React from "react";
import SpinnerLoading from "../loading/SpinnerLoading";

const ButtonForm = ({
  type = "button",
  label,
  labelLoading,
  loading = false,
  disabled = false,
  className = "",
  icon = null,
  onClick,
}: {
  type: "button" | "submit";
  label?: string;
  labelLoading?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className={` text-white h-9 shrink-0 text-sm w-full flex justify-center items-center hover:bg-opacity-100 transition-all duration-300 ${className} gap-2`}
      disabled={loading || disabled}
      type={type}
    >
      {loading ? (
        <>
          <SpinnerLoading className="!w-4 !h-4 fill-primary"></SpinnerLoading>
          {labelLoading}
        </>
      ) : (
        <p className="flex gap-x-2">
          {icon && icon}
          <span>{label}</span>
        </p>
      )}
    </button>
  );
};

export default ButtonForm;
