function updateSlider(newGridSize) {
    sliderOutput.innerText = newGridSize;
}

function addRows(gridSize) {

    for (let i = 0; i < gridSize; i++) {
        const etchRow = document.createElement('div');
        etchRow.classList.add('etch-row')
        etchRow.setAttribute('id', `row-${i}`);
        
        etchContainer.appendChild(etchRow);
    }
}

function addSquares(gridSize) {

    for (let i = 0; i < gridSize; i++ ){
        const currentRow = document.getElementById(`row-${i}`);

        for (let j = 0; j < gridSize; j++) {
        const etchSquare = document.createElement('div');
        etchSquare.classList.add('etch-square');
        
        let squareSize = MAX_CANVAS_SIZE / gridSize;
        etchSquare.style.width = `${squareSize}px`;
        etchSquare.style.height = etchSquare.style.width;


        currentRow.appendChild(etchSquare);
        }
    }
}


function createGrid(gridSize) {
    etchContainer.innerText = '';

    addRows(gridSize);
    addSquares(gridSize);
}

function initializeGrid(gridSize) {
    createGrid(gridSize);
    updateSlider(gridSize);
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


initializeGrid(DEFAULT_CANVAS_SIZE);

slider.addEventListener('input', () => {
    let newSize = slider.value;
    updateSlider(newSize);
    // createGrid(newSize)
    addRows(newSize);
}); 


const etchSquares = document.querySelectorAll('.etch-square');


etchSquares.forEach(etchSquare => {
    etchSquare.addEventListener('mouseover', () => {
        // console.log('hover');
        etchSquare.classList.add('black');
    })
});



// document.addEventListener('mouseover', function() {
//     console.log(this);
// })
// 
