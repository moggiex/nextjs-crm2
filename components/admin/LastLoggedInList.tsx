'use client';
import { useRouter } from 'nextjs13-progress';

const LastLoggedInList = ({ users }) => {
	const router = useRouter();
	// console.log(users);
	// return;

	return (
		<table className="border">
			<thead className="bg-slate-200">
				<tr className="p-2">
					<td className="p-2">Email</td>
					<td className="p-2">Name</td>
					<td className="p-2">Username</td>
					<td className="p-2">Status</td>
					<td className="p-2">Last Login</td>
				</tr>
			</thead>
			<tbody>
				{users &&
					users.map(user => (
						<tr key={user.id} onClick={() => router.push(`/admin/user/${user.id}`)}>
							<td className="p-2">{user.email}</td>
							<td>
								{user?.firstName} {user?.lastName}
							</td>
							<td>{user.username}</td>
							<td>{user.status}</td>
							<td>{user.lastLoginDescription}</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default LastLoggedInList;
