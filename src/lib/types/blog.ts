import type { UserInfo } from 'firebase/auth';
import type { FieldValue } from 'firebase/firestore';

export type Blog = {
	title: string;
	summary: string;
	description: string;
	owner: UserInfo['uid'];
	createdAt: FieldValue; // timestamp
	updatedAt: FieldValue; // timestamp
};

export type BlogWithId = Blog & { id: string };
