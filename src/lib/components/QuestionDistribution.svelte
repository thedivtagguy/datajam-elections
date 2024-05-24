<script>
	import data from '$lib/data/data.json';
	import { questions } from './questions';
	import { scaleLinear, bin as d3bin, scaleBand, bin } from 'd3';
	import {
		Chart,
		Svg,
		RectClipPath,
		Axis,
		Bars,
		Highlight,
		Bar,
		Tooltip,
		TooltipItem,
		Text
	} from 'layerchart';
	import * as m from "$msgs";
	export let questionKey = 'environment_forest_and_climate_change';
	export let candidate = 'Dharambir Singh';

	let questionData = [];
	let thresholds = 6;
	let binQuestions = [];

	$: {
		if (questionKey) {
			questionData = data
				.filter((d) => d[questionKey] !== undefined)
				.map((d) => ({
					candidate: d.candidate,
					questions: +d[questionKey] // Convert to number
				}));

			binQuestions = d3bin()
				.thresholds(thresholds)
				.value((d) => d.questions)(questionData);
		}
	}

	let questionIndex;
	let binIndex;
	$: {
		// find the index of the selected candidate in the data
		questionIndex = questionData.findIndex((d) => d.candidate === candidate);

		// now where is it in the bins?
		binIndex = binQuestions.findIndex((d) => d.includes(questionData[questionIndex]));
	}
</script>

<div>
	{#if binQuestions.length === 0}
		<p>{m.noDataAvailable()}</p>
	{/if}
	<div class="p-4 mb-6 md:mb-0" style:height="250px">
		<Chart
			data={binQuestions}
			y="length"
			yDomain={[0, 545]}
			yNice
			x={['x0', 'x1']}
			xScale={scaleBand().padding(0.1)}
			padding={{ left: 16, bottom: 16 }}
		>
			<Svg>
				<Axis placement="bottom" rule ticks={6} />
				<Axis placement="left" ticks={6} grid rule />
				{#each binQuestions as binQuestion, i}
					<Bar bar={binQuestion} fill="#8F9090" />
				{/each}
				<Highlight
					data={binQuestions[binIndex]}
					bar={{
						class: 'fill-[#E8845A]'
					}}
					axis="x"
				/>

				<Text
					dx={75}
					dy={25}
					width={280}
					value={m.selectedCandidate()}
					anchor="center"
					class="text-[#E8845A] text-xs font-medium"
				></Text>

				<Text
					y={234}
					width={280}
					value={m.numberOfQuestions()}
					anchor="center"
					class="text-[#E8845A]  text-[0.6rem] font-mono font-medium"
				></Text>
				<Text
					x={6}
					y={25}
					width={280}
					value={m.numberOfMP()}
					anchor="center"
					class="text-[#E8845A]  text-[0.6rem] font-mono font-medium"
				></Text>
			</Svg>
		</Chart>
	</div>
</div>
