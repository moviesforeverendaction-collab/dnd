export function Spinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-surface-card border-t-brand rounded-full animate-spin"></div>
      </div>
    </div>
  );
}