<script lang="ts" context="module">
	import { getDoc, setDoc } from 'firebase/firestore/lite';
	import { blogDoc } from '$lib/firebase';
	import type { Load } from '@sveltejs/kit';
	import type { BlogWithId } from '$lib/types/blog';

	export const load: Load<{ id: string }, { blog: BlogWithId }> = async ({ params }) => {
		const { id } = params;
		if (!id || typeof id !== 'string') return { status: 302, redirect: '/admin' };

		const docSnap = await getDoc(blogDoc(id));

		if (!docSnap.exists()) return { status: 404, redirect: '/admin' };

		return { status: 200, props: { blog: { ...docSnap.data(), id: docSnap.id } } };
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogForm from '$lib/blog/blog-form.svelte';
	import type { Events } from '$lib/types/events';

	export let blog: BlogWithId;

	const updateBlogDetails = async (event: CustomEvent<Events['sendBlogDetails']>) => {
		setDoc(blogDoc(blog.id), event.detail, { merge: true });
		await goto('/admin');
	};
</script>

<svelte:head>
	<title>Update blog</title>
</svelte:head>

<div class="container">
	<div class="header">
		<h2>Update blog</h2>
	</div>
	<BlogForm
		on:sendBlogDetails={updateBlogDetails}
		title={blog.title}
		summary={blog.summary}
		description={blog.description}
	/>
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
</style>
