import {login_user, get_current_user} from '$lib/db/users'

export function load({ cookies }) {
	// ...
}

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		let user = String(data.get('uname'));
        let pw = String(data.get('pw'));
        if (user === null || pw === null)
            throw 'something went wrong'
        if (login_user(user, pw)) {
            let usr = get_current_user();
            cookies.set('user_id', String(usr.id), {path: '/'});
            cookies.set('user_name', String(usr.user), {path: '/'});
            cookies.set('full_name', String(usr.full), {path: '/'});
            console.log('successfully logged in')
        }
	},

	register: async ({ cookies, request }) => {
		const data = await request.formData();
	}
};