<script lang="ts">
	import type { Events } from '$lib/types/events';

	import { Form, TextArea, TextInput, Button } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let title = '',
		summary = '',
		description = '';

	const dispatch = createEventDispatcher<Events>();

	const dispatchBlog = () => {
		dispatch('sendBlogDetails', { title, summary, description });
		title = '';
		summary = '';
		description = '';
	};
</script>

<div class="form-container">
	<Form>
		<TextInput
			bind:value={title}
			label="Blog title"
			placeholder="Enter the title of the blog"
			name="title"
			required
		/>
		<div class="space" />
		<TextInput
			bind:value={summary}
			label="Blog summary"
			placeholder="Summary"
			name="summary"
			required
		/>
		<div class="space" />
		<TextArea
			bind:value={description}
			label="Blog description"
			placeholder="THE STORY!!!"
			name="description"
			required
		/>
		<div class="space" />
		<Button on:click={dispatchBlog}>Submit</Button>
	</Form>
</div>

<style>
	.form-container {
		width: 30%;
	}
	.form-container .space {
		margin: 20px 0;
	}
</style>
