<script lang='ts'>
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ collections } = data);


</script>

<div class="card p-4">
	<p>The current collections are as follows: </p>
	<ul class="list">
		{#if collections}
		{#each collections as coll}
		<li>
			<span>1.</span>
			<span class="flex-auto">{coll}</span>
			<span><form action="" method="post">
				<button class="btn variant-filled-primary" name="id" value="{coll}">Study</button>
			</form></span>
			
		</li>
		{/each}
		{/if}
	</ul>
	
</div>
