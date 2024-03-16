import { Button, Divider } from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';

import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const AdminTicketViewPage = async ({ params }: { params: { id?: string } }) => {
	const { id } = params;

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Tickets', href: '/admin/tickets' },
					{ name: 'View Ticket', href: `/admin/tickets` },
				]}
			/>
			<div className="flex items-center">
				<h1 className="mr-auto">Ticket ID: {id}</h1>
				<Button as="a" color="primary" variant="ghost" className="justify-end" href="/admin/users/">
					<FaArrowLeft /> Back to Tickets
				</Button>
			</div>
			<Divider className="mb-4" />
			<pre>{JSON.stringify(id, null, 2)}</pre>
		</>
	);
};

export default AdminTicketViewPage;
