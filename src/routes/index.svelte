<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session.user === null) return { status: 302, redirect: '/auth/login' };
		return { status: 302, redirect: '/admin' };
	};
</script>

<div class="container">
	<h1>Navigating...</h1>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
