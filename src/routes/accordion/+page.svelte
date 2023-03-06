<script lang="ts">
	import { Accordion } from '$lib';
	import { slide } from 'svelte/transition';

	const triggerBaseClass = 'text-left text-blue-500 bg-blue-50 text-lg transition border-blue-100';
</script>

<Accordion.Provider class="p-4 w-full md:w-1/3">
	<Accordion.Item let:isExpanded>
		<Accordion.Trigger
			class={triggerBaseClass}
			inactiveClass="bg-gray-50"
			activeClass="bg-gray-100"
			triggerClass="transition text-left py-2 px-4 w-full"
			triggerActiveClass="shadow-xl">This should trigger the accordion.</Accordion.Trigger
		>
		{#if isExpanded}
			<div transition:slide>
				<Accordion.Panel class="bg-blue-500 bg-opacity-25" inactiveClass="hidden" activeClass="p-8"
					>First trigger's panel.</Accordion.Panel
				>
			</div>
		{/if}
	</Accordion.Item>
	<Accordion.Item let:isExpanded>
		<Accordion.Trigger
			class={triggerBaseClass}
			inactiveClass="bg-gray-50"
			activeClass="z-4 bg-gray-100"
			triggerClass="transition text-left py-2 px-4 w-full"
			triggerActiveClass="shadow-xl"
			>This should trigger the second accordion panel.</Accordion.Trigger
		>
		{#if isExpanded}
			<div transition:slide>
				<Accordion.Panel class="bg-blue-500 bg-opacity-25" inactiveClass="hidden" activeClass="p-8">
					Its nice, innit? Well the component, not the design obviously.
				</Accordion.Panel>
			</div>
		{/if}
	</Accordion.Item>
</Accordion.Provider>
