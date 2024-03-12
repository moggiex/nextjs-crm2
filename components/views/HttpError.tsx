// 'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';
// import { useRouter } from 'nextjs13-progress';

const HttpError = ({
	title = '',
	children,
	footertext = '',
	headerBg = 'error',
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
				{footertext && <p className="mt-4 w-full">{footertext}</p>}
			</CardBody>
			<Divider />

			<CardFooter className="flex min-h-14 bg-base-100 justify-center">
				<Button
					as="a"
					color="danger"
					variant="solid"
					className=" mr-2"
					href="/"
					// onClick={() => router.push('/auth/forgot-password')}
				>
					{' '}
					<FaArrowLeft />
					Go Home
				</Button>
			</CardFooter>
		</Card>
	);
};

export default HttpError;
