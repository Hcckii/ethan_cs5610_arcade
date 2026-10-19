
<main class="centered">
    <header>
        <h1>Crossword Game</h1>
    </header>
    
    <div class="grid-container">
        <div class="cell" data-number="1">
            <input type="text" maxlength="1" aria-label="1 Across, 1 Down, Row 1, column 1">
        </div>

        <div class="cell" data-number="2">
            <input type="text" maxlength="1" aria-label="1 Across, 2 Down, Row 1, column 2">
        </div>
        
        <div class="cell" data-number="3">
            <input type="text" maxlength="1" aria-label="1 Across, 3 Down, Row 1, column 3">
        </div>
        
        <div class="block"></div>

        <div class="block"></div>

        <div class="cell" data-number="4">
            <input type="text" maxlength="1" aria-label="4 Across, Row 2, column 1">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="4 Across, Row 2, column 2">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="4 Across, Row 2, column 3">
        </div>
        
        <div class="cell" data-number="5">
            <input type="text" maxlength="1" aria-label="4 Across, 5 Down, Row 2, column 4">
        </div>

        <div class="block"></div>
        
        <div class="cell" data-number="6">
            <input type="text" maxlength="1" aria-label="6 Across, Row 3, column 1">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="6 Across, Row 3, column 2">
        </div>

        <div class="cell">
            <input type="text" maxlength="1" aria-label="6 Across, Row 3, column 3">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="6 Across, Row 3, column 4">
        </div>
        
        <div class="cell" data-number="7">
            <input type="text" maxlength="1" aria-label="6 Across, 7 Down, Row 3, column 5">
        </div>
        
        <div class="block"></div>

        <div class="cell" data-number="8">
            <input type="text" maxlength="1" aria-label="8 Across, Row 4, column 2">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="8 Across, Row 4, column 3">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="8 Across, Row 4, column 4">
        </div>
        
        <div class="cell">
            <input type="text" maxlength="1" aria-label="8 Across, Row 4, column 5">
        </div>

        <div class="block"></div>

        <div class="block"></div>
        
        <div class="cell" data-number="9">
            <input type="text" maxlength="1" aria-label="9 Across, Row 5, column 3">
        </div>

        <div class="cell">
            <input type="text" maxlength="1" aria-label="9 Across, Row 5, column 4">
        </div>

        <div class="cell">
            <input type="text" maxlength="1" aria-label="9 Across, Row 5, column 5">
        </div>
        
    </div>

    <div>
        <ul>
            <li>1 Across: A small, mythical creature</li>
            <li>1 Down: The outgoing tide</li>
            <li>2 Down: A nobleman's title</li>
            <li>3 Down: A deceptive scheme</li>
            <li>4 Across: Brought into existence</li>
            <li>5 Down: The number after eight</li>
            <li>6 Across: The organ you think with</li>
            <li>7 Down: Not old</li>
            <li>8 Across: A hill of sand</li> 
            <li>9 Across: Morning moisture on grass</li>
        </ul>
    </div>
        <details>
            <summary>Click to see the Answer</summary>
            <ul>
                <li><details><summary>1 Across</summary>ELF</details></li>
                <li><details><summary>1 Down</summary>EBB</details></li>
                <li><details><summary>2 Down</summary>LORD</details></li>
                <li><details><summary>3 Down</summary>FRAUD</details></li>
                <li><details><summary>4 Across</summary>BORN</details></li>
                <li><details><summary>5 Down</summary>NINE</details></li>
                <li><details><summary>6 Across</summary>BRAIN</details></li>
                <li><details><summary>7 Down</summary>NEW</details></li>
                <li><details><summary>8 Across</summary>DUNE</details></li>
                <li><details><summary>9 Across</summary>DEW</details></li>
            </ul>
        </details>
        
        
</main>
<footer>
    <p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>
<style>
    *{
    box-sizing: border-box;
}

.grid-container{
    display:grid;
    width: 70%;
    aspect-ratio: 1/1;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    border:solid black 1px;
}

main ul{
    list-style: none;
}

.cell input[type="text"]{
    text-align: center;
    font-size: 30px;
    width: 100%;
    height: 100%;
    border:solid black 1px;
}

.block{
    background-color: black;
}

.cell {
    position: relative;
}

.cell[data-number]::before {
    content: attr(data-number);
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 15px;
    z-index: 1;
}

@media (min-width:864px){
    .grid-container{
        width: 40%;
    }
    .cell input[type="text"]{
        font-size: 40px;
    }
    .cell[data-number]::before {
        font-size: 30px;
    }
}


</style>