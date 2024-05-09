<script lang='ts'>
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ collections } = data);


</script>

<div class="card p-4">
	<p>Which collections would you like to study?</p>
	<ul class="list">
		{#if collections}
		{#each collections as coll}
		<li>
			<span class="flex-auto"><form action="" method="post">
				<button class="btn variant-filled-primary" name="id" value="{coll[0]}">Study "{coll[0]}" collection with {coll[1]} { coll[1] > 1 ? "entries" : "entry"}</button>
			</form></span>
			
		</li>
		{/each}
		{/if}
	</ul>
	
</div>
