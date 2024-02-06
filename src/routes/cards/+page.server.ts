import type {PageServerLoad} from './$types'
import { get_collections} from '$lib/db/moves';
import { insert_cards } from '$lib/db/cards';
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
	default: async ({ cookies, request }) => {
        const data = await request.formData();
        
    }
};