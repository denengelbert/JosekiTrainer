import { redirect } from '@sveltejs/kit';
 
export function load() {
  // ...
  redirect(302, '/review'); // needs `throw` in v1
}

