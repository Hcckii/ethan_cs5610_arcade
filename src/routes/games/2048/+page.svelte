<script>
    import {move, hasMoves, spawn, score} from '@ethanhua/arcade-core';
    const empty = Array.from({length:4}, ()=>Array(4).fill(0));

    let board = $state(spawn(spawn(empty)));
    // let board = $state([[2048, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]);

    const keys={ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down'};
    let total = $state(0);
    let best = $state(0);
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
        best = Math.max(best, total);
        board = spawn(moved);
    }


</script>
<svelte:window onkeydown={handleKey} />
<main class="centered">
    <header class="centered">
        <div class="titles">
            <h1>2048</h1>
            <div class="scores">
                <div>Score: {total}</div>
                <div>Best: {best}</div>
            </div>
        </div>
    </header>
    {#if gameOver}
        <div class="status-gameOver">Game Over</div>
    {/if}
    {#if win&&!gameOver}
        <div class="status-win">You Win!</div>
    {/if}
    <button class="newGame" onclick={newGame}>New Game</button>
    <div class="board">
        {#each board as row}
            {#each row as cell}
                {#if cell!==0}
                    <div
                    class="hasValue"
                    style:background-color={`var(--tile-${cell})`}
                    style:color={`var(--tile-${cell}-txt)`}
                >{cell}</div>
                {:else}
                    <div class="empty"></div>
               {/if}
            {/each}
        {/each}
    </div>
    <div class="keyboard">
        <div></div>
        <button class="keys" onclick={()=>moveBoard('up')} aria-label="Move up">↑</button>
        <div></div>
        <button class="keys" onclick={()=>moveBoard('left')} aria-label="Move left">←</button>
        <div></div>
        <button class="keys" onclick={()=>moveBoard('right')} aria-label="Move right">→</button>
        <div></div>
        <button class="keys" onclick={()=>moveBoard('down')} aria-label="Move down">↓</button>
        <div></div>
    </div>
</main>
<footer>
    <p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>


<style>
    .board{
        display:grid;
        width:min(80vw, 500px);
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin:10px;
        padding: 10px;
        border-radius: 15px;
        background-color: var(--color-bg-2048);
    }
    .hasValue{
        font-size: 30px;
        font-weight: bold;
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: min(15px, 2vw); 
    }
    .empty{
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        background-color: white;
        border-radius: min(15px, 2vw); 
    }
    h1{
        margin:0px;
        font-size: 70px;
        font-weight: bold;
        color:rgb(255, 255, 255);
        
    }
    .scores{
        display: flex;
        color:white;
        font-weight: bold;
        font-size: 20px;
        width: 100%;
        justify-content: space-around;
    }

    .status-gameOver{
        margin:0px;
        font-size:clamp(24px, 6vw, 60px);
        font-weight: bold;
        -webkit-text-stroke: 2px black;
        color:rgb(226, 0, 0);
        padding:10px;
    }
    .status-win{
        margin:0px;
        font-weight: bold;
        -webkit-text-stroke: 2px black; 
        font-size:6vw;
        color:rgb(251, 217, 49);
        padding: 10px;
    }
    .newGame{
        color: var(--color-bg-2048);
        font-weight: bold;
        font-size: 20px;
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
        border-radius: 15px;
        background-color: var(--color-bg-2048);
        margin:5px;
        padding:10px;
    }
    .keyboard{
        display:none;
    }
    @media (pointer: coarse){
        .keyboard{
            width: 70%;
            aspect-ratio: 1/1;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);

        }
        .keys{
            color:white;
            font-weight: bold;
            font-size: 1.5rem;
            background-color: rgb(84, 84, 84);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
        }

    }
    @media (max-width: 600px) {
       
	
	}
</style>