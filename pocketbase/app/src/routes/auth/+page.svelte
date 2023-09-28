<script lang="ts">
	import { PUBLIC_CLIENT_PB } from '$env/static/public';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase(PUBLIC_CLIENT_PB);

	let form: HTMLFormElement;
	async function login() {
		try {
			await pb.collection('users').authWithOAuth2({ provider: 'github' });
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'token';
			input.value = pb.authStore.token;
			form.appendChild(input);
			form.submit();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<form method="post" bind:this={form} />
<button
    on:click={login}
	class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
>
	Login using Github
</button>
