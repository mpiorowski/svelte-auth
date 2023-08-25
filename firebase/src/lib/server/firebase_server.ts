import { SERVICE_ACCOUNT } from '$env/static/private';
import admin, { type ServiceAccount } from 'firebase-admin';
import { safe, type Safe } from './safe';

export function getFirebaseServer(): Safe<typeof admin> {
	if (!admin.apps.length) {
		const serviceAccount = safe(
			() => JSON.parse(SERVICE_ACCOUNT) as ServiceAccount
		);
		if (serviceAccount.error) {
			return { error: true, msg: "Couldn't parse service account" };
		}
		const cert = admin.credential.cert(serviceAccount.data);
		const app = safe(() => admin.initializeApp({ credential: cert }));
		if (app.error) {
			return { error: true, msg: "Couldn't initialize app" };
		}
	}
	return { error: false, data: admin };
}
