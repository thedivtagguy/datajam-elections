<script>
    import { setLanguageTag } from '../../paraglide/runtime';
	let selectedLanguage = 'en';
	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'hi', label: 'Hindi' },
		// Add more languages as needed
	];

	function handleChange(event) {
		selectedLanguage = event.target.value;
		// Handle language change logic here
        setLanguageTag(event.target.value)
	}
</script>

<div class="sticky items-center w-fit pr-4">
	<select
		class="block w-40 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		bind:value={selectedLanguage}
		on:change={handleChange}
	>
		{#each languages as { code, label }}
			<option value={code}>{label}</option>
		{/each}
	</select>
</div>
