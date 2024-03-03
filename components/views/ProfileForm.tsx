// 'use server';
import React, { Suspense, useState } from 'react';
import { updateProfile } from '@/db/actions/profile';
import { Input, Button, Chip, Divider } from '@nextui-org/react';
import { FaEnvelope, FaImage, FaPhone, FaUser, FaUserAlt } from 'react-icons/fa';
import CountriesSelect from '@/components/CountriesSelect';

import { Country } from '@/prisma/typescript.models';
interface ProfileFormProps {
	userDetails: any;
	countries: Country[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userDetails, countries }) => {
	const user = userDetails;
	console.log(user.address);
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
