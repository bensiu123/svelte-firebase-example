<script lang="ts" context="module">
	import { deleteDoc, getDocs, query, where } from 'firebase/firestore/lite';
	import { auth, blogCollection, blogDoc } from '$lib/firebase';
	import type { BlogWithId } from '$lib/types/blog';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		// const { user } = session;

		// if (!user) return { status: 302, redirect: '/auth/login' };
		// if (typeof user?.uid !== 'string') return { status: 302, redirect: '/auth/login' };

		const { currentUser: user } = auth;
		console.log(user);
		if (!user) return { status: 302, redirect: '/auth/login' };

		const q = query(blogCollection, where('owner', '==', user.uid));
		const querySnapshot = await getDocs(q);

		let blogs: BlogWithId[] = [];
		querySnapshot.forEach((blog) => {
			blogs.push({ ...blog.data(), id: blog.id });
		});

		return { status: 200, props: { blogs } };
	};
</script>

<script lang="ts">
	import BlogCard from '$lib/blog/blog-card.svelte';
	import type { Events } from '$lib/types/events';

	export let blogs: BlogWithId[] = [];

	const deleteBlog = async (event: CustomEvent<Events['deleteBlog']>) => {
		await deleteDoc(blogDoc(event.detail.id));
	};
</script>

<svelte:head>
	<title>Bloggy</title>
</svelte:head>

<div class="content">
	<div class="header">
		<h2>My Blogs</h2>
	</div>
	<div class="blogs">
		{#each blogs as blog}
			<BlogCard title={blog.title} summary={blog.summary} id={blog.id} on:deleteBlog={deleteBlog} />
		{:else}
			<div class="center">
				<h2>You don't have any blogs yet.</h2>
			</div>
		{/each}
	</div>
</div>

<style>
	.content {
		min-height: 90vh;
		padding: 1em;
		margin: 0 auto;
		max-width: 80%;
	}
	.header {
		padding: 1em 2em;
	}
	.header h2 {
		font-weight: 700;
	}
	.blogs {
		display: flex;
		flex-wrap: wrap;
	}
</style>
