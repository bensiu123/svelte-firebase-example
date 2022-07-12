<script lang="ts" context="module">
	import { getDoc, onSnapshot } from 'firebase/firestore';
	import { blogDoc } from '$lib/firebase';
	import type { Load } from '@sveltejs/kit';
	import type { BlogWithId } from '$lib/types/blog';

	export const load: Load<{ id: string }, { blog: BlogWithId | null }> = async ({ params }) => {
		const { id } = params;
		if (!id || typeof id !== 'string') return { status: 302, redirect: '/admin' };

		const docSnap = await getDoc(blogDoc(id));
		if (!docSnap.exists()) {
			return { status: 404, props: { blog: null } };
		}

		return { status: 200, props: { blog: { ...docSnap.data(), id: docSnap.id } } };
	};
</script>

<script lang="ts">
	export let blog: BlogWithId | null = null;
	if (blog) {
		const doc = blogDoc(blog?.id);
		onSnapshot(doc, (snap) => {
			if (snap.exists()) {
				blog = { ...snap.data(), id: snap.id };
			}
		});
	}
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
