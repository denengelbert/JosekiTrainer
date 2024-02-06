import {connect,close} from '$lib/db/db';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  await connect();
  const response = await resolve(event);
  return response;
}