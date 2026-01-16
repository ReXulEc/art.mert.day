<script>
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let url = '';
	const pageTransitionDuration = 100;

</script>

{#key url}
	<div
		in:fade={{ duration: pageTransitionDuration, delay: pageTransitionDuration }}
		out:fade={{ duration: pageTransitionDuration }}
	>
		<slot />
	</div>
{/key}
