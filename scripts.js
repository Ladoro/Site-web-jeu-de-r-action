// Variables globales
let username;
let userData = {};

// Sélectionner les éléments HTML
let userForm = document.getElementById('userForm');
let usernameInput = document.getElementById('username');
let startButton = document.getElementById('startButton');
let reactionTimeGame = document.getElementById('reactionTimeGame');
let targetClickGame = document.getElementById('targetClickGame');
let reactionBox = document.getElementById('reactionBox');
let reactionMessage = document.getElementById('reactionMessage');
let startTargetGameButton = document.getElementById('startTargetGame');
let targetGameArea = document.getElementById('targetGameArea');
let targetGameMessage = document.getElementById('targetGameMessage');
let reactionResults = document.getElementById('reactionResults');
let targetResults = document.getElementById('targetResults');
let resultsSection = document.getElementById('results');

startButton.addEventListener('click', function() {
    username = usernameInput.value;
    if (username) {
        userForm.style.display = 'none';
        reactionTimeGame.style.display = 'block';
        targetClickGame.style.display = 'block';
        resultsSection.style.display = 'block';
        loadUserData();
        startReactionGame();
    }
});

function loadUserData() {
    let storedData = localStorage.getItem(username);
    if (storedData) {
        userData = JSON.parse(storedData);
        displayResults();
    } else {
        userData = {
            reactionTimes: [],
            targetTimes: []
        };
    }
}

function saveUserData() {
    localStorage.setItem(username, JSON.stringify(userData));
}

function displayResults() {
    reactionResults.innerHTML = userData.reactionTimes.map(time => `<li>${time} secondes</li>`).join('');
    targetResults.innerHTML = userData.targetTimes.map(time => `<li>${time} secondes</li>`).join('');
}

// Jeu de Temps de Réaction
let startTime;

reactionBox.addEventListener('click', function() {
    if (reactionBox.style.backgroundColor === 'green') {
        let endTime = new Date().getTime();
        let reactionTime = (endTime - startTime) / 1000;
        reactionMessage.textContent = `Temps de réaction : ${reactionTime} secondes`;
        userData.reactionTimes.push(reactionTime);
        saveUserData();
        displayResults();
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

// Jeu de Clic sur Cible
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
        userData.targetTimes.push(totalTime);
        saveUserData();
        displayResults();
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
