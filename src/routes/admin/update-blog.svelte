<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogForm from '$lib/blog/blog-form.svelte';
	import { page } from '$app/stores';

	import type { Events } from '$lib/types/events';
	import { onMount } from 'svelte';
	import { onSnapshot } from 'firebase/firestore';
	import type { Blog } from '$lib/types/blog';
	import { blogDoc } from '$lib/firebase';
	import { FireDoc } from '$lib/store/firestore';

	let blog: FireDoc<Blog>;

	const subscribeToBlog = async (id: string) => {
		const doc = blogDoc(id);
		blog = new FireDoc(doc);
		return blog.unsubscribe;
	};

	onMount(() => {
		const id = $page.url.searchParams.get('id');

		if (!id) return goto('/admin');
		return subscribeToBlog(id);
	});

	const updateBlogDetails = async (event: CustomEvent<Events['sendBlogDetails']>) => {
		if (!blog) return;
		console.log('updateBlogDetails', event.detail);
		blog?.set(event.detail);
		await goto('/admin');
	};

	const realtimeUpdateBlogDetails = async (
		event: CustomEvent<Events['realtimeUpdateBlogDetails']>
	) => {
		if (!blog) return;
		console.log('realtimeUpdateBlogDetails', event.detail);
		blog?.set(event.detail);
	};
</script>

<svelte:head>
	<title>Update blog</title>
</svelte:head>

<div class="container">
	<div class="header">
		<h2>Update blog</h2>
	</div>
	{#if $blog}
		<BlogForm
			on:sendBlogDetails={updateBlogDetails}
			on:realtimeUpdateBlogDetails={realtimeUpdateBlogDetails}
			title={$blog.title}
			summary={$blog.summary}
			description={$blog.description}
		/>
	{:else}
		<div class="center">
			<h2>Loading...</h2>
		</div>
	{/if}
</div>

<style>
	.container {
		margin: 3em auto;
		width: 80%;
		min-height: 90vh;
	}
	.header {
		margin-bottom: 2em;
	}
	.center {
		display: grid;
		place-content: center;
	}
</style>
