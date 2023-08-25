import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		id: locals.id,
		email: locals.email,
	};
}) satisfies PageServerLoad;
