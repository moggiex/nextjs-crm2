'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from '@nextui-org/react';

const TableSkeleton = ({ headings = ['Email', 'Username', 'Status', 'Actions'] }) => {
	return (
		<Table aria-label="Last LoggedIn Users Table" selectionMode="single" color="primary" className="mb-4">
			<TableHeader>
				{headings.map((heading, index) => (
					<TableColumn key={index} className={`${index === headings.length - 1 ? 'max-w-xs' : 'w-1/4'}`}>
						{heading}
					</TableColumn>
				))}
			</TableHeader>

			<TableBody>
				{/* Repeat this TableRow for as many rows as you need */}
				{[...Array(3)].map((_, rowIndex) => (
					<TableRow key={`loading${rowIndex}`}>
						{headings.map((_, cellIndex) => (
							<TableCell key={cellIndex}>
								{cellIndex === headings.length - 1 ? (
									<div className="flex items-center justify-end">
										<Skeleton className="h-8 bg-gray-200 rounded w-8 mr-2" />
										<Skeleton className="h-8 bg-gray-200 rounded w-8" />
									</div>
								) : (
									<Skeleton className="h-8 bg-gray-200 rounded w-full" />
								)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
		// <Table
		// 	aria-label="Last LoggedIn Users Table"
		// 	selectionMode="single"
		// 	color="primary"
		// 	className="mb-4"
		// >
		// 	<TableHeader>
		// 		<TableColumn className="w-1/4">Email</TableColumn>
		// 		<TableColumn className="w-2/4">Username</TableColumn>
		// 		<TableColumn className="w-1/4">Status</TableColumn>
		// 		<TableColumn maxWidth={60}>Actions</TableColumn>
		// 	</TableHeader>

		// 	<TableBody>
		// 		{/* Repeat this TableRow for as many rows as you need */}
		// 		<TableRow key="loading1">
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-1/2" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<div className="flex items-center">
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8 mr-2" />
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8" />
		// 				</div>
		// 			</TableCell>
		// 		</TableRow>
		// 		<TableRow key="loading2">
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-1/2" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<div className="flex items-center">
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8 mr-2" />
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8" />
		// 				</div>
		// 			</TableCell>
		// 		</TableRow>
		// 		<TableRow key="loading3">
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-full" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<Skeleton className="h-8 bg-gray-200 rounded w-1/2" />
		// 			</TableCell>
		// 			<TableCell>
		// 				<div className="flex items-center">
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8 mr-2" />
		// 					<Skeleton className="h-8 bg-gray-200 rounded w-8" />
		// 				</div>
		// 			</TableCell>
		// 		</TableRow>
		// 	</TableBody>
		// </Table>
	);
};

export default TableSkeleton;
