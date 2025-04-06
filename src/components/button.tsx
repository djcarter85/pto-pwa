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
        "bg-primary-500 hover:bg-primary-300 focus-visible:outline-primary-700 flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      {text}
    </button>
  );
};
