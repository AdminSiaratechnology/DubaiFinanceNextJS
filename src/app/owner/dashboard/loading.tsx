
export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse p-1">
            {/* Header Skeleton */}
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                ))}
            </div>

            {/* Financials Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                ))}
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        </div>
    );
}
