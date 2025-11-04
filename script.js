/* ===== SCRIPT.JS - LOGICA PRINCIPALE ===== */

// DOMANDE DEL QUIZ (stesso di prima)
const questions = [
    {
        id: 1,
        difficulty: "facile",
        question: "Cosa significa MAC?",
        options: ["Media Access Control", "Machine Address Component", "Multi-Access Channel", "Memory Allocation Code"],
        correct: 0,
        explanation: "MAC sta per Media Access Control"
    },
    {
        id: 2,
        difficulty: "facile",
        question: "Quanti byte è un indirizzo MAC?",
        options: ["4 byte", "6 byte", "8 byte", "12 byte"],
        correct: 1,
        explanation: "Un indirizzo MAC è 6 byte (48 bit)"
    },
    {
        id: 3,
        difficulty: "facile",
        question: "Qual è la dimensione minima del payload?",
        options: ["32 byte", "46 byte", "64 byte", "128 byte"],
        correct: 1,
        explanation: "Il payload minimo è 46 byte"
    },
    {
        id: 4,
        difficulty: "facile",
        question: "Quale standard PoE fornisce 30W?",
        options: ["802.3af", "802.3at", "802.3bt Type 3", "802.3bt Type 4"],
        correct: 1,
        explanation: "802.3at fornisce 30W"
    },
    {
        id: 5,
        difficulty: "facile",
        question: "A cosa serve Wireshark?",
        options: ["Comprimere", "Catturare traffico di rete", "Crittografare", "Instradare"],
        correct: 1,
        explanation: "Wireshark cattura e analizza traffico di rete"
    },
    {
        id: 6,
        difficulty: "media",
        question: "Perché PoE usa coppie 3 e 4?",
        options: ["Perché le coppie 1 e 2 trasportano dati", "Perché sono spesse", "Perché è efficiente", "Riservate"],
        correct: 0,
        explanation: "Per non interferire con i dati sulle coppie 1 e 2"
    },
    {
        id: 7,
        difficulty: "media",
        question: "Cosa rileva FCS?",
        options: ["MAC sorgente", "Errori di trasmissione", "Tipo di frame", "Lunghezza payload"],
        correct: 1,
        explanation: "FCS rileva errori con CRC-32"
    },
    {
        id: 8,
        difficulty: "media",
        question: "Cosa rappresentano i primi 3 byte del MAC?",
        options: ["Seriale", "OUI (ID produttore)", "Subnet", "Tipo dispositivo"],
        correct: 1,
        explanation: "OUI identifica il produttore"
    },
    {
        id: 9,
        difficulty: "media",
        question: "Filtro Wireshark per ARP?",
        options: ["eth", "tcp", "arp", "ip.src"],
        correct: 2,
        explanation: "Filtro 'arp' per ARP"
    },
    {
        id: 10,
        difficulty: "media",
        question: "Funzione primaria LLC?",
        options: ["Accesso mezzo", "Framing e flusso", "Routing", "Crittografia"],
        correct: 1,
        explanation: "LLC fornisce framing e controllo di flusso"
    },
    {
        id: 11,
        difficulty: "difficile",
        question: "Ethernet aumentato dal 1983 al 2019?",
        options: ["1K volte", "10K volte", "40K volte", "400K volte"],
        correct: 2,
        explanation: "40.000 volte (10 Mbps → 400 Gbps)"
    },
    {
        id: 12,
        difficulty: "difficile",
        question: "Come rilevare MAC spoofing?",
        options: ["Timestamp", "OUI sospetti", "Dimensione frame", "Payload"],
        correct: 1,
        explanation: "Identificando OUI impossibili"
    },
    {
        id: 13,
        difficulty: "difficile",
        question: "PoE potenza nel 2032 (raddoppia ogni 7 anni da 100W 2018)?",
        options: ["200W", "400W", "800W", "1600W"],
        correct: 3,
        explanation: "100W (2018) → 200W (2025) → 400W (2032) → 1600W (2039)"
    },
    {
        id: 14,
        difficulty: "difficile",
        question: "Type field 0x0800 indica?",
        options: ["ARP", "IPv4", "TCP", "LLC"],
        correct: 1,
        explanation: "0x0800 = IPv4"
    },
    {
        id: 15,
        difficulty: "difficile",
        question: "Perché HTTPS espone metadati?",
        options: ["Non è sicuro", "Decrittati auto", "IP, porte, pattern visibili", "Decryption speciale"],
        correct: 2,
        explanation: "IP, porte e pattern temporali rimangono visibili"
    }
];

// VARIABILI GLOBALI
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let currentUser = '';
const GITHUB_REPO_OWNER = 'Amy1403x';
const GITHUB_REPO_NAME = 'Sistemi-e-Reti-Amedeo';

