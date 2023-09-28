<script lang="ts">
    import { getFirebaseClient } from "$lib/firebase_client";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

    let form: HTMLFormElement;
    async function login(): Promise<void> {
        try {
            const auth = getFirebaseClient();
            if (auth.error) {
                return alert("Error: " + auth.msg);
            }
            const cred = await signInWithPopup(auth.data, new GoogleAuthProvider());
            const token = await cred.user.getIdToken();
            await auth.data.signOut();
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "token";
            input.value = token;
            form.appendChild(input);
            form.submit();
        } catch (err) {
            console.error(err);
        }
    }
</script>

<form method="post" bind:this={form} />
<button on:click={login} class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700">
    Login using Google
</button>
