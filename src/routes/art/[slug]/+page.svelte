<script>
	import { photos } from '$lib/data/photos';
	import { error } from '@sveltejs/kit';

	export let params;

	const photo = photos.find((p) => p.slug === params.slug);

	if (!photo) throw error(404, 'Photo not found');

	//for carousel
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let section;
	let track;

	let scrollX = 0;
	let start = 0;
	let maxScroll = 0;

	let touchStartY = 0;
	let lastScrollY = 0;
	let isMounted = false;

	function onScroll() {
		if (!isMounted || !section || !track) return;
		const y = window.scrollY - start;
		scrollX = Math.max(0, Math.min(y, maxScroll));
	}

	function measure() {
		if (!browser || !isMounted || !section || !track) return;
		
		// DOM'un hazır olmasını bekle
		setTimeout(() => {
			start = section.offsetTop;
			maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
			section.style.height = `${maxScroll + window.innerHeight}px`;
		}, 0);
	}

	// 📱 MOBILE
	function onTouchStart(e) {
		if (!isMounted) return;
		touchStartY = e.touches[0].clientY;
		lastScrollY = window.scrollY;
	}

	function onTouchMove(e) {
		if (!isMounted) return;
		const delta = touchStartY - e.touches[0].clientY;
		window.scrollTo({
			top: lastScrollY + delta,
			behavior: 'auto'
		});
	}

	onMount(() => {
		if (!browser) return;
		
		isMounted = true;

		// Birden fazla measure çağrısı
		requestAnimationFrame(() => {
			measure();
			// Görseller yüklendikten sonra tekrar ölç
			setTimeout(measure, 100);
			setTimeout(measure, 500);
		});

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', measure);
		window.addEventListener('load', measure);

		if (section) {
			section.addEventListener('touchstart', onTouchStart, { passive: true });
			section.addEventListener('touchmove', onTouchMove, { passive: false });
		}
	});

	onDestroy(() => {
		if (!browser) return;
		
		isMounted = false;

		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', measure);
		window.removeEventListener('load', measure);

		if (section) {
			section.removeEventListener('touchstart', onTouchStart);
			section.removeEventListener('touchmove', onTouchMove);
		}
	});
</script>

{#if photo.srchigh.length === 1}
	<div class="fixed inset-0 flex items-center justify-center bg-white">
		<div class="flex w-full justify-center md:pl-[16.6vw]">
			<div class="flex flex-col items-center">
				{#each photo.srchigh as src}
					<img {src} alt={photo.title} class="mb-4 max-h-[80vh] w-auto object-contain" />
				{/each}

						<figcaption class="text-sm tracking-wider text-neutral-400">
							{photo.title} - image 1 of {photo.srchigh.length}
						</figcaption>
			</div>
		</div>
	</div>
{:else}
	<section bind:this={section} class="relative">
		<div class="sticky top-0 flex h-screen items-center overflow-hidden">
			<div
				bind:this={track}
				class="flex gap-16 pr-[10vw] pl-[18vw] will-change-transform"
				style="transform: translateX(-{scrollX}px)"
			>
				{#each photo.src as src}
					<figure class="flex flex-col gap-4">
						<img {src} class="h-[450px] w-auto max-w-none object-contain" />
						<figcaption class="text-sm tracking-wider text-neutral-400">
							{photo.title} - image {photo.src.indexOf(src) + 1} of {photo.src.length}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>
{/if}
