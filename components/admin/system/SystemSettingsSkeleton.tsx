import { Skeleton } from '@nextui-org/react';

const SystemSettingsSkeleton = () => {
	return (
		<div className="space-y-4">
			{/* Input Button Skeleton */}
			<Skeleton className="w-32 h-10 rounded" />

			{/* Input Boxes Skeletons */}
			<Skeleton className="w-full h-10 rounded" />
			<Skeleton className="w-full h-10 rounded" />
			<Skeleton className="w-full h-10 rounded" />

			{/* Two Columns Side by Side */}
			<div className="flex justify-between space-x-4">
				{/* First Column */}
				<div className="space-y-2">
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
				</div>

				{/* Second Column */}
				<div className="space-y-2">
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
					<Skeleton className="w-full h-8 rounded" />
				</div>
			</div>
		</div>
	);
};

export default SystemSettingsSkeleton;
