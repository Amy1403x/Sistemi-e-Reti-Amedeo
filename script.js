// GitHub API Configuration
const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'Amy1403x';
const REPO_NAME = 'Sistemi-e-Reti-Amedeo';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE'; // Replace with your GitHub token
const QUIZ_LABEL = 'quiz-score';

// Quiz Data
const quizData = [
  {
    id: 1,
    difficulty: 'facile',
    category: 'Struttura Frame Ethernet',
    question: 'Cosa significa MAC?',
    options: [
      'Media Access Control',
      'Machine Address Component',
      'Multi-Access Channel',
      'Memory Allocation Code'
    ],
    correct: 0,
    explanation: 'MAC sta per Media Access Control, il protocollo che controlla l\'accesso al mezzo fisico e gestisce gli indirizzi hardware.'
  },
  {
    id: 2,
    difficulty: 'facile',
    category: 'Indirizzamento MAC',
    question: 'Quanti byte è un indirizzo MAC?',
    options: ['4 byte', '6 byte', '8 byte', '12 byte'],
    correct: 1,
    explanation: 'Un indirizzo MAC è composto da 48 bit (6 byte), solitamente scritto come AA:BB:CC:DD:EE:FF in notazione esadecimale.'
  },
  {
    id: 3,
    difficulty: 'facile',
    category: 'Struttura Frame Ethernet',
    question: 'Qual è la dimensione minima del payload in un frame Ethernet?',
    options: ['32 byte', '46 byte', '64 byte', '128 byte'],
    correct: 1,
    explanation: 'Il payload minimo è 46 byte. Se i dati sono inferiori, viene aggiunto padding per garantire la dimensione minima del frame.'
  },
  {
    id: 4,
    difficulty: 'facile',
    category: 'Power over Ethernet',
    question: 'Quale standard PoE fornisce 30W di potenza?',
    options: ['802.3af', '802.3at', '802.3bt Type 3', '802.3bt Type 4'],
    correct: 1,
    explanation: '802.3at (PoE+) fornisce 30W. 802.3af fornisce 15.4W, mentre 802.3bt Type 3 e Type 4 forniscono 60W e 100W rispettivamente.'
  },
  {
    id: 5,
    difficulty: 'facile',
    category: 'Wireshark',
    question: 'A cosa serve Wireshark?',
    options: [
      'Comprimere i pacchetti',
      'Crittografare i dati',
      'Catturare e analizzare il traffico di rete',
      'Instradare il traffico'
    ],
    correct: 2,
    explanation: 'Wireshark è un analizzatore di protocolli di rete usato per catturare e visualizzare il traffico di rete in tempo reale.'
  },
  {
    id: 6,
    difficulty: 'media',
    category: 'Power over Ethernet',
    question: 'Perché PoE 802.3at usa le coppie 3 e 4 per la trasmissione della potenza?',
    options: [
      'Perché le coppie 1 e 2 trasportano dati e non devono essere disturbate',
      'Perché le coppie 3 e 4 sono più spesse',
      'Perché è più efficiente',
      'Perché le coppie 1 e 2 sono riservate dal protocollo'
    ],
    correct: 0,
    explanation: 'PoE usa le coppie libere (3 e 4) per evitare interferenze con la trasmissione dati sulle coppie 1 e 2, permettendo dati e potenza sullo stesso cavo.'
  },
  {
    id: 7,
    difficulty: 'media',
    category: 'Struttura Frame Ethernet',
    question: 'Cosa rileva il campo FCS (Frame Check Sequence)?',
    options: [
      'L\'indirizzo MAC sorgente',
      'Gli errori di trasmissione nel frame',
      'Il tipo di frame',
      'La lunghezza del payload'
    ],
    correct: 1,
    explanation: 'FCS utilizza CRC-32 per rilevare errori di trasmissione con una precisione straordinaria: rileva il 100% degli errori a 1 e 2 bit, e il 99.9999997% di tutti gli altri errori.'
  },
  {
    id: 8,
    difficulty: 'media',
    category: 'Indirizzamento MAC',
    question: 'Cosa rappresentano i primi 3 byte di un indirizzo MAC?',
    options: [
      'Il numero seriale del dispositivo',
      'L\'Organizationally Unique Identifier (OUI) - ID del produttore',
      'La subnet di rete',
      'Il tipo di dispositivo'
    ],
    correct: 1,
    explanation: 'I primi 3 byte (24 bit) formano l\'OUI, identificando il produttore. Ad esempio: CC:46:D6 identifica i dispositivi Cisco, 3C:5A:B4 identifica Google.'
  },
  {
    id: 9,
    difficulty: 'media',
    category: 'Wireshark',
    question: 'In Wireshark, quale filtro useresti per visualizzare solo il traffico ARP?',
    options: ['eth', 'tcp', 'arp', 'ip.src'],
    correct: 2,
    explanation: 'Il filtro \'arp\' visualizza solo i frame di Address Resolution Protocol, usati per mappare indirizzi IP a indirizzi MAC sulla rete locale.'
  },
  {
    id: 10,
    difficulty: 'media',
    category: 'Data Link Layer',
    question: 'Qual è la funzione primaria del sottolivello LLC?',
    options: [
      'Controllo di accesso al mezzo fisico',
      'Framing, controllo di flusso e verifica errori',
      'Instradamento pacchetti',
      'Crittografia dati'
    ],
    correct: 1,
    explanation: 'LLC (Logical Link Control) fornisce servizi di framing, controllo di flusso e verifica errori ai livelli superiori del modello OSI.'
  },
  {
    id: 11,
    difficulty: 'difficile',
    category: 'Evoluzione Ethernet',
    question: 'Di quante volte è aumentata la larghezza di banda di Ethernet dal 1983 al 2019?',
    options: ['1.000 volte', '10.000 volte', '40.000 volte', '400.000 volte'],
    correct: 2,
    explanation: 'Da 10 Mbps (1983) a 400 Gbps (2019), Ethernet è aumentato di 40.000 volte in velocità - un risultato straordinario in 36 anni!'
  },
  {
    id: 12,
    difficulty: 'difficile',
    category: 'Sicurezza di Rete',
    question: 'Come potresti usare Wireshark per rilevare il MAC spoofing su una rete?',
    options: [
      'Guardando il campo timestamp',
      'Monitorando indirizzi MAC che non corrispondono agli OUI noti',
      'Controllando la dimensione del frame',
      'Analizzando il payload'
    ],
    correct: 1,
    explanation: 'Puoi rilevare il MAC spoofing identificando indirizzi MAC con valori OUI impossibili o confrontandoli con indirizzi MAC legittimi noti nel tuo inventario di rete.'
  },
  {
    id: 13,
    difficulty: 'difficile',
    category: 'Power over Ethernet',
    question: 'Quale sarebbe la capacità di potenza PoE stimata nel 2032 se raddoppia ogni 7 anni da 100W nel 2018?',
    options: ['200W', '400W', '800W', '1600W'],
    correct: 1,
    explanation: 'Da 100W (2018) → 200W (2025) → 400W (2032). Seguendo il pattern di crescita esponenziale, potrebbe raggiungere ~1600W entro il 2039.'
  },
  {
    id: 14,
    difficulty: 'difficile',
    category: 'Struttura Frame Ethernet',
    question: 'Nel formato Ethernet II, cosa indica un valore del campo Type di 0x0800?',
    options: ['Protocollo ARP', 'Protocollo IPv4', 'Protocollo TCP', 'Protocollo LLC'],
    correct: 1,
    explanation: '0x0800 nel campo Type indica che il frame contiene dati IPv4. 0x0806 indicherebbe ARP, 0x86DD indicherebbe IPv6.'
  },
  {
    id: 15,
    difficulty: 'difficile',
    category: 'Analisi di Rete',
    question: 'Perché la crittografia HTTPS può comunque far trapelare metadati visibili in Wireshark?',
    options: [
      'Perché HTTPS non è veramente sicuro',
      'Perché i pacchetti vengono decrittati automaticamente',
      'Perché indirizzi IP, porte e pattern temporali rimangono visibili anche se il payload è crittato',
      'Perché Wireshark ha capacità di decrittazione speciale'
    ],
    correct: 2,
    explanation: 'Anche con HTTPS, i metadati rimangono visibili: indirizzi IP sorgente/destinazione, porte, dimensioni pacchetti e pattern temporali possono rivelare abitudini di navigazione.'
  }
];

