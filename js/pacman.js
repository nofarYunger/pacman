'use strict'
const PACMAN = '<img class="char" src="./imgs/pacman.jpg" />'



var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        class: 'left'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) {
        updateScore(10)
    } else if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--
        if (gFoodCount === 0) {
            return winGame()
        }

    } else if (nextCell === SUPER_FOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true
            setTimeout(normalize, 5000)
        } else {
            return
            //❗❗❗ need to change it❗❗❗❗
        }
    } else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            updateScore(20)
            for (var i = 0; i < gGhosts.length; i++) {
                if (nextLocation.i === gGhosts[i].location.i && nextLocation.j === gGhosts[i].location.j) {
                    gGhosts[i].location.i = 3
                    gGhosts[i].location.j = 3

                    var deadGhost = gGhosts.splice(i, 1)[0]
                    gDeadGhosts.push(deadGhost)
                }
            }
        } else {
            renderCell(gPacman.location, EMPTY)
            gameOver();
            return;
        }

    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML());
}

function getPacmanHTML() {
    return `<img class="char ${gPacman.class}" src="./imgs/pacman.jpg" />`
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.class = 'up'
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gPacman.class = 'down'
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gPacman.class = 'left'
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gPacman.class = 'right'
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function normalize() {
    gGhosts = gGhosts.concat(gDeadGhosts)
    gPacman.isSuper = false
    gDeadGhosts = []
}

