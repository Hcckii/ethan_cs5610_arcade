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

//------------------------- padding functions -------------------------
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

function mergeResult2d(arr2d, key){
    const n = arr2d.length; //the length of grid
    const res = arr2d.map(row=>[...row]);
    
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
        if(key==='left'||key==='up'){
            merged = mergeToLeft(rawData);
            cur = padRight(merged, n);
        }
        else if(key==='right'||key==='down'){
            merged = mergeToLeft(rawData.reverse());
            cur = padRight(merged, n).reverse();
        }
        if(key==='left'||key==='right'){
            res[i] = cur;
        }else if(key==='up'||key==='down'){
            rowToCol(cur, res, i);
        }
    }
    return res;
}

function display(og, res){
    console.log('--------------------------------')
    for(let i=0; i<og.length; i++){
        console.log(og[i], '->', res[i]);
    }
    console.log('--------------------------------')
}

const arr2d=[
[2,2,2,0],
[0,2,0,2],
[2,2,4,2],
[0,0,0,0]];

const left = mergeResult2d(arr2d, 'left');
const right = mergeResult2d(arr2d, 'right');
const up = mergeResult2d(arr2d, 'up');
const down = mergeResult2d(arr2d, 'down');

display(arr2d, left);
display(arr2d, right);
display(arr2d, up);
display(arr2d, down);
