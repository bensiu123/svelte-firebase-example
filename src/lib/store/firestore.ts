import {
	onSnapshot,
	setDoc,
	type DocumentData,
	type DocumentReference,
	type Unsubscribe
} from 'firebase/firestore';
import { writable, type Updater, type Writable } from 'svelte/store';

export class FireDoc<T extends DocumentData> implements Writable<T> {
	constructor(readonly document: DocumentReference<T>) {
		this._unsubscribe = onSnapshot(document, (snap) => {
			if (snap.exists()) {
				this.snapshot = snap.data();
				this.store.set(snap.data());
			}
		});
	}

	private _set(data: Partial<T>) {
		setDoc(this.document, data, { merge: true });
	}

	private _update(updater: Updater<T>) {
		if (!this.snapshot) return;
		const data = updater(this.snapshot);
		setDoc(this.document, data, { merge: true });
	}

	private snapshot: T | undefined;
	private readonly store: Writable<T> = writable<T>();
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private _unsubscribe: Unsubscribe = () => {};

	public readonly subscribe = this.store.subscribe;
	public readonly set = this._set;
	public readonly update = this._update;
	public readonly unsubscribe = this._unsubscribe;
}
