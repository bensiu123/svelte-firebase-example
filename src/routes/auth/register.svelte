<script lang="ts">
	import SignUp from '$lib/auth/sign_up.svelte';
	import { Link } from 'carbon-components-svelte';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth, userDoc } from '$lib/firebase';
	import { setDoc } from 'firebase/firestore';
	import type { Events } from '$lib/types/events';

	let errors: string[] = [];

	const signUp = async (event: CustomEvent<Events['signup']>) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				event.detail.email,
				event.detail.password
			);

			await updateProfile(userCredential.user, { displayName: event.detail.username });

			if (!auth.currentUser) throw new Error('User is not logged in');
			await setDoc(userDoc(auth.currentUser.uid), {
				username: userCredential.user.displayName,
				email: userCredential.user.email
			});

			await goto('/admin');
		} catch (e) {
			console.log('error from creating user', e);
			if (e instanceof Error) errors.push(e.message);
		}
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div>
	<div class="header">
		<h4>Sign Up</h4>
	</div>
	<div class="form-container">
		{#if errors}
			{#each errors as error, i (i)}
				<div class="notification-block">
					<p>{error}</p>
				</div>
			{/each}
		{/if}
		<SignUp on:signup={signUp} />
		<div>Already have an account? <Link href="/auth/login">Sign In</Link></div>
	</div>
</div>

<style>
	.header {
		width: 100vw;
		padding: 2em 0;
		min-height: 20vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e5f0ff;
	}
	.header h4 {
		color: black;
		font-weight: 600;
		font-size: 3em;
	}
	.form-container {
		min-height: 80vh;
		display: grid;
		place-items: center;
	}
	.notification-block {
		min-width: 20vw;
		padding: 1.2em 0.75em;
		border-radius: 5px;
		background-color: #fe634e;
	}
	.notification-block p {
		color: white;
	}
</style>
