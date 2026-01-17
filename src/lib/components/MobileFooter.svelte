<script>
	import { page } from '$app/stores';
</script>

<div class="fixed bottom-0 left-0 z-50 -space-y-3 w-full p-4 text-center md:hidden">
	{#if $page.url.pathname === '/'}
		<div class="relative h-[24px] overflow-hidden flex justify-center">
			<!-- Scroll text -->
			<p class="scroll-text hideafterthreeseconds text-[10px] text-neutral-500">
				Scroll bottom to see more →
			</p>

			<div class="icons showafterthreeseconds flex gap-6">
				<a
					href="https://www.instagram.com/rexulec/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-neutral-500 transition hover:text-black"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
						<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
					</svg>
				</a>

				<a
					href="https://www.linkedin.com/in/rexulec/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-neutral-500 transition hover:text-black"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
						<rect width="4" height="12" x="2" y="9" />
						<circle cx="4" cy="4" r="2" />
					</svg>
				</a>

				<a
					href="mailto:mert@mert.day"
					class="text-neutral-500 transition hover:text-black"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
						<rect x="2" y="4" width="20" height="16" rx="2" />
					</svg>
				</a>
			</div>
		</div>
	{/if}

	<p class="mt-2 text-[10px] text-neutral-500">
		Copyright Mert Doğu 2026 © All rights reserved.
	</p>
</div>

<style>
	.scroll-text,
	.icons {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	@keyframes hideDown {
		to {
			opacity: 0;
			transform: translate(-50%, 16px);
		}
	}

	@keyframes showUp {
		from {
			opacity: 0;
			transform: translate(-50%, -16px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	.hideafterthreeseconds {
		animation: hideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2s forwards;
	}

	.showafterthreeseconds {
		opacity: 0;
		animation: showUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2s forwards;
	}
</style>
