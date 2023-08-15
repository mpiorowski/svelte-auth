<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteAuth</h1>

<pre>
    {JSON.stringify(data, null, 2)}
</pre>

<button class="border rounded p-2" on:click={() => (window.location.href = '/auth')}>Logout</button>
