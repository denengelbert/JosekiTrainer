<script lang='ts'>
	import Board from "$lib/Board.svelte";
    import type { Card } from "ts-fsrs";
	import type { PageData } from './$types';
	import { str_to_pair } from "$lib/board"

	export let data: PageData;
	$: ({ cards } = data); 


	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;

	let current_card:Card;
	$: current_card = cards[0];

	function registerClick(event) {
		let found:boolean = false;
		const move = [event.detail.x, event.detail.y];
		for (let i = 0; i < current_card.move.next_moves.length; i++ ){
			console.log(str_to_pair(current_card.move.next_moves[i][0]));
			if (JSON.stringify(str_to_pair(current_card.move.next_moves[i][0])) == JSON.stringify(move)) {
				alert("Correct");
				found = true;
			}
		}

		if (!found) {
			board.undo();
		}
		
		//console.log((current_card.move.next_moves.map(str_to_pair)).includes(move));
	}


</script>
<svelte:window on:load={() => {board.reset();board.play_moves(cards[0].move.current_pos);}} />
<div class="h-auto p-4 grid grid-cols-[80%_20%] place-items-center">
	<div class="h-full w-full">
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

	{#if cards}
	{#each cards as card}
	<div class="card p-3 variant-filled-secondary basis-auto gap-4">
		<div class=" flex flex-col content-start gap-2">
			<div><button class="btn variant-filled-primary basis-auto " on:click={() => {board.reset();board.play_moves(card.move.current_pos);}}>Card:</button>
			</div>
		</div>
		
	</div>
	{/each}
	{/if}
	</div>
</div>