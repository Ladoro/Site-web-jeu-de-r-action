// Jeu de Temps de Réaction
let reactionBox = document.getElementById('reactionBox');
let reactionMessage = document.getElementById('reactionMessage');
let startTime;

reactionBox.addEventListener('click', function() {
    if (reactionBox.style.backgroundColor === 'green') {
        let endTime = new Date().getTime();
        let reactionTime = (endTime - startTime) / 1000;
        reactionMessage.textContent = `Temps de réaction : ${reactionTime} secondes`;
        reactionBox.style.backgroundColor = 'red';
        setTimeout(startReactionGame, Math.random() * 2000 + 1000);
    }
});

function startReactionGame() {
    reactionMessage.textContent = 'Préparez-vous...';
    setTimeout(() => {
        reactionBox.style.backgroundColor = 'green';
        startTime = new Date().getTime();
    }, Math.random() * 2000 + 1000);
}

startReactionGame();

// Jeu de Clic sur Cible
let startTargetGameButton = document.getElementById('startTargetGame');
let targetGameArea = document.getElementById('targetGameArea');
let targetGameMessage = document.getElementById('targetGameMessage');
let targetCount = 0;
let startTimeTargetGame;
let totalTargets = 30;

startTargetGameButton.addEventListener('click', startTargetGame);

function startTargetGame() {
    targetGameMessage.textContent = '';
    targetCount = 0;
    targetGameArea.innerHTML = '';
    startTimeTargetGame = new Date().getTime();
    createTarget();
}

function createTarget() {
    if (targetCount >= totalTargets) {
        let endTime = new Date().getTime();
        let totalTime = (endTime - startTimeTargetGame) / 1000;
        targetGameMessage.textContent = `Temps total : ${totalTime} secondes`;
        return;
    }
    
    let target = document.createElement('div');
    target.className = 'target';
    target.style.top = Math.random() * (targetGameArea.clientHeight - 30) + 'px';
    target.style.left = Math.random() * (targetGameArea.clientWidth - 30) + 'px';
    target.addEventListener('click', targetClicked);
    targetGameArea.appendChild(target);
}

function targetClicked(event) {
    targetCount++;
    event.target.remove();
    createTarget();
}
