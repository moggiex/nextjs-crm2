'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import React from 'react';
import { User as UserType } from '@/prisma/typescript.models';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '@/components/tickets/style.module.css';
import { getStatusColour } from '@/lib/server/user/userHelper';

const AdminEmailList = ({ SystemEmailTemplates }) => {
	const router = useRouter();

	return (
		<>
			<Table
				aria-label="System Email Template Table"
				onRowAction={
					SystemEmailTemplates.length > 0
						? key => {
								router.push(`/admin/system/emails/${key}`);
						  }
						: undefined
				}
				selectionMode="single"
				color="primary"
				className="mb-8"
				// color="success"
			>
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>Name</TableColumn>
					<TableColumn>emailSubject</TableColumn>
					<TableColumn>type</TableColumn>
					<TableColumn>enabled</TableColumn>
					<TableColumn>htmlEnabled</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{SystemEmailTemplates.length === 0 && (
						<TableRow key="1">
							<TableCell aria-colspan={5} colSpan={5}>
								{`There are no email templates yet`}
							</TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
							<TableCell className="hidden"> </TableCell>
						</TableRow>
					)}
					{SystemEmailTemplates.length > 0 &&
						SystemEmailTemplates.map(semt => (
							<TableRow
								key={semt.id}
								className={`${styles.clickableRow} cursor-pointer`}
								onClick={() => router.push(`/admin/system/emails/${semt.id}`)}
							>
								<TableCell>{semt.id}</TableCell>
								<TableCell>
									<div>{semt.templateName}</div>
								</TableCell>
								<TableCell>{semt.emailSubject}</TableCell>
								<TableCell>
									<Chip color={() => (semt.type ? 'success' : 'danger')} variant="flat">
										{semt.type}
									</Chip>
								</TableCell>
								<TableCell>
									<Chip color={() => (semt.enabled ? 'success' : 'danger')} variant="">
										{semt.enabled ? 'Yes' : 'No'}
									</Chip>
								</TableCell>
								<TableCell>
									<Chip
										color={() => (semt.htmlEnabled ? 'success' : 'danger')}
										variant="flat"
									>
										{semt.htmlEnabled ? 'Yes' : 'No'}
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
										href={`/admin/system/emails/${semt.id}`}
									>
										<FaSearch className="mr-0" />
									</Button>
									{/* <Button variant="solid" size="sm" color="danger" isIconOnly>
										<FaTimes />
									</Button> */}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	);
};

export default AdminEmailList;
