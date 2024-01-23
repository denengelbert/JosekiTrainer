<script lang="ts">
	let turn = 1;
	let lib = 0;
	let back_color = "Transparent";
	let stone_col:string[] = ["black", "white"];

	let w_captures:number = 0;
	let b_captures:number = 0;
	let col:string[][] = [...Array(19)].map(e => Array(19).fill(back_color));	
	let board:string[][] = col;

	let star_points = [3, 9, 15];

	function dfs(sx:number, sy:number, oc: string, nc:string, nb:string) {
		if (sx < 0 || sx > 18 || sy < 0 || sy > 18)
			return;
		if (oc === nc) {
			console.log("Same color in DFS");
			return;
		}
		if (board[sx][sy] != oc) {
			if (board[sx][sy] === back_color)
				board[sx][sy] = nb;

			return;
		}

		board[sx][sy] = nc;
		
		dfs(sx+1, sy, oc, nc, nb);	
		dfs(sx-1, sy, oc, nc, nb);
		dfs(sx, sy+1, oc, nc, nb);
		dfs(sx, sy-1, oc, nc, nb);	
	}

	function liberties(sx:number, sy:number):number {
		board = JSON.parse(JSON.stringify(col));
		dfs(sx, sy, board[sx][sy], "green", "red");

		let libs = 0;
		for (let x=0; x < 19; x++)
			for (let y=0; y < 19; y++)
				libs += (board[x][y] === "red"? 1: 0);

		return libs;
	}

	function click_intersection(x:number, y:number){
		if (col[x][y] === stone_col[0] || col[x][y] === stone_col[1])
			return;

		col[x][y] = stone_col[(turn+1)%2];
		if (liberties(x,y) != 0) {
			turn += 1;
			return;
		}
		

	}

	function reset(){
		col = [...Array(19)].map(e => Array(19).fill(back_color));
		turn = 1;
	}
</script>


<p>This is the review page</p>
<p>Turn {turn}. </p>
<p>Current liberties {lib}. </p>
<div class="board">
{#each [...Array(19).keys()] as x}
	{#each [...Array(19).keys()] as y}
		<button	class="intersection"
		
		 style="border:{col[x][y] === back_color? "hidden": "hidden"}; border-radius: 50%; background: {col[x][y]}"
		on:click={() => click_intersection(x, y)} 
		on:mouseover={() => lib = liberties( x, y)}
		on:focus={() => lib = liberties(x, y)}
		>.</button>
	{/each}
	<br>
{/each}
</div>

<button
on:click={reset}>
Reset
</button>

<style> 
.board {
	aspect-ratio: 1;
   	max-width:600px;
   	background-image: url('board.png'); 
   	background-size: 100% 100%;
   	padding-left: 0.666%;
}
.intersection{
	color: transparent;
	aspect-ratio: 1;
	padding: 2.00% 2.294%;
	background: var(--color, {back_color} );
}
</style>