// ===== FUNZIONE PER OTTENERE GITHUB TOKEN DA LOCALSTORAGE O PROMPT =====
function getGitHubToken() {
    let token = localStorage.getItem('github_token');
    if (!token) {
        token = prompt('Inserisci il GitHub Personal Access Token per salvare i punteggi:\n\n(Lo salverò localmente, non su GitHub)');
        if (token) {
            localStorage.setItem('github_token', token);
        }
    }
    return token;
}

// ===== NAVIGAZIONE PAGINE =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() { showPage('home'); }
function goAbout() { showPage('about'); }
function goQuiz() { showPage('quiz'); }
function goLeaderboard() { 
    showPage('leaderboard'); 
    loadLeaderboard();
}
function goMaterials() { showPage('materials'); }

// ===== QUIZ FUNCTIONS =====
function startQuiz() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Inserisci il tuo nome!');
        return;
    }
    
    currentUser = username;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-counter').textContent = `Domanda ${currentQuestion + 1} di ${questions.length}`;
    
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('prev-btn').style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(optionIndex) {
    const question = questions[currentQuestion];
    const isCorrect = optionIndex === question.correct;
    
    userAnswers.push({
        questionId: currentQuestion,
        userAnswer: optionIndex,
        correct: question.correct,
        isCorrect: isCorrect
    });
    
    if (isCorrect) score++;
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    buttons[optionIndex].classList.add('selected', isCorrect ? 'correct' : 'incorrect');
    buttons[question.correct].classList.add('selected', 'correct');
    
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function finishQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
    showResults();
}

function showResults() {
    const percentage = (score / questions.length * 100).toFixed(1);
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `${score}/${questions.length} (${percentage}%)`;
    
    let message = '';
    if (percentage >= 85) {
        message = '🌟 Eccellente!';
    } else if (percentage >= 70) {
        message = '✅ Buon lavoro!';
    } else if (percentage >= 50) {
        message = '📚 Non male!';
    } else {
        message = '💪 Continua a studiare!';
    }
    
    document.getElementById('message-text').textContent = message;
    showPage('results');
}

// ===== LEADERBOARD =====
async function saveToLeaderboard() {
    const token = getGitHubToken();
    
    if (!token) {
        alert('Token necessario per salvare il punteggio.');
        return;
    }
    
    const percentage = (score / questions.length * 100).toFixed(1);
    const issueData = {
        title: `[QUIZ] ${currentUser} - ${score}/${questions.length} (${percentage}%)`,
        body: JSON.stringify({
            name: currentUser,
            score: score,
            total: questions.length,
            percentage: percentage,
            timestamp: new Date().toISOString()
        }),
        labels: ['quiz-score']
    };
    
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(issueData)
            }
        );
        
        if (response.ok) {
            alert('✅ Punteggio salvato nella classifica!');
            document.getElementById('save-btn').disabled = true;
            document.getElementById('save-btn').textContent = '✓ Salvato';
        } else {
            alert('❌ Errore nel salvataggio');
        }
    } catch (error) {
        alert('❌ Errore: ' + error.message);
    }
}

async function loadLeaderboard() {
    const token = getGitHubToken();
    const loadingEl = document.getElementById('leaderboard-loading');
    const tableEl = document.getElementById('leaderboard-table');
    const errorEl = document.getElementById('leaderboard-error');
    const bodyEl = document.getElementById('leaderboard-body');
    
    loadingEl.style.display = 'block';
    tableEl.style.display = 'none';
    errorEl.style.display = 'none';
    
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues?labels=quiz-score&state=all`,
            {
                headers: token ? { 'Authorization': `token ${token}` } : {}
            }
        );
        
        if (!response.ok) throw new Error('Impossibile caricare');
        
        const issues = await response.json();
        const scores = issues.map(issue => {
            try {
                const data = JSON.parse(issue.body);
                return {
                    name: data.name,
                    score: data.score,
                    total: data.total,
                    percentage: parseFloat(data.percentage),
                    date: new Date(data.timestamp).toLocaleDateString('it-IT')
                };
            } catch (e) { return null; }
        }).filter(item => item !== null);
        
        scores.sort((a, b) => b.score - a.score);
        const top10 = scores.slice(0, 10);
        
        bodyEl.innerHTML = '';
        top10.forEach((score, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
            const row = `
                <tr>
                    <td>${medal} #${index + 1}</td>
                    <td>${score.name}</td>
                    <td>${score.score}/${score.total}</td>
                    <td>${score.percentage}%</td>
                    <td>${score.date}</td>
                </tr>
            `;
            bodyEl.innerHTML += row;
        });
        
        loadingEl.style.display = 'none';
        tableEl.style.display = 'table';
    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

function refreshLeaderboard() { loadLeaderboard(); }

