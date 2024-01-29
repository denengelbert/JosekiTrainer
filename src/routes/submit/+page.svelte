<script lang="ts">
import { FileDropzone } from '@skeletonlabs/skeleton';

let sgf;

function onChangeHandler(e: Event): void {
	console.log('file data:', e);
}
	
</script>


<div class="card p-4">
	<form method="POST">
		<label>
			Upload a Joseki
			<input
				name="sgf"
				autocomplete="off"    
			/>
		</label>
	</form>
	Hit <kbd class="kbd">Enter</kbd> to submit.
</div>

<div class="card p-4">
	<FileDropzone name="sgf_file" on:change={onChangeHandler}>
		<svelte:fragment slot="message"><b>Upload</b> a Joseki</svelte:fragment>
		<svelte:fragment slot="meta">Only .SGF allowed</svelte:fragment>
	</FileDropzone>
</div>


