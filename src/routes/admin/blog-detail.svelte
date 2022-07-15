<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { blogDoc } from '$lib/firebase';
	import { onSnapshot } from 'firebase/firestore';
	import type { BlogWithId } from '$lib/types/blog';
	import { onMount } from 'svelte';

	let blog: BlogWithId | null = null;

	const subscribeToBlog = async (id: string) => {
		const doc = blogDoc(id);
		return onSnapshot(doc, (snap) => {
			if (snap.exists()) {
				blog = { ...snap.data(), id: snap.id };
				console.log(blog);
			}
		});
	};

	onMount(() => {
		const id = $page.url.searchParams.get('id');

		if (!id) return goto('/admin');
		return subscribeToBlog(id);
	});
</script>

<svelte:head>
	<title>{blog?.title ? blog.title : 'Bloggy'}</title>
</svelte:head>

<div class="container-blog-detail">
	{#if blog === null}
		<div class="center">
			<h2>Blog does not exist or has been deleted</h2>
		</div>
	{:else}
		<div>
			<h2>{blog.title}</h2>
			<p>{blog.summary}</p>
			<p class="description">{blog.description}</p>
		</div>
	{/if}
</div>

<style>
	.container-blog-detail {
		margin: 0 auto;
		width: 80%;
		padding: 2em 0;
		height: 80vh !important;
	}
	.center {
		display: grid;
		place-content: center;
	}
	.description {
		margin-top: 20px;
	}
</style>
