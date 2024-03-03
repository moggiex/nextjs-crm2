'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
// import { Link } from 'nextjs13-progress';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'nextjs13-progress';
import { usePathname } from 'next/navigation';

// Next UI
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from '@nextui-org/react';

// import logo from '@/assets/svg/designly-logo-trans.svg';
import logo from '@/assets/svg/ebay-crm-logo-black.svg';
import profileDefaultImage from '@/assets/images/profile.png';

const originalWidth = 300;
const originalHeight = 105;
const displayWidth = 150;
const displayHeight = originalHeight / (originalWidth / displayWidth);

export default function Header() {
	const { userData } = useApp();
	const router = useRouter();
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

	const pathname = usePathname();

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleAuthButton = () => {
		if (userData) {
			router.push('/logout');
		} else {
			router.push('/login');
		}
		setAnchorElUser(null);
	};

	const handleRoute = (route: string) => {
		router.push(route);
		setAnchorElUser(null);
	};

	// const displayName = userData ? `${userData.firstName} ${userData.lastName}` : undefined;
	const displayName = userData ? `${userData.email}` : undefined;

	type MenuItem = {
		name: string;
		route: string;
		role: string;
	};

	const menuItems: MenuItem[] = [
		{ name: 'Dashboard', route: '/app', role: '*' },
		{ name: 'My Account', route: '/profile', role: '*' },
		{ name: 'Admin Dashboard', route: '/admin', role: 'admin' },
	];

	return (
		<Navbar
			shouldHideOnScroll
			isBordered
			onMenuOpenChange={setisMobileMenuOpen}
			// className="bg-white"
			classNames={{
				item: [
					'flex',
					'relative',
					'h-full',
					'items-center',
					"data-[active=true]:after:content-['']",
					'data-[active=true]:after:absolute',
					'data-[active=true]:after:bottom-0',
					'data-[active=true]:after:left-0',
					'data-[active=true]:after:right-0',
					'data-[active=true]:after:h-[2px]',
					'data-[active=true]:after:rounded-[2px]',
					'data-[active=true]:after:bg-primary',
					'data-[active=true]:text-primary',
				],
			}}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Link href="/">
						<Image src={logo} alt="Logo" width={0} height={0} priority />
					</Link>
				</NavbarBrand>
			</NavbarContent>
			{/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
				{userData
					? menuItems.map((item, index) => {
							if (item.role === '*' || (userData.role && userData.role === item.role)) {
								return (
									<NavbarItem key={index} onClick={() => handleRoute(item.route)}>
										<Button className="text-center rounded-md border-x-neutral-950">
											{item.name}
										</Button>
									</NavbarItem>
								);
							}
					  })
					: null}
			</NavbarContent> */}

			<NavbarContent as="div" justify="end">
				{!userData && (
					<NavbarItem>
						<Button className="btn-primary" onClick={handleAuthButton}>
							Login
						</Button>
					</NavbarItem>
				)}
				{userData && (
					<>
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar
									isBordered
									as="button"
									className="transition-transform"
									color="primary"
									name="Jason Hughes"
									size="sm"
									src={profileDefaultImage.src}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat">
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-semibold">Signed in as</p>
									<p className="font-semibold">{displayName}</p>
								</DropdownItem>
								<DropdownItem key="profile2" onClick={() => router.push('/profile')}>
									My Profile
								</DropdownItem>
								{menuItems &&
									menuItems.map((item, index) => {
										if (
											item.role === '*' ||
											(userData.role && userData.role === item.role)
										) {
											return (
												<DropdownItem
													key={index}
													onClick={() => handleRoute(item.route)}
												>
													{item.name}
												</DropdownItem>
											);
										}
									})}
								<DropdownItem key="logout">
									<Button className="bg-danger text-white" onClick={handleAuthButton}>
										Log Out
									</Button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</>
				)}
			</NavbarContent>
			{/* {Sidebar} */}
			{userData ? (
				<NavbarMenu>
					{menuItems &&
						menuItems.map((item, index) => {
							if (item.role === '*' || (userData.role && userData.role === item.role)) {
								return (
									<NavbarMenuItem key={index}>
										<Link href={item.route} onClick={() => handleRoute(item.route)}>
											{item.name}
										</Link>
									</NavbarMenuItem>
								);
							}
						})}
				</NavbarMenu>
			) : null}
		</Navbar>
	);
}

// Previous menu
// <>
// 	<div className="fixed top-0 right-0 left-0 h-20 flex items-center justify-between px-6">
// 		<Link href="/" className="my-auto">
// 			<Image src={logo} alt="Designly" width={displayWidth} height={displayHeight} />
// 		</Link>
// 		<div>
// 			<Tooltip title="Open settings">
// 				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// 					<Avatar alt={displayName} src={userData?.avatar} />
// 				</IconButton>
// 			</Tooltip>
// 			<Menu
// 				sx={{ mt: '45px' }}
// 				id="menu-appbar"
// 				anchorEl={anchorElUser}
// 				anchorOrigin={{
// 					vertical: 'top',
// 					horizontal: 'right',
// 				}}
// 				keepMounted
// 				transformOrigin={{
// 					vertical: 'top',
// 					horizontal: 'right',
// 				}}
// 				open={Boolean(anchorElUser)}
// 				onClose={handleCloseUserMenu}
// 			>
// 				{userData
// 					? menuItems.map((item, index) => {
// 							if (item.role === '*' || (userData.role && userData.role === item.role)) {
// 								return (
// 									<MenuItem key={index} onClick={() => handleRoute(item.route)}>
// 										<Typography textAlign="center">{item.name}</Typography>
// 									</MenuItem>
// 								);
// 							}
// 					  })
// 					: null}
// 				<MenuItem onClick={handleAuthButton}>
// 					<Typography textAlign="center">{userData ? 'Logout' : 'Login'}</Typography>
// 				</MenuItem>
// 			</Menu>
// 		</div>
// 	</div>
// 	<div className="h-20"></div>
// </>
