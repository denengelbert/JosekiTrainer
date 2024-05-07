import type {PageServerLoad, Action} from './$types'
import { delete_card, fetch_card_by_id, srs_algorithm, update_card} from '$lib/db/cards';
import { fetch_scheduled_cards, fetch_cards} from '$lib/db/cards';
import { get_current_user } from '$lib/user_management.js';
import type { RecordLog } from 'ts-fsrs';
import { Rating } from 'ts-fsrs';
import { copyFileSync } from 'fs';

export const load: PageServerLoad = async function( event ) {
    try {
        const data = await fetch_scheduled_cards(get_current_user().id);
        let ret = data;
        //console.log(data);
        if (event.locals.noshow != null) {
            console.log("dont show card ", event.locals.noshow);
            ret = data.filter((element) => {
                return element.id != event.locals.noshow;
              });
        }
        return {cards: ret};
    } catch (err) {
        console.error(`Something went wrong trying to fetch the moves: ${err}\n`);
        return {};
      }
}
/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("Need to delete: ", data.get("id"));
        delete_card(Number(data.get("id")));
    }, 
    repeat: async (event) => {
        const data = await event.request.formData();
        const card_id = Number(data.get("id"));
        const level = Number(data.get("level"));

        const current_card = await fetch_card_by_id(card_id);

        const new_cards: RecordLog = srs_algorithm.repeat(current_card.srs, Date());
        console.log(level)
        console.log(new_cards[level].card);
        update_card(card_id, new_cards[level].card);
        event.locals.noshow = card_id;
    }
};