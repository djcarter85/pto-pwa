import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export const Input = ({
  id,
  type,
  autoComplete,
  value,
  setValue,
  placeholder,
  required,
}: {
  id: string;
  type: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  value: string;
  setValue: (email: string) => void;
  placeholder: string;
  required?: boolean;
}) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-900 outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
    />
  );
};
