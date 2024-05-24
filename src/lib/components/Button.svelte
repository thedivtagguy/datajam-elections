<script>
	import { Button } from 'svelte-ux';
	import { mdiOpenInNew } from '@mdi/js';
	import * as m from "$msgs";
	export let link = '';
</script>

<Button
	icon={mdiOpenInNew}
	on:click={() => window.open(link, '_blank')}
	classes={{
		root: 'bg-primary-500 hover:bg-primary-600 text-white'
	}}>{m.learnMore()}</Button
>