// Application state (memory-based storage)
let appState = {
  currentSection: 'landing',
  userName: '',
  currentQuestionIndex: 0,
  userAnswers: [],
  quizStartTime: null,
  quizEndTime: null,
  lastScore: null
};

// DOM elements
const sections = {
  landing: document.getElementById('landing'),
  about: document.getElementById('about'),
  materials: document.getElementById('materials'),
  quiz: document.getElementById('quiz'),
  results: document.getElementById('results'),
  leaderboard: document.getElementById('leaderboard')
};

const elements = {
  // Landing
  startQuizBtn: document.getElementById('startQuizBtn'),
  aboutNavBtn: document.getElementById('aboutNavBtn'),
  materialsNavBtn: document.getElementById('materialsNavBtn'),
  
  // About
  backFromAboutBtn: document.getElementById('backFromAboutBtn'),
  aboutFromQuizBtn: document.getElementById('aboutFromQuizBtn'),
  
  // Materials
  backFromMaterialsBtn: document.getElementById('backFromMaterialsBtn'),
  
  // Quiz
  nameInput: document.getElementById('nameInput'),
  userName: document.getElementById('userName'),
  beginQuizBtn: document.getElementById('beginQuizBtn'),
  quizInterface: document.getElementById('quizInterface'),
  questionCounter: document.getElementById('questionCounter'),
  difficultyBadge: document.getElementById('difficultyBadge'),
  progressFill: document.getElementById('progressFill'),
  questionText: document.getElementById('questionText'),
  optionsContainer: document.getElementById('optionsContainer'),
  feedbackContainer: document.getElementById('feedbackContainer'),
  explanationContainer: document.getElementById('explanationContainer'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  
  // Results
  scoreNumber: document.getElementById('scoreNumber'),
  scorePercentage: document.getElementById('scorePercentage'),
  performanceMessage: document.getElementById('performanceMessage'),
  resultUserName: document.getElementById('resultUserName'),
  categoryResults: document.getElementById('categoryResults'),
  saveToLeaderboardBtn: document.getElementById('saveToLeaderboardBtn'),
  viewLeaderboardBtn: document.getElementById('viewLeaderboardBtn'),
  shareResultsBtn: document.getElementById('shareResultsBtn'),
  retakeQuizBtn: document.getElementById('retakeQuizBtn'),
  
  // Leaderboard
  backFromLeaderboardBtn: document.getElementById('backFromLeaderboardBtn'),
  refreshLeaderboardBtn: document.getElementById('refreshLeaderboardBtn'),
  leaderboardLoading: document.getElementById('leaderboardLoading'),
  leaderboardError: document.getElementById('leaderboardError'),
  leaderboardTable: document.getElementById('leaderboardTable')
};

// Navigation functions
function showSection(sectionName) {
  Object.keys(sections).forEach(key => {
    sections[key].classList.remove('active');
  });
  sections[sectionName].classList.add('active');
  appState.currentSection = sectionName;
  window.scrollTo(0, 0);
}

// Event listeners
elements.startQuizBtn.addEventListener('click', () => {
  showSection('quiz');
  elements.nameInput.classList.remove('hidden');
  elements.quizInterface.classList.add('hidden');
});

elements.aboutNavBtn.addEventListener('click', () => {
  showSection('about');
});

elements.materialsNavBtn.addEventListener('click', () => {
  showSection('materials');
});

elements.backFromAboutBtn.addEventListener('click', () => {
  showSection('landing');
});

elements.backFromMaterialsBtn.addEventListener('click', () => {
  showSection('landing');
});

elements.aboutFromQuizBtn.addEventListener('click', () => {
  showSection('about');
});

elements.backFromLeaderboardBtn.addEventListener('click', () => {
  showSection('results');
});

elements.beginQuizBtn.addEventListener('click', () => {
  const name = elements.userName.value.trim();
  if (name) {
    appState.userName = name;
    appState.quizStartTime = new Date();
    elements.nameInput.classList.add('hidden');
    elements.quizInterface.classList.remove('hidden');
    startQuiz();
  } else {
    alert('Per favore inserisci il tuo nome per continuare.');
  }
});

elements.userName.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    elements.beginQuizBtn.click();
  }
});

