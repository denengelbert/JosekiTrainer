import type {PageServerLoad} from './$types'
import { get_moves, delete_move} from '$lib/db/moves';

export const load: PageServerLoad = async function() {
    try {
        const data = await get_moves(1, 5);
        console.log(data);
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
        delete_move(Number(data.get("id")));
    }
};