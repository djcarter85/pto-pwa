import cx from "classix";

export const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        className,
      )}
    >
      {text}
    </button>
  );
};
