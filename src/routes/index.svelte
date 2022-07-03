<!-- <script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session.user === null) return { status: 302, redirect: '/auth/login' };
		return { status: 302, redirect: '/admin' };
	};
</script> -->
<!-- <script lang="ts">
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const redirect = async () => {
		const { currentUser: user } = auth;
		console.log('user', user);

		if (!user) await goto('/auth/login');
		else await goto('/admin');
	};

	onMount(() => {
		redirect();
	});
</script> -->

<div class="container">
	<h1>Navigating...</h1>
</div>

<style>
	.container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
