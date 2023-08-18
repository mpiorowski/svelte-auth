import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const start = performance.now();
	type Post = { id: string; title: string; content: string };
	let posts: Post[] = [];
	const promises: Promise<Post[]>[] = [];
	for (let i = 0; i < 100; i++) {
		promises.push(
			locals.pb.collection('posts').getFullList<Post>({ $autoCancel: false })
		);
	}
	posts = (await Promise.all(promises)).flat();

	return {
		id: locals.id,
		email: locals.email,
		posts: posts.map((post) => ({
			id: post.id,
			title: post.title,
			content: post.content
		})),
		elapsed: performance.now() - start
	};
}) satisfies PageServerLoad;
