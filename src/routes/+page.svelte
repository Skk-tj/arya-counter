<script lang="ts">
	import { Button } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { increment } from '$lib';

	let { data }: PageProps = $props();

	let clickedNumber: number = $state(data.counter);

	let finalName: string = $state('');
	let nameWhoClicked: string = $state('');

	let buttonDisabled = $derived(nameWhoClicked === '' || nameWhoClicked === null);

	let audioElement: HTMLAudioElement | undefined = $state();
</script>

<audio src="/cute.mp3" preload="auto" bind:this={audioElement}></audio>

<div class="flex h-screen w-screen items-center justify-start bg-[url(/bg.png)] bg-cover bg-center">
	<div
		class="ml-48 flex h-128 w-128 flex-col items-center justify-center gap-12 rounded-2xl backdrop-blur-lg"
	>
		<div class="flex flex-col items-center gap-4">
			<span class="font-sour-gummy text-3xl">Arya is cute × {clickedNumber}!</span>

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
				class="rounded-2xl {buttonDisabled
					? 'bg-gray-500'
					: 'bg-purple-600'} p-4 font-semibold text-white active:scale-[0.98] active:transition-all"
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
			onclick={async () => {
				audioElement?.load();
				await audioElement?.play();
				clickedNumber += 1;
				const resultValue = await increment();
				if (clickedNumber !== resultValue.counter) {
					throw new Error('Counter mismatch');
				}
			}}
		>
			ARYA IS CUTE
		</Button.Root>
	</div>
</div>
