const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER_HOST,
	port: process.env.EMAIL_SERVER_PORT,
	secure: process.env.EMAIL_SERVER_SECURE, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD,
	},
});

export const sendForgotPasswordEmail = async (name: string, email: string, token: string) => {
	// Need to url encode the token other wise it fucks up
	const encodedToken = encodeURIComponent(token);
	const link = `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password/${encodedToken}`;

	try {
		const info = await transporter.sendMail({
			from: `"Amazing CRM 👻" <${process.env.EMAIL_FROM}>`, // sender address
			to: `${email}`, // list of receivers
			subject: 'Forgot Password Request ✔', // Subject line
			// text: 'Hello world?', // plain text body
			html: `
            <div>
                <h1>Reset your password</h1>
                <p>Click the link below to reset your password</p>
                <a href="${link}">Reset Password</a>
            </div>
            `,
			dsn: {
				id: 'some random message specific id',
				return: 'headers',
				notify: ['failure', 'delay'],
				recipient: process.env.EMAIL_FROM,
			},
		});
		// TODO: see here for better handling
		// https://nodemailer.com/usage/
		console.log('Message sent: %s', info.messageId);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
