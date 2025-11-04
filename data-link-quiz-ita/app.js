// Quiz data
const quizData = [
  {
    id: 1,
    difficulty: 'easy',
    category: 'Ethernet Frame Structure',
    question: 'What does MAC stand for?',
    options: [
      'Media Access Control',
      'Machine Address Component',
      'Multi-Access Channel',
      'Memory Allocation Code'
    ],
    correct: 0,
    explanation: "MAC stands for Media Access Control - it's the protocol that controls access to the physical network medium and manages hardware addresses."
  },
  {
    id: 2,
    difficulty: 'easy',
    category: 'MAC Addressing',
    question: 'How many bytes is a MAC address?',
    options: ['4 bytes', '6 bytes', '8 bytes', '12 bytes'],
    correct: 1,
    explanation: 'A MAC address is 48 bits (6 bytes), usually written as AA:BB:CC:DD:EE:FF in hexadecimal notation.'
  },
  {
    id: 3,
    difficulty: 'easy',
    category: 'Ethernet Frame Structure',
    question: 'What is the minimum payload size in an Ethernet frame?',
    options: ['32 bytes', '46 bytes', '64 bytes', '128 bytes'],
    correct: 1,
    explanation: 'The minimum payload is 46 bytes. If data is smaller, padding is added to ensure minimum frame size of 64 bytes.'
  },
  {
    id: 4,
    difficulty: 'easy',
    category: 'Power over Ethernet',
    question: 'Which PoE standard provides 30W of power?',
    options: ['802.3af', '802.3at', '802.3bt Type 3', '802.3bt Type 4'],
    correct: 1,
    explanation: '802.3at (PoE+) provides 30W. 802.3af provides 15.4W, and 802.3bt Type 3/4 provide 60W and 100W respectively.'
  },
  {
    id: 5,
    difficulty: 'easy',
    category: 'Wireshark',
    question: 'What is Wireshark used for?',
    options: [
      'Compressing network packets',
      'Encrypting network traffic',
      'Capturing and analyzing network packets',
      'Routing network traffic'
    ],
    correct: 2,
    explanation: 'Wireshark is a network protocol analyzer used to capture and display network traffic in real-time, allowing detailed examination of packets.'
  },
  {
    id: 6,
    difficulty: 'medium',
    category: 'Power over Ethernet',
    question: 'Why does PoE 802.3at use pairs 3 and 4 for power transmission?',
    options: [
      "Because pairs 1 and 2 carry data and shouldn't be used",
      'Because pairs 3 and 4 are thicker',
      "Because it's more efficient",
      'Because pairs 1 and 2 are reserved'
    ],
    correct: 0,
    explanation: 'PoE uses spare pairs (3 and 4) to avoid interference with data transmission on pairs 1 and 2, allowing both data and power on one cable.'
  },
  {
    id: 7,
    difficulty: 'medium',
    category: 'Ethernet Frame Structure',
    question: 'What does the FCS (Frame Check Sequence) field detect?',
    options: [
      'The source MAC address',
      'Transmission errors in the frame',
      'The frame type',
      'The payload length'
    ],
    correct: 1,
    explanation: 'FCS uses CRC-32 to detect transmission errors. It can detect 100% of 1 and 2-bit errors and 99.9999997% of other errors.'
  },
  {
    id: 8,
    difficulty: 'medium',
    category: 'MAC Addressing',
    question: 'What do the first 3 bytes of a MAC address represent?',
    options: [
      'The device serial number',
      'The Organizationally Unique Identifier (OUI) - manufacturer ID',
      'The network subnet',
      'The device type'
    ],
    correct: 1,
    explanation: 'The first 3 bytes (24 bits) form the OUI, identifying the manufacturer. For example, CC:46:D6 identifies Cisco devices.'
  },
  {
    id: 9,
    difficulty: 'medium',
    category: 'Wireshark',
    question: 'In Wireshark, which filter would you use to see only ARP traffic?',
    options: ['eth', 'tcp', 'arp', 'ip.src'],
    correct: 2,
    explanation: "The 'arp' filter displays only Address Resolution Protocol frames, which are used to map IP addresses to MAC addresses."
  },
  {
    id: 10,
    difficulty: 'medium',
    category: 'Data Link Layer',
    question: 'What is the primary function of the LLC sublayer?',
    options: [
      'Access control to the physical medium',
      'Framing, flow control, and error checking',
      'Routing packets',
      'Encrypting data'
    ],
    correct: 1,
    explanation: 'LLC (Logical Link Control) provides framing, flow control, and error checking services to the upper layers.'
  },
  {
    id: 11,
    difficulty: 'hard',
    category: 'Ethernet Evolution',
    question: 'How many times has Ethernet bandwidth increased from 1983 to 2019?',
    options: ['1,000 times', '10,000 times', '40,000 times', '400,000 times'],
    correct: 2,
    explanation: 'From 10 Mbps (1983) to 400 Gbps (2019), Ethernet increased 40,000x in speed - an extraordinary achievement in networking.'
  },
  {
    id: 12,
    difficulty: 'hard',
    category: 'Network Security',
    question: 'How could you use Wireshark to detect MAC spoofing on a network?',
    options: [
      'By looking at the timestamp field',
      "By monitoring for MAC addresses that don't match known device OUIs",
      'By checking the frame size',
      'By analyzing the payload'
    ],
    correct: 1,
    explanation: 'You can detect MAC spoofing by identifying MAC addresses with impossible OUI values or comparing against known legitimate MAC addresses.'
  },
  {
    id: 13,
    difficulty: 'hard',
    category: 'Power over Ethernet',
    question: 'What would be the estimated PoE power capacity in 2032 if it doubles every 7 years from 100W in 2018?',
    options: ['200W', '400W', '800W', '1600W'],
    correct: 3,
    explanation: 'From 100W (2018) → 200W (2025) → 400W (2032). Following exponential growth pattern, it should reach ~800W by 2032, closer to 1600W by 2039.'
  },
  {
    id: 14,
    difficulty: 'hard',
    category: 'Ethernet Frame Structure',
    question: 'In Ethernet II format, what does a Type field value of 0x0800 indicate?',
    options: ['ARP protocol', 'IPv4 protocol', 'TCP protocol', 'LLC protocol'],
    correct: 1,
    explanation: '0x0800 in the Type field indicates that the frame contains IPv4 data. 0x0806 would indicate ARP.'
  },
  {
    id: 15,
    difficulty: 'hard',
    category: 'Network Analysis',
    question: 'Why can HTTPS encryption still leak metadata visible in Wireshark captures?',
    options: [
      'Because HTTPS is not actually secure',
      'Because packets are fully decrypted automatically',
      'Because metadata like IP addresses, ports, and timing patterns are visible even though payload is encrypted',
      'Because Wireshark has special decryption capabilities'
    ],
    correct: 2,
    explanation: 'Although HTTPS encrypts the payload, metadata remains visible: source/destination IPs, ports, packet sizes, and timing patterns can reveal browsing habits.'
  }
];

