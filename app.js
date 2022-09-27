const UNIQUE_CARDS = [1,2,3,4,5,6];
const CARD_ARRAY = UNIQUE_CARDS.concat(UNIQUE_CARDS);
//cardArray.sort(() => 0.5 - Math.random());

const gameField = document.getElementById('game-field');
function shuffleCards(cardArr){
    return cardArr.slice(0)
                  .sort(() => 0.5 - Math.random());
}
function createTempEl(tag, classNames, textContent = '') {
    const tempElem = document.createElement(tag);
    for (const elem of classNames) {
        tempElem.classList.add(elem);
    }
    tempElem.textContent = textContent;
    return tempElem;
}
function createTempCardEl(card){
    const tempCard = createTempEl('div', ['game-card']);
    tempCard.append(createTempEl('div',['front']),
                    createTempEl('div', ['back'], card));
    return tempCard;
}
function setGame(field, cards){
    const cardSet = shuffleCards(cards);
    const tempElems = cardSet.map((card) => createTempCardEl(card));
    tempElems.forEach(elem => field.appendChild(elem));
}

setGame(gameField, CARD_ARRAY);
gameField.addEventListener('click', (e)=>{
    if (e.target !== e.currentTarget)
        e.target.classList.toggle('active');
})
