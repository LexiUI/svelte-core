<script lang="ts">
	import { getContext } from 'svelte';
	import * as constants from './constants';
	import type { LexiAccordionItemContext, LexiAccordionContext } from './types';

	const accordionItemContext = getContext<LexiAccordionItemContext>(
		constants.ACCORDION_ITEM_CONTEXT
	);
	const accordionContext = getContext<LexiAccordionContext>(constants.ACCORDION_CONTEXT);

	if (!accordionItemContext) {
		throw new Error('[Lexi Error]: AccordionPanel must be a child of AccordionItem.');
	}

	if (!accordionContext) {
		throw Error('[Lexi Error]: AccordionPanel must be a child of AccordionProvider.');
	}

	const { id } = accordionItemContext;
	const { accordionItems } = accordionContext;

	let _accordionItems = $accordionItems;

	accordionItems.subscribe((value) => {
		_accordionItems = value;
	});

	let _class: string = '';
	export { _class as class };
	export let activeClass: string = '';
	export let inactiveClass: string = '';

	$: computedClass = () => {
		if (_accordionItems[id].isExpanded) {
			return (_class + ' ' + activeClass).trim();
		}
		return (_class + ' ' + inactiveClass).trim();
	};
</script>

<div role="region" id={constants.ACCORDION_PANEL_PREFIX + id} class={computedClass()}>
	<slot />
</div>
