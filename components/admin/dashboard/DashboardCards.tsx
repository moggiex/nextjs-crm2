import { Card, CardBody, Skeleton } from '@nextui-org/react';
import { FaUser, FaUserPlus, FaUserSlash, FaUsers } from 'react-icons/fa';
import {
	getBannedUserCount,
	getInactiveUserCount,
	getUserCountWithinOneMonth,
	getUsersCount,
} from '@/db/actions/admin/helpers';

const DashboardCards = async () => {
	const totalUsersCount = await getUsersCount();
	const newUsers = await getUserCountWithinOneMonth();
	const banndedUsers = await getBannedUserCount();
	const inactiveUsers = await getInactiveUserCount();

	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	await delay(5000);
	return (
		<>
			<Card className="w-1/4 p-4 mr-4">
				<CardBody className="flex flex-col items-center">
					<div className="text-center mb-2">
						<FaUsers className="text-6xl text-green-800" />
					</div>
					<div className="text-right">{totalUsersCount} Total Users</div>
				</CardBody>
			</Card>
			<Card className="w-1/4 p-4 mr-4">
				<CardBody className="flex flex-col items-center">
					<div className="text-center mb-2">
						<FaUserPlus className="text-6xl text-blue-800" />
					</div>
					<div className="text-center">{newUsers} New Users This Month</div>
				</CardBody>
			</Card>
			<Card className="w-1/4 p-4 mr-4">
				<CardBody className="flex flex-col items-center">
					<div className="text-center mb-2">
						<FaUserSlash className="text-6xl text-red-800" />
					</div>
					<div className="text-right">{banndedUsers} Banned Users</div>
				</CardBody>
			</Card>
			<Card className="w-1/4 p-4 mr-4">
				<CardBody className="flex flex-col items-center">
					<div className="text-center mb-2">
						<FaUser className="text-6xl text-grey-800" />
					</div>
					<div className="text-right">{inactiveUsers} Inactive Users</div>
				</CardBody>
			</Card>
		</>
	);
};

export default DashboardCards;
