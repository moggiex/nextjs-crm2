'use client';
import { Button, Chip } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import React from 'react';
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { AlertType, Alert } from '@/prisma/typescript.alerts';
import { formatDateTime } from '@/lib/common/dateTime';
// import { getAlertStyles } from '@/ultis/alert';

interface AlertListType {
	alerts: Alert[];
}

const AlertsList = ({ alerts }: AlertListType) => {
	const router = useRouter();
	// console.log(users);
	return (
		<table className="border w-full">
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
						<tr key={alert.id}>
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
							<td>{formatDateTime(alert.createdAt)}</td>
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
		</table>
	);
};

export default AlertsList;
