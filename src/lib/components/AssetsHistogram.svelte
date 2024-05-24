<script>
	import { sort, quantile, scaleLinear, svg } from 'd3';
	import data from '$lib/data/data.json';
	import { formatRupee, textMultiline } from '$lib/utils';
	import InfoPopover from './InfoPopover.svelte';
	import * as m from "$msgs";
	export let assets = 0;
	export let threshold = 10;

	// sort and get the quantiles of the data
	let sortedData = sort(data, (a, b) => Number(a.total_assets) - Number(b.total_assets));

	let q1 = quantile(sortedData, 0.25, (d) => Number(d.total_assets));
	let median = quantile(sortedData, 0.5, (d) => Number(d.total_assets));
	let q3 = quantile(sortedData, 0.75, (d) => Number(d.total_assets));
	let interQuantileRange = q3 - q1;
	let min = Math.floor(0, q1 - 1.5 * interQuantileRange);
	let max = q3 + 1.5 * interQuantileRange;

	let height = 15;
	let center = 20;
	$: xScale = scaleLinear()
		.domain([min, max])
		.range([0, svgWidth / 2]);
	let width;
	$: svgWidth = width ? width.clientWidth : 80;
	// get outliers beyond the max
	let outliers = sortedData.filter((d) => Number(d.total_assets) > max);
</script>

<div bind:this={width} class="w-full pb-4 mb-2 border-b-[1px]">
	<span class="inline-flex items-center font-bold"
		>Relative wealth
		<InfoPopover text={m.candidateRelativeWealth()} />
	</span>
	<svg width={svgWidth} class="w-full pt-2 h-[75px]">
		<line y1={center} y2={center} x1={xScale(min)} x2={xScale(max)} class=" stroke-neutral-500" />

		<!-- Add labels for each percentile -->

		<text
			x={xScale(min)}
			y={center - height / 2}
			text-anchor="end"
			dy="-0.5em"
			class="text-[0.6rem] text-neutral-500"
		>
			{formatRupee(min)}
		</text>

		<text
			x={xScale(q3)}
			y={center - height / 2}
			text-anchor="middle"
			dy="-0.5em"
			class="text-[0.6rem] text-neutral-500"
		>
			{formatRupee(q3, true)}
		</text>
		<text
			x={xScale(max)}
			y={center - height / 2}
			text-anchor="middle"
			dy="-0.5em"
			class="text-[0.6rem] text-neutral-500"
		>
			{formatRupee(max, true)}
		</text>
		<text
			x={xScale(q1)}
			y={center - height / 2}
			text-anchor="middle"
			dy="-0.5em"
			class="text-[0.6rem] text-neutral-500"
		>
			{formatRupee(q1, true)}
		</text>
		<rect
			y={center - height / 2}
			x={xScale(q1)}
			width={xScale(q3) - xScale(q1)}
			{height}
			class="fill-neutral-400 stroke-neutral-500"
		/>

		<g>
			{#each [min, median, max] as d (d)}
				<line
					y1={center - height / 2}
					y2={center + height / 2}
					x1={xScale(d)}
					x2={xScale(d)}
					class={median === d ? ' stroke-white' : 'stroke-neutral-500'}
				/>
			{/each}
		</g>

		<g class="outliers">
			{#each outliers as d}
				<circle cx={xScale(d.total_assets)} cy={center} r={1} class="fill-danger-500 opacity-70" />
			{/each}
		</g>

		<circle
			cx={xScale(assets) >= 470 ? 320 : xScale(assets)}
			cy={center + 13}
			r={3}
			class="fill-info-500 marker"
		/>

		<line
			y1={center - height / 2}
			y2={center + height / 2}
			x1={xScale(assets) >= 470 ? 320 : xScale(assets)}
			x2={xScale(assets) >= 470 ? 320 : xScale(assets)}
			class="stroke-2 stroke-info-800 marker"
		/>
		<g class=" bg-neutral">
			<text
				y={center + 28}
				alignment-baseline="middle"
				text-anchor={assets <= 100012120 ? 'start' : 'middle'}
				class="text-xs marker text-neutral-500"
			>
				<tspan x={xScale(assets) >= 470 ? 320 : xScale(assets)} dy="0.2em">
					{assets < q1 ? m.lower() : assets < median ? m.average() : assets < q3 ? m.upper() : m.top()}
				</tspan>
				<tspan x={xScale(assets) >= 470 ? 320 : xScale(assets)} dy="1.2em"> wealth range </tspan>
			</text>
		</g>
	</svg>
</div>

<style>
	.marker {
		transition: all 0.3s ease-in-out;
	}
</style>
