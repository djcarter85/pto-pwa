export const Loading = () => {
  return (
    <div className="my-10 flex flex-col items-center justify-center gap-6">
      <svg className="size-16 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          stroke="currentColor"
          strokeWidth="2"
          cx="12"
          cy="12"
          r="11"
        ></circle>
        <path
          className="opacity-75"
          fill="none"
          stroke="currentColor"
          d="M 12 1 A 11 11 0 0 1 23 12"
          strokeWidth="2"
        ></path>
      </svg>
      <div className="text-2xl">Loading ...</div>
    </div>
  );
};
