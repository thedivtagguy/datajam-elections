<script lang="ts">
	import { Button, Tooltip, cls } from 'svelte-ux';
	import { locateMe } from '$lib/utils';

	import {
		mdiArrowULeftTop,
		mdiMagnifyPlusOutline,
		mdiMagnifyMinusOutline,
		mdiImageFilterCenterFocus,
		mdiCrosshairsGps
	} from '@mdi/js';
	import * as m from "$msgs";
	type Placement =
		| 'top-left'
		| 'top'
		| 'top-right'
		| 'left'
		| 'center'
		| 'right'
		| 'bottom-left'
		| 'bottom'
		| 'bottom-right';

	export let transform;
	export let placement: Placement = 'top-right';
	export let orientation: 'horizontal' | 'vertical' = 'vertical';
</script>

<div
	class={cls(
		'bg-surface-content/5 rounded-full m-1 backdrop-blur z-10 flex',
		orientation === 'vertical' && 'flex-col',
		{
			'top-left': 'absolute top-0 left-0',
			top: 'absolute top-0 left-1/2 -translate-x-1/2',
			'top-right': 'absolute top-0 right-0',
			left: 'absolute top-1/2 left-0 -translate-y-1/2',
			center: 'absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2',
			right: 'absolute top-1/2 right-0 -translate-y-1/2',
			'bottom-left': 'absolute bottom-0 left-0',
			bottom: 'absolute bottom-0 left-1/2 -translate-x-1/2',
			'bottom-right': 'absolute bottom-0 right-0'
		}[placement]
	)}
>
	<Tooltip title={m.zoomIn()}>
		<Button
			icon={mdiMagnifyPlusOutline}
			on:click={() => transform.zoomIn()}
			class="p-2 text-surface-content/50"
		/>
	</Tooltip>
	<Tooltip title={m.zoomOut()}>
		<Button
			icon={mdiMagnifyMinusOutline}
			on:click={() => transform.zoomOut()}
			class="p-2 text-surface-content/50"
		/>
	</Tooltip>
	<Tooltip title={m.center()}>
		<Button
			icon={mdiImageFilterCenterFocus}
			on:click={() => transform.translateCenter()}
			class="p-2 text-surface-content/50"
		/>
	</Tooltip>
	<Tooltip title={m.locateMe()}>
		<Button
			icon={mdiCrosshairsGps}
			on:click={() => locateMe()}
			class="p-2 text-surface-content/50"
		/>
	</Tooltip>
	<Tooltip title={m.reset()}>
		<Button
			icon={mdiArrowULeftTop}
			on:click={() => transform.reset()}
			class="p-2 text-surface-content/50"
		/>
	</Tooltip>
</div>
