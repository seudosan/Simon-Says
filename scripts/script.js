const buttonStartGame = document.getElementById('buttonStartGame');
const yellowBoard = document.getElementById('yellowBoard');
const blueBoard = document.getElementById('blueBoard');
const redBoard = document.getElementById('redBoard');
const greenBoard = document.getElementById('greenBoard');
const gameBoardCircleTitle = document.getElementById('gameBoardCircleTitle');
const gameStatusTitle = document.getElementById('gameStatusTitle');
const gameStatusSubtitle = document.getElementById('gameStatusSubtitle');
const sound = new Audio('../assets/ponglong.wav');
const lastLevelGame = 3;

function eventTester(element = "NO DEFINIDO") {
    alert(`This element is ${element}`);
}
class SimonSays {
    constructor() {
        this.activeGame();
        this.generateSequence();
        this.selectColour = this.selectColour.bind(this);
    }
    activeGame() {
        changeMessageIn(gameStatusTitle, 'STARTING GAME')
        changeMessageIn(gameStatusSubtitle, 'Preparing game...')
        this.gameLevel = 1;
        this.colours = { yellow: yellowBoard, blue: blueBoard, red: redBoard, green: greenBoard }

        for(let i = 0; i <= 4; i++) {
            setTimeout(() => { /* Arrow Function para preservar el contexto interno (this) */
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
                       this.nextLevel();
                        break;
                }
            }, 1000 * i);      
        }    
    }
    disableGame() {
        changeMessageIn(gameStatusTitle, 'IN WAITING...')
        changeMessageIn(gameStatusSubtitle, `Press on "START GAME"`);
        this.stopInterval();
        buttonStartGame.classList.remove('hide-element')
    }
    generateSequence() {
        this.randomSequence = new Array(lastLevelGame).fill(0).map(n => Math.floor(Math.random() * 4));
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
    changeColourToNumber(colour) {
        switch(colour) {
            case 'yellow':
                return 0;
            case 'blue':
                return 1;
            case 'red':
                return 2;
            case 'green':
                return 3;
        }
    }
    nextLevel() {
        this.stopInterval();
        this.sequenceLevel = 0;
        changeMessageIn(gameStatusTitle, 'WHACH THE SEQUENCE!');
        changeMessageIn(gameStatusSubtitle, `Current Level: ${this.gameLevel}`);
        setTimeout(() => this.iluminateSequence(), 1500);
    }
    iluminateSequence() {
        for(let i = 0; i < this.gameLevel; i++) {
            let colour = this.changeNumberToColour(this.randomSequence[i]);
            setTimeout(() => this.iluminateColour(colour), 1500 * i);
        }
        setTimeout(() => {
            this.addClickEvents();
            this.startInterval();
            changeMessageIn(gameStatusTitle, 'REPEAT THE SEQUENCE');
        }, (this.gameLevel + 1) * 1000);
    }
    iluminateColour(colour) {
        this.colours[colour].classList.add('gameboard--light');
        sound.play();
        setTimeout(() => this.killColour(colour) , 500);
    }
    killColour(colour) {
        this.colours[colour].classList.remove('gameboard--light');
    }
    addClickEvents() {
        this.colours.yellow.addEventListener('mousedown', this.selectColour);
        this.colours.blue.addEventListener('mousedown', this.selectColour);
        this.colours.red.addEventListener('mousedown', this.selectColour);
        this.colours.green.addEventListener('mousedown', this.selectColour);
    }
    removeClickEvents() {
        this.colours.yellow.removeEventListener('mousedown', this.selectColour);
        this.colours.blue.removeEventListener('mousedown', this.selectColour);
        this.colours.red.removeEventListener('mousedown', this.selectColour);
        this.colours.green.removeEventListener('mousedown', this.selectColour);
    }
    startInterval() {
        this.secondOfTimer = 15;
        this.intervalTimer = setInterval(() => {this.regressiveCount()}, 1000);
    }
    regressiveCount() {
        if (this.secondOfTimer < 0) {
            this.stopInterval();
            this.disableGame();
        } else {
            changeMessageIn(gameBoardCircleTitle, this.secondOfTimer);
        }
        this.secondOfTimer--;
    }
    stopInterval() {
        clearInterval(this.intervalTimer);
        changeMessageIn(gameBoardCircleTitle, 'SIMON');
    }
    selectColour(ev) {
        const nameColour = ev.target.dataset.colour;
        const numberColour = this.changeColourToNumber(nameColour);
        this.iluminateColour(nameColour);
        if (numberColour === this.randomSequence[this.sequenceLevel]) {
            this.sequenceLevel++;
            if(this.sequenceLevel === this.gameLevel) {
                this.gameLevel++;
                this.removeClickEvents();
                if(this.gameLevel === (lastLevelGame + 1)) {
                    this.winAlert();
                    this.disableGame();
                } else {
                    this.nextLevel()
                }
            }
        } else {
            this.removeClickEvents();
            this.disableGame();
            this.loseAlert();
        }
    }
    winAlert() {
        swal({
            title: "GOOD GAME!",
            text: 'You have completed all the sequences correctly.',
            icon: "success",
            buttons: false,
            timer: 5000
          });
    }
    loseAlert() {
        swal({
            title: "GAME OVER!",
            text: `Oops! You were unable to complete the sequence. 
            Luck for the next.`,
            icon: "error",
            buttons: false,
            timer: 5000
          });
    }
}

function reverseInterval(seconds) {
    let sec = seconds;
    setInterval(() => {
        changeMessageIn(gameBoardCircleTitle, sec);
        sec--;
    }, 1000);
}

function startSimonSays() {
    buttonStartGame.classList.add('hide-element')
    window.game = new SimonSays();
}
function changeMessageIn(tagId, message = 'Undefined D:') {
    tagId.innerHTML = `${message}`;
}

buttonStartGame.addEventListener('click', startSimonSays);