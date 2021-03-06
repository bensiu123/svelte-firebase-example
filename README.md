# Svelte-firebase-bloggo

## Introduction

It is a project for learning and practicing svelte and svelte-kit.

This project mainly follows instruction from [Building CRUD application svelte firebase](https://blog.logrocket.com/building-crud-application-svelte-firebase/), with all code being changed to TypeScript to have a better understanding on the mechanism.

Query on blog posts are modified to be realtime update. It is to test the firebase firestore realtime update `onSnapshot` feature.

In this project, `carbon-components-svelte` is used as UI component library.

## Features

- using TypeScript
- Sign-in, register with `firebase/auth`: `signInWithEmailAndPassword` & `createUserWithEmailAndPassword`
- Store user profile in firestore
- CRUD blog post in firestore
- realtime update blog post list and details from firestore
- deployed to Firebase Hosting with Static-site Generation
- class `FireDoc` in `$lib/store/firebase.ts`: a `Writable` store for firestore document handling snapshot subscription, and also provide a method to update the document

## Getting Started

```sh
npm install

npm run dev
```

## Issues to be fixed

- [x] in `/admin` page, the `session.user` is `undefined` (and `auth.currentUser` is `null` as well) at the beginning, cause it failed to load `user.uid`.
  - [x] moved navigation logic to `onMount` in `__layout.svelte`. It works but if user get into `/admin` directly, they will be redirected `/auth/login` first and then `/admin` page.
  - [x] changing `load` in `/admin` to run in client side may solve the problem, but un-authorized user may get into `/admin` page. It also loses benefit of SSR.
- [ ] add `__error.svelte` page

## To-do

- [x] deploy on Firebase Hosting (static) or Functions (SSR)

## Comments on Svelte and Svelte-kit

- Really convenient to have html, css, js combined in one `.svelte` file.
- Syntax are easy to understand. Only thing to learn (for a React developer) is subscription label `$:`, but it is just something like `useEffect`, with dependencies auto subscribed.
- Default global state management: `store`, which is an observable. It is easier to understand than `redux`.
- Child to parent communication with `createEventDispatcher` is easy to understand. React with TypeScript can do similar thing but defining the type of props. But Svelte's syntax is easier to follow, especially when using the components written but others.
- Animation and transition is easy to handle.
- css isolation is great compared with React. css in each `.svelte` file is isolated. On the other hand, `.module.css` can only isolate css with class name selector.
- It is a mature framework, with almost everything you needed to build a modern web app. Except that the community (and package library) may not be large enough.

- VS Code reference lookup is not yet supported in `.svelte` files.
- No auto-closing for tags like `{#if}` and `{#each}` in `.svelte`.
