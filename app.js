const UNIQUE_CARDS = ['big-slice',
                      'circle-slice',
                      'full-plus-slice',
                      'slightly-cut',
                      'triangle-slice',
                      'uncut'];
const CARD_ARRAY = UNIQUE_CARDS.concat(UNIQUE_CARDS);

const gameField = document.getElementById('game-field');
let firstSelectedElem, secondSelectedElem;
let totalSelectedAmount = 0;

function shuffleCards(cardArr){
    return cardArr.slice(0)
                  .sort(() => 0.5 - Math.random());
}
function createTempEl(tag, classNames) {
    const tempElem = document.createElement(tag);
    tempElem.className = classNames;
    return tempElem;
}
function createTempWrappedImg(wrapClass, imgClass, path){
    const tempWrap = createTempEl('div', wrapClass),
          tempImg = createTempEl('img', imgClass);
    tempImg.setAttribute('src', 'img/'+path+'.png');
    tempImg.setAttribute('alt', 'watermelon ' + path);
    tempWrap.append(tempImg);
    return tempWrap;
}
function createTempCardEl(card){
    const tempCard = createTempEl('div', 'game-card');
    tempCard.append(createTempEl('div','front'), createTempWrappedImg('back','card-img',card));
    return tempCard;
}
function flipCard(e){
    if (e.target.id !== gameField.id && !e.target.parentElement.parentElement.classList.contains('active')){
        totalSelectedAmount++;
        if (totalSelectedAmount === 1){
            e.target.parentElement.classList.add('active');
            firstSelectedElem = e.target;
        } else if (totalSelectedAmount === 2){
            e.target.parentElement.classList.add('active');
            secondSelectedElem = e.target;
            if (checkSimilarity(firstSelectedElem, secondSelectedElem)){
                setTimeout(()=>{
                    firstSelectedElem.parentElement.classList.add('matched');
                    secondSelectedElem.parentElement.classList.add('matched');
                }, 1000)
            }
            setTimeout(()=>{
                    totalSelectedAmount=0;
                    firstSelectedElem.parentElement.classList.remove('active');
                    secondSelectedElem.parentElement.classList.remove('active');
                    firstSelectedElem = undefined;
                    secondSelectedElem = undefined;
                }, 1000)
        }
    }
}
function checkSimilarity(elem1, elem2){
    return elem1.parentElement.querySelector('.card-img').getAttribute('src') === elem2.parentElement.querySelector('.card-img').getAttribute('src');
}
function openCards(area){
    area.addEventListener('click', (e) => flipCard(e));
}
function handleClicks(area){
    openCards(area);
}
function setGame(field, cards){
    const cardSet = shuffleCards(cards);
    const tempElems = cardSet.map((card) => createTempCardEl(card));
    tempElems.forEach(elem => field.appendChild(elem));
    handleClicks(field);
}
setGame(gameField, CARD_ARRAY);