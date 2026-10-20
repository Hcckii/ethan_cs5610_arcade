<script>
    let {onmove} = $props();
</script>
<div class="keyboard">
    <div></div>
    <button class="keys" onclick={()=>onmove('up')} aria-label="Move up">↑</button>
    <div></div>
    <button class="keys" onclick={()=>onmove('left')} aria-label="Move left">←</button>
    <div></div>
    <button class="keys" onclick={()=>onmove('right')} aria-label="Move right">→</button>
    <div></div>
    <button class="keys" onclick={()=>onmove('down')} aria-label="Move down">↓</button>
    <div></div>
</div>


<style>
    .keyboard{
        display:none;
    }
    @media (pointer: coarse){
        .keyboard{
            margin:5px;
            gap:5px;
            width: min(55vw, 300px);
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
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
        }
    }
</style>