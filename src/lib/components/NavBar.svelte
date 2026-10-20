<script>
    import NavLink from '#lib/components/NavLink.svelte';
    const navLinks = [{href:'/', label:'Home'}, {href:'/about', label:'About Me'}, {href:'/contact', label:'Contact'}];
    const gameLinks = [{href:'/games/crossword', label:'Crossword'}, {href:'/games/2048', label:'2048'}];
</script>

<nav>
    <div class="compound">
        <img src="/images/yujiro.png" alt="a face of Hanma Yujiro">
        Ethan Hua's Website
    </div>
    <div class="content">
	<ul class="contentUl">
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
                        <li class="gameContent">
                            <NavLink href={link.href} label={link.label} />
                        </li>
                    {/each}
                </ul>
            </details>
        </li>
	</ul>
    </div>
</nav>

<style>

nav img {
	width: 1.5em;
	height: 1.5em;
}
.gameContent{
    padding:5px;
}
nav {
    font-size: clamp(14px, 2vw, 16px);
    color:white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    width: 100%;
    position: sticky;
    top: 0;
    background-color: var(--color-title);
}
.contentUl{
    display: flex;
    list-style: none;
    align-items: center;
    gap: 2rem;
    margin: 0;
    padding: 0;
}
.content{
    margin-right: 2rem;
}
.compound{
    margin-left:2rem;
    font-weight: bold;
    padding:5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap:5px;
}
@media (max-width: 600px) {
	nav {
		flex-direction: column;
		gap: 10px;
	}
	.contentUl {
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.content,
	.compound {
		margin: 0;
	}
}

</style>
