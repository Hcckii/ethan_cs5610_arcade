<script>
    import NavLink from '#lib/components/NavLink.svelte';
    const navLinks = [{href:'/', label:'Home'}, {href:'/about', label:'About Me'}, {href:'/contact', label:'Contact'}];
    const gameLinks = [{href:'/games/crossword', label:'Cross word'}, {href:'/games/2048', label:'2048'}];
</script>



<nav>
	<p class="site-title">Chang Chi (Ethan) Hua</p>
	<ul>
		{#each navLinks as link (link.href)}
            <li>
                <NavLink href={link.href} label={link.label} />
            </li>
        {/each}
        <li>
            <details>
                <summary>Games</summary>
                <ul>
                    {#each gameLinks as link (link.href)}
                        <li>
                            <NavLink href={link.href} label={link.label} />
                        </li>
                    {/each}
                </ul>
           
            </details>
        </li>
	</ul>
</nav>

<style>
	nav {
    padding:5px;
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.834);
    border: solid gray 1px;
}

nav p{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
}
nav ul{
    display: flex;
    list-style: none;
    gap: 10px;
    margin: 0;
    padding: 0;
}
nav a:hover{
    background-color: var(--color-accent);
}
nav a:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
}

nav a {
    text-decoration: none;
    transition: background-color 0.2s;
}

</style>
