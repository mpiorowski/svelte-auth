<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="p-8">
	<h1 class="text-3xl font-semibold">Welcome to SvelteAuth</h1>
	<button
		class="border rounded p-2 mt-10 mb-10 bg-gray-800 text-white hover:bg-gray-700"
		on:click={() => (window.location.href = '/auth')}
	>
		Logout
	</button>
	<form action="?/create" method="POST">
		<fieldset class="flex flex-col gap-2 max-w-lg p-2">
			<input name="title" type="text" placeholder="Title" />
			<textarea name="content" placeholder="Content" />
			<button type="submit">Create</button>
		</fieldset>
	</form>

	<pre>
    {JSON.stringify(data, null, 2)}
</pre>
</main>

<style>
	input,
	textarea {
		@apply border rounded p-2 bg-gray-100;
	}
	button {
		@apply border rounded p-2 bg-gray-800 text-white;
	}
</style>
