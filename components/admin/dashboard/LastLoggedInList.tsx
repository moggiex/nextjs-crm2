'use client';
import { useState, useEffect } from 'react';
import { User } from '@/prisma/typescript.user';
import { useRouter } from 'nextjs13-progress';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { getStatusColour } from '@/lib/server/user/userHelper';
import styles from '@/components/tickets/style.module.css';
import { getLatestLoggedInUsers } from '@/db/actions/admin/helpers';
import TableSkeleton from '@/components/admin/dashboard/TableSkeleton';

const LastLoggedInList = () => {
	const [users, setUsers] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const updateUsers = async () => {
			const latestLoggedInUsers = await getLatestLoggedInUsers();
			setUsers(latestLoggedInUsers);
		};
		updateUsers();
	}, []);

	return (
		<>
			{!users && <TableSkeleton />}
			{users && (
				<Table
					aria-label="Last LoggedIn Users Table"
					onRowAction={
						users && users.length > 0
							? key => {
									router.push(`/admin/users/${key}`);
							  }
							: undefined
					}
					selectionMode="single"
					color="primary"
					className="mb-4"
					// color="success"
				>
					<TableHeader>
						<TableColumn>Email</TableColumn>
						<TableColumn>Username</TableColumn>
						<TableColumn>Status</TableColumn>
						<TableColumn>Last Login</TableColumn>
						<TableColumn>Actions</TableColumn>
					</TableHeader>
					<TableBody>
						{users && users?.length === 0 && (
							<TableRow key="1">
								<TableCell aria-colspan={5} colSpan={5}>
									{`There are no users yet`}
								</TableCell>
								<TableCell className="hidden"> </TableCell>
								<TableCell className="hidden"> </TableCell>
								<TableCell className="hidden"> </TableCell>
								<TableCell className="hidden"> </TableCell>
							</TableRow>
						)}
						{users &&
							users.length > 0 &&
							users.map(user => (
								<TableRow key={user.id} className={styles.clickableRow}>
									<TableCell className={styles.clickableRow}>{user.email}</TableCell>
									<TableCell>{`${user.firstName} ${user.lastName} (${user.email})`}</TableCell>
									<TableCell>{user.lastLoginDescription}</TableCell>
									<TableCell>
										<Chip color={getStatusColour(user.status)} variant="flat">
											{user.status}
										</Chip>
									</TableCell>
									<TableCell>
										<Button
											as="a"
											variant="solid"
											size="sm"
											color="primary"
											isIconOnly
											className="mr-2"
											href={`/admin/users/${user.id}`}
										>
											<FaSearch className="mr-0" />
										</Button>
										<Button variant="solid" size="sm" color="danger" isIconOnly>
											<FaTimes />
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			)}
		</>
	);
};

export default LastLoggedInList;
