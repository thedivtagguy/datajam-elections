<script>
	import data from '$lib/data/data.json';
	import Typeahead from 'svelte-typeahead';
	import { Button } from 'svelte-ux';
	import { mdiCrosshairsGps, mdiFilterRemove } from '@mdi/js';
	import { slugify, setConstituency, setCandidate, locateMe } from '$lib/utils';
	import { selectedCandidate, selectedConstituency, searchMode } from '$lib/store';
	import * as m from "$msgs";
	$: searchType = $searchMode;

	let filteredData = data.filter((item) => item.total_assets !== undefined);

	const searchPeople = filteredData.map((item) => {
		return {
			id: slugify(item.candidate),
			text: `${item.candidate} | ${item.party_x}`
		};
	});

	const searchConstituency = filteredData.map((item) => {
		if ($selectedConstituency === null) return;
		// skip if total_assets is missing

		return {
			id: slugify(item.ls_seat_name),
			text: `${item.ls_seat_name}, ${item.state_ut_name} | <span class="text-xs">
                    ${item.candidate}
                </span>`
		};
	});

	let searchIndex = [];
	$: searchIndex = searchType === 'people' ? searchPeople : searchConstituency;

	const extract = (option) => {
		// take text out of html tags
		// and remove empty spaces
		return option.text
			.replace(/<[^>]*>?/gm, '')
			.replace(/\s+/g, ' ')
			.trim();
	};

	function handleSelect(detail) {
		if (searchType === 'location') {
			setConstituency(detail.original.id);
		} else {
			setCandidate(detail.original.id);
		}
	}
</script>

<div
	class="sticky flex items-center justify-center w-fit max-w-sm pt-2 mx-auto top-2 md:max-w-xl md:w-full search-container"
>
	<Typeahead
		value={$selectedConstituency.ls_seat_name ? $selectedConstituency.ls_seat_name : ''}
		{extract}
		limit={5}
		on:select={({ detail }) => handleSelect(detail)}
		on:clear={() => {
			if (searchType === 'location') {
				selectedConstituency.set({});
			} else {
				selectedCandidate.set('');
			}
		}}
		data={searchIndex}
		hideLabel={true}
		showDropdownOnFocus={true}
	/>
	<div class="pl-2">
		<Button
			on:click={() => {
				locateMe();
			}}
			icon={mdiCrosshairsGps}
			classes={{ root: ' bg-[#E6E6E6] ' }}
		>
			{m.locateMe()}
		</Button>
	</div>
</div>

<style>
	:global([data-svelte-typeahead]) {
		background-color: transparent !important;
		z-index: 1000 !important;
		width: 100% !important;
		max-width: 30rem;
	}

	:global(input[name='search']) {
		background-color: #fff !important;
		width: 100% !important;
	}
	.search-container {
		width: 100%;
		padding: 0rem 0 1rem 0;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #4a5568;
		z-index: 1000;
		background-clip: padding-box;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		background-color: none;
	}

	/* Style data-svelte-typeahead */

	:global([data-svelte-typeahead], [data-svelte-typeahead] > form:nth-child(1)) {
		font-weight: 500;
	}

	:global([data-svelte-typeahead] label) {
		display: none !important;
	}

	:global(.svelte-typeahead-list) {
		z-index: 100054 !important;
		background-color: #fff !important;
	}
</style>
