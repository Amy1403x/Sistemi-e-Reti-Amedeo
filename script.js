/* ===== SCRIPT.JS - LOGICA PRINCIPALE ===== */

// DOMANDE DEL QUIZ
const questions = [
    {
        id: 1,
        difficulty: "facile",
        question: "Cosa significa MAC?",
        options: ["Media Access Control", "Machine Address Component", "Multi-Access Channel", "Memory Allocation Code"],
        correct: 0,
        explanation: "MAC sta per Media Access Control - il protocollo che controlla l'accesso al mezzo fisico."
    },
    {
        id: 2,
        difficulty: "facile",
        question: "Quanti byte è un indirizzo MAC?",
        options: ["4 byte", "6 byte", "8 byte", "12 byte"],
        correct: 1,
        explanation: "Un indirizzo MAC è composto da 48 bit (6 byte), solitamente scritto come AA:BB:CC:DD:EE:FF."
    },
    {
        id: 3,
        difficulty: "facile",
        question: "Qual è la dimensione minima del payload in un frame Ethernet?",
        options: ["32 byte", "46 byte", "64 byte", "128 byte"],
        correct: 1,
        explanation: "Il payload minimo è 46 byte. Se i dati sono inferiori, viene aggiunto padding."
    },
    {
        id: 4,
        difficulty: "facile",
        question: "Quale standard PoE fornisce 30W di potenza?",
        options: ["802.3af", "802.3at", "802.3bt Type 3", "802.3bt Type 4"],
        correct: 1,
        explanation: "802.3at (PoE+) fornisce 30W. 802.3af fornisce 15.4W, mentre 802.3bt fornisce 60W e 100W."
    },
    {
        id: 5,
        difficulty: "facile",
        question: "A cosa serve Wireshark?",
        options: ["Comprimere i pacchetti", "Catturare e analizzare il traffico di rete", "Crittografare i dati", "Instradare il traffico"],
        correct: 1,
        explanation: "Wireshark è un analizzatore di protocolli di rete usato per catturare e visualizzare il traffico."
    },
    {
        id: 6,
        difficulty: "media",
        question: "Perché PoE 802.3at usa le coppie 3 e 4 per la trasmissione della potenza?",
        options: ["Perché le coppie 1 e 2 trasportano dati", "Perché le coppie 3 e 4 sono più spesse", "Perché è più efficiente", "Perché le 1 e 2 sono riservate"],
        correct: 0,
        explanation: "PoE usa le coppie libere (3 e 4) per evitare interferenze con la trasmissione dati sulle coppie 1 e 2."
    },
    {
        id: 7,
        difficulty: "media",
        question: "Cosa rileva il campo FCS (Frame Check Sequence)?",
        options: ["L'indirizzo MAC sorgente", "Gli errori di trasmissione nel frame", "Il tipo di frame", "La lunghezza del payload"],
        correct: 1,
        explanation: "FCS utilizza CRC-32 per rilevare errori di trasmissione con una precisione del 99.9999997%."
    },
    {
        id: 8,
        difficulty: "media",
        question: "Cosa rappresentano i primi 3 byte di un indirizzo MAC?",
        options: ["Il numero seriale del dispositivo", "L'OUI (Organizationally Unique Identifier) - ID del produttore", "La subnet di rete", "Il tipo di dispositivo"],
        correct: 1,
        explanation: "I primi 3 byte formano l'OUI, identificando il produttore. Es: CC:46:D6 = Cisco."
    },
    {
        id: 9,
        difficulty: "media",
        question: "In Wireshark, quale filtro useresti per visualizzare solo il traffico ARP?",
        options: ["eth", "tcp", "arp", "ip.src"],
        correct: 2,
        explanation: "Il filtro 'arp' visualizza solo i frame di Address Resolution Protocol."
    },
    {
        id: 10,
        difficulty: "media",
        question: "Qual è la funzione primaria del sottolivello LLC?",
        options: ["Controllo di accesso al mezzo fisico", "Framing, controllo di flusso e verifica errori", "Instradamento pacchetti", "Crittografia dati"],
        correct: 1,
        explanation: "LLC (Logical Link Control) fornisce framing, controllo di flusso e verifica errori."
    },
    {
        id: 11,
        difficulty: "difficile",
        question: "Di quante volte è aumentata la larghezza di banda di Ethernet dal 1983 al 2019?",
        options: ["1.000 volte", "10.000 volte", "40.000 volte", "400.000 volte"],
        correct: 2,
        explanation: "Da 10 Mbps (1983) a 400 Gbps (2019), Ethernet è aumentato di 40.000 volte!"
    },
    {
        id: 12,
        difficulty: "difficile",
        question: "Come potresti usare Wireshark per rilevare il MAC spoofing?",
        options: ["Guardando il campo timestamp", "Monitorando indirizzi MAC che non corrispondono agli OUI noti", "Controllando la dimensione del frame", "Analizzando il payload"],
        correct: 1,
        explanation: "Puoi rilevare il MAC spoofing identificando indirizzi MAC con valori OUI impossibili."
    },
    {
        id: 13,
        difficulty: "difficile",
        question: "Quale sarebbe la capacità di potenza PoE stimata nel 2032 se raddoppia ogni 7 anni da 100W nel 2018?",
        options: ["200W", "400W", "800W", "1600W"],
        correct: 3,
        explanation: "Da 100W (2018) → 200W (2025) → 400W (2032) → seguendo la crescita esponenziale."
    },
    {
        id: 14,
        difficulty: "difficile",
        question: "Nel formato Ethernet II, cosa indica un valore del campo Type di 0x0800?",
        options: ["Protocollo ARP", "Protocollo IPv4", "Protocollo TCP", "Protocollo LLC"],
        correct: 1,
        explanation: "0x0800 nel campo Type indica che il frame contiene dati IPv4."
    },
    {
        id: 15,
        difficulty: "difficile",
        question: "Perché la crittografia HTTPS può comunque far trapelare metadati?",
        options: ["Perché HTTPS non è veramente sicuro", "Perché i pacchetti vengono decrittati automaticamente", "Perché indirizzi IP, porte e pattern temporali rimangono visibili", "Perché Wireshark ha capacità di decrittazione"],
        correct: 2,
        explanation: "I metadati rimangono visibili: IP, porte, dimensioni pacchetti e pattern temporali."
    }
];

