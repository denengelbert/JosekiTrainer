<script lang='ts'>
import "../app.pcss";
import { AppShell } from '@skeletonlabs/skeleton';
import { AppBar } from '@skeletonlabs/skeleton';
import { Avatar } from '@skeletonlabs/skeleton';
import { goto } from '$app/navigation';

import {get_current_user } from '$lib/user_management';

function get_initials(full: string): string {
    return full.split(' ').map((c) => c[0]).join('');
}

</script>


<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header">

        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead"><img alt="Logo" src="favicon.png" style="width: 50px; height: 50px"/></svelte:fragment>
            <h1 class="h1">Joseki Trainer</h1>
            <svelte:fragment slot="trail"><Avatar initials="{get_initials(get_current_user().full)}" background="bg-primary-500" 
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            cursor="cursor-pointer" on:click={()=>{goto('/login')}}/></svelte:fragment>
        </AppBar>

    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <nav class="list-nav">
            <ul>
                <li><button type="button" class="btn variant-filled-primary" style="width: 100%"><a href="/review">Review</a></button></li>
                <li><button type="button" class="btn variant-filled-primary" style="width: 100%"><a href="/submit">Submit</a></button></li>
                <li><button type="button" class="btn variant-filled-primary" style="width: 100%"><a href="/config">Config</a></button></li>
            </ul>
        </nav>
    </svelte:fragment>
    <slot />
    <svelte:fragment slot="pageFooter"><p>(c) Gilles Englebert 2024</p></svelte:fragment>
</AppShell>



