<script lang="ts">
	import 'carbon-components-svelte/css/white.css';
	import Nav from '$lib/nav.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';

	let { session } = getStores();
	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				session.set({ user });
				goto('/admin');
			},
			(error) => {
				session.set({ user: null });
				goto('/auth/login');
				console.error(error);
			}
		);
	});
</script>

<Nav />
<slot />
<footer>
	<h2>bloggo</h2>
</footer>

<style>
	footer {
		background-color: #d7e1e9;
		padding: 2em;
		height: 20vh;
		display: flex;
		justify-content: center;
	}
</style>
