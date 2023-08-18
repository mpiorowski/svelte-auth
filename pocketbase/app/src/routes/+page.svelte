<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteAuth</h1>

<h2>Made 100 seperate requests to the database in {data.elapsed.toFixed(4)} ms</h2>

<button
	class="border rounded p-2 mt-10 mb-10 bg-gray-800 text-white hover:bg-gray-700"
	on:click={() => (window.location.href = '/auth')}
>
	Logout
</button>

<pre>
    {JSON.stringify(data, null, 2)}
</pre>
