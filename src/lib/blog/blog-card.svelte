<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Events } from '$lib/types/events';
	import { createEventDispatcher } from 'svelte';

	export let id: string, title: string, summary: string;

	const dispatch = createEventDispatcher<Events>();

	const editBlog = async () => {
		await goto(`/admin/blog/update/${id}`);
	};

	const dispatchBlogDelete = () => {
		dispatch('deleteBlog', { id });
	};
</script>

<div class="card">
	<div class="title">
		<h2>{title}</h2>
	</div>
	<div class="content">
		<p>{summary}</p>
		<a href="/admin/blog/{id}">Read more</a>
	</div>
	<div class="button-set">
		<button class="edit" on:click={editBlog}>Edit</button>
		<button class="delete" on:click={dispatchBlogDelete}>Delete</button>
	</div>
</div>

<style>
	.card {
		max-width: 300px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 7px #f1f2f2;
		padding: 1em;
		margin: 1em 2em;
		transition: all 200ms ease-in;
	}
	.card:hover {
		box-shadow: 0 4px 7px #f1f2f2;
	}
	.card .content {
		margin-bottom: 1em;
	}
	.card .content a {
		margin-top: 10px;
	}

	.card a {
		display: flex;
	}
	.button-set {
		display: flex;
		flex-direction: row;
	}
	.button-set .edit {
		margin-right: 0.75em;
		padding: 0.35em 0.45em;
		background-color: green;
		border-radius: 3px;
		outline: none;
		border: none;
		color: white;
	}
	.button-set .delete {
		background-color: red;
		border-radius: 3px;
		padding: 0.35em 0.45em;
		outline: none;
		border: none;
		color: white;
	}
</style>