elements.prevBtn.addEventListener('click', () => {
  if (appState.currentQuestionIndex > 0) {
    appState.currentQuestionIndex--;
    displayQuestion();
  }
});

elements.nextBtn.addEventListener('click', () => {
  if (appState.currentQuestionIndex < quizData.length - 1) {
    appState.currentQuestionIndex++;
    displayQuestion();
  } else {
    finishQuiz();
  }
});

elements.saveToLeaderboardBtn.addEventListener('click', saveToLeaderboard);
elements.viewLeaderboardBtn.addEventListener('click', () => {
  showSection('leaderboard');
  loadLeaderboard();
});
elements.shareResultsBtn.addEventListener('click', shareResults);
elements.retakeQuizBtn.addEventListener('click', retakeQuiz);
elements.refreshLeaderboardBtn.addEventListener('click', loadLeaderboard);

// Quiz functions
function startQuiz() {
  appState.currentQuestionIndex = 0;
  appState.userAnswers = new Array(quizData.length).fill(null);
  displayQuestion();
}

function displayQuestion() {
  const question = quizData[appState.currentQuestionIndex];
  const questionNum = appState.currentQuestionIndex + 1;
  
  // Update counter and progress
  elements.questionCounter.textContent = `Domanda ${questionNum} di ${quizData.length}`;
  elements.progressFill.style.width = `${(questionNum / quizData.length) * 100}%`;
  
  // Update difficulty badge
  const difficultyLabels = {
    'facile': 'Facile',
    'media': 'Media',
    'difficile': 'Difficile'
  };
  elements.difficultyBadge.textContent = difficultyLabels[question.difficulty] || question.difficulty;
  const difficultyClass = question.difficulty === 'facile' ? 'easy' : question.difficulty === 'media' ? 'medium' : 'hard';
  elements.difficultyBadge.className = `difficulty-badge ${difficultyClass}`;
  
  // Update question text
  elements.questionText.textContent = question.question;
  
  // Hide feedback and explanation for new question
  elements.feedbackContainer.classList.add('hidden');
  elements.explanationContainer.classList.add('hidden');
  
  // Display options
  elements.optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.dataset.index = index;
    
    // Check if this option was previously selected
    const userAnswer = appState.userAnswers[appState.currentQuestionIndex];
    if (userAnswer !== null) {
      button.disabled = true;
      if (userAnswer === index) {
        button.classList.add('selected');
      }
      if (index === question.correct) {
        button.classList.add('correct');
      } else if (userAnswer === index && userAnswer !== question.correct) {
        button.classList.add('incorrect');
      }
    }
    
    button.addEventListener('click', () => selectAnswer(index));
    elements.optionsContainer.appendChild(button);
  });
  
  // Show feedback and explanation if question was already answered
  if (appState.userAnswers[appState.currentQuestionIndex] !== null) {
    showFeedback(appState.userAnswers[appState.currentQuestionIndex] === question.correct, question);
  }
  
  // Update navigation buttons
  elements.prevBtn.disabled = appState.currentQuestionIndex === 0;
  
  // Enable next button if answer is selected
  if (appState.userAnswers[appState.currentQuestionIndex] !== null) {
    elements.nextBtn.disabled = false;
    if (appState.currentQuestionIndex === quizData.length - 1) {
      elements.nextBtn.innerHTML = 'Termina <span class="btn-icon">✓</span>';
    } else {
      elements.nextBtn.innerHTML = 'Prossima <span class="btn-icon">→</span>';
    }
  } else {
    elements.nextBtn.disabled = true;
  }
}

