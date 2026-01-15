<!-- LEFT BAR (desktop only) -->
<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<div class="fixed top-0 left-0 z-50 hidden h-screen w-2/12 bg-white pl-10 md:block">
	<div class="flex h-full items-center justify-center">
		<div class="grid h-1/2 content-between">
			<div>
				<img class="h-auto w-40" src="/logobg.png" alt="" />

				{#if $page.url.pathname !== '/'}
					<button
						on:click={() => goto('/')}
						class="text-sm text-neutral-500 transition hover:text-black"
					>
						← Back
					</button>
				{/if}
			</div>

			<ul class="pb-20 italic">
				<!-- nav -->
			</ul>

			<p class="text-xs text-neutral-500">Copyright Mert Doğu 2026 © All rights reserved.</p>
		</div>
	</div>
</div>
