<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<div class="fixed top-0 left-0 z-50 w-full p-4 md:hidden">
	<img src="/logobg.png" alt="Logo" class="w-28" />
	{#if $page.url.pathname !== '/'}
		<button on:click={() => goto('/')} class="text-sm text-neutral-500 transition hover:text-black">
			← Back
		</button>
	{/if}
</div>
