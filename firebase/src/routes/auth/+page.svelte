<script lang="ts">
    import { getFirebaseClient } from "$lib/firebase_client";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

    const auth = getFirebaseClient();

    async function login(form: HTMLFormElement): Promise<void> {
        try {
            const cred = await signInWithPopup(auth, new GoogleAuthProvider());
            const token = await cred.user.getIdToken();
            await auth.signOut();
            form.token.value = token;
            form.submit();
        } catch (err) {
            console.error(err);
        }
    }
</script>

<form method="post" on:submit|preventDefault={(e) => login(e.currentTarget)}>
    <input name="token" type="hidden" />
    <button class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700">
        Login using Google
    </button>
</form>
