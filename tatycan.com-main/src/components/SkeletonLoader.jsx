// Skeleton loader component for better loading animations
const SkeletonLoader = ({ type = "default", count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "gallery":
        return (
          <div className="bg-gray-200 rounded-lg aspect-square shimmer">
          </div>
        );

      case "service-card":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4 mx-auto shimmer"></div>
            <div className="h-6 bg-gray-200 rounded-xs mb-2 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded-xs mb-2 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded-xs w-3/4 shimmer"></div>
          </div>
        );

      case "hero":
        return (
          <div>
            <div className="h-12 bg-gray-200 rounded-xs mb-4 shimmer"></div>
            <div className="h-6 bg-gray-200 rounded-xs mb-2 shimmer"></div>
            <div className="h-6 bg-gray-200 rounded-xs w-2/3 mb-8 shimmer"></div>
            <div className="h-12 bg-gray-200 rounded-xs w-48 shimmer"></div>
          </div>
        );

      case "text":
        return (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded-xs"></div>
            <div className="h-4 bg-gray-200 rounded-xs w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-xs w-4/6"></div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-200 rounded-xs animate-pulse h-20"></div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default SkeletonLoader;
