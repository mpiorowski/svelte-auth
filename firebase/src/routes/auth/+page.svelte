<script lang="ts">
	import { getFirebaseClient } from '$lib/firebase_client';
	import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

	let form: HTMLFormElement;

	const auth = getFirebaseClient();

	async function login(): Promise<void> {
		try {
			const cred = await signInWithPopup(auth, new GithubAuthProvider());
			const token = await cred.user.getIdToken();
			await auth.signOut();
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'token';
			input.value = token;
			form.appendChild(input);
			form.submit();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<form method="post" bind:this={form} />
<button
	class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
	on:click={login}
>
	Login using Github
</button>
