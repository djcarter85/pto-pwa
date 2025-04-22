import cx from "classix";
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export const Input = ({
  id,
  type,
  inputMode,
  autoComplete,
  defaultValue,
  onValueChanged,
  placeholder,
  required,
  min,
  max,
  className,
}: {
  id: string;
  type: HTMLInputTypeAttribute;
  inputMode?: "numeric" | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  defaultValue: string | number | undefined;
  onValueChanged: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
}) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      inputMode={inputMode}
      defaultValue={defaultValue}
      onChange={(e) => onValueChanged(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      min={min}
      max={max}
      className={cx(
        "input focus:outline-primary px-0 focus:border-transparent focus:-outline-offset-1",
        className,
      )}
    />
  );
};
