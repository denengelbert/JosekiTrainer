<script lang='ts'>
	// @ts-ignore
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ moves } = data);


	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;


</script>
 
<div class="card p-4"><Board bind:turn={turn} 
	bind:bcaptures={bcaptures}
	bind:wcaptures={wcaptures}
	bind:this={board}
	width={600}/>
</div>



<div id="flex-container">
{#if moves}
{#each moves as move}
<div id="flex-auto" class="card p-4 variant-filled-secondary"><button class="btn variant-ghost-primary" on:click={() => {board.reset();board.play_moves(move.current_pos);board.highlight(move.next_moves)}}>Joseki</button>
	<form action="" method="post">
	<button class="btn variant-filled-primary" name="id" value="{move.id}">Delete</button>
     </form>
</div>
{/each}
{/if}
</div>

<button class="btn variant-filled-warning" on:click={() => board.reset()}>Reset</button>



<style>
#flex-container {
  display: flex;
  font-family: Consolas, Arial, sans-serif;
}

#flex-container > div {
  padding: 1rem;
}

#flex-auto {
  flex: initial;
}
</style>
