<script lang='ts'>
	import Board from "$lib/Board.svelte";
	import type { PageData } from './$types';
	import type { Move } from "$lib/db/moves";
	import { TreeView, TreeViewItem, RecursiveTreeView, type TreeViewNode } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let moves: any;
	let collections: any;
	$: {
		moves = data.moves;
		collections = data.collections;
	}


	let board: Board;
	let turn:number;
	let bcaptures:number;
	let wcaptures:number;

	function registerClick(event:any) {
		console.log(event.detail.x);
		console.log(event.detail.y);
	}


</script>
 
<div class="h-dvh w-full p-4 grid grid-cols-[43%_57%] gap-4">
	<div class="h-full w-full flex flex-col gap-2">
		<Board bind:turn={turn} 
		bind:bcaptures={bcaptures}
		bind:wcaptures={wcaptures}
		bind:this={board}
		width={1500}
		on:clickedOn={registerClick}/> 
		<div class="flex flex-row content-start gap-2">
			<button class="btn variant-filled-primary w-1/2" on:click={() => board.undo()}>Undo</button>
			<button class="btn variant-filled-warning w-1/2" on:click={() => board.reset()}>Reset</button>	
		</div>
	
	</div>
	<div class="h-full w-full">
		<TreeView>
		{#if collections}
		{#each collections as collection}
			<TreeViewItem>
			<div class="w-full flex flex-row gap-2">
				<div class="h4 basis-full chip variant-soft hover:variant-filled ">
							{collection[0].collection}</div>
				<div>
					<form action="?/study" method="post">
						<button class="btn variant-filled-primary" name="id" value="{collection[0].collection}">Study</button>
					</form>
					</div>
				<div>
					<form action="?/delete_collection" method="post">
						<button class="btn variant-filled-error" name="id" value="{collection[0].id}">Delete collection</button>
					</form>
				</div>
			</div>
			
			<svelte:fragment slot="children">
				{#each collection as move}
				<TreeViewItem>
						<div class="flex flex-row gap-2">
							<button class="h4 basis-full chip variant-soft hover:variant-filled " on:click={() => {board.reset();board.play_moves(move.current_pos);board.draw_board();board.highlight(move.next_moves);}}>Show</button>
							<div>
								<form action="?/delete_move" method="post">
									<button class="btn variant-filled-error" name="id" value="{move.id}">Delete</button>
									 </form>
							</div>
						</div>
				</TreeViewItem>

				{/each}
			</svelte:fragment>
			</TreeViewItem>
		{/each}
		{/if}
	
			
		</TreeView>
	</div>
	
</div>