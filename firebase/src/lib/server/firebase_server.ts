import { SERVICE_ACCOUNT } from "$env/static/private";
import admin, { type ServiceAccount } from "firebase-admin";

export function getFirebaseServer():
    | { error: false; data: typeof admin }
    | { error: true; msg: string } {
    try {
        if (!admin.apps.length) {
            const serviceAccount = JSON.parse(SERVICE_ACCOUNT) as ServiceAccount;
            const cert = admin.credential.cert(serviceAccount);
            admin.initializeApp({ credential: cert });
        }
        return { error: false, data: admin };
    } catch (error) {
        console.error(error);
        return { error: true, msg: "Error initializing firebase server" };
    }
}
