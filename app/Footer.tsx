import Link from 'next/link';

export default function Footer() {
	const currentYear = new Date().getUTCFullYear();
	return (
		// <div className="flex-1 w-full px-4 md:px-6 lg:px-8 pt-8">
		// 				<div className="max-w-4xl mx-auto border-x-medium">{children}</div>
		// 			</div>
		<footer className="flex-1 w-full px-4 md:px-6 lg:px-8 pt-8 bg-neutral text-white p-6 mt-6">
			<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center">
				{/* <!-- Column 1 --> */}
				<div className="mb-6 md:mb-0">
					<h5 className="uppercase font-bold mb-2.5">Column 1</h5>
					<ul className="list-none mb-0">
						<li>
							<Link href="#" className="text-white">
								Link 1
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 2
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 3
							</Link>
						</li>
					</ul>
				</div>
				{/* <!-- Column 2 --> */}
				<div className="mb-6 md:mb-0">
					<h5 className="uppercase font-bold mb-2.5">Column 2</h5>
					<ul className="list-none mb-0">
						<li>
							<Link href="#" className="text-white">
								Link 1
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 2
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 3
							</Link>
						</li>
					</ul>
				</div>
				{/* <!-- Column 3 --> */}
				<div className="mb-6 md:mb-0">
					<h5 className="uppercase font-bold mb-2.5">Column 3</h5>
					<ul className="list-none mb-0">
						<li>
							<Link href="#" className="text-white">
								Link 1
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 2
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Link 3
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex justify-center pt-8">
				<p className="text-grey text-small">&copy; {currentYear} eBay CRM. All rights reserved.</p>
			</div>
			<div className="flex justify-center pt-8">
				<Link
					className="flex items-center gap-1 text-current text-small"
					href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
					title="nextui.org homepage"
				>
					<span className="text-grey">Powered by</span>
					<p className="text-primary">NextUI</p>
					<p className="text-grey">Version: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
				</Link>
			</div>
		</footer>
	);
}
