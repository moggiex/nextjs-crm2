'use client';
import { useEffect, useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import InlineMessage from '@/components/InlineMessage';
import { useRouter } from 'nextjs13-progress';
import { ZodError, z } from 'zod';
import { FaQuestion } from 'react-icons/fa';
import { createTicketReply } from '@/db/actions/tickets/tickets';

const TicketReply = ({ parentTicketId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [messageError, setMessageError] = useState('');

	const router = useRouter();

	const handleAddReply = async (formData: FormData) => {
		setIsLoading(true);
		setError('');
		setMessageError('');

		const ticketReplySchema = z.object({
			message: z
				.string()
				.min(2, 'Message is required or a minimum of 2 letters') // Ensures the message is not empty
				.max(2000, 'Message must be 2000 characters or less'), // Limits message length
			parentId: z
				.string()
				.min(20, 'Parent Id invalid') // Ensures the message is not empty
				.max(50, 'Parent Id invalid'), // Limits message length
		});

		try {
			setIsLoading(true);
			const formDataObject = {
				message: formData.get('message') ?? '',
				parentId: parentTicketId,
				// Assuming this is a string that matches one of your issue types
			};

			console.log(formDataObject);

			const validatedData = ticketReplySchema.parse(formDataObject);

			// console.log(data);
			const reply = await createTicketReply(validatedData);

			if (!reply || reply.success !== true) {
				console.log('Error creating ticket');
				setError('Error creating ticket');
				return false;
			}
			setIsLoading(false);
			// router.push(`/tickets/${parentTicketId}`);
			router.push(`/tickets`);
		} catch (error) {
			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'message') {
						// Now check for 'password'
						setMessageError(err.message);
					}
				});
			} else {
				// Other error occurred
				let mess = 'Something went wrong.';
				if (error instanceof Error) {
					mess = error.message;
				}
				setError(mess);
				setIsLoading(false);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2>Leave a Reply</h2>
			<form action={handleAddReply}>
				<Textarea
					id="message"
					label="Your Reply"
					name="message"
					type="message"
					isInvalid={!!messageError}
					errorMessage={messageError}
					disabled={isLoading}
					defaultValue=""
					placeholder="Your reply here...."
					variant="bordered"
					isRequired
					startContent={<FaQuestion className="text-default-400 pointer-events-none flex-shrink-0" />}
					className="p-2 mb-2"
				/>
				{messageError && <InlineMessage message={messageError} />}

				{error && <InlineMessage message={error} />}

				<div className="flex justify-end mb-2">
					<Button
						type="submit"
						color="primary"
						variant="solid"
						className="text-white"
						isLoading={!!isLoading}
						disabled={isLoading}
						spinner={
							<svg
								className="animate-spin h-5 w-5 text-current"
								fill="none"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									fill="currentColor"
								/>
							</svg>
						}
					>
						Add Reply
					</Button>
				</div>
			</form>
		</div>
	);
};

export default TicketReply;
