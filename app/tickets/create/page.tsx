'use client';
import { useEffect, useState } from 'react';
import InlineMessage from '@/components/InlineMessage';
import IssueTypeSelect from '@/components/tickets/IssueTypeSelect';
import { Input, Textarea, Select, SelectSection, SelectItem, Button, Divider } from '@nextui-org/react';
import React from 'react';
import { FaInfo, FaQuestion } from 'react-icons/fa';
import { createTicket } from '@/db/actions/tickets/tickets';
import { useRouter } from 'nextjs13-progress';
import { ZodError, z } from 'zod';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

const CreateTicketPage = () => {
	const [selectedIssueType, setSelectedIssueType] = useState('Issue'); // Default selection
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [subjectError, setSubjectError] = useState('');
	const [messageError, setMessageError] = useState('');
	const [typeError, setTypeError] = useState('');

	const router = useRouter();

	useEffect(() => {
		setSelectedIssueType('Issue');
	}, []);

	// Function to be called from the child to update the parent's state
	const handleIssueTypeChange = newValue => {
		setSelectedIssueType(newValue);
	};

	const handleCreateTicket = async (formData: FormData) => {
		setIsLoading(true);
		setSubjectError('');
		setMessageError('');
		setTypeError('');

		const ticketSchema = z.object({
			subject: z
				.string()
				.min(5, 'Subject is required or be longer than 5 characters') // Ensures the subject is not empty
				.max(100, 'Subject must be 100 characters or less'), // Limits subject length

			message: z
				.string()
				.min(20, 'Message is required or a minimum of 5 words') // Ensures the message is not empty
				.max(2000, 'Message must be 2000 characters or less'), // Limits message length

			type: z.enum(['Issue', 'FeatureRequest', 'Query']), // Assuming these are your possible issue types
		});

		try {
			setIsLoading(true);
			const formDataObject = {
				subject: formData.get('subject').trim(),
				message: formData.get('message').trim(),
				type: selectedIssueType, // Assuming this is a string that matches one of your issue types
			};

			const validatedData = ticketSchema.parse(formDataObject);

			// console.log(data);
			const ticket = await createTicket(validatedData);

			if (!ticket || ticket.success !== true) {
				console.log('Error creating ticket');
				return false;
			}
			setIsLoading(false);
			router.push('/tickets');
		} catch (error) {
			if (error instanceof ZodError) {
				error.errors.forEach(err => {
					if (err.path[0] === 'subject') {
						// Using exact match for clarity
						setSubjectError(err.message);
					}
					if (err.path[0] === 'message') {
						// Now check for 'password'
						setMessageError(err.message);
					}
					if (err.path[0] === 'type') {
						// Check for 'email'
						setTypeError(err.message);
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
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Tickets', href: '/tickets' },
					{ name: 'Create Ticket', href: `/tickets/create` },
				]}
			/>
			<h1>Create a Ticket</h1>
			<Divider className="mb-4" />
			<p>Use the form below to create a support ticket</p>
			<form action={handleCreateTicket}>
				<IssueTypeSelect onIssueTypeChange={handleIssueTypeChange} typeError={typeError} />
				{/* {issueTypeError && <InlineMessage message={issueTypeError} />} */}

				<Input
					id="subject"
					label="Subject"
					name="subject"
					type="subject"
					isInvalid={!!subjectError}
					errorMessage={subjectError}
					defaultValue=""
					// ref={subject}
					placeholder="What is this ticket about?"
					variant="bordered"
					isRequired
					startContent={<FaQuestion className="text-default-400 pointer-events-none flex-shrink-0" />}
					// onKeyDown={e => {
					// 	if (e.key === 'Enter') {
					// 		if (passwordRef.current) {
					// 			passwordRef.current.focus();
					// 		}
					// 	}
					// }}
					className="p-2 mb-2"
				/>
				{subjectError && <InlineMessage message={subjectError} />}

				<Textarea
					id="message"
					label="Message"
					name="message"
					type="message"
					isInvalid={!!messageError}
					errorMessage={messageError}
					defaultValue=""
					// ref={message}
					placeholder="Provide details about your support request"
					variant="bordered"
					isRequired
					startContent={<FaInfo className="text-default-400 pointer-events-none flex-shrink-0" />}
					// onKeyDown={e => {
					// 	if (e.key === 'Enter') {
					// 		if (passwordRef.current) {
					// 			passwordRef.current.focus();
					// 		}
					// 	}
					// }}
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
						Create Ticket
					</Button>
				</div>
			</form>
		</>
	);
};

export default CreateTicketPage;
