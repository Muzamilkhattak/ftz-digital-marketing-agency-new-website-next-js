export default function LoadingOptimized() {
  return (
    <div className="fixed inset-0 bg-primary-navy flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-accent-blue/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white text-lg font-semibold font-body">Loading...</p>
      </div>
    </div>
  );
}
