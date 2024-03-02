import React, { Suspense } from 'react';
import { updateProfile } from '@/db/actions/profile';
import { Input, Button, Chip, Divider, Select, SelectItem } from '@nextui-org/react';
import { FaEnvelope, FaPhone, FaUser, FaUserAlt } from 'react-icons/fa';
import CountriesSelect from '../CountriesSelect';
// import CountriesSelect from '../CountriesSelect';

const ProfileForm = async user => {
	//
	return (
		<>
			<h1 className="text-3xl font-bold">Account Profile</h1>
			<p>Here you can update your account profile information and billing address</p>
			<Divider className="my-4" />
			<h2 className="text-xl font-bold">Basic Profile</h2>
			<p className="my-4">
				Status: <Chip color="success">{user.status}</Chip>
			</p>
			<form action={updateProfile} className="flex flex-col gap-y-2">
				<Input
					id="email"
					label="Email Address"
					name="email"
					type="email"
					value={user.email}
					placeholder="Email Address"
					labelPlacement="outside"
					variant="bordered"
					startContent={<FaEnvelope className="text-default-400 pointer-events-none flex-shrink-0" />}
					isDisabled
				/>
				<Input
					id="username"
					label="User Name"
					name="username"
					value={user?.username ? user.username : ''}
					placeholder="User Name"
					labelPlacement="outside"
					startContent={<FaUser className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="firstName"
					label="First Name"
					name="firstName"
					value={user?.firstName ? user.firstName : ''}
					placeholder="First Name"
					labelPlacement="outside"
					startContent={<FaUserAlt className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="lastName"
					label="Last Name"
					name="lastName"
					value={user?.lastName ? user.lastName : ''}
					placeholder="Last Name"
					labelPlacement="outside"
					startContent={<FaUserAlt className=" text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="phone"
					label="Phone Number"
					name="phone"
					value={user?.phone ? user.phone : ''}
					placeholder="Phone Number"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Divider className="my-4" />
				<h2 className="text-xl font-bold">Address Details</h2>

				<Input
					id="businessName"
					label="Business Name"
					name="businessName"
					value={user.addresses?.businessName ? user.addresses.businessName : ''}
					placeholder="Business Name"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="addressLine1"
					label="Address Line 1"
					name="addressLine1"
					value={user.addresses?.addressLine1 ? user.addresses.addressLine1 : ''}
					placeholder="Address Line 1"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="addressLine2"
					label="Address Line 2"
					name="addressLine2"
					value={user.addresses?.addressLine2 ? user.addresses.addressLine2 : ''}
					placeholder="Address Line 2"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="city"
					label="City"
					name="city"
					value={user.addresses?.city ? user.addresses.city : ''}
					placeholder="City"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="countyOrState"
					label="County Or State"
					name="countyOrState"
					value={user.addresses?.countyOrState ? user.addresses.countyOrState : ''}
					placeholder="County Or State"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>
				<Input
					id="postZipCode"
					label="Post Code or Zip Code"
					name="postZipCode"
					value={user.addresses?.postZipCode ? user.addresses.postZipCode : ''}
					placeholder="Post Code or Zip Code"
					labelPlacement="outside"
					startContent={<FaPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
					variant="bordered"
				/>

				{/* <Select
					items={user.addresses.countries}
					label="Country"
					placeholder="Select an country"
					className="max-w-xs"
				>
					{country => <SelectItem key={country.id}>{country.name}</SelectItem>}
				</Select> */}

				{/* {countries && <CountriesSelect countries={countries} />} */}

				{/* <Suspense fallback={<div>Loading...</div>}> */}
				{/* {user.countries && <CountriesSelect countries={user.countries} />} */}

				{/* </Suspense> */}

				<Button type="submit" color="primary" variant="bordered">
					Update
				</Button>
			</form>
			{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
		</>
	);
};

export default ProfileForm;