// VARIABILI GLOBALI
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let currentUser = '';

// ===== NAVIGAZIONE PAGINE =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() { showPage('home'); }
function goAbout() { showPage('about'); }
function goQuiz() { showPage('quiz'); }
function goLeaderboard() { showPage('leaderboard'); loadLeaderboard(); }
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
        message = '🌟 Eccellente! Conosci veramente bene il Data Link Layer!';
    } else if (percentage >= 70) {
        message = '✅ Buon lavoro! Hai una buona comprensione del materiale.';
    } else if (percentage >= 50) {
        message = '📚 Non male! Ma dovresti ripassare un po\'.';
    } else {
        message = '💪 Continua a studiare! Non ti scoraggiare!';
    }
    
    document.getElementById('message-text').textContent = message;
    showPage('results');
}

// ===== GITHUB LEADERBOARD =====
async function saveToLeaderboard() {
    if (!GITHUB_TOKEN || GITHUB_TOKEN === 'ghp_INSERISCI_IL_TUO_TOKEN_QUI') {
        alert('⚠️ Errore: Token GitHub non configurato!\n\nPer abilitare la leaderboard:\n1. Apri config.js\n2. Genera un token su: https://github.com/settings/tokens\n3. Inserisci il token in config.js:\n   const GITHUB_TOKEN = \'ghp_TUO_TOKEN\';\n4. NON caricare config.js su GitHub!');
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
                    'Authorization': `token ${GITHUB_TOKEN}`,
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
            const error = await response.json();
            alert('❌ Errore: ' + (error.message || 'Impossibile salvare il punteggio'));
        }
    } catch (error) {
        alert('❌ Errore di connessione: ' + error.message);
    }
}

async function loadLeaderboard() {
    const loadingEl = document.getElementById('leaderboard-loading');
    const tableEl = document.getElementById('leaderboard-table');
    const errorEl = document.getElementById('leaderboard-error');
    const bodyEl = document.getElementById('leaderboard-body');
    
    loadingEl.style.display = 'block';
    tableEl.style.display = 'none';
    errorEl.style.display = 'none';
    
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues?labels=quiz-score&state=all&per_page=100`,
            {
                headers: GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {}
            }
        );
        
        if (!response.ok) throw new Error('Impossibile caricare la classifica');
        
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
            } catch (e) {
                return null;
            }
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
        errorEl.textContent = '❌ Errore nel caricamento della classifica: ' + error.message;
    }
}

function refreshLeaderboard() {
    loadLeaderboard();
}