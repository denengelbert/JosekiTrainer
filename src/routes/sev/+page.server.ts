import type {PageServerLoad, Action} from './$types'
import { get_moves, delete_move} from '$lib/db/moves';
import { fetch_scheduled_cards, fetch_cards} from '$lib/db/cards';
import { get_current_user } from '$lib/user_management.js';

export const load: PageServerLoad = async function() {
    try {
        const data = await fetch_scheduled_cards(get_current_user().id);
        console.log(data);
        return {cards: data};
    } catch (err) {
        console.error(`Something went wrong trying to fetch the moves: ${err}\n`);
        return {};
      }
}
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("Need to delete: ", data.get("id"));
        delete_move(Number(data.get("id")));
    }
};