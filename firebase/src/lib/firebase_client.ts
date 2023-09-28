import { PUBLIC_API_KEY, PUBLIC_AUTH_DOMAIN } from "$env/static/public";
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, type Persistence } from "firebase/auth";

export function getFirebaseClient():
    | { error: false; data: ReturnType<typeof getAuth> }
    | { error: true; msg: string } {
    try {
        const firebaseConfig = {
            apiKey: PUBLIC_API_KEY,
            authDomain: PUBLIC_AUTH_DOMAIN,
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const persistance: Persistence = { type: "NONE" };
        void setPersistence(auth, persistance);
        return { error: false, data: auth };
    } catch (error) {
        console.error(error);
        return { error: true, msg: "Error initializing firebase client" };
    }
}
