import db from '$lib/db/db'

export interface Move {
    id: number,
    owner: number, 
    current_pos: Array<string>, 
    final_pos: Array<string>, 
    next_moves: Array<[string, string]>
    collection: string,
}

export const empty_Move = (): Move => ({
  id: -1,
  owner: -1,
  current_pos: [], 
  final_pos: [], 
  next_moves: [],
  collection: 'default',
});
const moves_db = db.collection<Move>('moves')
export default moves_db

export async function get_moves(owner:number, count:number = 100): Promise<Move[]> {
    let moves = null;
    try {
        moves = await moves_db.find({owner: owner},  { projection: {
            _id: 0,
            id: 1,
            owner: 1,
            current_pos: 1, 
            final_pos: 1,
            next_moves: 1,
            collection: 1,
        }}).toArray();
      } catch(err) {
        console.log("Could not fetch existing Joseki: ", err);
      } 
      if (moves === null)
        return [];
      else
        return moves;
}
export async function insert_move(owner:number, move:Move) {
   insert_moves(owner, [move]);
}
export async function insert_moves(owner:number, moves:Move[]) {
    try {
        const ids = await moves_db.find({},  { projection: {
            _id: 0,
            id: 1,
        }}).toArray();
        const max_id = Math.max(0, 1+Math.max(...ids.map((id) => {return id.id;})));
        for (let i = 0; i < moves.length; i++) {
            moves[i].id = max_id+i;
            moves[i].owner = owner;
        }
        
        const result = await moves_db.insertMany(moves);
        console.log(`${result.insertedCount} move inserted`);
      } catch(err) {
        console.log("Could not insert moves successfully: ", err);
      }  
}
export async function delete_move( move_id:number) {
    try {
          const query = { id: move_id};
          const result =  await moves_db.deleteOne(query);

         if (result && result.deletedCount) {
          console.log(`Successfully removed move with id ${move_id}`);
        } else if (!result) {
          console.log(`Failed to remove move with id ${move_id}`);
        } else if (!result.deletedCount) {
          console.log(`Move with id ${move_id} does not exist`);
      }
     } catch(err) {
        console.log("Could not delete move ${move_id} successfully: ", err);
      }  
}