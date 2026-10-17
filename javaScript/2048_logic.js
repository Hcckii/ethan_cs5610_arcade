//-----------------------Merging logics-------------------------
function removeZero(arr){
    return arr.filter(n=>n!==0);
}

function colToRow(arr2d, idx){ // convert a column of a 2d array into row for merge/padding, idx is the position of the column
    const n = arr2d.length;
    const res = [];
    for(let i=0; i<n; i++){
        const cur = arr2d[i][idx];
        res.push(cur);
    }
    return res;
}

function rowToCol(src, dest, idx){ // return a 2d array of converted row to column, idx is the position of an element array in a 2d array
    const n = src.length;
    for(let i=0; i<n; i++){
        dest[i][idx] = src[i];
    }
    return dest;
}

function padRight(arr,n){
    const res = [...arr];
    const m = n - arr.length;
    for(let i=0; i<m; i++){
        res.push(0);
    }
    return res;
}

function mergeToLeft(arr){
    const res = [];
    let i = 0;
    while(i<arr.length){
        if(i+1<arr.length&&arr[i]===arr[i+1]){
            res.push(arr[i]*2);
            i+=2;
        }
        else{
            res.push(arr[i]);
            i++;
        }
    }
    return res;
}

//-----------------------Move logic-------------------------
function move(board, direction){
    const validKeys = ['left', 'right', 'up', 'down'];
    const n = board.length; //the length of grid
    const res = board.map(row=>[...row]);
    if(!validKeys.includes(direction)){
        throw new Error(`Invalid direction: ${direction}`);
    }
    for(let i=0; i<n; i++){
        let merged = undefined;
        let arr = [];
        if(direction==='up'||direction==='down'){
            arr = colToRow(board, i);
        }else if(direction==='left'||direction==='right'){
            arr = board[i];
        }
        const rawData = removeZero(arr);
        let cur = [];
        if(direction==='left'||direction==='up'){
            merged = mergeToLeft(rawData);
            cur = padRight(merged, n);
        }
        else if(direction==='right'||direction==='down'){
            merged = mergeToLeft(rawData.reverse());
            cur = padRight(merged, n).reverse();
        }

        if(direction==='left'||direction==='right'){
            res[i] = cur;
        }else if(direction==='up'||direction==='down'){
            rowToCol(cur, res, i);
        }
    }
    return res;
}
//-----------------------HasMoves logics-------------------------

function compare(board1, board2){
    const n = board1.length;
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(board1[i][j]!==board2[i][j]){
                return true;
            }
        }
    }
    return false;
}

function hasMoves(board){
    return compare(board, move(board, 'left'))
    ||compare(board, move(board, 'right'))
    ||compare(board, move(board, 'up'))
    ||compare(board, move(board, 'down'));
}

//-----------------------Spawn logics-------------------------

function spaces(board){
    const available = [];
    const n = board.length;
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(board[i][j]===0){
                available.push([i, j]);
            }
        }
    }
    return available;
}

function spawn(board, rng=Math.random){
    const res = board.map(row=>[...row]);
    const canSpawn = spaces(res);
    if(!canSpawn.length>0){
        throw new Error("The board is full");
    }
    const spawnList = [2,4];
    const n = canSpawn.length;
    const m = spawnList.length;
    const randSpot = Math.floor(rng()*n);
    const randNum = Math.floor(rng()*m);
    const[i, j]=canSpawn[randSpot];
    res[i][j] = spawnList[randNum];
    return res;
}


//-----------------------Display function-------------------------
function display(og, res){
    console.log('--------------------------------')
    for(let i=0; i<og.length; i++){
        console.log(og[i], '->', res[i]);
    }
    console.log('--------------------------------')
}

// const arr2d=[
// [2,2,2,0],
// [0,2,0,2],
// [2,2,4,2],
// [0,0,0,0]];

// const left = mergeResult2d(arr2d, 'left');
// const right = mergeResult2d(arr2d, 'right');
// const up = mergeResult2d(arr2d, 'up');
// const down = mergeResult2d(arr2d, 'down');

// display(arr2d, left);
// display(arr2d, right);
// display(arr2d, up);
// display(arr2d, down);


