import type { Readable, Writable } from 'svelte/store';

export interface LexiAccordionContextItem {
	id: string;
	isExpanded: boolean;
}

export type LexiAccordionItemsRecord = Record<string, LexiAccordionContextItem>;

export interface LexiAccordionContext {
	registerAccordionItem: (isExpanded: boolean) => string;
	unregisterAccordionItem: (id: string) => void;
	accordionItems: Writable<LexiAccordionItemsRecord>;
	getItemById: (id: string) => LexiAccordionContextItem;
	setExpansion: (id: string, value: boolean) => void;
}

export interface LexiAccordionItemContext {
	id: string;
}
