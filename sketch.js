let h = window.innerHeight
let w = window.innerWidth

const PADDING = 0;
const COLUMNS = 100;
const CELL_SIZE = w / COLUMNS;
const ROWS = h / CELL_SIZE;
const CELL_COLOR = '#222';
const CANVAS_WIDTH = w;
const CANVAS_HEIGHT = h;
const CANVAS_COLOR = '#000';
const CELL_COUNT = ROWS * COLUMNS;
const COLORS = ['#222', '#ffee32'];

let cells = new Array(Math.floor(CELL_COUNT)).fill(0);
console.log(cells)

function setup() { 
  createCanvas(w, h);
  background('#300');
  noStroke();
  frameRate(1)



  let left = PADDING;
  let top = PADDING;
  let leftEnd = left + COLUMNS * CELL_SIZE;
  for (let i = 0; i < cells.length; i++) {
    fill(String(cellRandomizer(i)));
    let size = CELL_SIZE;
    rect(left, top, size, size);

    left += CELL_SIZE;
    if (left === leftEnd) {
      left = PADDING;
      top += CELL_SIZE;
    }
  }
  
  /* for (let col=0;col<COLUMNS;col++) { */
  /*   for (let row=0;row<ROWS;row++) { */
  /*     fill(cellRandomizer(col, row));   */
  /*     let left = PADDING+(col*CELL_SIZE); */
  /*     let top = PADDING+(row*CELL_SIZE); */
  /*     let size = CELL_SIZE; */
  /*     rect(left,top,size,size); */
  /*   } */
  /* } */
  }

  function draw() {
      //renderCells();
  }

  /* function renderCells() { */
  /*   for (let col=0;col<COLUMNS;col++) { */
  /*       for (let row=0;row<ROWS;row++) { */
  /*           let neighbors = neighborCells(col, row) */
  /*           if (neighbors.length < 2 || neighbors.length > 3) { */
  /*               cells[cellIndex(col, row)] = false */
  /*           } else if (neighbors.length === 3) { */
  /*               cells[cellIndex(col, row)] = true */
  /*           } */
  /*       } */
  /*     } */
  /* } */
 function renderCells() {
  let left = PADDING;
  let top = PADDING;
  let leftEnd = left + COLUMNS * CELL_SIZE;
  for (let i = 0; i < cells.length; i++) {
    fill(COLORS[cells[i]]);
    let size = CELL_SIZE - 2;
    rect(left, top, size, size);

    left += CELL_SIZE;
    if (left === leftEnd) {
      left = PADDING;
      top += CELL_SIZE;
    }
  }
} 


  function cellRandomizer(i) {
        let coin = Math.floor(Math.random() * 8)
        if (coin === 5) {
            cells[i] = [true]          
            return '#fff'
        } else {
            cells[i] = [false]
            return '#300'
        } 
  }

  function cellIndex(x, y) {
    return (y * COLUMNS) + x;
  }
  
  function northIndex(x, y) {
    if (y===0) { return -1; }
    return cellIndex(x, y-1);
  }
  
  function southIndex(x, y) {
    if (y===ROWS-1) { return -1; }
    return cellIndex(x, y+1);
  }
  
  function eastIndex(x, y) {
    if (x===COLUMNS-1) { return -1; }
    return cellIndex(x+1, y);
  }
  
  function westIndex(x, y) {
    if (x===0) { return -1; }
    return cellIndex(x-1, y);
  }
  
  function northEastIndex(x, y) {
    if (y === 0 && x === COLUMNS - 1) {return -1}
    return cellIndex(x + 1, y - 1)
  }

  function southEastIndex(x, y) {
    if (y === ROWS - 1 && x === COLUMNS - 1) {return -1}
    return cellIndex(x + 1, y + 1)
  }

  function southWestIndex(x, y) {
    if (y === 0 && x === COLUMNS - 1) {return -1}
    return cellIndex(x - 1, y + 1)
  }

  function northWestIndex(x, y) {
    if (y === 0 && x === 0) {return -1}
    return cellIndex(x - 1, y - 1) 
  }

  function neighborCells(x, y) {
    let neighbors = [];
    neighbors.push(northIndex(x, y));
    neighbors.push(northEastIndex(x, y));
    neighbors.push(eastIndex(x, y));
    neighbors.push(southEastIndex(x, y));
    neighbors.push(southIndex(x, y));
    neighbors.push(southWestIndex(x, y));
    neighbors.push(westIndex(x, y));
    neighbors.push(northWestIndex(x, y));

    return neighbors.filter(n => n !== -1 && cells[n][0] === true);
  }
  
