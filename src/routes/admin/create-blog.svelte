<script lang="ts">
	import { goto } from '$app/navigation';
	import { addDoc, serverTimestamp } from 'firebase/firestore/lite';
	import { auth, blogCollection } from '$lib/firebase';
	import BlogForm from '$lib/blog/blog-form.svelte';
	import type { Blog } from '$lib/types/blog';
	import type { Events } from '$lib/types/events';

	const createNewBlog = async (event: CustomEvent<Events['sendBlogDetails']>) => {
		const { currentUser } = auth;
		if (!currentUser) return;

		const { title, summary, description } = event.detail;
		const timestamp = serverTimestamp();
		const blog: Blog = {
			title,
			summary,
			description,
			owner: currentUser.uid,
			createdAt: timestamp,
			updatedAt: timestamp
		};
		await addDoc(blogCollection, blog);
		goto('/admin');
	};
</script>

<svelte:head>
	<title>Create Blog</title>
</svelte:head>

<div class="container">
	<div class="header">
		<h2>Create a new Blog</h2>
	</div>
	<BlogForm on:sendBlogDetails={createNewBlog} />
</div>

<style>
	.container {
		margin: 3em auto;
		width: 80%;
		min-height: 90vh;
	}
	.header {
		margin-bottom: 2me;
	}
</style>
