'use client';
import { Button, Table, TableHeader, User } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import React from 'react';
import { User as UserType } from '@/prisma/typescript.models';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface UsersType {
	users: UserType[];
}

const UserList = ({ users }) => {
	const router = useRouter();
	// console.log(users);
	return (
		<table className="border w-full">
			<thead className="bg-slate-200">
				<tr className="p-2">
					<td className="p-2">Email</td>
					<td className="p-2">Username</td>
					<td className="p-2">Status</td>
					<td className="p-2">Actions</td>
				</tr>
			</thead>
			<tbody>
				{users &&
					users.map(user => (
						<tr key={user.id}>
							<td className="p-2">{user.email}</td>
							<td>{user.username}</td>
							<td>{user.status}</td>
							<td>
								<Button
									as="a"
									color="primary"
									size="sm"
									isIconOnly
									onClick={() => router.push(`/admin/user/${user.id}`)}
									className="mr-2"
								>
									<FaSearch />
								</Button>

								<Button
									as="a"
									color="danger"
									size="sm"
									isIconOnly
									onClick={() => router.push(`/admin/user/${user.id}`)}
									// href={router.push(`/admin/user/${user.id}`)}
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

export default UserList;
