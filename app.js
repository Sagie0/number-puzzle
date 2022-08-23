const board = document.querySelector('#board')
const piecesIndexes = []
const correctPieceOrder = []

// function to create tile
function createTile (index) {
    const tile = document.createElement('div')
    tile.classList.add('tile')
    tile.ondragover = function (evt) {
        evt.preventDefault()
    }
    tile.ondrop = function(evt) {
        evt.stopPropagation()
        
        if(!tile.hasChildNodes()) {
            let id = evt.dataTransfer.getData('text/plain')
            tile.appendChild(document.getElementById(id))
        }

        if(checkIfCorrect()){
            alert('Excellent Work. \nYou Have completed the puzzle')
        }
    }
    tile.dataset.index = index

    return tile

}
// function to create pieces
function createPiece (arr) {
    let randomPiece = arr[Math.floor(Math.random() * arr.length)]
    arr.splice(arr.indexOf(randomPiece), 1)

    const piece = document.createElement('div')
    piece.classList.add('piece')
    piece.textContent = randomPiece
    piece.id = `piece${randomPiece}`
    piece.draggable = true
    piece.ondragstart = function (evt) {
        evt.dataTransfer.setData('text/plain', piece.id)
        console.log('now dragging', piece.id);

    }
    return piece
}

//function to check for correctness
function checkIfCorrect () {
    let correctnessArray =[]
    let count = 1
    const allPieces = document.querySelectorAll('.piece')
    piecesIndexes.forEach((piece, index)=>{
        if(Number(piece.textContent)===correctPieceOrder[index]){
            correctnessArray.push(true)
        } else {
            correctnessArray.push(false)
        }
    })

    let isCorrect = correctnessArray.every(value=>value===true)

}

//fill board with tiles
for (let index = 0; index < 25; index++) {
    board.appendChild(createTile(index))
}

//populate the pieces indexes Array and correctPiece order arrays
for (let index = 1; index <= 24; index++) {
    piecesIndexes.push(index)
    correctPieceOrder.push(index)
}
// inserting pieces inside each tile and on board
const tiles = document.querySelectorAll('.tile')
tiles.forEach ((tile, index) => {
    if(index > 0) {
        tile.appendChild(createPiece(piecesIndexes))
    }

})