import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get('token');
        if (!token || typeof token !== 'string' || token.length < 1) {
            console.error('Invalid token');
            throw redirect(303, '/auth');
        }
        cookies.set('pb_auth', JSON.stringify({ token: token }), {
            maxAge: 60 * 60, // 1 hour
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        throw redirect(303, '/');
    }
} satisfies Actions;
