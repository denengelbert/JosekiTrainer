
import moves from '$lib/db/moves';
import {connect, close} from '$lib/db/db';
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async function() {
    await connect();
    try {
        const data = await moves.find({owner: 1},  {limit: 5, projection: {
            _id: 0,
            current_pos: 1,
            next_moves: 2,
            id: 3,
        }}).toArray();
        //console.log(data);
        return {moves: data};
    } catch (err) {
        console.error(`Something went wrong trying to fetch the moves: ${err}\n`);
        return {};
      }
}

export const actions = {
	default: async ({ cookies, request }) => {
        const data = await request.formData();

        console.log("Need to delete: ", data.get("id"));


      try {
        await connect();
          const query = { id: Number(data.get("id"))};
          const result =  await moves.deleteOne(query);

         if (result && result.deletedCount) {
          console.log(`Successfully removed move with id ${data.get("id")}`);
      } else if (!result) {
          console.log(`Failed to remove move with id ${data.get("id")}`);
      } else if (!result.deletedCount) {
          console.log(`Move with id ${data.get("id")} does not exist`);
      }
      
        } finally {
        }
	}
};