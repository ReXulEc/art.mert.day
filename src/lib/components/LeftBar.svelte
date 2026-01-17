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

			<div>
				<p class="text-xs text-neutral-500">Copyright Mert Doğu 2026 © All rights reserved.</p>
				<div class="flex gap-4 pt-4">
					<a href="https://www.instagram.com/rexulec/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-black transition text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
					<a href="https://www.linkedin.com/in/rexulec/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-black transition text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
					<a href="mailto:mert@mert.day" class="text-neutral-500 hover:text-black transition text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></a>

				</div>
			</div>

		</div>
	</div>
</div>
