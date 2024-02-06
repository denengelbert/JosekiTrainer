import db from '$lib/db/db'

let user_collection = db.collection('login')

export function login_user(username:string, pass:string):boolean {
    if (username == 'gilles' && pass === '123')
        return true;
    return false;
}

export function logout_user(userid:number):boolean {
    if (userid === 1)
        return true;
    return false;
}
export function get_current_user(): {id: number, user:string, full:string} {
    return {id: 1, user:'gilles', full:'Gilles Englebert'};
}
