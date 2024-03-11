'use client';
import React, { useState } from 'react';

import { Button, Card } from '@nextui-org/react';

const ColorShowcase = () => {
	const [visibleSnippets, setVisibleSnippets] = useState({});

	const buttonColors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
	const buttonVariants = ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'];
	const customColors = [
		{ name: 'Primary', class: 'bg-primary' },
		{ name: 'Secondary', class: 'bg-secondary' },
		{ name: 'Accent', class: 'bg-accent' },
		{ name: 'Neutral', class: 'bg-neutral' },
		{ name: 'Base', class: 'bg-base-100' }, // Assuming 'base-100' is the main base color
		{ name: 'Info', class: 'bg-info' },
		{ name: 'Success', class: 'bg-success' },
		{ name: 'Warning', class: 'bg-warning' },
		{ name: 'Error', class: 'bg-error' },
	];

	const contentColors = [
		{ name: 'Primary Content', class: 'text-primary-content' },
		{ name: 'Secondary Content', class: 'text-secondary-content' },
		{ name: 'Accent Content', class: 'text-accent-content' },
		{ name: 'Neutral Content', class: 'text-neutral-content' },
		{ name: 'Base Content', class: 'text-base-content' },
		{ name: 'Info Content', class: 'text-info-content' },
		{ name: 'Success Content', class: 'text-success-content' },
		{ name: 'Warning Content', class: 'text-warning-content' },
		{ name: 'Error Content', class: 'text-error-content' },
	];

	const toggleSnippet = (color, variant) => {
		setVisibleSnippets({});
		const key = `${color}-${variant}`;
		setVisibleSnippets(prev => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<>
			<div className="space-y-4 p-4">
				<h1>Typography</h1>
				<div>
					<h2>Button Colors</h2>
					{buttonColors.map(color => (
						<div key={color} className="mb-4">
							<h3>{color.charAt(0).toUpperCase() + color.slice(1)} Buttons</h3>
							<div className="flex flex-wrap gap-4">
								{buttonVariants.map(variant => {
									const key = `${color}-${variant}`;
									return (
										<div key={key}>
											<Button
												color={color}
												variant={variant}
												onPress={() => toggleSnippet(color, variant)}
											>
												{variant.charAt(0).toUpperCase() + variant.slice(1)}
											</Button>
											{visibleSnippets[key] && (
												<pre className="mt-2 bg-gray-100 p-2 rounded">
													{`<Button color="${color}" variant="${variant}">`}
													<br />
													{`  ${
														variant.charAt(0).toUpperCase() + variant.slice(1)
													}`}
													<br />
													{'</Button>'}
												</pre>
											)}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>

				<div>
					<h2>Background Colors</h2>
					<div className="grid grid-cols-3 gap-4">
						{customColors.map(colorObj => (
							<Card key={colorObj.name} bordered>
								<div
									className={`${colorObj.class} p-4 text-${colorObj.name.replace(
										'bg-',
										'',
									)}-content`}
								>
									<p className="text-white">{colorObj.name}</p>
									<pre
										className={`text-${colorObj.name
											.replace('bg-', '')
											.toLowerCase()}-content`}
									>
										{colorObj.class} {' \n'}
										{`text-${colorObj.name.replace('bg-', '').toLowerCase()}-content`}
									</pre>
								</div>
							</Card>
						))}
					</div>
				</div>

				<div>
					<h2>Text Colors</h2>
					<div className="flex flex-wrap">
						{contentColors.map(colorObj => (
							<div key={colorObj.name} className={`${colorObj.class} m-2`}>
								<p>{colorObj.name.replace('Content', ' Content')}</p>
							</div>
						))}
					</div>
				</div>
				<div>
					<h2>Headings</h2>
					<div className="">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<h5>Heading 5</h5>
						<h6>Heading 6</h6>
					</div>
				</div>
			</div>
		</>
	);
};

export default ColorShowcase;
