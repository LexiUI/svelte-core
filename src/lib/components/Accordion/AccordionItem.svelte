<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import * as constants from './constants';
	import type { LexiAccordionItemContext, LexiAccordionContext } from './types';

	const accordionContext = getContext<LexiAccordionContext>(constants.ACCORDION_CONTEXT);

	if (!accordionContext) {
		throw Error('[Lexi Error]: AccordionItem must be a child of AccordionProvider.');
	}

	export let expanded: boolean = false;

	const id = accordionContext.registerAccordionItem(expanded);

	onDestroy(() => {
		accordionContext.unregisterAccordionItem(id);
	});

	setContext<LexiAccordionItemContext>(constants.ACCORDION_ITEM_CONTEXT, {
		id
	});

	const { accordionItems } = accordionContext;

	let _accordionItems = $accordionItems;

	accordionItems.subscribe((value) => {
		_accordionItems = value;
	});
</script>

<slot isExpanded={_accordionItems[id].isExpanded} />
