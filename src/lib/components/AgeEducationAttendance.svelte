<script>
	import GenericField from './GenericField.svelte';
	import AttendanceMarker from './AttendanceMarker.svelte';

	export let age;
	export let education;
	export let attendance;
	import * as m from "$msgs";
</script>

<div class="w-full">
	<div class="col-span-3">
		<GenericField
			title={m.education()}
			value={education}
			textHeight={education.length > 12 ? 'text-lg font-normal' : 'text-lg'}
		/>
	</div>
	<div class="col-span-1">
		<GenericField title={m.age()} value={age} />
	</div>

	<AttendanceMarker value={attendance} />
</div>
