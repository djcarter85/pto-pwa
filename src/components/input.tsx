import cx from "classix";
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export const Input = ({
  id,
  type,
  inputMode,
  autoComplete,
  value,
  setValue,
  placeholder,
  required,
  className,
}: {
  id: string;
  type: HTMLInputTypeAttribute;
  inputMode?: "numeric" | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  value: string | number | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className={cx(
        "rounded-md bg-white text-base text-neutral-900 outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6",
        className,
      )}
    />
  );
};
