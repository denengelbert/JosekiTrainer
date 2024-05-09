import type {PageServerLoad, Action} from './$types'
import type { Card } from '$lib/db/cards'
import { insert_cards, empty_card  } from '$lib/db/cards'
import { get_moves, delete_move, delete_collection, type Move} from '$lib/db/moves';
import { get_current_user } from '$lib/user_management';

export const load: PageServerLoad = async function() {
    try {
        const moves = await get_moves(get_current_user().id);
        const sortedMoves: Move[] = moves.sort((x:Move,y:Move) => {
            if (x.collection > y.collection)
                return 1;
           else if (x.collection < y.collection) 
                return -1;
            else return 0;
        });
        if (sortedMoves.length == 0)
            return {collections: {}, moves: {} };
        let data: Move[][]= [[sortedMoves[0]]];
        let cur = 0;
        for (let i=1; i<sortedMoves.length; i++) {
            if (sortedMoves[i].collection != sortedMoves[i-1].collection) {
                cur++;
                data.push([]);
            }
            data[cur].push(sortedMoves[i]);   
        }
        console.log(data);

        return {collections: data, moves: sortedMoves};
    } catch (err) {
        console.error(`Something went wrong trying to fetch the moves: ${err}\n`);
        return {};
      }
}
/** @type {import('./$types').Actions} */
export const actions = {
	delete_move: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("Need to delete: ", data.get("id"));
        delete_move(Number(data.get("id")));
    },
    delete_collection: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("Need to delete collection: ", data.get("collection"));
        delete_collection(String(data.get("collection")));
    },
    study: async function ({ request }) {
        const data = await request.formData();
        const collection:string = String(data.get('id'));
        console.log(collection);

        const moves = await get_moves(get_current_user().id, 100, collection);
        let cards: Array<Card> = [];
        for (let i = 0; i < moves.length; i++)
            cards.push(empty_card(get_current_user().id, moves[i], 'next_move', collection));
        insert_cards(cards);
    }
};