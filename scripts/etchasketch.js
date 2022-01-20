function updateSlider(newGridSize) {
    sliderOutput.innerText = newGridSize;
}

function addRows(gridSize) {
    let rowsToAdd = gridSize === previousGridSize? gridSize: gridSize - previousGridSize;
    
    let rowNum;
    if(currentGridSize > previousGridSize) rowNum = previousGridSize;

    for (let i = 0; i < rowsToAdd; i++) {
        const etchRow = document.createElement('div');
        etchRow.classList.add('etch-row');


        etchRow.setAttribute('id', `row-${rowNum+i}`);
        
        etchContainer.appendChild(etchRow);
    }
}

function removeRows(gridSize) {
    let rowsToRemove = previousGridSize - gridSize;

    for (let i = 1; i <= rowsToRemove; i++) {
        const etchRow = document.getElementById(`row-${previousGridSize-i}`);
        etchContainer.removeChild(etchRow);
    }

}


//  Work on adding new squares, need functions to remove rows and squares, and update current grid size
function addSquares(gridSize) {
    let squaresToAdd = gridSize === previousGridSize? gridSize: gridSize - previousGridSize;

    let squareSize = MAX_CANVAS_SIZE / gridSize;

    for (let i = 0; i < gridSize; i++ ){
        const currentRow = document.getElementById(`row-${i}`);

        if(currentRow.children.length !== 0) { // If current row not empty, resize current squares AND add new squares
            for (let j = 0; j < previousGridSize; j++) {
                const existingSquare = currentRow.children[j];
                existingSquare.style.width = `${squareSize}px`;
                existingSquare.style.height = existingSquare.style.width;
            }
        
          // Add new Squares
            for (let j = 0; j < squaresToAdd; j++) {
                const etchSquare = document.createElement('div');
                
                etchSquare.style.width = `${squareSize}px`;
                etchSquare.style.height = etchSquare.style.width;
                etchSquare.classList.add('etch-square');
                
                
                currentRow.appendChild(etchSquare);
            }
        }
        else {
            for (let j = 0; j < currentGridSize; j++) {
                const etchSquare = document.createElement('div');
                
                etchSquare.style.width = `${squareSize}px`;
                etchSquare.style.height = etchSquare.style.width;
                etchSquare.classList.add('etch-square');
                
                
                currentRow.appendChild(etchSquare);
            }
        }
    }
}

function removeSquares(gridSize) {
    let squaresToRemove = previousGridSize - gridSize;

    let squareSize = MAX_CANVAS_SIZE / gridSize;

    for (let i = 0; i < gridSize; i++ ){
        const currentRow = document.getElementById(`row-${i}`);

        for (let j = 0; j < squaresToRemove; j++) { // Remove last squares equal to amount of squares needed to remove
            const currentSquare = currentRow.lastChild;
            
            currentRow.removeChild(currentSquare);
        }

        for (let j = 0; j < gridSize; j++) { // Resize current squares
            const currentSquare = currentRow.children[j];
            
            currentSquare.style.width = `${squareSize}px`;
            currentSquare.style.height = currentSquare.style.width;
            
            
        }
    }


}


function createGrid(gridSize) {
    etchContainer.innerText = '';

    addRows(gridSize);
    addSquares(gridSize);
}

function initializeGrid() {
    currentGridSize = DEFAULT_CANVAS_SIZE;
    previousGridSize = 0;
    createGrid(DEFAULT_CANVAS_SIZE);
    updateSlider(DEFAULT_CANVAS_SIZE);
}

// function colorSquare(e){
//     console.log(e);
//     e.classList.add('black');
// }





   
  //\\                 //\\    
 ///\\\               ///\\\
////\\\\ DOM SECTION ////\\\\

const etchContainer = document.querySelector('.etch-container');
const slider = document.querySelector('#myRange');
const sliderOutput = document.querySelector('#slider-output');


const MAX_CANVAS_SIZE = 960; //px
const DEFAULT_CANVAS_SIZE = 16; // 16x16 squares
let currentGridSize = DEFAULT_CANVAS_SIZE;
let previousGridSize = 0;


initializeGrid();

slider.addEventListener('input', () => {
    previousGridSize = parseInt(currentGridSize);
    currentGridSize = parseInt(slider.value);

    updateSlider(currentGridSize);
    // createGrid(newSize) // currently working

    if(currentGridSize > previousGridSize) {
        addRows(currentGridSize);
        addSquares(currentGridSize);
    }
    else if (currentGridSize < previousGridSize) {
        removeRows(currentGridSize);
        removeSquares(currentGridSize);
    }
}); 


// const etchSquares = document.querySelectorAll('.etch-square');


// etchSquares.forEach(etchSquare => {
//     etchSquare.addEventListener('mouseover', () => {
//         // console.log('hover');
//         etchSquare.classList.add('black');
//     })
// });


document.addEventListener('mouseover', e => {
    // if(e.target.className === 'etch-square') console.log(e.target.classList[0]);
    if(e.target.classList[0] === 'etch-square') e.target.classList.add('black');

})


// document.addEventListener('mouseover', function() {
//     console.log(this);
// })
// 
