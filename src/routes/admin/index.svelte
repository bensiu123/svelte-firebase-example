<script lang="ts">
	import { deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
	import { blogCollection, blogDoc } from '$lib/firebase';
	import type { BlogWithId } from '$lib/types/blog';
	import BlogCard from '$lib/blog/blog-card.svelte';
	import type { Events } from '$lib/types/events';
	import type { User } from 'firebase/auth';
	import { session } from '$app/stores';

	export let blogs: BlogWithId[] = [];
	export let user: User | null | undefined;
	// const { user } = get(session);

	session.subscribe((session) => {
		user = session.user;
	});

	$: console.log('admin page', user);

	$: user && onUserChange(user);

	const onUserChange = (user: User) => {
		const q = query(blogCollection, where('owner', '==', user!.uid));

		onSnapshot(q, (querySnapshot) => {
			const newBlogs: BlogWithId[] = [];
			querySnapshot.forEach((blog) => {
				newBlogs.push({ ...blog.data(), id: blog.id });
			});
			blogs = newBlogs;
		});
	};

	$: blogs &&
		blogs.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			if (a.createdAt < b.createdAt) return 1;
			return 0;
		});

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
