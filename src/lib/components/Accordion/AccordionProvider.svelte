<script lang="ts">
	import * as constants from './constants';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import shortid from 'shortid';
	import type { LexiAccordionContext, LexiAccordionItemsRecord } from './types';

	const accordionItems = writable<LexiAccordionItemsRecord>({});
	let activeAccordionItemId = "";
	const registerAccordionItem = (isExpanded: boolean) => {
		const id = shortid.generate();
		accordionItems.update((context) => {
			context[id] = { id, isExpanded };
			return context;
		});
		return id;
	};

	const unregisterAccordionItem = (id: string) => {
		accordionItems.update((context) => {
			delete context[id];
			return context;
		});
	};

	const getItemById = (id: string) => $accordionItems[id];

	export let alwaysOpen: boolean = false;
	const setExpansion = (id: string, value: boolean) => {
		accordionItems.update((context) => {
			if(context[activeAccordionItemId] && !alwaysOpen) context[activeAccordionItemId].isExpanded = false;
			context[id].isExpanded = value;
			activeAccordionItemId = value ? id : "";
			return context;
		});
	};

	const context: LexiAccordionContext = {
		registerAccordionItem,
		unregisterAccordionItem,
		accordionItems,
		getItemById,
		setExpansion
	};

	setContext(constants.ACCORDION_CONTEXT, context);
</script>

<div class={$$props.class}>
	<slot />
</div>
