/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { User } from 'firebase/auth';

declare global {
	declare namespace App {
		// interface Locals {}
		// interface Platform {}
		interface Session {
			user: User | null | undefined;
		}
		// interface Stuff {}
	}
}
