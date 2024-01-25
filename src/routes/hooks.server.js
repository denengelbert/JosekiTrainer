import {run} from '$lib/db/db';

run().then(() => {
	console.log('Mongo  started up');
}).catch(e => {console.error(e)})
console.log(123)