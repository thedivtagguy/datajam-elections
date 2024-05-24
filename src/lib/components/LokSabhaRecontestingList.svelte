<script>
	import { Button } from 'svelte-ux';
	import { setConstituency } from '$lib/utils';
	import data from '$lib/data/data.json';
	import InfoPopover from '$lib/components/InfoPopover.svelte';
	import * as m from "$msgs";
</script>

<section class="self-start w-full pt-2 pl-4 mx-2 mt-1 mb-4 md:pl-0 md:mx-0">
	<h2 class="inline-flex items-center font-bold text-neutral">
		{m.browseMP2024()} <InfoPopover
			text={m.listOfAffidavitsApril24()}
		/>
	</h2>
	<div
		class="grid grid-flow-row grid-cols-1 gap-2 pt-4 md:max-w-fit md:w-full max-w-[300px] text-sm gr md:grid-flow-col md:grid-rows-12 recontesting text-neutral-800"
	>
		{#each [...new Set(data
					.filter((mps) => mps.recontesting)
					.map((item) => item.state_ut_name))].sort() as state_ut_name}
			<h3
				class="inline-flex items-center w-2/3 m-0 ml-1 font-bold leading-none text-neutral-500 md:w-full"
			>
				{state_ut_name}
			</h3>

			{#each data
				.filter((mps) => mps.state_ut_name === state_ut_name && mps.recontesting)
				.sort((a, b) => a.candidate.localeCompare(b.candidate)) as mps}
				<Button
					fullWidth
					on:click={() => {
						setConstituency(mps.ls_seat_name);
						window.scrollTo(0, 0);
					}}
					classes={{
						root: ' text-neutral-200 font-normal'
					}}
					variant="default"
					size="sm">{mps.candidate}</Button
				>
			{/each}
		{/each}
	</div>
</section>

<style>
	a {
		@apply text-neutral-500 underline;
	}

	a:hover {
		@apply text-neutral-600 underline font-medium;
	}

	:global(.recontesting button) {
		text-align: left !important;
		margin: none;
		display: block;
		padding: 8px 5px;
	}
</style>
