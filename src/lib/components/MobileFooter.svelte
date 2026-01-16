<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<div class="fixed bottom-0 left-0 z-50 w-full p-4 text-center md:hidden">

	{#if $page.url.pathname == '/'}
	<p class="hideaftertenseconds text-[10px] text-neutral-500">Scroll bottom to see more →</p>

	{/if}

	<p class="text-[10px] text-neutral-500">Copyright Mert Doğu 2026 © All rights reserved.</p>
</div>

<style>
	@keyframes fadeInUp {
		0% {
			opacity: 1;
			transform: translateY(0px);
		}
		100% {
			opacity: 0;
			transform: translateY(-10px);
		}
	}

	.hideaftertenseconds {
		animation: fadeInUp 1s ease-in-out 6s forwards;
	}
</style>
