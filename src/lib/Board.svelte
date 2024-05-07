<script lang="ts">
	import {go_board, stone_color, str_to_pair, validPoint} from "$lib/board"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{
		clickedOn: {x:number, y:number, color:stone_color}; 
	}>();
 
    export let disabled = false;
    export let width= 600; 
    export let resolution = width; 
    let id = Math.floor(Math.random()*1000000);

    export let initial_size = 19;
    export let board: go_board = new go_board(initial_size);
    export let turn = board.turn; 
    $: turn = board.turn;
    export let bcaptures: number = 0; 
    $: bcaptures = board.captures[0];
    export let wcaptures: number = 0; 
    $: wcaptures = board.captures[1];



    let cx: number, cy: number;

    export function reset() {
        board = new go_board(board.size);
        draw_board();
    }

    export function undo() {
        board.undo();
        draw_board();
    }

    function get_coordinate(px: number,py:number): number[]{
        var brd = document.getElementById("board"+id);
        if (brd === null)
            return [0,0];
        var rect = brd.getBoundingClientRect();
        let x = 0, y = 0;
        x = (px-rect.left)/(rect.right-rect.left)*board.size;
        y = (py-rect.top)/(rect.bottom-rect.top)*board.size;
        cx = px-rect.left;
        cy = py-rect.top;
        x = Math.floor(x);
        y = Math.floor(y);
        return [x, y];
    }

    function draw_stone(x:number, y:number, col:stone_color, translucent:boolean){
        const stones_canvas = <HTMLCanvasElement> document.getElementById("stones"+id);
        if (stones_canvas === null) {
            console.log("No stones found");
            return;
        }
		const stones_context = stones_canvas.getContext('2d');
        if (stones_context === null) {
            console.log("No stones found");
            return;
        }
        const rect = stones_canvas.getBoundingClientRect();
        let w = (562/600)*resolution;
        //(20, 20) (582, 75), (584, 584)
       // console.log(w);
        stones_context.beginPath();
       // console.log(x*(w/(board.size-1))+100, (y+0.5)*(w/board.size)+10, w/(1.8*board.size));
        stones_context.arc(x*(w/(board.size-1))+19*(resolution/600), y*(w/(board.size-1))+19*(resolution/600),
             w/(2.2*(board.size-1)), 0, 2*Math.PI);

        let alpha = (translucent? 50: 100);
        if (col === stone_color.black)
            stones_context.fillStyle = "rgb(0 0 0 / " + alpha +"%)";
        if (col === stone_color.white)
            stones_context.fillStyle = "rgb(255 255 255 / " + alpha+"%)";
        stones_context.fill();
    }

    export function draw_board(hx: number = -1, hy: number = -1){
        const stones_canvas = <HTMLCanvasElement> document.getElementById("stones"+id);
        if (stones_canvas === null) {
            console.log("No stones found");
            return;
        }
        const stones_context = stones_canvas.getContext('2d');
        const rect = stones_canvas.getBoundingClientRect();
        if (stones_context === null) {
            console.log("No stones found");
            return;
        }
        stones_context.clearRect(0, 0, resolution, resolution);
        for (let x = 0; x < board.size; x++)
            for (let y = 0; y < board.size; y++)
                if (board.state[x][y] != stone_color.empty)
                    draw_stone(x,y, board.state[x][y], false);
        if (hx != -1)
         draw_stone(hx,hy, board.current_turn, true);
    }

    function click_point(event: { clientX: number; clientY: number; }){
        if (disabled)
            return;
        let x, y;
        [x, y] = get_coordinate(event.clientX, event.clientY);
       // console.log(x, y);
        if (board.play_move(x,y)) {
            draw_board(-1, -1);
            click(x,y,board.current_turn);
            board = board; //to update captures
        }
    }

    let old_x = -1, old_y = -1;

    function hover_point(event: { clientX: number; clientY: number; }){
        if (disabled)
            return;
        let x, y;
        [x, y] = get_coordinate(event.clientX, event.clientY);

        if (!validPoint(x, y, board.size))
            return;
        
        if (board.state[x][y] != stone_color.empty)
            return;
        if (x != old_x || y != old_y)
            draw_board(x,y);
        [old_x, old_y] = [x, y];
    }


    export function play_moves(moves: string[]): boolean {

        console.log(moves);
        if (!board.play_moves(moves.map(str_to_pair))) {
            console.log('problem at playing moves');
            return false;
        }
       // console.log('OK');

        draw_board();
        return true;
    }
    export function highlight(moves: [string,string][]): boolean {
        //console.log("highlight", moves);
        let mv:[number,number][] = moves.map( ([a,b])=> {return str_to_pair(a)});
        console.log(mv);
        for (let i =0; i < moves.length;i++) {
            draw_stone(mv[i][0], mv[i][1], board.current_turn, true);
          //  console.log("draw");
        }
        return true;
    }

    function click(x: number, y: number, color: stone_color) {
		dispatch('clickedOn', {
			x: x,
            y: y,
            color: color
		});
	}

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<div class="board_style rounded-lg" id="board{id}" 
on:click={click_point}
on:mousemove={hover_point}
on:mouseleave={() => {draw_board(-1, -1)}}>
<canvas id="stones{id}" class="canvas_style"
width ="{resolution}" height="{resolution}">
</canvas>
</div>


<style> 
    .board_style {
           aspect-ratio: 1;
           background-image: url('board.png'); 
           background-size: 100% 100%;
           position:relative;
    }

    .canvas_style {
        position:absolute;
        width:100%;
        height:100%;
        top:0px;
        left:0px;
    }
</style>