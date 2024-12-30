let player = {
    name: "Tim",
    chips: 2000,
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.querySelector("#cards-el")

renderPlayer()

function renderPlayer(){
    let playerEl = document.querySelector("#player-el")
    playerEl.textContent = player.name + ": $" + player.chips
}

function getRandomCard(){
    let randomNum = Math.floor(Math.random()*13) + 1

    if (randomNum === 1){
        return 11
    }

    if (randomNum >= 11){
        return 10
    }

    return randomNum
}

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    hasBlackJack = false
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    isAlive = true
    if ((player.chips - 500) < 0){
        messageEl.textContent = "You do not have enough chips!"
        isAlive = false
        return;
    } else if ((player.chips == 0)){
        messageEl.textContent = "You are out of chips!"
        isAlive = false
        return;
    }else {
        player.chips -= 500
        renderPlayer()
        renderGame()
    }
}

function renderGame() {
    if (player.chips < 0){
        messageEl.textContent = "You are out of chips!"
        return;
    }
    sumEl.textContent = "Sum: " + sum
    cardsEl.textContent = "Cards: " + cards.join(" ")
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 1000
        renderPlayer()
    } else {
        message = "You're out of the game!"
        isAlive = false
        renderPlayer()
    }
    messageEl.textContent = message
}

function newCard() {

    if (isAlive && !hasBlackJack){
        let newCard = getRandomCard()
        sum += newCard
        cards.push(newCard)
        renderGame()
    }

}