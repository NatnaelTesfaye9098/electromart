import { Skeleton } from "./ui/skeleton"

export default function SkeletonCard (){
    return (
        <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md">
            <Skeleton className="w-24 h-24 rounded-md mr-4 bg-gray-600"></Skeleton>
                <div className="flex-grow space-y-2">
                    <Skeleton className="w-33 h-4 rounded-full bg-gray-600"></Skeleton>
                    <Skeleton className="bg-gray-600 rounded-full w-26 h-3"></Skeleton>
                    <Skeleton className="bg-gray-600 rounded-full w-24 h-3"></Skeleton>
                    <Skeleton className="bg-gray-600 rounded-md w-24 h-7 mt-4"></Skeleton>
                </div>
                <div className="flex space-y-3 flex-col items-center md:items-end ml-auto mt-4 md:mt-0">
                    <Skeleton className="rounded-full h-4 w-30 bg-gray-600"></Skeleton>
                    <Skeleton className="rounded-md h-7 w-24 bg-gray-600"></Skeleton>
                </div>
        </div>
    )
}