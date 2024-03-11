// 'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@nextui-org/react';
import { FaArrowRight, FaPencilAlt, FaQuestion } from 'react-icons/fa';
// import { useRouter } from 'nextjs13-progress';

const LoginActionsCard = ({
	title = '',
	children,
	footertext = null,
	createAccount = false,
	login = false,
	forgotPassword = false,
	headerBg = 'primary',
	// goHome = false,
}) => {
	// const router = useRouter();
	return (
		<Card className="max-w-[500px] m-auto mt-8">
			{title && (
				<CardHeader className={`flex gap-3 bg-${headerBg}`}>
					<div className="flex flex-col text-center m-auto">
						<h2 className={`text-${headerBg}-content`}>{title}</h2>
						{/* <p className="text-small text-default-500">nextui.org</p> */}
					</div>
				</CardHeader>
			)}
			<Divider />
			<CardBody className="my-6 px-6">
				{children}
				{footertext && <p className="px-6 mt-4 w-full">{footertext}</p>}
			</CardBody>
			<Divider />

			{
				<CardFooter className="flex min-h-14 bg-base-100 justify-end">
					{forgotPassword && (
						<Button
							as="a"
							color="secondary"
							variant="bordered"
							className=" mr-2"
							href="/forgot-password"
							// onClick={() => router.push('/forgot-password')}
						>
							{' '}
							<FaQuestion />
							Forgot Password
						</Button>
					)}

					{createAccount && (
						<Button
							as="a"
							color="success"
							variant="bordered"
							className="mr-2"
							href="/create"
							// onClick={() => router.push('/create')}
						>
							{' '}
							<FaPencilAlt />
							Create an Account
						</Button>
					)}
					{login && (
						<Button
							as="a"
							color="secondary"
							variant="bordered"
							className="mr-2"
							href="/login"
							// onClick={() => router.push('/login')}
						>
							{' '}
							Login
							<FaArrowRight />
						</Button>
					)}
				</CardFooter>
			}
		</Card>
	);
};

export default LoginActionsCard;
