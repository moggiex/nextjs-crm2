import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from '@nextui-org/react';
import { formatDateTime } from '@/lib/common/dateTime';
import profileDefaultImage from '@/assets/images/profile.png';

const TicketRepliesView = message => {
	return (
		<>
			{/* <div>TicketRepliesView</div> */}
			{/* {message && <pre>{JSON.stringify(message, null, 2)}</pre>} */}
			<Card
				className={`text-white my-4 ${
					message.ticket.author.isAdmin || message.ticket.author.isSupport ? 'bg-lime-800' : 'bg-sky-800'
				}`}
			>
				<CardHeader className="justify-between">
					<div className="flex gap-5">
						<Avatar isBordered radius="full" size="md" src={profileDefaultImage.src} />
						<div className="flex flex-col gap-1 items-start justify-center">
							<h4 className="text-small font-semibold leading-none">
								{message.ticket.author?.firstName ? message.ticket.author.firstName : ''}{' '}
								{message.ticket.author?.lastName ? message.ticket.author.lastName : ''}
							</h4>
							<h5 className="text-small tracking-tight">
								{message.ticket.author.isSupport || message.ticket.author.isAdmin ? (
									'Support Team'
								) : (
									<>
										{message.ticket.author.userName
											? message.ticket.author.userName
											: message.ticket.author.email || ''}
									</>
								)}
							</h5>
						</div>
					</div>
				</CardHeader>
				<CardBody className="px-4 py-4 font-semibold">
					<p>{message.ticket.message}</p>
				</CardBody>
				<CardFooter className="gap-3 flex justify-end">
					<div className="flex gap-1">
						<p className="text-small">
							<b>Reply Id:</b> {message.ticket.id}
						</p>
					</div>
					<div className="flex gap-1">
						<p className="text-small">
							<b>Created:</b> {formatDateTime(message.ticket.createdAt)}
						</p>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

export default TicketRepliesView;
