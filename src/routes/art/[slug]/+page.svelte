<script>
	import { photos } from '$lib/data/photos';
	import { error } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let params;

	let highres;

	if (!browser) {
		highres = false;
	}

	let photo = photos.find((p) => p.slug === params.slug);
	if (!photo) throw error(404, 'Photo not found');

	// images reactive
	$: images = highres ? [...photo.srchigh] : [...photo.srclow];

	// carousel setup
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
		setTimeout(() => {
			start = section.offsetTop;
			maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
			section.style.height = `${maxScroll + window.innerHeight}px`;
		}, 0);
	}

	function onTouchStart(e) {
		if (!isMounted) return;
		touchStartY = e.touches[0].clientY;
		lastScrollY = window.scrollY;
	}

	function onTouchMove(e) {
		if (!isMounted) return;
		const delta = touchStartY - e.touches[0].clientY;
		window.scrollTo({ top: lastScrollY + delta, behavior: 'auto' });
	}

	function toggleHighres() {
		highres = !highres;
		if (browser) localStorage.setItem('highres', highres);
	}

	onMount(() => {
		if (!browser) return;

		// localStorage'dan oku
		const stored = localStorage.getItem('highres');
		if (stored !== null) highres = stored === 'true';
		else highres = false; // default

		isMounted = true;

		requestAnimationFrame(() => {
			measure();
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

<!-- svelte-ignore a11y_figcaption_parent -->
{#if highres === undefined}
	<!-- SSR/loading state -->
	<div class="flex h-screen items-center justify-center">Loading...</div>
{:else if images.length === 1}
	{#if images[0].endsWith('.mp4')}
		<div class="fixed inset-0 flex items-center justify-center bg-white">
			<div class="flex w-full justify-center">
				<div class="flex max-w-[90vw] flex-col md:max-w-max">
					<video
						src={images[0]}
						autoplay
						loop
						muted
						playsinline
						class="mb-4 max-h-[60vh] w-auto object-contain"
						on:mouseenter={(e) => e.currentTarget.pause()}
						on:mouseleave={(e) => e.currentTarget.play()}
						on:touchstart={(e) => e.currentTarget.pause()}
						on:touchend={(e) => e.currentTarget.play()}
					></video>
					<figcaption class="text-sm tracking-wider text-neutral-400">
						{photo.title} - image 1 of {images.length}
					</figcaption>
					{#if photo.location}
						<figcaption class="text-xs tracking-wider text-neutral-400 italic">
							{photo.location}
						</figcaption>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="fixed inset-0 flex items-center justify-center bg-white">
			<div class="flex w-full justify-center">
				<div class="flex max-w-[90vw] flex-col md:max-w-max">
					<img src={images[0]} alt={photo.title} class="mb-4 max-h-[60vh] w-auto object-contain" />
					<figcaption class="text-sm tracking-wider text-neutral-400">
						{photo.title} - image 1 of {images.length}
					</figcaption>
					{#if photo.location}
						<figcaption class="text-xs tracking-wider text-neutral-400 italic">
							{photo.location}
						</figcaption>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{:else}
	<section bind:this={section} class="relative">
		<div class="sticky top-0 flex h-screen items-center overflow-hidden">
			<div
				bind:this={track}
				class="flex gap-6 pr-[10vw] pl-[6vw] will-change-transform md:pl-[18vw]"
				style="transform: translateX(-{scrollX}px)"
			>
				{#if images[0].endsWith('.mp4')}
					<figure class="flex flex-col gap-4">
						<video
							src={images[0]}
							autoplay
							loop
							muted
							playsinline
							class="aspect-3/4 h-[300px] w-auto max-w-none object-contain md:h-[450px]"
							on:mouseenter={(e) => e.currentTarget.pause()}
							on:mouseleave={(e) => e.currentTarget.play()}
							on:touchstart={(e) => e.currentTarget.pause()}
							on:touchend={(e) => e.currentTarget.play()}
						></video>
						<div>
							<figcaption class="text-sm tracking-wider text-neutral-400">
								{photo.title} - image 1 of {images.length}
							</figcaption>
							{#if photo.location}
								<figcaption class="text-xs tracking-wider text-neutral-400 italic">
									{photo.location}
								</figcaption>
							{/if}
						</div>
					</figure>
					{#each images as src, i (src)}
						{#if i === 0}{:else}
							<figure class="flex flex-col gap-4">
								<img {src} class="h-[300px] w-auto max-w-none object-contain md:h-[450px]" />
								<div>
									<!-- svelte-ignore a11y_figcaption_parent -->
									<figcaption class="text-sm tracking-wider text-neutral-400">
										{photo.title} - image {i + 1} of {images.length}
									</figcaption>
									{#if photo.location && i === 0}
										<figcaption class="text-xs tracking-wider text-neutral-400 italic">
											{photo.location}
										</figcaption>
									{/if}
								</div>
							</figure>
						{/if}
					{/each}
				{:else}
					{#each images as src, i (src)}
						<figure class="flex flex-col gap-4">
							<img {src} class="h-[300px] w-auto max-w-none object-contain md:h-[450px]" />
							<div>
								<figcaption class="text-sm tracking-wider text-neutral-400">
									{photo.title} - image {i + 1} of {images.length}
								</figcaption>
								{#if photo.location && i === 0}
									<figcaption class="text-xs tracking-wider text-neutral-400 italic">
										{photo.location}
									</figcaption>
								{/if}
							</div>
						</figure>
					{/each}
				{/if}
			</div>
		</div>
	</section>
{/if}

<div class="fixed right-4 bottom-4 hidden md:block">
	<button on:click={toggleHighres} class="rounded bg-black/80 px-4 py-2 text-xs text-white">
		{highres ? 'Switch to Low Resolution' : 'Switch to High Resolution'}
	</button>
</div>

<div class="fixed bottom-[1.4rem] left-1/2 z-60 block -translate-x-1/2 -translate-y-1/2 md:hidden">
	<button on:click={toggleHighres} class="text-[10px] text-neutral-500">
		{highres ? 'Switch to Low Resolution' : 'Switch to High Resolution'}
	</button>
</div>