function selectAnswer(optionIndex) {
  // Only allow selection if not already answered
  if (appState.userAnswers[appState.currentQuestionIndex] !== null) {
    return;
  }
  
  const question = quizData[appState.currentQuestionIndex];
  const isCorrect = optionIndex === question.correct;
  
  appState.userAnswers[appState.currentQuestionIndex] = optionIndex;
  
  // Disable all buttons after selection
  const optionButtons = elements.optionsContainer.querySelectorAll('.option-btn');
  optionButtons.forEach((btn) => {
    btn.disabled = true;
  });
  
  // Apply visual feedback to selected button
  const selectedButton = optionButtons[optionIndex];
  selectedButton.classList.add('selected');
  
  if (isCorrect) {
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('incorrect');
    // Also highlight the correct answer
    optionButtons[question.correct].classList.add('correct');
  }
  
  // Show immediate feedback
  setTimeout(() => {
    showFeedback(isCorrect, question);
  }, 500);
  
  // Enable next button
  elements.nextBtn.disabled = false;
  
  // Update button text for last question
  if (appState.currentQuestionIndex === quizData.length - 1) {
    elements.nextBtn.innerHTML = 'Termina <span class="btn-icon">✓</span>';
  } else {
    elements.nextBtn.innerHTML = 'Prossima <span class="btn-icon">→</span>';
  }
}

