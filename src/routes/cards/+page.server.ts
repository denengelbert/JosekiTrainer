import type {PageServerLoad} from './$types'
import { get_collections, get_moves} from '$lib/db/moves';
import { insert_cards, empty_card} from '$lib/db/cards';
import type {Card} from '$lib/db/cards';
import { get_current_user } from '$lib/user_management';

export const load: PageServerLoad = async function() {
    try {
        const data = await get_collections(get_current_user().id);

        return {collections: data};
    } catch (err) {
        console.error(`Something went wrong trying to fetch the collections: ${err}\n`);
        return {};
      }
}

export const actions = {
	default: async function ({ request }) {
        const data = await request.formData();
        const collection = String(data.get('id'));
        console.log(collection);

        const moves = await get_moves(get_current_user().id, 100, collection);
        let cards: Array<Card> = [];
        for (let i = 0; i < moves.length; i++)
            cards.push(empty_card(get_current_user().id, moves[i], 'next_move', collection));
        insert_cards(cards);
    }
};