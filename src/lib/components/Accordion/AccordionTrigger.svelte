<script lang="ts">
	import { getContext } from 'svelte';
	import * as constants from './constants';
	import type { LexiAccordionContext, LexiAccordionItemContext } from './types';

	const accordionItemContext = getContext<LexiAccordionItemContext>(
		constants.ACCORDION_ITEM_CONTEXT
	);

	const accordionContext = getContext<LexiAccordionContext>(constants.ACCORDION_CONTEXT);

	if (!accordionItemContext) {
		throw new Error('[Lexi Error]: AccordionTrigger must be a child of AccordionItem.');
	}

	if (!accordionContext) {
		throw new Error('[Lexi Error]: AccordionTrigger must be a child of AccordionProvider.');
	}

	const { id } = accordionItemContext;
	const { accordionItems } = accordionContext;

	let _accordionItems = $accordionItems;

	accordionItems.subscribe((value) => {
		_accordionItems = value;
	});

	function toggleExpansion(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Space' && e.key !== 'Enter') return;
		accordionContext.setExpansion(id, !_accordionItems[id].isExpanded);
	}

	let _class: string = '';
	export { _class as class };
	export let tag: string = 'h3';
	export let activeClass: string = '';
	export let inactiveClass: string = '';
	export let triggerTag: string = 'button';
	export let triggerClass: string = '';
	export let triggerActiveClass: string = '';
	export let triggerInactiveClass: string = '';

	$: wrapperComputedClass = () => {
		if (_accordionItems[id].isExpanded) {
			return _class + ' ' + activeClass;
		}
		return _class + ' ' + inactiveClass;
	};

	$: triggerComputedClass = () => {
		if (_accordionItems[id].isExpanded) {
			return (triggerClass + ' ' + triggerActiveClass).trim();
		}
		return (triggerClass + ' ' + triggerInactiveClass).trim();
	};
</script>

<svelte:element this={tag} class={wrapperComputedClass()}>
	<svelte:element
		this={triggerTag}
		class={triggerComputedClass()}
		on:click={toggleExpansion}
		on:keypress={toggleExpansion}
		tabindex="-1"
		role="button"
		aria-expanded={_accordionItems[id].isExpanded}
		aria-controls={constants.ACCORDION_PANEL_PREFIX + id}
		id={constants.ACCORDION_TRIGGER_PREFIX + id}
	>
		<slot />
	</svelte:element>
</svelte:element>
