function updateSlider(newGridSize) {
    sliderOutput.innerText = newGridSize;
}

function updateGrid(currentGridSize, newGridSize){
    // console.log(currentGridSize);
    // console.log(newGridSize);
    if(currentGridSize < newGridSize) expandGrid(currentGridSize, newGridSize);
    else if (currentGridSize > newGridSize) decreaseGrid(currentGridSize, newGridSize);
}

function createGrid(gridSize) {
    etchContainer.innerText = '';

    for (let rowNumber = 0; rowNumber < gridSize; rowNumber++){
        const etchRow = document.createElement('div');
        etchRow.classList.add('etch-row')
        etchRow.setAttribute('id', `row-${rowNumber}`);

        for (let squareNumber = 0; squareNumber < gridSize; squareNumber++ ){
            const etchSquare = document.createElement('div');
            etchSquare.classList.add('etch-square');
            
            let squareSize = MAX_CANVAS_SIZE / gridSize;
            etchSquare.style.width = `${squareSize}px`;
            etchSquare.style.height = etchSquare.style.width;


            etchRow.appendChild(etchSquare);
        }

        etchContainer.appendChild(etchRow);
    }
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


let gridSize = 10;
createGrid(gridSize);

slider.addEventListener('input', () => {
    let newSize = slider.value;
    updateSlider(newSize);
    updateGrid(currentGridSize, newSize);
    currentGridSize = newSize;
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

