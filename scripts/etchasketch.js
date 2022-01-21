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

function resizeSquare(square, gridSize) {
    let squareSize = MAX_CANVAS_SIZE / gridSize;
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
}

function addSquares(gridSize) {

    for (let i = 0; i < gridSize; i++ ){
        const currentRow = document.getElementById(`row-${i}`);

        if(currentRow.children.length !== 0) { // If current row not empty, resize existing squares to make room for new ones
            for (let j = 0; j < previousGridSize; j++) {
                const existingSquare = currentRow.children[j];
                resizeSquare(existingSquare, gridSize);
            }
        }
        
        // Add new squares
        if(currentRow.children.length !== gridSize) {
            let squaresToAdd = gridSize - currentRow.children.length;
        
            for (let j = 0; j < squaresToAdd; j++) {
                const newSquare = document.createElement('div');
                
                resizeSquare(newSquare, gridSize);
                newSquare.classList.add('etch-square');
                
                
                currentRow.appendChild(newSquare);
            }
        }



    }
}

function removeSquares(gridSize) {
    let squaresToRemove = previousGridSize - gridSize;


    for (let i = 0; i < gridSize; i++ ){
        const currentRow = document.getElementById(`row-${i}`);

        for (let j = 0; j < squaresToRemove; j++) { // Remove squares equal to amount of squares needed to remove
            const currentSquare = currentRow.lastChild;
            currentRow.removeChild(currentSquare);
        }

        for (let j = 0; j < gridSize; j++) { // Resize current squares
            const currentSquare = currentRow.children[j];
            resizeSquare(currentSquare,gridSize);
            
            
        }
    }


}



function createGrid(gridSize) {
    etchContainer.innerText='';

    addRows(gridSize);
    addSquares(gridSize);
}

function initializeGrid() {
    currentGridSize = DEFAULT_CANVAS_SIZE;
    previousGridSize = 0;
    createGrid(DEFAULT_CANVAS_SIZE);
    updateSlider(DEFAULT_CANVAS_SIZE);
}

function clearGrid() {
    const coloredSquares = Array.from(document.getElementsByClassName('etch-square black'));

    coloredSquares.forEach(square => {
        square.classList.remove('black');
    })
}

function setGridSize() {
    MAX_CANVAS_SIZE = window.innerWidth / 2;
    etchContainer.style.width = `${MAX_CANVAS_SIZE}px`;
    etchContainer.style.height = `${MAX_CANVAS_SIZE}px`;

    //Resize the squares also
    const squares = Array.from(document.querySelectorAll('.etch-square'));
    squares.forEach(square => resizeSquare(square,currentGridSize));
}


   
  //\\                 //\\    
 ///\\\               ///\\\
////\\\\ DOM SECTION ////\\\\

const etchContainer = document.querySelector('.etch-container');
const slider = document.querySelector('#myRange');
const sliderOutput = document.querySelector('#slider-output');
const btnClear = document.querySelector('#clear-btn');

let MAX_CANVAS_SIZE = window.innerWidth / 2; //px
const DEFAULT_CANVAS_SIZE = 16; // 16x16 squares
let currentGridSize = DEFAULT_CANVAS_SIZE;
let previousGridSize = 0;


initializeGrid();

slider.addEventListener('input', () => {
    previousGridSize = parseInt(currentGridSize);
    currentGridSize = parseInt(slider.value);

    updateSlider(currentGridSize);

    if(currentGridSize > previousGridSize) {
        addRows(currentGridSize);
        addSquares(currentGridSize);
    }
    else if (currentGridSize < previousGridSize) {
        removeRows(currentGridSize);
        removeSquares(currentGridSize);
    }
}); 


document.addEventListener('mouseover', e => {
    if(e.target.classList[0] === 'etch-square') e.target.classList.add('black');

})

btnClear.addEventListener('click', clearGrid);

window.addEventListener('resize', setGridSize)


