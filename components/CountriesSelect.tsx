import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const CountriesSelect = async( countries ) => {
	'use server'
		// console.log(countries);
		return(
			<Select items={countries} label="Favorite Animal" placeholder="Select an animal" className="max-w-xs">
				{country => <SelectItem key={country.id}>{country.nicename}</SelectItem>}
			</Select>,
		);
};

export default CountriesSelect;
