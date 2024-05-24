<script>
	import { formatRupee } from '$lib/utils';

	import GenericField from './GenericField.svelte';
	import * as m from "$msgs";
	export let criminalCases;
	export let assets = 0;
	export let currentAssets;

	$: caseCount = criminalCases.end_criminal_cases
		? criminalCases.end_criminal_cases
		: criminalCases.criminal_cases;
</script>

<div class="grid justify-start w-full grid-cols-6 gap-8 py-4">
	<GenericField
		title={`${
			Number(caseCount) === 0
				? m.criminalCases()
				: caseCount > 1
					? m.criminalCases()
					: m.criminalCase()
		}`}
		value={caseCount}
		infoPopOverText={m.criminalCasesRecord()}
		cols={2}
	/>
	<GenericField
		title={m.assets2019()}
		infoPopOverText={m.assetsDeclared2019()}
		value={formatRupee(assets)}
		cols={2}
	/>

	{#if currentAssets}
		<GenericField
			title={m.assets2024()}
			infoPopOverText={m.assetsDeclared2024()}
			value={formatRupee(currentAssets)}
			cols={2}
		/>
	{/if}
</div>
