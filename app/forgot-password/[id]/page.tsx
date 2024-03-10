import React from 'react';

const ForgotPasswordResetPage = ({ params }: { params: { id?: string } }) => {
	// check id is present and valid
	// if valid, check to see if the token is valid
	// if valid, present the reset password form
	// process a new password for the user and send them back to the login page

	return <div>{params.id}</div>;
};

export default ForgotPasswordResetPage;
