export enum stone_color {
    empty = "transparent",
    black = "black",
    white = "white",
    current = "cur",
    neighbouring = "nb"
};

function col_to_int( color:stone_color) {
    if (color === stone_color.black)
        return 0;
    if (color === stone_color.white)
        return 1;
    return 2;
}



export class go_board {
    turn : number = 1;
    size: number = 19;
    state: stone_color[][];
    private tmp_state: stone_color[][];
    captures: number[] = [0,0];
    komi: number = 6.5;

    current_turn: stone_color = stone_color.black;
    next_turn: stone_color = stone_color.white;

    history: number[] = [0];
    zobrist: number[][][];

    hash(): number{
        let res = 0;
        for (let i=0; i < this.size; i++)
            for (let j=0; j < this.size; j++) {
                if (this.state[i][j] != stone_color.empty)
                    res ^= this.zobrist[col_to_int(this.state[i][j])][i][j];  
            }
            
        return res ^ col_to_int(this.current_turn); //need for positional superko
    }

    group_at(x:number, y:number): number[][] {
        this.tmp_state = JSON.parse(JSON.stringify(this.state));
		this.dfs(x, y, this.state[x][y], stone_color.current, stone_color.neighbouring);
        let group:number[][] = [];
        for (let i=0; i < this.size; i++)
			for (let j=0; j < this.size; j++)
                if (this.tmp_state[i][j] === stone_color.current)
                    group.push([i,j]);
        return group;
    }

    remove(pts: number[][]): void {
        for (let i = 0; i < pts.length; i++) {
            this.state[pts[i][0]][pts[i][1]] = stone_color.empty;
        }
    }

    liberties_at(x:number, y:number): number {
        this.tmp_state = JSON.parse(JSON.stringify(this.state));
		this.dfs(x, y, this.state[x][y], stone_color.current, stone_color.neighbouring);

		let libs = 0;
		for (let i=0; i < this.size; i++)
			for (let j=0; j < this.size; j++)
				libs += (this.tmp_state[i][j] === stone_color.neighbouring? 1: 0);
		return libs;
    }

    play_move(x:number, y:number): boolean {
        console.log(x,y);
        if (this.state[x][y] === stone_color.black || this.state[x][y] === stone_color.white)
            return false;
        let tmp_board = new go_board(this.size);
        tmp_board.state = JSON.parse(JSON.stringify(this.state));
        tmp_board.zobrist = this.zobrist;

        tmp_board.state[x][y] = this.current_turn;

        let to_be_removed:number[][] = [];
        if ((x < this.size-1))
            if ((tmp_board.state[x+1][y] === this.next_turn)
             && tmp_board.liberties_at(x+1,y)=== 0)
                to_be_removed = to_be_removed.concat(tmp_board.group_at(x+1,y));
        if ((x > 0))
            if ( (tmp_board.state[x-1][y] === this.next_turn)
                && tmp_board.liberties_at(x-1,y)=== 0)
                to_be_removed = to_be_removed.concat(tmp_board.group_at(x-1,y));
        if ((y < this.size-1))
            if ( (tmp_board.state[x][y+1] === this.next_turn)
                && tmp_board.liberties_at(x,y+1)=== 0)
                to_be_removed = to_be_removed.concat(tmp_board.group_at(x,y+1));
        if ((y > 0))
            if ( (tmp_board.state[x][y-1] === this.next_turn)
                && tmp_board.liberties_at(x,y-1) === 0)
                to_be_removed = to_be_removed.concat(tmp_board.group_at(x,y-1));

        tmp_board.remove(to_be_removed);
        if (tmp_board.liberties_at(x, y) === 0) {
            console.log("Illegal move: Suicide");
            return false;
        }
        tmp_board.current_turn = this.next_turn;
        if (this.history.indexOf(tmp_board.hash()) != -1){
            console.log("Illegal move: Superko");
            return false;
        }

        this.remove(to_be_removed);
        this.captures[col_to_int(this.current_turn)] = this.captures[col_to_int(this.current_turn)]+ to_be_removed.length;

        this.state[x][y] = this.current_turn;
        this.turn += 1;
        this.current_turn = (this.turn%2 === 0? stone_color.white: stone_color.black);
        this.next_turn = ((this.turn+1)%2 === 0? stone_color.white: stone_color.black);
        this.history = [... this.history, this.hash()];

        //console.log(this.hash());

        return true;
    }

    play_moves(moves: number[][]): boolean {
        for (let i = 0; i < moves.length; i++) {
            if (!this.play_move(moves[i][0], moves[i][1]))
                return false;
        }
        return true;
    }

    dfs(sx: number, sy: number, oc: stone_color, nc:stone_color, nb:stone_color): void {
		if (sx < 0 || sx >=this.size|| sy < 0 || sy > this.size)
			return;
		if (oc === nc) {
			console.log("Same color in DFS");
			return;
		}
		if (this.tmp_state[sx][sy] != oc) {
			if (this.tmp_state[sx][sy] === stone_color.empty)
				this.tmp_state[sx][sy] = nb;

			return;
		}
		this.tmp_state[sx][sy] = nc;
		
		this.dfs(sx+1, sy, oc, nc, nb);	
		this.dfs(sx-1, sy, oc, nc, nb);
		this.dfs(sx, sy+1, oc, nc, nb);
		this.dfs(sx, sy-1, oc, nc, nb);	
	}


    constructor(size_init = 19){
        this.size = size_init;
        this.state = [];
        this.tmp_state = [];

        this.zobrist = [new Array(this.size), new Array(this.size),new Array(this.size)];

        for (let x = 0; x < this.size; x++) {
            this.state[x] = [];
            this.tmp_state[x] = []; 
            this.zobrist[0][x]= new Array(this.size);
            this.zobrist[1][x]= new Array(this.size);
            this.zobrist[2][x]= new Array(this.size);
            for (let y = 0; y < this.size; y++) {
                this.state[x][y] = this.tmp_state[x][y] = stone_color.empty;
                
                this.zobrist[0][x][y] = Math.floor(Math.random() * (1 << 30));
                this.zobrist[1][x][y] = Math.floor(Math.random() * (1 << 30));
                this.zobrist[2][x][y]= 0;
            }

        }
    }
}

