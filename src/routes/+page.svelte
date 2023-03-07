<script lang="ts">
    const components = [
        {
            name: "Accordion",
            link: '/accordion'
        }
    ]
</script>

<div class="p-8">
    <h1 class="text-2xl"> Components </h1>
    <ul>
        {#each components as component}            
        <li class="py-2">
            <a class="text-blue-600" href={component.link}>{component.name}</a>     
        </li>
        {/each}
    </ul>
</div>
