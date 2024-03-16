import { getUsers } from '@/db/actions/admin/helpers';
import UserList from '@/components/admin/dashboard/UserList';
import { Button } from '@nextui-org/react';
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

/**
 * get all users
 * make a table
 * make the row clickable
 * TODO: Consider pagination?
 */

const AdminUsersPage = async () => {
	const users = await getUsers({ limit: 100 });
	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Users', href: '/admin/users' },
				]}
			/>
			<div className="flex items-center">
				<h1 className="mr-auto">User List</h1>
				<Button color="primary" className="justify-end">
					<FaPencilAlt /> Create User
				</Button>
			</div>

			<p className="mb-2">Below is a list of all the users limited to 100.</p>

			{users && <UserList users={users} />}
		</>
	);
};

export default AdminUsersPage;
