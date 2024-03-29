'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import React from 'react';
import { User as UserType } from '@/prisma/typescript.models';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '@/components/tickets/style.module.css';
import { getStatusColour } from '@/lib/server/user/userHelper';

interface UsersType {
	users: UserType[];
}

const UserList = ({ users }) => {
	const router = useRouter();

	return (
		<>
			<Table
				aria-label="Users Table"
				onRowAction={
					users.length > 0
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
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{users.length === 0 && (
						<TableRow key="1">
							<TableCell aria-colspan={4} colSpan={4}>
								{`There are no users yet`}
							</TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
						</TableRow>
					)}
					{users.length > 0 &&
						users.map(user => (
							<TableRow
								key={user.id}
								className={`${styles.clickableRow} cursor-pointer`}
								onClick={() => router.push(`/admin/users/${user.id}`)}
							>
								<TableCell className={styles.clickableRow}>{user.email}</TableCell>
								<TableCell>{`${user.firstName} ${user.lastName} (${user.email})`}</TableCell>
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
		</>
	);
};

export default UserList;
