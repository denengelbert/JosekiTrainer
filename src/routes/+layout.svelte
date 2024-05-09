<script lang='ts'>
import "../app.pcss";
import { page } from '$app/stores';
import { AppShell } from '@skeletonlabs/skeleton';
import { AppBar } from '@skeletonlabs/skeleton';
import { Avatar } from '@skeletonlabs/skeleton';
import { goto } from '$app/navigation';
import { LightSwitch } from '@skeletonlabs/skeleton';
import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
import {get_current_user } from '$lib/user_management';

function get_initials(full: string): string {
    return full.split(' ').map((c) => c[0]).join('');
}
let currentTile: number = 0;

</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="header">

        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead"><img alt="Logo" src="favicon.png" style="width: 50px; height: 50px"/></svelte:fragment>
            <div class="flex items-center gap-4">
                <h2 class="h2">GoTrainer </h2>
                
                <TabGroup 
                justify="justify-center"
                active="variant-filled-primary"
                hover="hover:variant-soft-primary"
                flex="flex-1 lg:flex-none"
                rounded=""
                border=""
                class="bg-surface-100-800-token w-full">
                <TabAnchor href="/review" selected={$page.url.pathname === '/review'}>
                    <span>Review</span>
                </TabAnchor>
                <TabAnchor href="/study" selected={$page.url.pathname === '/study'}>
                    <span>Study</span>
                </TabAnchor>
                <TabAnchor href="/submit" selected={$page.url.pathname === '/submit'}>
                    <span>Add</span>
                </TabAnchor>
                
        <!-- <TabAnchor href="/cards" selected={$page.url.pathname === '/cards'}>
                    <span>Cards</span>
                </TabAnchor>-->
                 </TabGroup>
            </div>
            
            <svelte:fragment slot="trail"><Avatar initials="{get_initials(get_current_user().full)}" background="bg-primary-500" 
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            cursor="cursor-pointer" on:click={()=>{goto('/login')}}/>
            <LightSwitch /></svelte:fragment>
        </AppBar>

    </svelte:fragment>
    <slot />
    
    <svelte:fragment slot="pageFooter"><p class="centered">(c) Gilles Englebert 2024</p></svelte:fragment>
</AppShell>



