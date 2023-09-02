import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const posts = await locals.pb.collection('posts').getFullList();
	return {
		id: locals.id,
		email: locals.email,
		posts: posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            created: post.created
        }))
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request, locals }) => {
		const form = await request.formData();
		const title = form.get('title');
		const content = form.get('content');

		await locals.pb.collection('posts').create({
			title,
			content
		});

		return { success: true };
	}
} satisfies Actions;
