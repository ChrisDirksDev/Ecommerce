interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({ size = 200 }: LoadingSpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-300 border-t-current"
      style={{
        width: size,
        height: size,
      }}
    ></div>
  );
}
