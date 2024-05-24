<script>
	import { interpolateRound } from 'd3';
	import { tweened } from 'svelte/motion';
	import * as m from "$msgs";
	export let value;
	export let cols = 1;

	const progress = tweened(0, {
		duration: 200,
		interpolate: interpolateRound
	});

	$: formattedValue = Math.round(value);
	$: progress.set(formattedValue);

	$: fillColor =
		value >= 75 ? 'fill-success-400' : value >= 50 ? 'fill-warning-400' : 'fill-danger-400';

	let width;
</script>

<div bind:clientWidth={width} class="flex flex-col col-span-{cols} gap-1 pb-2">
	<span class="inline-flex items-end justify-start font-bold">{m.attendance()}</span>
	<svg {width} class="max-w-[12rem]" height={28}>
		<rect y={2} x={0} {width} height="100%" class="fill-[#d1d5db]" />

		<rect y={2} x={0} width={$progress * (width / 100)} height={30} class={fillColor} />
		<text
			x="20%"
			y="25%"
			dominant-baseline="hanging"
			text-anchor="middle"
			class="text-lg tabular-nums">{$progress}%</text
		>
	</svg>
</div>
