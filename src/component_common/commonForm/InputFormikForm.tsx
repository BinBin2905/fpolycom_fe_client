import React, { HTMLInputTypeAttribute, useEffect, forwardRef } from "react";
import { useField } from "formik";

const InputFormikForm = forwardRef(
  (
    {
      className,
      label,
      important = false,
      disabled = false,
      onChange,
      name,
      placeholder,
      type,
      ...props
    }: {
      className?: string;
      label: string;
      important?: boolean;
      disabled?: boolean;
      name: string;
      placeholder?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      type?: HTMLInputTypeAttribute;
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [field, meta, helpers] = useField(name);
    return (
      <div className="flex flex-col gap-y-1 w-full">
        {label && (
          <label htmlFor="">
            <span className="text-gray-700 font-medium text-sm">{label} </span>{" "}
            {important && <span className="text-red-500">*</span>}
          </label>
        )}

        <input
          {...field}
          value={field.value ?? ""}
          autoComplete="off"
          onChange={(e) => {
            helpers.setValue(e.target.value);
            if (onChange) onChange(e);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`${
            meta.error && meta.touched ? "border-red-500" : "border-gray-200"
          } px-3 py-2 text-gray-700 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full ${className}`}
          type={type}
          ref={ref}
        />
        {meta.error && meta.touched && (
          <span className="text-red-500 text-xs">{meta.error}</span>
        )}
      </div>
    );
  }
);

export default InputFormikForm;
