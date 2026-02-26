export default function Loading() {
  return (
    <div className="fixed inset-0 bg-primary-navy flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg font-semibold">Loading FTZ Digital...</p>
      </div>
    </div>
  );
}
