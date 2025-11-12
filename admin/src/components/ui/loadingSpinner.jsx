export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin"
          aria-hidden="true"
        />
        <div className="text-white text-sm">Loading...</div>
      </div>
    </div>
  );
}