function showFeedback(isCorrect, question) {
  // Show feedback message
  elements.feedbackContainer.classList.remove('hidden');
  elements.feedbackContainer.className = 'feedback-container';
  
  if (isCorrect) {
    elements.feedbackContainer.classList.add('correct');
    elements.feedbackContainer.innerHTML = '<span class="feedback-icon">✓</span> Esatto! ✨';
  } else {
    elements.feedbackContainer.classList.add('incorrect');
    elements.feedbackContainer.innerHTML = '<span class="feedback-icon">✗</span> Sbagliato!';
  }
  
  // Show explanation
  elements.explanationContainer.classList.remove('hidden');
  elements.explanationContainer.innerHTML = `
    <div class="explanation-title">Spiegazione:</div>
    <div class="explanation-text">${question.explanation}</div>
  `;
}

function finishQuiz() {
  appState.quizEndTime = new Date();
  calculateResults();
  showSection('results');
}

function calculateResults() {
  let correctAnswers = 0;
  const categoryScores = {};
  
  quizData.forEach((question, index) => {
    const userAnswer = appState.userAnswers[index];
    const isCorrect = userAnswer === question.correct;
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    // Track category performance
    if (!categoryScores[question.category]) {
      categoryScores[question.category] = { correct: 0, total: 0 };
    }
    categoryScores[question.category].total++;
    if (isCorrect) {
      categoryScores[question.category].correct++;
    }
  });
  
  const percentage = Math.round((correctAnswers / quizData.length) * 100);
  
  // Store score for leaderboard
  appState.lastScore = {
    score: correctAnswers,
    total: quizData.length,
    percentage: percentage
  };
  
  // Display score
  elements.scoreNumber.textContent = correctAnswers;
  elements.scorePercentage.textContent = `${percentage}%`;
  
  // Apply color based on performance
  elements.scorePercentage.className = 'score-percentage';
  if (percentage < 40) {
    elements.scorePercentage.classList.add('poor');
  } else if (percentage < 70) {
    elements.scorePercentage.classList.add('decent');
  } else if (percentage < 85) {
    elements.scorePercentage.classList.add('good');
  } else {
    elements.scorePercentage.classList.add('excellent');
  }
  
  // Performance message
  let message = '';
  if (percentage < 40) {
    message = 'Continua a studiare! I fondamentali di rete richiedono tempo per essere padroneggiati. Rivedi i concetti e riprova!';
  } else if (percentage < 70) {
    message = 'Buon lavoro! Hai una base solida. Un po\' più di pratica e sarai un esperto!';
  } else if (percentage < 85) {
    message = 'Ottimo lavoro! Hai una forte comprensione dei concetti del Data Link Layer!';
  } else {
    message = 'Eccezionale! Sei un esperto di networking. Eccellente conoscenza di Ethernet, PoE e Wireshark!';
  }
  elements.performanceMessage.textContent = message;
  
  // Display user name
  elements.resultUserName.textContent = appState.userName;
  
  // Display category breakdown
  elements.categoryResults.innerHTML = '';
  Object.keys(categoryScores).forEach(category => {
    const score = categoryScores[category];
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-item';
    categoryDiv.innerHTML = `
      <span class="category-name">${category}</span>
      <span class="category-score">${score.correct}/${score.total}</span>
    `;
    elements.categoryResults.appendChild(categoryDiv);
  });
}

// GitHub API functions
async function saveToLeaderboard() {
  if (GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN_HERE') {
    alert('⚠️ Configurazione richiesta!\n\nPer salvare i risultati nella classifica, devi configurare il token GitHub in script.js.\n\nIstruzioni:\n1. Vai su GitHub Settings → Developer settings\n2. Personal access tokens → Tokens (classic)\n3. Genera un nuovo token con scope \'public_repo\'\n4. Copia il token e incollalo in script.js (cerca GITHUB_TOKEN)');
    return;
  }
  
  const { score, total, percentage } = appState.lastScore;
  
  try {
    elements.saveToLeaderboardBtn.disabled = true;
    elements.saveToLeaderboardBtn.innerHTML = '<span class="btn-icon">⏳</span> Salvataggio...';
    
    const issueData = {
      title: `[QUIZ] ${appState.userName} - ${score}/${total}`,
      body: JSON.stringify({
        name: appState.userName,
        score: score,
        total: total,
        percentage: percentage,
        timestamp: new Date().toISOString(),
        answers: quizData.map((question, index) => ({
          question: question.question,
          userAnswer: question.options[appState.userAnswers[index]] || 'Non risposto',
          correctAnswer: question.options[question.correct],
          isCorrect: appState.userAnswers[index] === question.correct,
          difficulty: question.difficulty,
          category: question.category
        }))
      }, null, 2),
      labels: [QUIZ_LABEL]
    };
    
    const response = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(issueData)
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    alert('✅ Risultati salvati con successo nella classifica!\n\nPuoi visualizzare la classifica cliccando su "Vedi Classifica".');
    
    elements.saveToLeaderboardBtn.innerHTML = '<span class="btn-icon">✓</span> Salvato!';
    
  } catch (error) {
    console.error('Error saving to leaderboard:', error);
    alert(`❌ Errore nel salvataggio:\n\n${error.message}\n\nVerifica il token GitHub e la configurazione.`);
    elements.saveToLeaderboardBtn.disabled = false;
    elements.saveToLeaderboardBtn.innerHTML = '<span class="btn-icon">💾</span> Salva in Classifica';
  }
}

