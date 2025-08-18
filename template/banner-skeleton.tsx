const BannerSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-16 bg-gray-300 rounded mb-6 w-full"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
            <div className="h-12 bg-gray-300 rounded w-48"></div>
        </div>
    );
};

export default BannerSkeleton;
