<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import LeftBar from '$lib/components/LeftBar.svelte';
	import MobileHeader from '$lib/components/MobileHeader.svelte';
	import MobileFooter from '$lib/components/MobileFooter.svelte';
	

	let { children } = $props();
</script>

<div class="flex min-h-screen">
	<!-- DESKTOP LEFT BAR -->
	<aside class="hidden w-2/12 md:block">
		<LeftBar />
	</aside>

	<!-- PAGE -->
	<div class="flex flex-1 flex-col">
		<!-- MOBILE HEADER -->
		<div class="md:hidden">
			<MobileHeader />
		</div>

		<!-- CONTENT -->
		<main class="flex-1">
			{@render children()}
		</main>

		<!-- MOBILE FOOTER -->
		<div class="md:hidden">
			<MobileFooter />
		</div>
	</div>
</div>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<title>art - mert doğu</title>
</svelte:head>
