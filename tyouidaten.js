const big = () => {
    const randomBIG = Math.floor(Math.random() * 31967) + 1;
    return ((randomBIG <= 100) ? true : false)
};

const rush = () => {
    const randomRUSH = Math.floor(Math.random() * 999) + 1;
    return ((randomRUSH <= 602) ? true : false)
};

const continuationTS = () => {
    const randomTS = Math.floor(Math.random() * 99) + 1;
    return ((randomTS <= 86) ? true : false) 
};

const continuationOH = () => {
    const randomOH = Math.floor(Math.random() * 99) + 1;
    return ((randomOH <= 49) ? true : false)
};

const nineRound = () => {
    const random9R = Math.floor(Math.random() * 99) + 1;
    return ((random9R <= 20) ? true : false)
};

const spentBall = (count, borderline) => {
    return Math.floor(count * borderline);
}

const bigBtn = document.getElementById('bigBtn');
const resultContainer = document.getElementById('result');
const challengeCountDom = document.getElementById('challengeCount');
let motitama = 0;
let challengeCount = 0;

bigBtn.addEventListener('click', () => {

    const borderline = document.getElementById('borderline').value;
    let flg = false;
    let tsFlg = false;
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
                    tsFlg = false;
                    if (continuationTS() === true) {
                        if (nineRound() === true) {
                            dedama += 990;
                            nineR++;
                        } else {
                            dedama += 330;
                            threeR++;
                        }
                        rushCount++;
                        tsFlg = true;
                    }
                    if (!tsFlg) {
                        if (continuationOH() === true) {
                            if (nineRound() === true) {
                                dedama += 990;
                                nineR++;
                            } else {
                                dedama += 330;
                                threeR++;
                            }
                            rushCount++;
                        } else {
                            flg = true;
                            rushFlg = true;
                        }
                    }
                }
            } else {
                flg = true;
                motitama += dedama*0.95 - spentBall(count, borderline);
                const resultMsg = document.createElement('div');
                resultMsg.innerHTML = `${count}回目で大当たり<br>単発で終了<br>出玉 ${dedama*0.95} 発<br>投資 ${spentBall(count, borderline)} 発<br>現在の持ち玉 ${Math.floor(motitama)}<br>---------------------`;
                resultContainer.appendChild(resultMsg);
            }     
        }
    }
    
    if (rushFlg) {
        motitama += dedama*0.95 - spentBall(count, borderline);
        const resultMsg = document.createElement('div');
        resultMsg.innerHTML = `${count}回目で大当たり<br>超源RUSH ${rushCount} 回<br>3R ${threeR} 回<br>9R ${nineR} 回<br>出玉 ${dedama*0.95} 発<br>投資 ${spentBall(count, borderline)} 発<br>現在の持ち玉 ${Math.floor(motitama)}<br>---------------------`;
        resultContainer.appendChild(resultMsg);
    }

    document.getElementById('motidama').textContent = Math.floor(motitama);

});
