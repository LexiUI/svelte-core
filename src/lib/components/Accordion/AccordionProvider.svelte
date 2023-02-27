<script lang="ts">
	import * as constants from './constants';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import shortid from 'shortid';
	import type { LexiAccordionContext, LexiAccordionItemsRecord } from './types';

	const accordionItems = writable<LexiAccordionItemsRecord>({});

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

	const setExpansion = (id: string, value: boolean) => {
		accordionItems.update((context) => {
			context[id].isExpanded = value;
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