async function loadLeaderboard() {
  elements.leaderboardLoading.classList.remove('hidden');
  elements.leaderboardError.classList.add('hidden');
  elements.leaderboardTable.innerHTML = '';
  
  if (GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN_HERE') {
    elements.leaderboardLoading.classList.add('hidden');
    elements.leaderboardError.classList.remove('hidden');
    elements.leaderboardError.querySelector('.error-message').textContent = 
      '⚠️ Token GitHub non configurato. Segui le istruzioni in script.js per configurare il token.';
    return;
  }
  
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=${QUIZ_LABEL}&state=all&per_page=100`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const issues = await response.json();
    
    // Parse and sort scores
    const scores = issues
      .map(issue => {
        try {
          const data = JSON.parse(issue.body);
          return {
            name: data.name,
            score: data.score,
            total: data.total,
            percentage: data.percentage,
            date: new Date(data.timestamp).toLocaleDateString('it-IT', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          };
        } catch (e) {
          return null;
        }
      })
      .filter(score => score !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    elements.leaderboardLoading.classList.add('hidden');
    
    if (scores.length === 0) {
      elements.leaderboardTable.innerHTML = '<div class="empty-leaderboard">📊 Nessun punteggio ancora. Sii il primo a completare il quiz!</div>';
      return;
    }
    
    // Build leaderboard table
    let tableHTML = `
      <div class="leaderboard-header">
        <div>Pos.</div>
        <div>Nome</div>
        <div>Punteggio</div>
        <div>%</div>
        <div>Data</div>
      </div>
    `;
    
    scores.forEach((score, index) => {
      const rank = index + 1;
      const rankDisplay = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`;
      const rankClass = `rank-${rank <= 3 ? rank : ''}`;
      
      let percentageClass = 'poor';
      if (score.percentage >= 85) percentageClass = 'excellent';
      else if (score.percentage >= 70) percentageClass = 'good';
      else if (score.percentage >= 40) percentageClass = 'decent';
      
      tableHTML += `
        <div class="leaderboard-row ${rankClass}">
          <div class="rank-cell ${rank <= 3 ? 'medal' : ''}">${rankDisplay}</div>
          <div class="name-cell">${score.name}</div>
          <div class="score-cell">${score.score}/${score.total}</div>
          <div class="percentage-cell ${percentageClass}">${score.percentage}%</div>
          <div class="date-cell">${score.date}</div>
        </div>
      `;
    });
    
    elements.leaderboardTable.innerHTML = tableHTML;
    
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    elements.leaderboardLoading.classList.add('hidden');
    elements.leaderboardError.classList.remove('hidden');
    elements.leaderboardError.querySelector('.error-message').textContent = 
      `❌ Errore nel caricamento: ${error.message}. Verifica il token GitHub.`;
  }
}

function shareResults() {
  const correctAnswers = appState.userAnswers.filter((answer, index) => answer === quizData[index].correct).length;
  const percentage = Math.round((correctAnswers / quizData.length) * 100);
  
  const shareText = `🎯 Risultati Quiz Strato Data Link\n\nNome: ${appState.userName}\nPunteggio: ${correctAnswers}/${quizData.length} (${percentage}%)\nCategoria: Ethernet, PoE, Wireshark & Indirizzamento MAC\n\nCreato in collaborazione tra Perplexity AI e Amedeo\n`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(shareText).then(() => {
    alert('✅ Risultati copiati negli appunti! Ora puoi condividerli.');
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('✅ Risultati copiati negli appunti! Ora puoi condividerli.');
  });
}

function retakeQuiz() {
  appState = {
    currentSection: 'landing',
    userName: '',
    currentQuestionIndex: 0,
    userAnswers: [],
    quizStartTime: null,
    quizEndTime: null,
    lastScore: null
  };
  elements.userName.value = '';
  showSection('landing');
}

// Initialize app
showSection('landing');
