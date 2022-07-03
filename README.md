# Svelte-firebase-bloggo

## Introduction

It is a project for learning and practicing svelte and svelte-kit.

This project mainly follows instruction from [Building CRUD application svelte firebase](https://blog.logrocket.com/building-crud-application-svelte-firebase/), with all code being changed to TypeScript to have a better understanding on the mechanism.

In this project, `carbon-components-svelte` is used as UI component library.

## Features

- using TypeScript
- Sign-in, register with `firebase/auth`: `signInWithEmailAndPassword` & `createUserWithEmailAndPassword`
- Store user profile in firestore
- CRUD blog post in firestore

## Getting Started

```sh
npm install

npm run dev
```

## Issues to be fixed

- in `/admin` page, the `session.user` is `undefined` (and `auth.currentUser` is `null` as well) at the beginning, cause it failed to load `user.uid`.
- add `__error.svelte` page

## Comments on Svelte and Svelte-kit

- Really convenient to have html, css, js combined in one `.svelte` file.
- Syntax are easy to understand. Only thing to learn (for a React developer) is subscription label `$:`, but it is just something like `useEffect`, with dependencies auto subscribed.
- Default global state management: `store`, which is an observable. It is easier to understand than `redux`.
- Child to parent communication with `createEventDispatcher` is easy to understand. React with TypeScript can do similar thing but defining the type of props. But Svelte's syntax is easier to follow, especially when using the components written but others.
- Animation and transition is easy to handle.
- It is a mature framework, with almost everything you needed to build a modern web app. Except that the community (and package library) may not be large enough.

- VS Code reference lookup is not yet supported in `.svelte` files.
- No auto-closing for tags like `{#if}` and `{#each}` in `.svelte`.
