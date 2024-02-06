<script lang='ts'>
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ moves } = data);


	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;


</script>
 
<div class="h-auto p-4 grid grid-cols-[80%_20%] place-items-center">
	<div class="h-full w-full">
		<Board bind:turn={turn} 
		bind:bcaptures={bcaptures}
		bind:wcaptures={wcaptures}
		bind:this={board}
		width={600}/> <button class="btn variant-filled-warning w-full" on:click={() => board.reset()}>Reset</button>
	</div>
	
	<div class="h-full flex flex-col content-start gap-4">
	{#if moves}
	{#each moves as move}
	<div class="card p-3 variant-filled-secondary basis-auto gap-4">
		<div class=" flex flex-col content-start gap-2">
			<div><button class="btn variant-filled-primary basis-auto " on:click={() => {board.reset();board.play_moves(move.current_pos);board.highlight(move.next_moves)}}>Joseki</button>
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