<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { photos } from '$lib/data/photos';

	let section;
	let track;

	let scrollX = 0;
	let start = 0;
	let maxScroll = 0;

	let touchStartY = 0;
	let lastScrollY = 0;

	function onScroll() {
		const y = window.scrollY - start;
		scrollX = Math.max(0, Math.min(y, maxScroll));
	}

	function measure() {
		if (!section || !track) return;
		start = section.offsetTop;
		maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
		section.style.height = `${maxScroll + window.innerHeight}px`;
	}

	// 📱 MOBILE
	function onTouchStart(e) {
		touchStartY = e.touches[0].clientY;
		lastScrollY = window.scrollY;
	}

	function onTouchMove(e) {
		const delta = touchStartY - e.touches[0].clientY;
		window.scrollTo({
			top: lastScrollY + delta,
			behavior: 'auto'
		});
	}

	onMount(() => {
		if (!browser) return;

		requestAnimationFrame(measure);

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', measure);

		section.addEventListener('touchstart', onTouchStart, { passive: true });
		section.addEventListener('touchmove', onTouchMove, { passive: false });
	});

	onDestroy(() => {
		if (!browser) return;

		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', measure);

		section.removeEventListener('touchstart', onTouchStart);
		section.removeEventListener('touchmove', onTouchMove);
	});
</script>

<section bind:this={section} class="relative touch-pan-y">
	<div class="sticky top-0 flex h-screen items-center overflow-hidden">
		<div
			bind:this={track}
			class="flex gap-16 pr-[10vw] pl-[18vw] will-change-transform"
			style="transform: translateX(-{scrollX}px)"
		>
			{#each photos as photo}
				<a href={`/art/${photo.slug}`} class="block">
					<figure class="flex flex-col gap-4">
						<img
							src={photo.src[0]}
							alt={photo.title}
							class="h-[450px] w-auto max-w-none object-contain"
							loading="lazy"
							decoding="async"
						/>
						<figcaption class="text-sm tracking-wider text-neutral-400">
							{photo.title}
						</figcaption>
					</figure>
				</a>
			{/each}
		</div>
	</div>
</section>
