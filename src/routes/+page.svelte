<script lang="ts">
	import { Button } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { getCount, getCounterByPerson, increment, incrementByPerson } from '$lib';
	import NumberFlow from '@number-flow/svelte';
	import { onDestroy, onMount } from 'svelte';

	let { data }: PageProps = $props();

	let clickedNumber: number = $state(data.counter);
	let finalName: string = $state('');
	let nameWhoClicked: string = $state('');
	let isNameEmpty = $derived(nameWhoClicked === '' || nameWhoClicked === null);
	let audioElement: HTMLAudioElement | undefined = $state();
	let userClicked: number | null = $state(null);

	let debouncedCounter = 0;
	let debouncedPersonNameCounter = 0;
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
	let debouncedPersonNameCounterTimeout: ReturnType<typeof setTimeout> | null = null;

	let getCountDelay: ReturnType<typeof setInterval> | null = null;

	onMount(async () => {
		getCountDelay = setInterval(async () => {
			console.log('Fetching count');
			const countString = await getCount();
			clickedNumber = parseInt(countString);
		}, 30000);
	});

	onDestroy(() => {
		if (getCountDelay) {
			clearInterval(getCountDelay);
		}
	});

	async function debouncedIncrementCounter() {
		debouncedCounter++;

		// Clear the previous timeout if it exists
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		// Set a new timeout to update the remote storage after 500ms
		debounceTimeout = setTimeout(async () => {
			await increment(debouncedCounter);
			debouncedCounter = 0; // Reset the click count after updating
		}, 500);
	}

	async function debouncedIncrementByPerson() {
		debouncedPersonNameCounter++;

		// Clear the previous timeout if it exists
		if (debouncedPersonNameCounterTimeout) {
			clearTimeout(debouncedPersonNameCounterTimeout);
		}

		// Set a new timeout to update the remote storage after 500ms
		debouncedPersonNameCounterTimeout = setTimeout(async () => {
			await incrementByPerson(finalName, debouncedPersonNameCounter);
			debouncedPersonNameCounter = 0; // Reset the click count after updating
		}, 500);
	}
</script>

<audio src="/cute.mp3" preload="auto" bind:this={audioElement}></audio>

<div class="flex h-screen w-screen items-center justify-start bg-[url(/bg.png)] bg-cover bg-center">
	<div
		class="mx-auto flex h-128 w-128 flex-col items-center justify-center gap-12 rounded-2xl backdrop-blur-lg xl:ml-48"
	>
		<div class="flex flex-col items-center gap-4">
			<NumberFlow value={clickedNumber} prefix="Arya is cute ×" trend={+1}></NumberFlow>

			{#if finalName !== ''}
				<span transition:fade class="font-sour-gummy text-sm">Entered name: {finalName}</span>
			{/if}

			{#if userClicked !== null}
				<span transition:fade class="font-sour-gummy text-sm"
					>You've said "Arya is cute" {userClicked} times!</span
				>
			{/if}
		</div>

		<div class="flex items-center gap-4 p-0.5">
			<input
				type="text"
				bind:value={nameWhoClicked}
				class="flex-1 rounded-2xl bg-purple-600 p-4 text-white"
				placeholder="Type your name (optional)"
				spellcheck="false"
			/>

			<Button.Root
				class="rounded-2xl {isNameEmpty
					? 'bg-gray-500'
					: 'bg-purple-600'} p-4 font-semibold text-white active:scale-[0.98] active:transition-all"
				onclick={async () => {
					finalName = nameWhoClicked;
					userClicked = await getCounterByPerson(finalName);
				}}
				disabled={isNameEmpty}
			>
				Apply Name
			</Button.Root>
		</div>

		<Button.Root
			class="w-80 rounded-2xl bg-purple-600 p-4 font-semibold text-white active:scale-[0.98] active:transition-all"
			onclick={async () => {
				clickedNumber += 1;

				const incrementResult = debouncedIncrementCounter();
				const promises: Promise<unknown>[] = [incrementResult];

				if (!isNameEmpty && userClicked !== null) {
					userClicked += 1;
					const byPerson = debouncedIncrementByPerson();
					promises.push(byPerson);
				}

				if (audioElement) {
					audioElement.load();
					audioElement.play();
				}

				await Promise.all(promises);
			}}
		>
			ARYA IS CUTE
		</Button.Root>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	@reference '../app.css';

	:global(number-flow-svelte::part(prefix)) {
		@apply font-sour-gummy text-2xl;
	}

	:global(number-flow-svelte::part(number)) {
		@apply font-sour-gummy text-4xl;
	}
</style>
