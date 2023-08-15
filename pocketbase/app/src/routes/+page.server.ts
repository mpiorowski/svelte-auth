import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {
    return {
        id: locals.id,
        email: locals.email,
    };
}) satisfies PageServerLoad;
