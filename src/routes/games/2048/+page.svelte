<script>
    import Controls from '#lib/components/Controls.svelte';
    import {move, hasMoves, spawn, score} from '@ethanhua/arcade-core';
    import {fade, scale, fly} from 'svelte/transition';
    import { prefersReducedMotion } from 'svelte/motion';
    import {scores} from '#lib/state/scores.svelte.js';
    const empty = Array.from({length:4}, ()=>Array(4).fill(0));


    $effect(() => {
        try {
            localStorage.setItem('2048-game', JSON.stringify({ board, total }));
        } catch {
        }
    });
    function loadGame() {
        try {
            const saved = JSON.parse(localStorage.getItem('2048-game'));
            if (saved && Array.isArray(saved.board)) {
                return saved;
            }
        } catch {
        }
        return { board: spawn(spawn(empty)), total: 0 };
    }
    $effect(() => {
	try {
		localStorage.setItem('2048-best', String(scores.best));
	} catch {}
    });
    const saved = loadGame();
    let board = $state(saved.board);
    let total = $state(saved.total);
    // let board = $state([[1024, 1024, 256, 512],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]);

    const keys={ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down'};
    const win = $derived(hasWon(board));
    const gameOver = $derived(!hasMoves(board));
    function newGame(){
        board = spawn(spawn(empty));
        total = 0;
    }
    function areSameBoard(board1, board2){
        const n = board1.length;
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                if(board1[i][j]!==board2[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    function hasWon(board){
        return board.some(row => row.some(cell => cell >= 2048));
    }

    function handleKey(event){
        if(!(event.key in keys)){
            return;
        }
        event.preventDefault();
        const direction = keys[event.key];
        moveBoard(direction);
    }

    function moveBoard(direction){
        const moved = move(board, direction);
        if(areSameBoard(board, moved)){
            return;
        }
        total+=score(board, direction);
        scores.best = Math.max(scores.best, total);
        board = spawn(moved);
    }
    

</script>
<svelte:window onkeydown={handleKey} />
<main class="centered">
    <header class="centered">
        <div class="titles">
            <h1>2048</h1>
        </div>
    </header>
    <div class="status" aria-live="polite">
        {#if gameOver}
        <div class="status-gameOver" in:scale={{ duration:prefersReducedMotion.current?0:400, start: 0.5 }} out:fade>Game Over</div>
        {/if}
        {#if win&&!gameOver}
            <div class="status-win" transition:fade>You Win!</div>
        {/if}
    </div>
    <div class="scores">
        <div>Score: {total}</div>
        <button class="newGame" onclick={newGame}>New Game</button>
        <div>Best: {scores.best}</div>
    </div>
    <div class={win?"winBoard":"board"}>
        {#each board as row}
            {#each row as cell}
                {#if cell!==0}
                    <div
                    class="hasValue"
                    style:background-color={`var(--tile-${cell}, var(--tile-2048))`}
                    style:color={`var(--tile-${cell}-txt, var(--tile-2048-txt))`}
                    >{cell}</div>
                {:else}
                    <div class="empty"></div>
                {/if}
            {/each}
        {/each}
    </div>
    <Controls onmove={moveBoard}/>
</main>
<footer>
    <p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>


<style>
    .winBoard{
        display:grid;
        width:min(80vw, 500px);
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin:10px;
        border:4px solid rgb(236, 0, 0);
        padding: 10px;
        border-radius: 15px;
        background-color: gold;
        background-image: url("/images/yujiro.png");
        background-repeat: no-repeat; 
        background-position: center; 
        background-size: cover; 
    }
    .board{
        display:grid;
        width:min(80vw, 500px);
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin:10px;
        padding: 10px;
        border-radius: 15px;
        background-color: var(--color-bg-2048);
        border:4px solid var(--color-title-2048);
    }
    .hasValue{
        font-size: clamp(16px, 6vw, 30px);
        font-weight: bold;
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: min(15px, 2vw); 
        border:1px solid var(--color-title-2048);
    }
    .empty{
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: min(15px, 2vw);
    }
    h1{
        margin:0px;
        margin-top: 5px;
        font-size: clamp(3rem, 20vw, 70px);
        font-weight: bold;
        -webkit-text-stroke: 3px var(--color-bg-2048);
        text-shadow: 5px 5px 0 rgb(0, 0, 0);
        font-family: var(--font-2048);
        color:var(--color-title-2048);
    }
    .scores{
        display: flex;
        color:var(--color-title-2048);
        font-weight: bold;
        font-size: clamp(1.1rem, 5vw, 20px);
        width: 90%;
        align-items: center;
        justify-content: space-around;
    }

    .status-gameOver{
        margin:0px;
        font-family: var(--font-2048);
        font-size:clamp(40px,5vw, 70px);
        font-weight: bold;
        text-shadow: 5px 5px 0 rgb(0, 0, 0);
        color:rgb(174, 1, 1);
        padding:10px;
    }
    .status {
	    display: grid;
        min-height: 5rem;
    }
    .status > * {
        grid-area: 1 / 1;
    }
    .status-win{
        margin:0px;
        font-weight: bold;
        font-size:clamp(40px, 5vw, 70px);
        font-family: var(--font-2048);
        text-shadow: 5px 5px 0 rgb(0, 0, 0);
        -webkit-text-stroke: 2px rgb(255, 0, 0);
        color:rgb(255, 230, 0);
        padding: 10px;
    }
    .newGame{
        color: var(--color-title-2048);
        font-weight: bold;
        font-size: clamp(1.1rem, 5vw, 20px);
        margin:0px;
        padding:5px;
        border-radius: 15px;
        background-color: white;
    }
    .titles{
        display: flex;
        width: min(80vw, 500px);
        flex-direction: column;
        align-items: center;
        margin:5px;
        padding:5px;
    }
    
</style>