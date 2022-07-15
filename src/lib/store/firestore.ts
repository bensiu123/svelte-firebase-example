import {
	onSnapshot,
	setDoc,
	type DocumentData,
	type DocumentReference,
	getDoc
} from 'firebase/firestore';
import {
	get,
	type Subscriber,
	type Unsubscriber,
	writable,
	type Updater,
	type Writable
} from 'svelte/store';

export class FireDoc<D extends DocumentData, T = D | undefined> implements Writable<T> {
	private _document: DocumentReference<T>;
	private readonly store: Writable<T> = writable<T>();

	constructor(readonly document: DocumentReference<T>) {
		this._document = document;
		getDoc(document).then((snap) => {
			if (snap.exists()) {
				this.store.set(snap.data());
			}
		});
	}

	set(data: Partial<T>) {
		/** update local */
		const value = get(this.store);
		this.store.set({ ...data, ...value });

		/** update firestore */
		setDoc(this.document, data, { merge: true });
	}

	update(updater: Updater<T>) {
		/** update local */
		this.store.update(updater);

		/** update firestore */

		const data = updater(get(this.store));
		setDoc(this.document, data, { merge: true });
	}

	subscribe(run: Subscriber<T>, invalidate?: (value?: T) => void): Unsubscriber {
		const unsubscribeFirestore = onSnapshot(this._document, (snap) => {
			if (snap.exists()) {
				this.store.set(snap.data());
			}
		});
		const unsubscribe = this.store.subscribe(run, invalidate);
		return () => {
			unsubscribeFirestore();
			unsubscribe();
		};
	}

	public readonly value = get(this.store);
}
