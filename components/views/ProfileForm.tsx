// 'use server';
import React, { Suspense, useState } from 'react';
import { updateProfile } from '@/db/actions/profile';
import { Input, Button, Chip, Divider } from '@nextui-org/react';
import { FaEnvelope, FaImage, FaPhone, FaUser, FaUserAlt } from 'react-icons/fa';
import CountriesSelect from '@/components/CountriesSelect';

import { z } from 'zod';

import { Country } from '@/prisma/typescript.models';
interface ProfileFormProps {
	userDetails: any;
	countries: Country[];
}

const UpdateUserFormSchema = z.object({
	email: z.string().email('Enter a valid email address'), // Email is required and must be a valid email
	username: z
		.string()
		.optional()
		.refine(
			val => {
				// If a value is provided, it must be at least 5 characters long
				return val === undefined || val.length >= 5;
			},
			{
				message: 'Username must be at least 5 characters long', // Custom error message
				path: ['username'], // Specify the path to associate the error message with the username field
			},
		),
	firstName: z.string().min(3, 'First name is required'), // First name is required and cannot be empty
	lastName: z.string().min(3, 'Last name is required'), // Last name is required and cannot be empty
	phone: z.string().min(1, 'Phone number is required'), // Phone number is required and cannot be empty
	// Skipping avatar as it's commented out in your snippet

	// Address details
	businessName: z.string().optional(), // Business name is optional
	addressLine1: z.string().min(5, 'Address line 1 is required'), // Address line 1 is required and cannot be empty
	addressLine2: z.string().optional(), // Address line 2 is optional
	city: z.string().min(3, 'City is required'), // City is required and cannot be empty
	countyOrState: z.string().min(3, 'County or State is required'), // County or State is required and cannot be empty
	postZipCode: z.string().min(6, 'Post/Zip code is required'), // Post/Zip code is required and cannot be empty
	countryId: z.number('Country must be selected'), // Country should be a number indicating the selected country ID
});

const ProfileForm: React.FC<ProfileFormProps> = ({ userDetails, countries }) => {
	const user = userDetails;
	console.log(user.address);

	const [emailError, setEmailError] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [phoneError, setPhoneError] = useState('');
	// States for address fields
	const [businessNameError, setBusinessNameError] = useState('');
	const [addressLine1Error, setAddressLine1Error] = useState('');
	const [addressLine2Error, setAddressLine2Error] = useState('');
	const [cityError, setCityError] = useState('');
	const [countyOrStateError, setCountyOrStateError] = useState('');
	const [postZipCodeError, setPostZipCodeError] = useState('');
	const [countryIdError, setCountryIdError] = useState('');

	// const [image, setImage] = useState(null);
	// const [imageUrl, setImageUrl] = useState((''));

	// const handleImageChange = e => {
	// 	const file = e.target.files[0];
	// 	if (file) {
	// 		setImage(file);
	// 		const reader = new FileReader();
	// 		reader.onload = e => {
	// 			setImageUrl(e.target.result);
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	return (
		<>
			{user && countries && (
				<div className="mb-4">
					<h1 className="text-3xl font-bold">Account Profile</h1>
					<p>Here you can update your account profile information and billing address</p>
					<Divider className="my-4" />
					<h2 className="text-xl font-bold">Basic Profile</h2>

					{/* <Suspense fallback={<div className="loading">Loading...</div>}> */}

					<form action={updateProfile} className="flex flex-col gap-y-2">
						{/* <p className="my-4">
					Status: <Chip color="success">{user?.status ? user.status : ''}</Chip>
				</p> */}
						<Input
							id="email"
							label="Email Address"
							name="email"
							type="email"
							defaultValue={user.email}
							placeholder="Email Address"
							variant="bordered"
							startContent={
								<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							isDisabled
						/>
						<Input
							id="username"
							label="User Name"
							name="username"
							defaultValue={user?.username ? user.username : ''}
							placeholder="User Name"
							startContent={
								<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
							readOnly={false}
							disabled={false}
						/>
						<Input
							id="firstName"
							label="First Name"
							name="firstName"
							defaultValue={user?.firstName ? user.firstName : ''}
							placeholder="First Name"
							startContent={
								<FaUserAlt className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="lastName"
							label="Last Name"
							name="lastName"
							defaultValue={user?.lastName ? user.lastName : ''}
							placeholder="Last Name"
							startContent={
								<FaUserAlt className=" text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="phone"
							label="Phone Number"
							name="phone"
							defaultValue={user?.phone ? user.phone : ''}
							placeholder="Phone Number"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						{/* <Input
					id="avatar"
					label="Avatar"
					name="avatar"
					// defaultValue={user?.avatar ? user.avatar : ('')}
					type="file"
					accept="image/*"
					// onChange={handleImageChange}
					placeholder="Avatar"
					// startContent={<FaImage className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/> */}

						<Divider className="my-4" />
						<h2 className="text-xl font-bold">Address Details</h2>

						<Input
							id="businessName"
							label="Business Name"
							name="businessName"
							defaultValue={user.address?.businessName ? user.address.businessName : ''}
							placeholder="Business Name"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="addressLine1"
							label="Address Line 1"
							name="addressLine1"
							defaultValue={user.address?.addressLine1 ? user.address.addressLine1 : ''}
							placeholder="Address Line 1"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="addressLine2"
							label="Address Line 2"
							name="addressLine2"
							defaultValue={user.address?.addressLine2 ? user.address.addressLine2 : ''}
							placeholder="Address Line 2"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="city"
							label="City"
							name="city"
							defaultValue={user.address?.city ? user.address.city : ''}
							placeholder="City"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="countyOrState"
							label="County Or State"
							name="countyOrState"
							defaultValue={user.address?.countyOrState ? user.address.countyOrState : ''}
							placeholder="County Or State"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>
						<Input
							id="postZipCode"
							label="Post Code or Zip Code"
							name="postZipCode"
							defaultValue={user.address?.postZipCode ? user.address.postZipCode : ''}
							placeholder="Post Code or Zip Code"
							startContent={
								<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />
							}
							variant="bordered"
						/>

						{countries && countries.length > 0 && (
							<CountriesSelect
								countries={countries}
								countryId={user.address?.countryId ? user.address.countryId : '225'}
								// countryId={user.address?.countryId ? user.address?.countryId : '1'}
							/>
						)}

						<Button type="submit" color="primary" variant="solid">
							Update
						</Button>
					</form>

					{/* </Suspense> */}
				</div>
			)}
		</>
	);
};

export default ProfileForm;
