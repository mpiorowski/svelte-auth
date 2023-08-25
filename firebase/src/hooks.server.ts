import { redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { getFirebaseServer } from '$lib/server/firebase_server';
import { safe } from '$lib/server/safe';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.id = '';
	event.locals.email = '';

	const isAuth: boolean = event.url.pathname === '/auth';
	if (isAuth || building) {
		event.cookies.set('session', '');
		return await resolve(event);
	}

	const session = event.cookies.get('session') ?? '';
	const admin = getFirebaseServer();
	if (admin.error) {
		throw redirect(303, '/auth?error=' + admin.msg);
	}
	const decodedClaims = await safe(
		admin.data.auth().verifySessionCookie(session, false)
	);
	if (decodedClaims.error) {
		throw redirect(303, '/auth');
	}
	const { uid, email } = decodedClaims.data;
	event.locals.id = uid;
	event.locals.email = email ?? '';

	if (!event.locals.id) {
		throw redirect(303, '/auth');
	}

	return await resolve(event);
};
