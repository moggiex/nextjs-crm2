export const getStatusColour = (accountStatus: string) => {
	type ChipColor = 'success' | 'default' | 'warning' | 'primary' | 'secondary' | 'danger';

	let chipColor: ChipColor;
	switch (accountStatus) {
		case 'Active':
			chipColor = 'success'; // Assuming 'success' color indicates open tickets
			break;
		case 'Pending':
			chipColor = 'warning'; // Assuming 'default' or another color indicates closed tickets
			break;
		case 'Banned':
			chipColor = 'danger'; // 'warning' color for pending tickets
			break;
		case 'Inactive':
			chipColor = 'danger'; // 'warning' color for pending tickets
			break;
		default:
			chipColor = 'default'; // Fallback color
	}
	return chipColor;
};
