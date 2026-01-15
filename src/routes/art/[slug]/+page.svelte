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

	// ⬅️ BU SATIR EKSİKTİ
	let scrollX = 0;

	let start = 0;
	let maxScroll = 0;

	function onScroll() {
		const y = window.scrollY - start;
		scrollX = Math.max(0, Math.min(y, maxScroll));
	}

	function measure() {
		start = section.offsetTop;
		maxScroll = track.scrollWidth - window.innerWidth;
		section.style.height = `${maxScroll + window.innerHeight}px`;
	}

	onMount(() => {
		if (!browser) return;

		requestAnimationFrame(measure);
		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', measure);
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', measure);
	});
</script>

{#if photo.src.length === 1}
	<div class="fixed inset-0 flex items-center justify-center bg-white">
		<div class="flex w-full justify-center md:pl-[16.6vw]">
			<div class="flex flex-col items-center">
				{#each photo.src as src}
					<img {src} alt={photo.title} class="mb-4 max-h-[80vh] w-auto object-contain" />
				{/each}

						<figcaption class="text-sm tracking-wider text-neutral-400">
							{photo.title} - image 1 of {photo.src.length}
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
