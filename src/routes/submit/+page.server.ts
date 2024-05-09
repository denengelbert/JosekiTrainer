import {insert_moves, get_moves, empty_Move} from '$lib/db/moves';
import type {Move} from '$lib/db/moves'
import { load_sgf, empty_sgf_node } from '$lib/sgf.js';
import type { sgf_node } from '$lib/sgf.js';
import { get_current_user } from '$lib/user_management.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies}) {
	const user = cookies.get('sessionid');
}
//{"move":"","annotation":"","next":[{"move":"pd","annotation":"","next":[[{"move":"qc","annotation":";B[pc];W[qd])","next":[{"move":"pc","annotation":"","next":[[{"move":"qd","annotation":")","next":[]}]]}]},
//{"move":"qf","annotation":";B[nc];W[qd])","next":{}}]]}]}

//(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-25];B[pd];W[qc];B[qd];W[pc];B[od]LB[aa:A];W[nb])
function get_new_moves(sgf: sgf_node[], current:string[] = []): Move[] {
  let ret: Move[] = [];
  let current_node: sgf_node = sgf[0];
  //console.log(sgf);
  for (let i =0; i < sgf.length; i++) {
    current_node = sgf[i];
    //console.log(joseki)
    if (current_node.end == 'yes')
      break;
    let cpos = [...current, current_node.move];
    let nxt_mov = (current_node.next as sgf_node[]).map((mv)=>{return [mv.move, 'No idea'] as [string, string]});
    if (current_node.annotation.includes('aa:A')) {
      const cur = empty_Move();
      cur.current_pos = cpos;
      cur.next_moves= nxt_mov;
      ret = [cur];
    }
    ret = ret.concat(get_new_moves(current_node.next, cpos))
  }
  return ret;
} 

/** @type {import('./$types').Actions} */
export const actions = {
	parse: async ({ cookies, request }) => {
        const data = await request.formData();
        let joseki;
        try {
          joseki = load_sgf(data.get('sgf') as string);
        } catch(err) {
          console.log("Could not parse SGF", err);
          return;
        }

/* try {
          await connect();
          const ids = await moves.find({owner: 1},  { projection: {
              _id: 0,
              id: 1,
          }}).toArray();
          let new_moves: any;
          try { 
           new_moves = get_new_moves(joseki, [], Math.max(0, 1+Math.max(...ids.map((id) => {return id.id;}))));
          } catch(err) {
            console.log("Could not parse SGF into Joseki: ", err);
            return;
          }

          const result = await moves.insertMany(new_moves);
          console.log(`${result.insertedCount} moves inserted`);
        } catch(err) {
          console.log("Could not fetch existing Joseki: ", err);
        }  */
      },
  add: async ({ cookies, request }) => {
          const data = await request.formData();
          let sgf:sgf_node[] = await JSON.parse(data.get('sgf') as string);
          let collection:string = await (data.get('collection') as string);
          console.log(collection);
          let moves: Move[] = get_new_moves(sgf);
          console.log("New moves");
          console.log(moves);
          insert_moves(get_current_user().id, moves, collection);
	}
};