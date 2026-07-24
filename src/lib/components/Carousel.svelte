<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { photos } from '$lib/data/photos';

    let section;
    let track;

    let scrollX = 0;
    let start = 0;
    let maxScroll = 0;

    let isMounted = false;
    let isMobile = false;

    function checkMobile() {
        if (!browser) return;
        isMobile = window.innerWidth < 768;
    }

    function onScroll() {
        if (!isMounted || !section || !track || isMobile) return;
        const y = window.scrollY - start;
        scrollX = Math.max(0, Math.min(y, maxScroll));
    }

    function measure() {
        if (!browser || !isMounted || !section || !track) return;

        checkMobile();

        setTimeout(() => {
            if (isMobile) {
                section.style.height = 'auto';
                scrollX = 0;
            } else {
                start = section.offsetTop;
                maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
                section.style.height = `${maxScroll + window.innerHeight}px`;
            }
        }, 0);
    }

    function handleResize() {
        checkMobile();
        measure();
    }

    onMount(() => {
        if (!browser) return;

        isMounted = true;
        checkMobile();

        requestAnimationFrame(() => {
            measure();
            setTimeout(measure, 100);
            setTimeout(measure, 500);
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', measure);
    });

    onDestroy(() => {
        if (!browser) return;

        isMounted = false;

        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('load', measure);
    });
</script>

<section bind:this={section} class="relative">
    <div class={isMobile ? 'w-full py-6 flex items-center h-screen' : 'sticky top-0 flex h-screen items-center overflow-hidden'}>
        <div
            bind:this={track}
            class="flex gap-5 pr-[10vw] pl-[6vw] md:pl-[18vw] {isMobile
                ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth'
                : 'will-change-transform'}"
            style={isMobile ? '' : `transform: translateX(-${scrollX}px)`}
        >
            {#each photos as photo}
                {#if photo.srclow[0].endsWith('.mp4')}
                    <a href={`/art/${photo.slug}`} class="block shrink-0 {isMobile ? 'snap-center' : ''}">
                        <figure class="flex flex-col gap-4">
                            <video
                                src={photo.srclow[0]}
                                autoplay
                                loop
                                muted
                                playsinline
                                webkit-playsinline
                                preload="auto"
                                class="aspect-3/4 h-[300px] w-auto max-w-none object-contain md:h-[450px] {photo
                                    .customcss?.toimg ?? ''}"
                                on:mouseenter={(e) => e.currentTarget.pause()}
                                on:mouseleave={(e) => e.currentTarget.play()}
                                on:touchstart={(e) => e.currentTarget.pause()}
                                on:touchend={(e) => e.currentTarget.play()}
                            ></video>
                            <div>
                                <figcaption class="text-sm tracking-wider text-neutral-400">
                                    {photo.title}
                                </figcaption>
                                {#if photo.extratext}
                                    <figcaption class="text-xs tracking-wider text-neutral-400 italic">
                                        {photo.extratext}
                                    </figcaption>
                                {/if}
                            </div>
                        </figure>
                    </a>
                {:else}
                    <a href={`/art/${photo.slug}`} class="block shrink-0 {isMobile ? 'snap-center' : ''}">
                        <figure class="flex flex-col gap-4">
                            <img
                                src={photo.srclow[0]}
                                alt={photo.title}
                                class="h-[300px] w-auto max-w-none object-contain md:h-[450px] {photo.customcss
                                    ?.toimg ?? ''}"
                                loading="eager"
                                decoding="async"
                                on:load={measure}
                            />
                            <div>
                                <figcaption class="text-sm tracking-wider text-neutral-400">
                                    {photo.title}
                                </figcaption>
                                {#if photo.extratext}
                                    <figcaption class="text-xs tracking-wider text-neutral-400 italic">
                                        {photo.extratext}
                                    </figcaption>
                                {/if}
                            </div>
                        </figure>
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</section>