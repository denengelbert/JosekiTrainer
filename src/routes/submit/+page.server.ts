import moves from '$lib/db/moves';
import {connect, close} from '$lib/db/db';
import { load_sgf } from '$lib/sgf.js';

export function load({ cookies }) {
	// ...
}
//{"move":"","annotation":"","next":[{"move":"pd","annotation":"","next":[[{"move":"qc","annotation":";B[pc];W[qd])","next":[{"move":"pc","annotation":"","next":[[{"move":"qd","annotation":")","next":[]}]]}]},
//{"move":"qf","annotation":";B[nc];W[qd])","next":{}}]]}]}

//(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-25];B[pd];W[qc];B[qd];W[pc];B[od]LB[aa:A];W[nb])
function get_new_moves(joseki: { annotation: string; move: any; end: string; next: string | any[] }, current: string[]): { current_pos: string[]; next_moves: any[]; owner: number; }[] {
  let ret: { current_pos: string[]; next_moves: any[]; owner: number; }[] = [];

  //console.log(joseki.end);
  if (joseki.end == 'yes')
    return [];
//console.log(joseki, 1);
  let cpos = [...current, joseki.move];
  let nxt_mov = (joseki.next as any[]).map((mv)=>{return mv.move});
  if (joseki.annotation == 'LB[aa:A]') {
    ret = [{
        current_pos: cpos,
        next_moves: nxt_mov,
        owner: 1,
    }];
}
  for (let i = 0; i < joseki.next.length; i++)
    ret = ret.concat(get_new_moves(joseki.next[i],cpos));

  return ret;
} 

export const actions = {
	default: async ({ cookies, request }) => {
        const data = await request.formData();
        const joseki = await load_sgf(data.get('sgf') as string);

        console.log(joseki);

        let new_moves = await get_new_moves(joseki, []);
        console.log(JSON.stringify(new_moves));

              

      try {
         await connect();
            const result = await moves.insertMany(new_moves);
             console.log(`${result.insertedCount} documents were inserted`);
      
        } finally {
          await close();    
        }
	}
};