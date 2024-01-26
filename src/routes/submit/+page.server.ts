import moves from '$lib/db/moves';
import {connect, close} from '$lib/db/db';
import { load_sgf } from '$lib/sgf.js';

export function load({ cookies }) {
	// ...
}
//{"move":"","annotation":"","next":[{"move":"pd","annotation":"","next":[[{"move":"qc","annotation":";B[pc];W[qd])","next":[{"move":"pc","annotation":"","next":[[{"move":"qd","annotation":")","next":[]}]]}]},
//{"move":"qf","annotation":";B[nc];W[qd])","next":{}}]]}]}

//(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-25];B[pd];W[qc];B[qd];W[pc];B[od]LB[aa:A];W[nb])
function get_new_moves(joseki: { annotation: string; move: any; end: string; next: string | any[] }, current: string[] = [], min_id: number): { current_pos: string[]; next_moves: any[]; owner: number; id:number}[] {
  let ret: { current_pos: string[]; next_moves: any[]; owner: number; id: number}[] = [];

  //console.log(joseki.end);
  if (joseki.end == 'yes')
    return [];
  let cpos = [...current, joseki.move];
  let nxt_mov = (joseki.next as any[]).map((mv)=>{return mv.move});
  if (joseki.annotation.includes('LB[aa:A]')) {
    ret = [{
        current_pos: cpos,
        next_moves: nxt_mov,
        owner: 1,
        id: min_id,
    }];
}
  for (let i = 0; i < joseki.next.length; i++) {
    ret = ret.concat(get_new_moves(joseki.next[i],cpos, min_id+ret.length));
  }

  return ret;
} 

export const actions = {
	default: async ({ cookies, request }) => {
        const data = await request.formData();
        const joseki = load_sgf(data.get('sgf') as string);
;

        try {
          await connect();
          const ids = await moves.find({owner: 1},  { projection: {
              _id: 0,
              id: 1,
          }}).toArray();

          let new_moves = get_new_moves(joseki, [], 1+Math.max(...ids.map((id) => {return id.id;})));

          const result = await moves.insertMany(new_moves);
          console.log(`${result.insertedCount} moves inserted`);
        } catch(err) {
          console.log("Could not fetch existing Joseki: ", err);
        }  finally {
          await close();    
        }
	}
};