import { Card, CardBody, Skeleton } from '@nextui-org/react';

const DashboardCardsSkeleton = () => {
	return (
		<>
			{[...Array(4)].map((_, index) => (
				<Card key={index} className="w-1/4 p-4 mr-4">
					<Skeleton className="rounded-lg">
						<CardBody className="flex flex-col items-center">
							<div className="text-center">
								<Skeleton className="h-20 w-24 mb-2 bg-default-300 rounded-full" />
							</div>
							<div className="text-center">
								<Skeleton className="h-8 w-24 mb-2 bg-default-200 rounded-lg" />
							</div>
						</CardBody>
					</Skeleton>
				</Card>
			))}
		</>
	);
};

export default DashboardCardsSkeleton;
