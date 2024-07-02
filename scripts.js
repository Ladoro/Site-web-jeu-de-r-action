// Variables globales
let username;
let userData = {};

// Sélectionner les éléments HTML
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const startButton = document.getElementById('startButton');
const reactionTimeGame = document.getElementById('reactionTimeGame');
const targetClickGame = document.getElementById('targetClickGame');
const reactionBox = document.getElementById('reactionBox');
const reactionMessage = document.getElementById('reactionMessage');
const startTargetGameButton = document.getElementById('startTargetGame');
const targetGameArea = document.getElementById('targetGameArea');
const targetGameMessage = document.getElementById('targetGameMessage');
const reactionResults = document.getElementById('reactionResults');
const targetResults = document.getElementById('targetResults');
const resultsSection = document.getElementById('results');
const restartReactionGameButton = document.getElementById('restartReactionGame');

// Écouter le clic sur le bouton "Commencer"
startButton.addEventListener('click', function() {
    username = usernameInput.value.trim();
    if (username) {
        userForm.style.display = 'none';
        reactionTimeGame.style.display = 'block';
        targetClickGame.style.display = 'block';
        resultsSection.style.display = 'block';
        loadUserData();
        startReactionGame();
    } else {
        alert('Veuillez entrer un nom d\'utilisateur.');
    }
});

// Charger les données de l'utilisateur depuis localStorage
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

// Sauvegarder les données de l'utilisateur dans localStorage
function saveUserData() {
    localStorage.setItem(username, JSON.stringify(userData));
}

// Afficher les résultats des jeux de réaction
function displayResults() {
    reactionResults.innerHTML = userData.reactionTimes.map(time => `<li>${time.toFixed(2)} secondes</li>`).join('');
    targetResults.innerHTML = userData.targetTimes.map(time => `<li>${time.toFixed(2)} secondes</li>`).join('');
}

// Jeu de Temps de Réaction
let startTime;

reactionBox.addEventListener('click', function() {
    if (reactionBox.style.backgroundColor === 'green') {
        let endTime = new Date().getTime();
        let reactionTime = (endTime - startTime) / 1000;
        reactionMessage.textContent = `Temps de réaction : ${reactionTime.toFixed(2)} secondes`;
        userData.reactionTimes.push(reactionTime);
        saveUserData();
        displayResults();
        reactionBox.style.backgroundColor = 'red';
        restartReactionGameButton.style.display = 'block';
    }
});

restartReactionGameButton.addEventListener('click', function() {
    restartReactionGameButton.style.display = 'none';
    startReactionGame();
});

function startReactionGame() {
    reactionMessage.textContent = 'Préparez-vous...';
    setTimeout(() => {
        reactionBox.style.backgroundColor = 'green';
        reactionMessage.textContent = 'Cliquez maintenant!';
        startTime = new Date().getTime();
    }, Math.random() * 2000 + 1000);
}

// Jeu de Clic sur Cible
let targetCount = 0;
let startTimeTargetGame;
const totalTargets = 30;

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
        targetGameMessage.textContent = `Temps total : ${totalTime.toFixed(2)} secondes`;
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
