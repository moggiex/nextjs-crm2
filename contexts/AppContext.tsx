import React, { createContext, useContext, useState, useEffect, FunctionComponent } from 'react';
import { getUserData, isLoggedIn } from '@/lib/client/auth';
import { usePathname } from 'next/navigation';
// import { I_UserPublic } from '@/models/User.types';
import { I_ApiAuthResponse } from '@/app/api/auth/route';
import { getRelevantAlertForUser } from '@/db/actions/alerts/AlertsHelpers';

interface AppContextProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	logoutCleanup: () => Promise<void>;
	userData: any | null; // I_UserPublic
	userDataLoaded: boolean;
	loadUserData: () => void;
	systemAlerts: any | null;
}

export interface I_ModalProps {
	className: string;
}

const defaultModalProps: I_ModalProps = {
	className: 'bg-white',
};

const AppContext = createContext<AppContextProps | undefined>(undefined);
interface AppProviderProps {
	children: React.ReactNode;
}

const USERDATA_TTL = 60 * 5; // 5 minutes

export const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<any | null>(null); // I_UserPublic
	const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
	const [userDataLastLoad, setUserDataLastLoad] = useState<Date>(new Date());
	const [systemAlerts, setSystemAlerts] = useState<any | null>(null);

	const logoutCleanup = async () => {
		setUserData(null);
		setUserDataLoaded(false);
		setSystemAlerts(null);
	};
	const loadUserData = () => {
		setUserDataLoaded(false);
		const userData = getUserData();
		setUserData(userData);
		setUserDataLoaded(true);
	};
	const loadUserDataFromServer = async () => {
		if (!isLoggedIn()) return;

		try {
			const response = await fetch('/api/auth');
			const data = (await response.json()) as I_ApiAuthResponse;
			const { success } = data;
			if (!success) {
				let message = 'Failed to load user data from server';
				if (data.message) message = data.message;
				console.error(message);
				return;
			}
			setUserDataLastLoad(new Date());
		} catch (_) {
			console.error('Failed to load user data from server');
		} finally {
			loadUserData();
		}
	};
	// Fires on first load
	useEffect(() => {
		loadUserDataFromServer();
	}, []);
	// Fires on page load
	useEffect(() => {
		const userData = getUserData();
		setUserData(userData);
		setUserDataLoaded(true);
		// Reload user data from server if USERDATA_TTL has expired
		if (userDataLastLoad) {
			const now = new Date();
			const diff = now.getTime() - userDataLastLoad.getTime();
			if (diff > USERDATA_TTL * 1000) {
				loadUserDataFromServer();
			}
		}

		// Get Alerts
		const fetchData = async user => {
			const result = await getRelevantAlertForUser(user);
			// console.log(result);
			if (!result) return;
			setSystemAlerts(result);
		};
		if (userData) {
			// console.log('fetching alerts');
			// console.log(userData);
			fetchData({ user: userData });
		}
	}, [pathname]);
	// console.log(userData);
	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
				logoutCleanup,
				userData,
				userDataLoaded,
				loadUserData,
				systemAlerts,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
export const useApp = (): AppContextProps => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within AppProvider');
	}
	return context;
};
