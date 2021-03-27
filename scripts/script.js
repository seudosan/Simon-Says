const buttonStartGame = document.getElementById('buttonStartGame');
const yellowBoard = document.getElementById('yellowBoard');
const blueBoard = document.getElementById('blueBoard');
const redBoard = document.getElementById('redBoard');
const greenBoard = document.getElementById('greenBoard');
const gameBoardCircleTitle = document.getElementById('gameBoardCircleTitle');
const gameStatusTitle = document.getElementById('gameStatusTitle');
const gameStatusSubtitle = document.getElementById('gameStatusSubtitle');

function eventTester(element = "NO DEFINIDO") {
    alert(`This element is ${element}`);
}
class SimonSays {
    constructor() {
        this.activeGame();
        this.generateSequence();
        this.nextLevel();
    }
    activeGame() {
        changeMessageIn(gameStatusTitle, 'STARTING GAME')
        changeMessageIn(gameStatusSubtitle, 'Preparing game...')
        this.gameLevel = 1;
        this.colours = { yellow: yellowBoard, blue: blueBoard, red: redBoard, green: greenBoard }
        for(let i = 0; i <= 4; i++) {
            setTimeout(function() {
                changeMessageIn(gameBoardCircleTitle, `${-(i - 3)}`);
                switch(i) {
                    case 0:
                        yellowBoard.classList.remove('gameboard--inactive');
                        break;
                    case 1: 
                        blueBoard.classList.remove('gameboard--inactive');
                        break;
                    case 2:
                        redBoard.classList.remove('gameboard--inactive');
                        break;
                    case 3:
                        greenBoard.classList.remove('gameboard--inactive');
                        break;
                    default:
                        changeMessageIn(gameBoardCircleTitle, `SIMON`); 
                        break;
                }
            }, 1000 * i);      
        }    
    }
    generateSequence() {
        this.randomSequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    changeNumberToColour(colour) {
        switch(colour) {
            case 0:
                return 'yellow';
            case 1:
                return 'blue';
            case 2:
                return 'red';
            case 3:
                return 'green';
        }
    }
    nextLevel() {
        console.log('Level');
        this.iluminateSequence();
    }
    iluminateSequence() {
        for(let i = 0; i < this.gameLevel; i++) {
            let colour = this.changeNumberToColour(this.randomSequence[i]);
            setTimeout(() => this.iluminateColour(colour), 1000 * i);
            console.log('Iluminate');
        }
    }
    iluminateColour(colour) {
        this.colours[colour].classList.add('gameboard--light');
        setTimeout(() => this.killColour(colour) , 350);
        console.log('Iluminate');
    }
    killColour(colour) {
        this.colours[colour].classList.remove('gameboard--light');
        console.log('Kill');
    }

}

function startSimonSays() {
    buttonStartGame.classList.add('hide-element')
    var game = new SimonSays();
}
function changeMessageIn(tagId, message = 'Undefined D:') {
    tagId.innerHTML = `${message}`;
}

buttonStartGame.addEventListener('click', startSimonSays);