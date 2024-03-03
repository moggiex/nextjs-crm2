'use client';
import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Country } from '@/prisma/typescript.models';

interface CountryProps {
	countries: Country[];
	countryId: number | null; // Assuming countryId is a number
}

const CountriesSelect: React.FC<CountryProps> = ({ countries, countryId }) => {
	// console.log(countries);
	console.log(`${countryId}---`);
	return (
		<>
			{countries && (
				<Select
					name="countryId"
					label="Country"
					placeholder="Select Country"
					className=""
					variant="bordered"
					defaultSelectedKeys={[countryId.toString()]}
					// isRequired
				>
					{countries.map(
						country => (
							<SelectItem key={country.id} value={country.id} textValue={country.nicename}>
								{`${country.nicename} (${country.iso})`}
							</SelectItem>
						),
						// console.log(country.id),
					)}
				</Select>
			)}
		</>
	);
};

export default CountriesSelect;
