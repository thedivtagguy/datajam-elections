<script>
	import VoteIcon from '$lib/assets/vote.webp';
	import SelectField from './SelectField.svelte';
	import SelectLanguage from './SelectLanguage.svelte';
</script>

<header class="w-full pt-0 pb-2 bg-[#f4f4f4]">
	<div class="flex flex-col items-center justify-between w-full">
		<div class="flex flex-col items-center w-full">
			<div class="flex flex-row items-end justify-center my-2 md:-ml-16">
				<img src={VoteIcon} alt="Vote" class=" hidden md:block md:size-[100px]" />
				<h1
					class="px-2 text-4xl font-bold leading-tight text-center text-black md:text-left md:py-4 md:text-6xl"
				>
					Who is my neta?
				</h1>
			</div>
		</div>
	</div>
</header>
<div
	class=" flex place-content-center sticky z-[100] w-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] bg-[#f4f4f4] top-0 pt-3"
>
	<SelectField />
	<SelectLanguage />
</div>
