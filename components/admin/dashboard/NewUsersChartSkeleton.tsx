import { Card, Skeleton } from '@nextui-org/react';
const NewUsersChartSkeleton = () => {
	return (
		<Card className="w-full space-y-5 p-4" radius="lg">
			<Skeleton className="rounded-lg">
				<div className="h-4 rounded-lg bg-default-300"></div>
			</Skeleton>
			<div className="space-y-1">
				<div className="flex justify-between">
					{[...Array(31)].map((_, index) => (
						<div className="h-44 relative" key={`${index}-1`}>
							<Skeleton
								key={index}
								className={`h-${Math.floor(
									Math.random() * 31,
								)} w-4 bg-default-300 absolute bottom-0`}
							></Skeleton>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default NewUsersChartSkeleton;
