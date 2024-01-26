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
 

<p>This is the review page. It is currenty turn {turn} </p>
<p>Black captures: {bcaptures}   White captures: {wcaptures} </p>

<button on:click={() => board.reset()}>Reset</button>

{#if moves}
{#each moves as move}
<button on:click={() => {board.reset();board.play_moves(move.current_pos);board.highlight(move.next_moves)}}>Joseki</button>
<form action="" method="post">
    <button name="id" value="{move.id}">Delete</button>
</form>

{/each}
{/if}
<Board bind:turn={turn} 
       bind:bcaptures={bcaptures}
	   bind:wcaptures={wcaptures}
	   bind:this={board}
	   width={600}/>

