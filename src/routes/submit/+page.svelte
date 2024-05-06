<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import {load_sgf} from "$lib/sgf"
	import type { PageData } from './$types';
	
	/** @type {import('./$types').PageData} */
	export let data: PageData;
	
	console.log(data);
	
	let feedback: string;
	let files: FileList;
	let joseki: any;
	
	let message = "<b>Upload</b> a Joseki";
	let sub_message = "Only .SGF allowed";
	
	async function onChangeHandler(e: Event): Promise<void> {
		let title = files[0].name;
		let size = files[0].size;
		let content = await files[0].text();
	
		if (!title.endsWith(".sgf")) {
			message = "Not an SGF file!";
			throw "Not SGF";
		} else if (size > 50000) {
			message = "File size > 50kb";
			throw "Too big";
		} else {
			try {
				joseki = load_sgf(content);
			} catch(err) {
				throw err;
			}
			feedback = "SGF parsed successfully! Found " + joseki.length + " Joseki ";
		}
	}
	</script>
	
	

	
	<form method="POST" action="?/add">
	<div class="card p-4">
		{#if !feedback}
		<FileDropzone name="sgf_file" on:change={onChangeHandler} bind:files={files}>
			<svelte:fragment slot="message">
				{@html message}</svelte:fragment>
			<svelte:fragment slot="meta">{@html  sub_message}</svelte:fragment>
		</FileDropzone>
		{/if}
		{#if feedback && joseki}
			{feedback}
			<input
			name="collection"/>
			<button class="btn variant-filled-primary">Submit</button>
			<input
					name="sgf"
					value="{JSON.stringify(joseki)}"
					style="visibility:hidden" 
				/>

		{/if}
	
	</div>
	</form>
	<!--
	<div class="card p-4">
		<form method="POST" action="?/parse">
			<label>
				Upload a Joseki
				<input
					name="sgf"
					autocomplete="off"    
				/>
			</label>
			<button class="btn variant-filled-primary">Submit</button>
		</form>
	</div>
	-->
	
	