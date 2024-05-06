<script lang='ts'>
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ moves } = data);


	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;

	function registerClick(event) {
		console.log(event.detail.x);
		console.log(event.detail.y);
		
	}


</script>
 
<div class="h-auto p-4 grid grid-cols-[80%_20%] place-items-center">
	<div class="h-1/2 w-1/2">
		<Board bind:turn={turn} 
		bind:bcaptures={bcaptures}
		bind:wcaptures={wcaptures}
		bind:this={board}
		width={600}
		on:clickedOn={registerClick}/> 
		<button class="btn variant-filled-primary w-1/2" on:click={() => board.undo()}>Undo</button>
		<button class="btn variant-filled-warning w-1/2" on:click={() => board.reset()}>Reset</button>

	</div>
	
	<div class="h-full flex flex-col content-start gap-4">
	{#if moves}
	{#each moves as move}
	<div class="card p-3 variant-filled-secondary basis-auto gap-4">
		<div class=" flex flex-col content-start gap-2">
			<div><button class="btn variant-filled-primary basis-auto " on:click={() => {board.reset();board.play_moves(move.current_pos);board.highlight(move.next_moves);board.draw_board();}}>Joseki</button>
			</div>
			<div>
				<form action="" method="post">
					<button class="btn variant-filled-error basis-auto" name="id" value="{move.id}">Delete</button>
					 </form>
			</div>
		</div>
		
	</div>
	{/each}
	{/if}
	</div>
</div>