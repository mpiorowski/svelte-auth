import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { getFirebaseServer } from "$lib/server/firebase_server";
import { safe } from "$lib/server/safe";

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get("token");
        if (!token || typeof token !== "string") {
            throw redirect(303, "/auth");
        }
        const admin = getFirebaseServer();
        if (admin.error) {
            throw redirect(303, "/auth");
        }

        // Expires in 5 days
        const expiresIn = 60 * 60 * 24 * 5;
        const sessionCookie = await safe(
            admin.data.auth().createSessionCookie(token, { expiresIn: expiresIn * 1000 }),
        );
        if (sessionCookie.error) {
            throw redirect(303, "/auth");
        }

        cookies.set("session", sessionCookie.data, {
            maxAge: expiresIn,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        throw redirect(303, "/");
    },
} satisfies Actions;
