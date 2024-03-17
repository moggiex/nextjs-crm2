'use client';
import { Breadcrumbs, BreadcrumbItem, Button } from '@nextui-org/react';
import { useRouter } from 'nextjs13-progress';
import { FaArrowLeft } from 'react-icons/fa';

const BreadcrumbTrail = ({ items = [{ name: 'Home', href: '/' }] }) => {
	const router = useRouter();

	const handleGoBack = () => {
		const penultimateItem = items[items.length - 2]; // Get the penultimate item
		router.push(penultimateItem.href);
	};

	return (
		<section className="flex justify-between items-center mb-4">
			<Breadcrumbs radius="sm" variant="solid" color="secondary" className="mb-4">
				{items.map((item, index) => (
					<BreadcrumbItem key={index} onClick={() => router.push(item.href)}>
						{item.name}
					</BreadcrumbItem>
				))}
			</Breadcrumbs>
			{items.length > 1 && (
				<Button color="secondary" variant="ghost" size="sm" onClick={handleGoBack}>
					<FaArrowLeft /> Back to {items[items.length - 2].name}
				</Button>
			)}
		</section>
	);
};

export default BreadcrumbTrail;
