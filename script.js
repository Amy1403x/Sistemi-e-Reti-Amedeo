const questions = [
    { id: 1, difficulty: "facile", question: "Cosa significa MAC?", options: ["Media Access Control", "Machine Address Component", "Multi-Access Channel", "Memory Allocation Code"], correct: 0 },
    { id: 2, difficulty: "facile", question: "Quanti byte è un indirizzo MAC?", options: ["4 byte", "6 byte", "8 byte", "12 byte"], correct: 1 },
    { id: 3, difficulty: "facile", question: "Qual è la dimensione minima del payload?", options: ["32 byte", "46 byte", "64 byte", "128 byte"], correct: 1 },
    { id: 4, difficulty: "facile", question: "Quale standard PoE fornisce 30W?", options: ["802.3af", "802.3at", "802.3bt Type 3", "802.3bt Type 4"], correct: 1 },
    { id: 5, difficulty: "facile", question: "A cosa serve Wireshark?", options: ["Comprimere", "Catturare traffico di rete", "Crittografare", "Instradare"], correct: 1 },
    { id: 6, difficulty: "media", question: "Perché PoE usa coppie 3 e 4?", options: ["Perché le coppie 1 e 2 trasportano dati", "Perché sono spesse", "Perché è efficiente", "Riservate"], correct: 0 },
    { id: 7, difficulty: "media", question: "Cosa rileva FCS?", options: ["MAC sorgente", "Errori di trasmissione", "Tipo di frame", "Lunghezza payload"], correct: 1 },
    { id: 8, difficulty: "media", question: "Cosa rappresentano i primi 3 byte del MAC?", options: ["Seriale", "OUI (ID produttore)", "Subnet", "Tipo dispositivo"], correct: 1 },
    { id: 9, difficulty: "media", question: "Filtro Wireshark per ARP?", options: ["eth", "tcp", "arp", "ip.src"], correct: 2 },
    { id: 10, difficulty: "media", question: "Funzione primaria LLC?", options: ["Accesso mezzo", "Framing e flusso", "Routing", "Crittografia"], correct: 1 },
    { id: 11, difficulty: "difficile", question: "Ethernet aumentato dal 1983 al 2019?", options: ["1K volte", "10K volte", "40K volte", "400K volte"], correct: 2 },
    { id: 12, difficulty: "difficile", question: "Come rilevare MAC spoofing?", options: ["Timestamp", "OUI sospetti", "Dimensione frame", "Payload"], correct: 1 },
    { id: 13, difficulty: "difficile", question: "PoE potenza nel 2032?", options: ["200W", "400W", "800W", "1600W"], correct: 3 },
    { id: 14, difficulty: "difficile", question: "Type field 0x0800 indica?", options: ["ARP", "IPv4", "TCP", "LLC"], correct: 1 },
    { id: 15, difficulty: "difficile", question: "Perché HTTPS espone metadati?", options: ["Non è sicuro", "Decrittati auto", "IP, porte, pattern visibili", "Decryption speciale"], correct: 2 }
];

let currentQuestion = 0, score = 0, userAnswers = [], currentUser = '';
const GITHUB_REPO_OWNER = 'Amy1403x';
const GITHUB_REPO_NAME = 'Sistemi-e-Reti-Amedeo';

function getGitHubToken() {
    let token = localStorage.getItem('github_token');
    if (!token) {
        token = prompt('Inserisci il GitHub Personal Access Token:');
        if (token) localStorage.setItem('github_token', token);
    }
    return token;
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() { showPage('home'); }
function goAbout() { showPage('about'); }
function goQuiz() { showPage('quiz'); }
function goLeaderboard() { showPage('leaderboard'); loadLeaderboard(); }
function goMaterials() { showPage('materials'); }

function startQuiz() {
    const username = document.getElementById('username').value.trim();
    if (!username) { alert('Inserisci il tuo nome!'); return; }
    currentUser = username;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('question-counter').textContent = `Domanda ${currentQuestion + 1} di ${questions.length}`;
    document.getElementById('progress-fill').style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
    
    const opts = document.getElementById('options-container');
    opts.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(idx);
        opts.appendChild(btn);
    });
    
    document.getElementById('prev-btn').style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(idx) {
    const q = questions[currentQuestion];
    const isCorrect = idx === q.correct;
    userAnswers.push({ isCorrect });
    if (isCorrect) score++;
    
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.add('disabled'));
    btns[idx].classList.add('selected', isCorrect ? 'correct' : 'incorrect');
    btns[q.correct].classList.add('selected', 'correct');
    
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
    if (currentQuestion > 0) currentQuestion--;
    showQuestion();
}

function finishQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
    const pct = (score / questions.length * 100).toFixed(1);
    document.getElementById('score-display').textContent = `${score}/${questions.length} (${pct}%)`;
    document.getElementById('message-text').textContent = pct >= 85 ? '🌟 Eccellente!' : pct >= 70 ? '✅ Buon lavoro!' : pct >= 50 ? '📚 Non male!' : '💪 Continua!';
    showPage('results');
}

async function saveToLeaderboard() {
    const token = getGitHubToken();
    if (!token) { alert('Token necessario'); return; }
    
    const pct = (score / questions.length * 100).toFixed(1);
    const data = {
        title: `[QUIZ] ${currentUser} - ${score}/${questions.length}`,
        body: JSON.stringify({ name: currentUser, score, total: questions.length, percentage: pct, timestamp: new Date().toISOString() }),
        labels: ['quiz-score']
    };
    
    try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`, {
            method: 'POST',
            headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('✅ Salvato!');
            document.getElementById('save-btn').disabled = true;
            document.getElementById('save-btn').textContent = '✓ Salvato';
        } else alert('❌ Errore');
    } catch (e) { alert('❌ ' + e.message); }
}

async function loadLeaderboard() {
    const token = getGitHubToken();
    document.getElementById('leaderboard-loading').style.display = 'block';
    document.getElementById('leaderboard-table').style.display = 'none';
    
    try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues?labels=quiz-score&state=all`, {
            headers: token ? { 'Authorization': `token ${token}` } : {}
        });
        const issues = await res.json();
        const scores = issues.map(i => {
            try {
                const data = JSON.parse(i.body);
                return { name: data.name, score: data.score, total: data.total, percentage: data.percentage, date: new Date(data.timestamp).toLocaleDateString('it-IT') };
            } catch (e) { return null; }
        }).filter(s => s).sort((a, b) => b.score - a.score).slice(0, 10);
        
        const body = document.getElementById('leaderboard-body');
        body.innerHTML = '';
        scores.forEach((s, idx) => {
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '  ';
            body.innerHTML += `<tr><td>${medal} #${idx + 1}</td><td>${s.name}</td><td>${s.score}/${s.total}</td><td>${s.percentage}%</td><td>${s.date}</td></tr>`;
        });
        
        document.getElementById('leaderboard-loading').style.display = 'none';
        document.getElementById('leaderboard-table').style.display = 'table';
    } catch (e) {
        document.getElementById('leaderboard-loading').style.display = 'none';
        document.getElementById('leaderboard-error').style.display = 'block';
    }
}

function refreshLeaderboard() { loadLeaderboard(); }

