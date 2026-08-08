export default function LoadingSpinner({ size = "md", fullPage = false }) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-14 w-14 border-4",
  };

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-accent border-t-transparent`}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
