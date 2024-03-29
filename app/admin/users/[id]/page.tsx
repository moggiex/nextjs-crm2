import { getUserById } from '@/db/actions/admin/helpers';
import { getCountries } from '@/db/actions/user/profile';

import { updateProfile } from '@/db/actions/user/profile';

import { Input, Button, Chip, Divider, Switch, Card, CardHeader, CardBody } from '@nextui-org/react';
import { FaArrowLeft, FaEnvelope, FaImage, FaPencilAlt, FaPhone, FaUser, FaUserAlt } from 'react-icons/fa';
import CountriesSelect from '@/components/CountriesSelect';
import InlineMessage from '@/components/InlineMessage';
import EmailField from '@/components/admin/users/EmailField';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';

import { UserInput } from '@/primsa/zod.user';
import PayPalEventsTable from '@/components/admin/paypal/PayPalEventsTable';
import AlertsList from '@/components/admin/alerts/AlertsList';

const AdminUserIdViewPage = async ({ params }: { params: { id?: string } }) => {
	const { id } = params;
	if (!id) {
		return <div>Invalid ID</div>;
	}
	const user: UserInput = await getUserById(id);
	const countries = await getCountries();
	const messageError = false;
	const alerts = user.userAlerts.map(userAlert => userAlert.alert);

	return (
		<>
			<BreadcrumbTrail
				items={[
					{ name: 'Home', href: '/' },
					{ name: 'Admin', href: '/admin' },
					{ name: 'Users', href: '/admin/users' },
					{ name: 'Edit User', href: `/admin/users/${id}` },
				]}
			/>
			<div className="flex items-center">
				<h1 className="mr-auto">User ID: {user.email}</h1>
			</div>
			<pre>{JSON.stringify(user, null, 2)}</pre>

			<form action={updateProfile} className="flex flex-col gap-y-2">
				<div className="flex flex-wrap">
					<div className="w-1/2">
						<Card className="mb-4 mr-2">
							<CardHeader>
								<h3>Basic Details</h3>
							</CardHeader>
							<CardBody>
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
							</CardBody>
						</Card>
					</div>
					<div className="w-1/2 pl-2">
						<Card className="mb-4">
							<CardHeader>
								<h3>Address Details</h3>
							</CardHeader>
							<CardBody>
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
									defaultValue={
										user.address?.countyOrState ? user.address.countyOrState : ''
									}
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
									<InlineMessage message="No countries found. Did we load the countires to the database? npm run seed-countries" />
								)}
							</CardBody>
						</Card>

						<Button type="submit" color="primary" variant="solid" className="mt-4">
							Update
						</Button>
					</div>
				</div>
			</form>
			<h3>PayPal Subscription Events</h3>
			<Divider className="mb-4" />
			<PayPalEventsTable events={user.payPalSubscriptionEvents} />
			<h3>Dismissed Alerts</h3>
			<Divider className="mb-4" />
			<AlertsList alerts={alerts} />
		</>
	);
};

export default AdminUserIdViewPage;
