
import moves from '$lib/db/moves';
import {connect, close} from '$lib/db/db';
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async function() {
    await connect();
    try {
        const data = await moves.find({owner: 1},  {limit: 50, projection: {
            _id: 0,
            current_pos: 1,
            next_moves: 2
        }}).toArray();
        close();
        console.log(data);
        return {moves: data};
    } catch (err) {
        close();
        console.error(`Something went wrong trying to find one document: ${err}\n`);
        return {};
      }
}