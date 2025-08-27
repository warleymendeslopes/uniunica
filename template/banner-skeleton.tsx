import type React from "react"
import { poppins } from "@/config/fonts"
import {Skeleton} from "@heroui/react";

interface BannerSkeletonProps {
    columns?: 1 | 2
    position?: "start" | "center" | "end"
}

const BannerSkeleton: React.FC<BannerSkeletonProps> = ({ columns = 1, position = "center" }) => {
    const getPositionClasses = () => {
        switch (position) {
            case "start":
                return "justify-start text-left"
            case "end":
                return "justify-end text-right"
            default:
                return "justify-center text-center"
        }
    }

    const getColumnClasses = () => {
        if (columns === 2) {
            return "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        }
        return "flex flex-col"
    }

    const renderSkeletonContent = (isSecondColumn = false) => (
        <div className={`space-y-4 ${isSecondColumn ? "lg:text-right" : ""} ${poppins.className}`}>
            {/* Open Title Skeleton */}
            <Skeleton className="h-4 w-32 mx-auto lg:mx-0" />

            {/* Main Title Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-2xl mx-auto lg:mx-0" />
                <Skeleton className="h-12 md:h-16 lg:h-20 w-4/5 max-w-xl mx-auto lg:mx-0" />
            </div>

            {/* Subtitle Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-lg mx-auto lg:mx-0" />
                <Skeleton className="h-4 w-3/4 max-w-md mx-auto lg:mx-0" />
            </div>

            {/* Offer/Content Skeleton */}
            <div className="my-6">
                <Skeleton className="h-16 w-full max-w-sm mx-auto lg:mx-0 rounded-lg" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-12 w-48 mx-auto lg:mx-0 rounded-full" />
        </div>
    )

    return (
        <div className="space-y-4 text-white animate-pulse">
            <div className={`${getPositionClasses()} ${getColumnClasses()}`}>
                <div className="w-full">{renderSkeletonContent()}</div>

                {columns === 2 && <div className="w-full">{renderSkeletonContent(true)}</div>}
            </div>
        </div>
    )
}

export default BannerSkeleton
