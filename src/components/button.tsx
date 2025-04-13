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
    <button onClick={onClick} className={cx("btn btn-primary", className)}>
      {text}
    </button>
  );
};
