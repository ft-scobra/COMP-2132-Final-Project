class Player {
    constructor(name) {
        this.name = name;
        this.currentScore = 0;
        this.totalScore = 0;
        this.dice = [];
    }

    rollDice() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        return [dice1, dice2];
    }

    calculateScore(dice) {
        const [dice1, dice2] = dice;
        if (dice1 === 1 || dice2 === 1) {
            this.currentScore = 0;
        } else if (dice1 === dice2) {
            this.currentScore = (dice1 + dice2) * 2;
        } else {
            this.currentScore = dice1 + dice2;
        }
        this.totalScore += this.currentScore;
    }
}

const player = new Player('Player');
const computer = new Player('Computer');
let round = 0;

function updateDisplay() {
    const playerDiceImages = player.dice.map(die => `<img src="./images/dice${die}.png" class="animate">`).join('');
    const computerDiceImages = computer.dice.map(die => `<img src="./images/dice${die}.png" class="animate">`).join('');

    $('#player-dice').html(playerDiceImages);
    $('#computer-dice').html(computerDiceImages);
    $('#player-score').text(player.currentScore);
    $('#computer-score').text(computer.currentScore);
    $('#player-total-score').text(player.totalScore);
    $('#computer-total-score').text(computer.totalScore);

    setTimeout(() => {
        $('img.animate').removeClass('animate');
    }, 0);
}

function rollDice() {
    if (round < 3) {
        player.dice = player.rollDice();
        computer.dice = computer.rollDice();
        player.calculateScore(player.dice);
        computer.calculateScore(computer.dice);
        updateDisplay();
        round++;
        if (round === 3) {
            declareWinner();
        }
    }
}

function declareWinner() {
    if (player.totalScore > computer.totalScore) {
        $('#winner').text('You Win!').css('color', "green");
    } else if (player.totalScore < computer.totalScore) {
        $('#winner').text('You Lose!').css('color', "red");
    } else {
        $('#winner').text('It\'s a Tie!').css('color', "yellow");
    }
}

function resetGame() {
    player.dice = player.rollDice();
    computer.dice = computer.rollDice();
    player.currentScore = 0;
    player.totalScore = 0;
    computer.currentScore = 0;
    computer.totalScore = 0;
    round = 0;
    $('#winner').text('');
    updateDisplay();
}

$(document).ready(function () {
    $('#roll-dice').on('click', rollDice);
    $('#reset-game').on('click', resetGame);
    resetGame();
});