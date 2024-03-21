'use client';

import React from 'react';
import { useRouter } from 'nextjs13-progress';
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { AlertType, Alert } from '@/prisma/typescript.alerts';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';

// import { getAlertStyles } from '@/ultis/alert';

interface AlertListType {
	alerts: Alert[];
}

const AlertsList = ({ alerts }: AlertListType) => {
	const router = useRouter();
	console.log(alerts);
	return (
		<>
			<Table
				aria-label="Alerts Table"
				onRowAction={
					alerts && alerts.length > 0
						? key => {
								router.push(`/admin/alerts/${key}`);
						  }
						: undefined
				}
				selectionMode="single"
				color="primary"
				className="mb-4"
				// color="success"
			>
				<TableHeader>
					<TableColumn>Type</TableColumn>
					<TableColumn>Message</TableColumn>
					<TableColumn>Enabled</TableColumn>
					<TableColumn>Created At</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{alerts && alerts.length === 0 ? (
						<TableRow key="1">
							<TableCell aria-colspan={4} colSpan={4}>
								{`There are no alerts yet`}
							</TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
						</TableRow>
					) : (
						alerts.map((theAlert: Alert) => (
							<TableRow
								key={theAlert.id}
								className={`cursor-pointer`}
								onClick={() => router.push(`/admin/alerts/${theAlert.id}`)}
							>
								<TableCell>
									<Chip color={`${theAlert.type}`} className="border border-gray-300">
										{theAlert.type}
									</Chip>
								</TableCell>
								<TableCell>{theAlert.message.slice(0, 12)}...</TableCell>
								<TableCell>
									<Chip
										color={theAlert.enabled ? 'success' : 'danger'}
										className="text-white"
									>
										{theAlert.enabled ? <FaCheck /> : <FaTimes />}
									</Chip>
								</TableCell>
								<TableCell>{theAlert.createdAt?.toLocaleDateString()}</TableCell>

								<TableCell>
									<Button
										as="a"
										variant="solid"
										size="sm"
										color="primary"
										isIconOnly
										className="mr-2"
										href={`/admin/alerts/${theAlert.id}`}
									>
										<FaSearch className="mr-0" />
									</Button>
									<Button variant="solid" size="sm" color="danger" isIconOnly>
										<FaTimes />
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			{/* <table className="border w-full">
				<thead className="bg-slate-200">
					<tr className="p-2">
						<td className="p-2">Type</td>
						<td className="p-2">Message</td>
						<td className="p-2">Enabled</td>
						<td className="p-2">Created At</td>
						<td className="p-2">Actions</td>
					</tr>
				</thead>
				<tbody>
					{alerts &&
						alerts.map(alert => (
							<tr
								key={alert.id}
								onClick={() => router.push(`/admin/alerts/${alert.id}`)}
								className="cursor-pointer hover:bg-default"
							>
								<td className="p-2">
									<Chip color={`${alert.type}`} className="border border-gray-300">
										{alert.type}
									</Chip>
								</td>
								<td>{alert.message}</td>
								<td>
									<Chip color={alert.enabled ? 'success' : 'danger'} className="text-white">
										{alert.enabled ? <FaCheck /> : <FaTimes />}
									</Chip>
								</td>
								<td>{alert.createdAt?.toLocaleDateString()}</td>
								<td>
									<Button
										as="a"
										color="primary"
										size="sm"
										isIconOnly
										onClick={() => router.push(`/admin/alerts/${alert.id}`)}
										className="mr-2"
									>
										<FaSearch />
									</Button>

									<Button
										as="a"
										color="danger"
										size="sm"
										isIconOnly
										onClick={() => router.push(`/admin/alerts/${alert.id}`)}
									>
										<FaTimes />
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table> */}
		</>
	);
};

export default AlertsList;
