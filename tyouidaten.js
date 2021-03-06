const big = () => {
    const randomBIG = Math.floor(Math.random() * 31967) + 1;
    return ((randomBIG <= 100) ? true : false)
};

const rush = () => {
    const randomRUSH = Math.floor(Math.random() * 999) + 1;
    return ((randomRUSH <= 602) ? true : false)
};

const continuation = () => {
    const randomOH = Math.floor(Math.random() * 99) + 1;
    return ((randomOH <= 49) ? true : false)
};

const nineRound = () => {
    const random9R = Math.floor(Math.random() * 99) + 1;
    return ((random9R <= 20) ? true : false)
};

const spentBall = (count, borderline) => {
    return Math.floor(count * borderline);
};

const bigBtn = document.getElementById('bigBtn');
const resultContainer = document.getElementById('result');
const challengeCountDom = document.getElementById('challengeCount');
const rushHundred = document.getElementById('rushHundred');
let motitama = 0;
let challengeCount = 0;
let rushHundredCount = 0;

bigBtn.addEventListener('click', () => {

    const borderline = document.getElementById('borderline').value;
    let flg = false;
    let rushFlg = false;
    let count = 0;
    let rushCount = 0;
    let nineR = 0;
    let threeR = 0;
    let dedama = 0;

    challengeCount++;
    challengeCountDom.textContent = challengeCount;

    while (!flg) {
        count++;
        if (big() === true) {
            dedama += 660;
            if (rush() === true) {
                while (!flg) {
                    let n = 0;
                    while (n < 4) {
                        const rushbonus = continuation();
                        if (rushbonus === true) {
                            if (nineRound() === true) {
                                dedama += 990;
                                nineR++;
                            } else {
                                dedama += 330;
                                threeR++;
                            }
                            rushCount++;
                            break;
                        } else if (n === 3 && rushbonus === false) {
                            rushFlg = true;
                            flg = true;
                        }
                        n++;
                    }
                }
            } else {
                flg = true;
                motitama += dedama*0.95 - spentBall(count, borderline);
                const resultMsg = document.createElement('div');
                resultMsg.innerHTML = `${count}?????????????????????<br>???????????????<br>?????? ${dedama*0.95} ???<br>?????? ${spentBall(count, borderline)} ???<br>?????????????????? ${Math.floor(motitama)}<br>---------------------`;
                resultContainer.appendChild(resultMsg);
            }     
        }
    }
    
    if (rushFlg) {
        motitama += dedama*0.95 - spentBall(count, borderline);
        const resultMsg = document.createElement('div');
        resultMsg.innerHTML = `${count}?????????????????????<br>??????RUSH ${rushCount} ???<br>3R ${threeR} ???<br>9R ${nineR} ???<br>?????? ${dedama*0.95} ???<br>?????? ${spentBall(count, borderline)} ???<br>?????????????????? ${Math.floor(motitama)}<br>---------------------`;
        resultContainer.appendChild(resultMsg);
    }

    document.getElementById('motidama').textContent = Math.floor(motitama);
    if (rushCount > 99) {
        rushHundredCount++;
        rushHundred.textContent = rushHundredCount;
    }
});