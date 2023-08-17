import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.id = '';
	event.locals.email = '';
	event.locals.pb = new PocketBase('http://pocketbase:8080');

	const isAuth: boolean = event.url.pathname === '/auth';
	if (isAuth || building) {
		event.cookies.set('pb_auth', '');
		return await resolve(event);
	}

	const token = event.url.searchParams.get('token');
	const pb_auth = token ?? event.request.headers.get('cookie') ?? '';
	event.locals.pb.authStore.loadFromCookie(pb_auth);

	if (!event.locals.pb.authStore.isValid) {
		console.log('Session expired');
		throw redirect(303, '/auth');
	}
	try {
		const auth = await event.locals.pb
			.collection('users')
			.authRefresh<{ id: string; email: string }>();
		event.locals.id = auth.record.id;
		event.locals.email = auth.record.email;
	} catch (e) {
		throw redirect(303, '/auth');
	}

	if (!event.locals.id) {
		throw redirect(303, '/auth');
	}

	let response: Response;
	if (token) {
		response = new Response('Redirect', {
			status: 303
		});
		response.headers.append('Location', '/');
	} else {
		response = await resolve(event);
	}
	const cookie = event.locals.pb.authStore.exportToCookie({ sameSite: 'lax' });
	response.headers.append('set-cookie', cookie);
	return response;
};
