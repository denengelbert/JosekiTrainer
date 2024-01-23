<script>
	// @ts-ignore
	import Board from "$lib/Board.svelte";


	export let data;
	/**
     * @type {{ reset: () => any; }}
     */
	let board;
	/**
     * @type {any}
     */
	let turn;

	/**
     * @type {any}
     */
	let bcaptures;

	/**
     * @type {any}
     */
	 let wcaptures;

</script>
 

<p>This is the review page. It is currenty turn {turn} </p>
<p>Black captures: {bcaptures}   White captures: {wcaptures}</p>
<p>Loaded data: {JSON.stringify(data)}
</p>
<button on:click={() => board.reset()}>Reset</button>
<Board bind:turn={turn} bind:bcaptures={bcaptures}
bind:wcaptures={wcaptures}
		bind:this={board}/>






