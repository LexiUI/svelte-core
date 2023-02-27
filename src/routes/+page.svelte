<script lang="ts">
	import { Accordion } from '$lib';
</script>

<Accordion.Provider class="test">
	<Accordion.Item>
		<Accordion.Trigger class="trigger" activeClass="trigger-active">This should trigger the accordion.</Accordion.Trigger>
		<Accordion.Panel class="panel" activeClass="panel-active">First trigger's panel.</Accordion.Panel>
	</Accordion.Item>
	<Accordion.Item>
		<Accordion.Trigger class="trigger" activeClass="trigger-active">This the second item in the accordion.</Accordion.Trigger>
		<Accordion.Panel class="panel" activeClass="panel-active">Second accordion panel.</Accordion.Panel>
	</Accordion.Item>
</Accordion.Provider>
