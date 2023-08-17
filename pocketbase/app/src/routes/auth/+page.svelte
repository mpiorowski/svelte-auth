<script lang="ts">
	import { goto } from '$app/navigation';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://localhost:8080');

	async function login() {
		try {
			await pb.collection('users').authWithOAuth2({ provider: 'github' });
			const token = pb.authStore.exportToCookie();
			window.location.href = '/?token=' + token;
		} catch (err) {
			console.error(err);
		}
	}
</script>

<button
	on:click={login}
	class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
>
	Login using Github
</button>
