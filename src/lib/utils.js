import { selectedConstituency, selectedCandidate } from './store';
import data from '../lib/data/data.json';
import { feature } from 'topojson-client';
import country from '../lib/data/india_ls_seats_545.json';
import { goto } from '$app/navigation';
import { geoContains, range } from 'd3';
import { partyColors } from './colors';
import { get, readable, writable } from 'svelte/store';
import { onSetLanguageTag } from '../paraglide/runtime';

/**
 * Converts a string to a slug by removing spaces and special characters.
 *
 * @param {string} str - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(str) {
	if (!str) {
		return '';
	}
	return str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

export function getConstituency(point) {
	const states = feature(country, country.objects.india_ls_seats_545);
	const constituencyData = states.features.find((feature) => geoContains(feature, point));
	if (constituencyData) {
		return constituencyData;
	}

	return null;
}

export function locateMe() {
	const successCallback = (position) => {
		let constituency = getConstituency([position.coords.longitude, position.coords.latitude]);
		if (constituency) {
			setConstituency(constituency.properties.ls_seat_name);
		}
	};

	const errorCallback = (error) => {
		console.log(error);
	};

	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

export function setConstituency(constituency = '') {
	const constituencyData = data.find(
		(constituencyData) => slugify(constituencyData.ls_seat_name) === constituency
	);

	if (constituencyData) {
		selectedConstituency.set(constituencyData);
	}

	goto(`/?constituency=${slugify(constituency)}`, { noScroll: true });
}

export function setCandidate(candidate = '') {
	const candidateData = data.find(
		(candidateData) => slugify(candidateData.candidate) === candidate
	);

	if (candidateData) {
		selectedCandidate.set(candidateData);
	}

	goto(`/?candidate=${slugify(candidate)}`);
}

export function formatRupee(value, integer = false) {
	if (value >= 10000000) {
		return (
			(integer ? Math.round(value / 10000000) : Number((value / 10000000).toFixed(2))) + ' crore'
		);
	} else if (value >= 100000) {
		return (integer ? Math.round(value / 100000) : Number((value / 100000).toFixed(2))) + ' lakhs';
	} else {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 0,
			maximumFractionDigits: integer ? 0 : 2
		})
			.format(value)
			.replace(/^0+/, '');
	}
}

export function radiansToDegrees(radians) {
	return radians * (180 / Math.PI);
}

export function formatAge(value) {
	// no decimal places
	return new Intl.NumberFormat('en-IN', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export function textMultiline(node) {
	const x = 0,
		y = 20,
		width = 360,
		lineHeight = 10;

	const element = node;
	const text = element.innerHTML;
	const words = text.split(' ');
	let line = '';

	const testElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	testElem.textContent = 'busy';
	node.appendChild(testElem);

	for (let n = 0; n < words.length; n++) {
		const testLine = `${line}${words[n]} `;
		testElem.textContent = testLine;
		const metrics = testElem.getBoundingClientRect();
		const testWidth = metrics.width;

		if (testWidth > width && n > 0) {
			const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			tspan.setAttribute('x', x);
			tspan.setAttribute('dy', y);
			tspan.textContent = line;
			element.appendChild(tspan);
			line = `${words[n]} `;
		} else {
			line = testLine;
		}
	}

	const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	tspan.setAttribute('x', x);
	tspan.setAttribute('dy', y);
	tspan.textContent = line;
	element.appendChild(tspan);
	testElem.remove();
}

export const generateTickValues = (data, count, key) => {
	// Filter out any invalid or missing values
	const filteredData = data.filter((d) => typeof d[key] === 'number' && !isNaN(d[key]));

	// Calculate the maximum value
	const maxDataValue = Math.max(...filteredData.map((d) => d[key]));

	// Calculate the step size
	const step = maxDataValue / (count - 1);

	// Generate evenly spaced tick values
	return range(0, maxDataValue + 1, step);
};

export const getScrollPercent = () => {
	const h = document.documentElement,
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';

	return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

export function getPartyColor(candidateParty, type = 'fullName') {
	for (const [abbreviation, data] of Object.entries(partyColors)) {
		if (type === 'abbreviation' && abbreviation === candidateParty) {
			return {
				backgroundColor: data.backgroundColor,
				textColor: data.textColor,
				fullName: data.fullName,
				abbreviation: abbreviation
			};
		} else if (type === 'fullName' && data.fullName === candidateParty) {
			return {
				backgroundColor: data.backgroundColor,
				textColor: data.textColor,
				fullName: data.fullName,
				abbreviation: abbreviation
			};
		}
	}
	return {
		backgroundColor: '#808080',
		textColor: 'white',
		fullName: candidateParty,
		abbreviation: null
	};
}

export function formatTextForHighlight(text) {
	return '#:~:text=' + encodeURIComponent(text);
}

// Create the language store
export const lang = readable('en', (set) => {
	onSetLanguageTag(set);
});

