<script lang="ts">
	import {go_board, stone_color} from "$lib/board"

    export let initial_size = 19;
    export let board: go_board = new go_board(initial_size);
    export let turn = board.turn; 
    $: turn = board.turn;
    export let bcaptures: number = 0; 
    $: bcaptures = board.captures[0];
    export let wcaptures: number = 0; 
    $: wcaptures = board.captures[1];

    export function reset() {
        board = new go_board(board.size);
    }
</script>

<div class="board_style">
    {#each [...Array(initial_size).keys()] as x}
        {#each [...Array(initial_size).keys()] as y}
            <button	class="intersection"
            
             style="border: hidden; 
             border-radius: 50%; background: {board.state[x][y]}"
            on:click={()=> {board.play_move(x,y); board = board;}} 
            >.</button>
        {/each}
        <br> 
    {/each}
</div>
    
<style> 
    .board_style {
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
        background: var(--color, blue );
    }
</style>