// Application state (using memory-based storage)
let appState = {
  currentSection: 'landing',
  userName: '',
  currentQuestionIndex: 0,
  userAnswers: [],
  quizStartTime: null,
  quizEndTime: null
};

// DOM elements
const sections = {
  landing: document.getElementById('landing'),
  about: document.getElementById('about'),
  quiz: document.getElementById('quiz'),
  results: document.getElementById('results')
};

const elements = {
  // Landing
  startQuizBtn: document.getElementById('startQuizBtn'),
  aboutNavBtn: document.getElementById('aboutNavBtn'),
  
  // About
  backFromAboutBtn: document.getElementById('backFromAboutBtn'),
  aboutFromQuizBtn: document.getElementById('aboutFromQuizBtn'),
  
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
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  
  // Results
  scoreNumber: document.getElementById('scoreNumber'),
  scorePercentage: document.getElementById('scorePercentage'),
  performanceMessage: document.getElementById('performanceMessage'),
  resultUserName: document.getElementById('resultUserName'),
  categoryResults: document.getElementById('categoryResults'),
  saveResultsBtn: document.getElementById('saveResultsBtn'),
  shareResultsBtn: document.getElementById('shareResultsBtn'),
  retakeQuizBtn: document.getElementById('retakeQuizBtn')
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

elements.backFromAboutBtn.addEventListener('click', () => {
  showSection('landing');
});

elements.aboutFromQuizBtn.addEventListener('click', () => {
  showSection('about');
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
    alert('Please enter your name to continue.');
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

elements.saveResultsBtn.addEventListener('click', saveResults);
elements.shareResultsBtn.addEventListener('click', shareResults);
elements.retakeQuizBtn.addEventListener('click', retakeQuiz);

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
  elements.questionCounter.textContent = `Question ${questionNum} of ${quizData.length}`;
  elements.progressFill.style.width = `${(questionNum / quizData.length) * 100}%`;
  
  // Update difficulty badge
  elements.difficultyBadge.textContent = question.difficulty;
  elements.difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
  
  // Update question text
  elements.questionText.textContent = question.question;
  
  // Display options
  elements.optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    
    // Check if this option was previously selected
    if (appState.userAnswers[appState.currentQuestionIndex] === index) {
      button.classList.add('selected');
    }
    
    button.addEventListener('click', () => selectAnswer(index));
    elements.optionsContainer.appendChild(button);
  });
  
  // Update navigation buttons
  elements.prevBtn.disabled = appState.currentQuestionIndex === 0;
  
  // Enable next button if answer is selected
  if (appState.userAnswers[appState.currentQuestionIndex] !== null) {
    elements.nextBtn.disabled = false;
    if (appState.currentQuestionIndex === quizData.length - 1) {
      elements.nextBtn.innerHTML = 'Finish <span class="btn-icon">✓</span>';
    } else {
      elements.nextBtn.innerHTML = 'Next <span class="btn-icon">→</span>';
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
  
  appState.userAnswers[appState.currentQuestionIndex] = optionIndex;
  
  // Update UI
  const optionButtons = elements.optionsContainer.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, index) => {
    if (index === optionIndex) {
      btn.classList.add('selected');
    }
  });
  
  // Enable next button
  elements.nextBtn.disabled = false;
  
  // Update button text for last question
  if (appState.currentQuestionIndex === quizData.length - 1) {
    elements.nextBtn.innerHTML = 'Finish <span class="btn-icon">✓</span>';
  }
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
    message = 'Keep studying! Networking fundamentals take time to master. Review the concepts and try again!';
  } else if (percentage < 70) {
    message = 'Good effort! You have a solid foundation. A bit more practice and you\'ll be an expert!';
  } else if (percentage < 85) {
    message = 'Great job! You have a strong understanding of Data Link Layer concepts!';
  } else {
    message = 'Outstanding! You\'re a networking expert. Excellent knowledge of Ethernet, PoE, and Wireshark!';
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

function saveResults() {
  const correctAnswers = appState.userAnswers.filter((answer, index) => answer === quizData[index].correct).length;
  const percentage = Math.round((correctAnswers / quizData.length) * 100);
  
  const resultsData = {
    name: appState.userName,
    score: correctAnswers,
    percentage: percentage,
    totalQuestions: quizData.length,
    timestamp: new Date().toISOString(),
    category: 'Data Link Layer - Ethernet & PoE',
    answers: quizData.map((question, index) => ({
      question: question.question,
      userAnswer: question.options[appState.userAnswers[index]] || 'Not answered',
      correctAnswer: question.options[question.correct],
      isCorrect: appState.userAnswers[index] === question.correct,
      difficulty: question.difficulty,
      category: question.category
    }))
  };
  
  const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `datalink-quiz-results-${appState.userName.replace(/\s+/g, '-')}-${timestamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function shareResults() {
  const correctAnswers = appState.userAnswers.filter((answer, index) => answer === quizData[index].correct).length;
  const percentage = Math.round((correctAnswers / quizData.length) * 100);
  
  const shareText = `🎯 Data Link Layer Quiz Results\n\nName: ${appState.userName}\nScore: ${correctAnswers}/${quizData.length} (${percentage}%)\nCategory: Ethernet, PoE, Wireshark & MAC Addressing\n\nCreated by Perplexity AI through Labs\n`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(shareText).then(() => {
    alert('Results copied to clipboard! You can now share them.');
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Results copied to clipboard! You can now share them.');
  });
}

function retakeQuiz() {
  appState = {
    currentSection: 'landing',
    userName: '',
    currentQuestionIndex: 0,
    userAnswers: [],
    quizStartTime: null,
    quizEndTime: null
  };
  elements.userName.value = '';
  showSection('landing');
}

// Initialize app
showSection('landing');