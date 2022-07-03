<script lang="ts">
	import { Button, Link } from 'carbon-components-svelte';
	import { getStores } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from './firebase';
	import { goto } from '$app/navigation';

	let { session } = getStores();
	const logOut = async () => {
		await signOut(auth);
		await goto('/');
	};
</script>

<nav>
	<h2>
		{#if $session['user'] !== null}
			<Link class="link" size="lg" href="/admin">Let's Create</Link>
		{:else}
			<Link class="link" size="lg" href="/">Bloggy</Link>
		{/if}
	</h2>
	<ul>
		{#if $session['user'] !== null}
			<li>
				<Button size="small" kind="danger" on:click={logOut}>Log Out</Button>
			</li>
			<li>
				<Link href="/admin/create-blog">Create a new post</Link>
			</li>
		{:else}
			<li>
				<a href="/auth/login">Login</a>
			</li>
			<li>
				<a href="/auth/register">Sign Up</a>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 1.3em 2em;
		background-color: whitesmoke;
		box-shadow: 0 6px 8px #d7e1e9;
	}
	nav h2 {
		font-weight: bold;
		font-size: 18px;
		color: black;
		padding-right: 1em;
	}
	nav ul {
		display: flex;
		align-items: center;
		list-style: none;
	}
	nav ul li {
		list-style: none;
		display: inline-block;
		padding-right: 1em;
	}
	li a {
		text-decoration: none;
		color: black;
	}
	li a:hover {
		color: orange;
	}
</style>
