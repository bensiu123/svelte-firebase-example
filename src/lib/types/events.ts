export type Events = {
	login: { email: string; password: string };
	signup: { username: string; email: string; password: string };
	sendBlogDetails: {
		title: string;
		summary: string;
		description: string;
	};
	deleteBlog: { id: string };
};
