<script lang="ts">
	import { incrementForUser } from '$lib';
	import '../app.css';
	import { Button } from 'bits-ui';
	import { fade } from 'svelte/transition';

	let clickedNumber: number = $state(0);

	let finalName: string = $state('');
	let nameWhoClicked: string = $state('');

	let time = $derived(clickedNumber === 1 ? 'time' : 'times');
	let buttonDisabled = $derived(nameWhoClicked === '');
</script>

<div class="flex h-screen w-screen items-center justify-start bg-[url(/bg.png)] bg-cover bg-center">
	<div
		class="ml-48 flex h-128 w-128 flex-col items-center justify-center gap-12 rounded-2xl backdrop-blur-lg"
	>
		<div class="flex flex-col items-center gap-4">
			<span class="font-sour-gummy text-3xl">You clicked {clickedNumber} {time}!</span>

			{#if finalName !== ''}
				<span transition:fade class="font-sour-gummy text-sm">Entered name: {finalName}</span>
			{/if}
		</div>

		<div class="flex items-center gap-4 p-2">
			<input
				type="text"
				bind:value={nameWhoClicked}
				class="rounded-2xl bg-purple-600 p-4 text-white"
				placeholder="Type your name (optional)"
				spellcheck="false"
			/>

			<Button.Root
				class="rounded-2xl bg-purple-600 p-4 font-semibold text-white active:scale-[0.98] active:transition-all"
				onclick={() => {
					finalName = nameWhoClicked;
				}}
				disabled={buttonDisabled}
			>
				Apply Name
			</Button.Root>
		</div>

		<Button.Root
			class="w-80 rounded-2xl bg-purple-600 p-4 font-semibold text-white active:scale-[0.98] active:transition-all"
			onclick={() => {
				clickedNumber += 1;
				if (finalName !== '') {
					incrementForUser(finalName);
				}
			}}
		>
			CLICK
		</Button.Root>
	</div>
</div>
