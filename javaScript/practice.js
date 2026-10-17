function double(arr){
    const res = arr.map(n=>n*2);
    return res;
}

function removeZero(arr){
    const res = arr.filter(n=>n!==0);
    return res;
}

function colToRow(arr2d, idx){ // convert a column of a 2d array into row for merge/padding, idx is the position of the column
    const n = arr2d.length;
    let res = [];
    for(let i=0; i<n; i++){
        const cur = arr2d[i][idx];
        res.push(cur);
    }
    return res;
}

function rowToCol(src, dist, idx){ // return a 2d array of converted row to column, idx is the position of an element array in a 2d array
    const n = src.length;
    let res = structuredClone(dist);
    for(let i=0; i<n; i++){
        res[i][idx] = src[i];
    }
    return res;
}

//------------------------- padding functions -------------------------
function padRight(arr,n){
    const res = [...arr];
    const m = n - arr.length;
    for(let i=0; i<m; i++){
        res.push(0);
    }
    return res;
}
function padLeft(arr,n){
    const res = [...arr];
    const m = n - arr.length;
    for(let i=0; i<m; i++){
        res.unshift(0);
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

function mergeToRight(arr){
    const res = [];
    let i = arr.length-1;
    while(i>=0){
        if(i-1>=0&&arr[i]===arr[i-1]){
            res.unshift(arr[i]*2);
            i-=2;
        }
        else{
            res.unshift(arr[i]);
            i--;
        }
    }
    return res;
}

function mergeResult(arr, key){
    const validKeys = ['left', 'right', 'up', 'down'];
    if(!(validKeys.includes(key))){
        console.log();
    }
    const n = arr.length; //the length of grid
    const rawData = removeZero(arr);
    let merged = undefined;
    if(key==='left'||key==='up'){
        merged = mergeToLeft(rawData);
    }
    else if(key==='right'||key==='down'){
        merged = mergeToRight(rawData);
    }
    let res = undefined;
    if(key==='left'){
        res = padRight(merged, n);
    }
    else if(key==='right'){
        res = padLeft(merged, n);
    }
    // else if(key==='up'){
    //     res = padUp(merged, n);
    // }
    // else if(key==='down'){
    //     res = padDown(merged, n);
    // }
    return res;
}


function move(arr2d, key){
    const validKeys = ['left', 'right', 'up', 'down'];
    if(!(validKeys.includes(key))){
        return false;
    }
    let res = structuredClone(arr2d);
    const n = arr2d.length; //the length of grid
    for(let i=0; i<n; i++){
        let merged = undefined;
        let arr = [];
        if(key==='up'||key==='down'){
            arr = colToRow(arr2d, i);
        }else if(key==='left'||key==='right'){
            arr = arr2d[i];
        }

        const rawData = removeZero(arr);
       
        let cur = [];
        if(key==='left'){
            merged = mergeToLeft(rawData);
            cur = padRight(merged, n);
        }
        else if(key==='right'){
            merged = mergeToRight(rawData);
            cur = padLeft(merged, n);
        }
        else if(key==='up'){
            merged = mergeToLeft(rawData);
            cur = padRight(merged, n);
        }
        else if(key==='down'){
            merged = mergeToRight(rawData);
            cur = padLeft(merged, n);
        }
        if(key==='left'||key==='right'){
            res[i] = cur;
        }else if(key==='up'||key==='down'){
            res = rowToCol(cur, res, i);
        }
        
    }
    return res;
}

const arr = [2,0,2,2];
const arr2d=[
[2,0,2,0],
[0,2,0,2],
[2,2,2,2],
[0,0,0,0]];

// console.log(mergeResult2d(arr2d, 'left'));
// console.log(mergeResult2d(arr2d, 'right'));
// console.log(mergeResult2d(arr2d, 'up'));
// console.log(mergeResult2d(arr2d, 'down'));

let a = [1,2,3,4];