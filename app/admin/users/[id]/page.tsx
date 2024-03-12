import { getUserById } from '@/db/actions/admin/helpers';
import { getCountries } from '@/db/actions/user/profile';

import { updateProfile } from '@/db/actions/user/profile';

import { Input, Button, Chip, Divider, Switch } from '@nextui-org/react';
import { FaArrowLeft, FaEnvelope, FaImage, FaPencilAlt, FaPhone, FaUser, FaUserAlt } from 'react-icons/fa';
import CountriesSelect from '@/components/CountriesSelect';
import InlineError from '@/components/InlineError';
import EmailField from '@/components/admin/users/EmailField';

const AdminUserIdViewPage = async ({ params }: { params: { id?: string } }) => {
	const { id } = params;
	const user = await getUserById(id);
	const countries = await getCountries();
	const messageError = false;

	return (
		<>
			<div className="flex items-center">
				<h1 className="mr-auto">User ID: {user.email}</h1>
				<Button as="a" color="primary" variant="ghost" className="justify-end" href="/admin/users/">
					<FaArrowLeft /> Back to Users
				</Button>
			</div>
			<pre>{JSON.stringify(user, null, 2)}</pre>

			<form action={updateProfile} className="flex flex-col gap-y-2">
				<div className="flex flex-wrap">
					<div className="w-1/2">
						<h2 className="text-xl font-bold mb-2">Basic Details</h2>

						<EmailField email={user.email} emailError={false} emailErrorMessage={false} />

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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
					</div>
					<div className="w-1/2 pl-2">
						<h2 className="text-xl font-bold mb-2">Address Details</h2>

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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
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
							className="mb-4"
							isInvalid={!!messageError}
							errorMessage={messageError}
						/>

						{countries && countries.length > 0 && (
							<CountriesSelect
								countries={countries}
								countryId={user.address?.countryId ? user.address.countryId : '225'}
								// countryId={user.address?.countryId ? user.address?.countryId : '1'}
							/>
						)}

						{countries.length === 0 && (
							<InlineError errorMessage="No countries found. Did we load the countires to the database? npm run seed-countries" />
						)}

						<Button type="submit" color="primary" variant="solid" className="mt-4">
							Update
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AdminUserIdViewPage;
