<script lang='ts'>
	import Board from "$lib/Board.svelte";
    import type { Card } from "$lib/db/cards";
	import type { PageData } from './$types';
	import { stone_color, str_to_pair } from "$lib/board"

	export let data: PageData;
	$: ({ cards } = data); 

 	enum Rating {
  		Manual = 0,
		Again = 1,
  		Hard = 2,
  		Good = 3,
  		Easy = 4,
	}



	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;
	let disableBoard:boolean = false;
	let correctMove:boolean = false;
	let level:Rating = Rating.Again;

	let current_card:Card;
	$: current_card = cards[0];

	function registerClick(event) {
		let found:boolean = false;
		const move = [event.detail.x, event.detail.y];
		for (let i = 0; i < current_card.move.next_moves.length; i++ ){
			console.log(current_card);
			console.log("compare", str_to_pair(current_card.move.next_moves[i][0]), JSON.stringify(move));
			if (JSON.stringify(str_to_pair(current_card.move.next_moves[i][0])) == JSON.stringify(move)) {
				//const new_cards = f.repeat(current_card, Date().now());
				correctMove = true;
				found = true;
				//board.play_moves(current_card.move.next_moves[i].slice(0,1));
				console.log("correct");
				board.draw_board();
			}
		}

		if (!found) {
			alert("Noooo")
			board.undo();
		}
		
		//console.log((current_card.move.next_moves.map(str_to_pair)).includes(move));
	}


</script>
<svelte:window on:load={() => 
{
	board.reset();
	if (cards != undefined)
		board.play_moves(cards[0].move.current_pos);
	board.draw_board();}
	} 
/>
<div class="h-dvh w-full p-4 grid grid-cols-[43%_57%] gap-4">
	<div class="h-full w-full flex flex-col gap-2">
		<Board bind:turn={turn} 
		bind:bcaptures={bcaptures}
		bind:wcaptures={wcaptures}
		bind:this={board}
		bind:disabled={disableBoard}
		width={1600}
		on:clickedOn={registerClick}/> 

		<form method="POST" action="?/repeat">
			
				{#if correctMove == true}
				<div class="flex flex-row content-start gap-2">
					<button class="btn variant-filled-primary basis-1/3" on:click={()=>{level = Rating.Hard}}> Hard</button>
					<button class="btn variant-filled-primary basis-1/3" on:click={()=>{level = Rating.Good}}> Good</button>
					<button class="btn variant-filled-primary basis-1/3" on:click={()=>{level = Rating.Easy}}> Easy</button>

				</div>

				<input name="id" value="{current_card.id}" style="visibility:hidden">
				<input name="level" bind:value={level} style="visibility:hidden">

				{/if}
				{#if correctMove == false} 
				<div class="flex flex-row content-start gap-2">
					<button class="btn variant-filled-primary w-full">Forgot</button>
				</div>
				<input name="id" value="{current_card.id}" style="visibility:hidden">
				<input name="level" value="{Rating.Again}" style="visibility:hidden">
				{/if}
			</form>


	</div>
	
	
	<div class="h-full flex flex-col content-start gap-4">

	{#if cards}
	{#each cards as card}
	<div>
		<div class="flex flex-row gap-2">
				<button class="h4 basis-full chip variant-soft hover:variant-filled" 
				on:click={() => {board.reset();
					board.play_moves(card.move.current_pos);board.draw_board();
					current_card = card;
					correctMove = false;}}>
				{card.collection} ({card.srs.due.getDate()+1}/{card.srs.due.getMonth()+1} R:{card.srs.reps})
				</button>
				
			
				<div>
					<form action="?/delete" method="post">
						<button class="btn variant-filled-error" name="id" value="{card.id}">Delete</button>
						 </form>
				</div>

		</div>
	
	</div>
	{/each}
	{/if}

</div>
</div>
