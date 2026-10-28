// ============================================================================
// OUTLIER.AI HTML & CSS SIMULATOR ENGINE (app.js)
// ============================================================================

const STORAGE_KEY = "outlier_html_css_trainer_state_v1";

const state = {
  currentPhase: "phase1", // phase1, phase2, phase3, phase4, phase5, retake
  currentIndex: 0,
  activeQueue: [],
  timerInterval: null,
  timeLeft: 0,
  maxTime: 60,
  answeredCurrent: false,

  // Proctoring & Media
  cameraActive: false,
  mediaStream: null,
  speechRecognition: null,
  isRecordingSpeech: false,
  tabSwitchCount: 0,
  copyPasteAttempts: 0,

  // Persistent Mastery & Adaptive Retake Data
  missedQuestionIds: [],
  weakCategories: {},
  phaseScores: {
    phase1: { completed: 0, total: 15 },
    phase2: { correct: 0, total: 15 },
    phase3: { correct: 0, total: 12 },
    phase4: { completed: 0, total: 4 },
    examHistory: []
  },

  // Current Exam Session Tracking
  examAnswers: []
};

// Load saved progress from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.missedQuestionIds = parsed.missedQuestionIds || [];
      state.weakCategories = parsed.weakCategories || {};
      if (parsed.phaseScores) {
        state.phaseScores = { ...state.phaseScores, ...parsed.phaseScores };
      }
    }
  } catch (e) {
    console.warn("Could not load saved state:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        missedQuestionIds: state.missedQuestionIds,
        weakCategories: state.weakCategories,
        phaseScores: state.phaseScores
      })
    );
  } catch (e) {
    console.warn("Could not save state:", e);
  }
  updateSidebarBadges();
}

function recordMistake(qObj) {
  if (!qObj || !qObj.id) return;
  if (!state.missedQuestionIds.includes(qObj.id)) {
    state.missedQuestionIds.push(qObj.id);
  }
  const cat = qObj.category || "General";
  state.weakCategories[cat] = (state.weakCategories[cat] || 0) + 1;
  saveState();
}

function recordMastery(qObj) {
  if (!qObj || !qObj.id) return;
  state.missedQuestionIds = state.missedQuestionIds.filter(id => id !== qObj.id);
  saveState();
}

// ============================================================================
// PROCTORING: ANTI-TAB-SWITCH, ANTI-COPY/PASTE, WEBCAM & SPEECH-TO-TEXT
// ============================================================================
function initProctoringListeners() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && (state.currentPhase === "phase5" || state.currentPhase === "retake")) {
      state.tabSwitchCount++;
      updateProctorUI();
      showCheatWarning(
        `⚠️ WYKRYTO PRZEŁĄCZENIE KARTY (#${state.tabSwitchCount})! Na prawdziwym teście Outlier.ai przełączenie okna (Alt+Tab) powoduje oflagowanie sesji.`
      );
    }
  });

  window.addEventListener("blur", () => {
    if (state.currentPhase === "phase5") {
      state.tabSwitchCount++;
      updateProctorUI();
      showCheatWarning(
        `⚠️ KURSOR OPUŚCIŁ OKNO EGZAMINU (#${state.tabSwitchCount})! Podczas egzaminu Outlier trzymaj fokus wyłącznie na oknie przeglądarki.`
      );
    }
  });

  document.addEventListener("paste", e => {
    if (state.currentPhase === "phase1" || state.currentPhase === "phase5" || state.currentPhase === "retake") {
      e.preventDefault();
      state.copyPasteAttempts++;
      updateProctorUI();
      showCheatWarning(
        `🚫 Wklejanie ze schowka (Ctrl+V) jest ZABLOKOWANE! Outlier monitoruje zdarzenia clipboardu – pisz własnoręcznie.`
      );
    }
  });
}

function showCheatWarning(msg) {
  const banner = document.getElementById("cheat-warning-banner");
  if (!banner) return;
  banner.textContent = msg;
  banner.classList.add("visible");
  setTimeout(() => {
    banner.classList.remove("visible");
  }, 6500);
}

function updateProctorUI() {
  const tabPill = document.getElementById("proctor-tab-pill");
  const camPill = document.getElementById("proctor-cam-pill");

  if (tabPill) {
    tabPill.textContent = `Przełączenia kart: ${state.tabSwitchCount} | Schowek: ${state.copyPasteAttempts}`;
    if (state.tabSwitchCount > 0 || state.copyPasteAttempts > 0) {
      tabPill.className = "status-pill warning";
    } else {
      tabPill.className = "status-pill active";
    }
  }

  if (camPill) {
    if (state.cameraActive) {
      camPill.textContent = "📷 Kamera & Mikrofon: AKTYWNE";
      camPill.className = "status-pill active";
    } else {
      camPill.textContent = "📷 Kamera: Wyłączona";
      camPill.className = "status-pill";
    }
  }
}

async function toggleCamera() {
  const videoEl = document.getElementById("proctor-video");
  const placeholder = document.getElementById("webcam-placeholder");
  const recBadge = document.getElementById("webcam-rec-badge");
  const btn = document.getElementById("toggle-cam-btn");

  if (state.cameraActive && state.mediaStream) {
    state.mediaStream.getTracks().forEach(t => t.stop());
    state.mediaStream = null;
    state.cameraActive = false;
    if (videoEl) videoEl.srcObject = null;
    if (placeholder) placeholder.style.display = "block";
    if (recBadge) recBadge.classList.remove("visible");
    if (btn) btn.textContent = "🎥 Włącz Kamerę (Symulacja Proctoringu)";
    updateProctorUI();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    state.mediaStream = stream;
    state.cameraActive = true;
    if (videoEl) {
      videoEl.srcObject = stream;
      videoEl.play();
    }
    if (placeholder) placeholder.style.display = "none";
    if (recBadge) recBadge.classList.add("visible");
    if (btn) btn.textContent = "⏹ Wyłącz Kamerę";
    updateProctorUI();
  } catch (err) {
    alert(
      "Nie udało się uruchomić kamery/mikrofonu (sprawdź uprawnienia przeglądarki). Możesz nadal korzystać z symulatora w trybie tekstowym!"
    );
  }
}

// Speech Recognition for Video/Audio Questions (English)
function toggleSpeechRecognition(targetTextareaId, currentPromptObj) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById("mic-record-btn");

  if (!SpeechRec) {
    alert(
      "Twoja przeglądarka nie wspiera Web Speech API (najlepiej działa w Google Chrome lub Microsoft Edge). Możesz normalnie wpisać swoją wypowiedź z klawiatury!"
    );
    return;
  }

  if (state.isRecordingSpeech && state.speechRecognition) {
    state.speechRecognition.stop();
    state.isRecordingSpeech = false;
    if (micBtn) {
      micBtn.textContent = "🎙️ Nagrywaj odpowiedź głosowo (English Speech-to-Text)";
      micBtn.className = "btn btn-secondary";
    }
    return;
  }

  const recognition = new SpeechRec();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  const textarea = document.getElementById(targetTextareaId);
  const initialText = textarea ? textarea.value : "";

  recognition.onresult = event => {
    let interim = "";
    let finalTranscript = "";
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interim += transcript;
      }
    }
    if (textarea) {
      textarea.value = (initialText + " " + finalTranscript + interim).trim();
      updateLiveKeywordChips(textarea.value, currentPromptObj);
    }
  };

  recognition.onerror = () => {
    state.isRecordingSpeech = false;
    if (micBtn) {
      micBtn.textContent = "🎙️ Nagrywaj odpowiedź głosowo (English Speech-to-Text)";
      micBtn.className = "btn btn-secondary";
    }
  };

  recognition.onend = () => {
    state.isRecordingSpeech = false;
    if (micBtn) {
      micBtn.textContent = "🎙️ Nagrywaj odpowiedź głosowo (English Speech-to-Text)";
      micBtn.className = "btn btn-secondary";
    }
  };

  state.speechRecognition = recognition;
  state.isRecordingSpeech = true;
  recognition.start();

  if (micBtn) {
    micBtn.textContent = "🔴 Nagrywanie trwa... (Mów po angielsku - Kliknij by zatrzymać)";
    micBtn.className = "btn btn-danger";
  }
}

// ============================================================================
// PHASE MANAGEMENT & QUEUE BUILDER
// ============================================================================
function switchPhase(phaseName) {
  stopTimer();
  if (state.isRecordingSpeech && state.speechRecognition) {
    state.speechRecognition.stop();
    state.isRecordingSpeech = false;
  }

  state.currentPhase = phaseName;
  state.currentIndex = 0;
  state.answeredCurrent = false;
  state.examAnswers = [];

  // Highlight active button in sidebar
  document.querySelectorAll(".phase-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.phase === phaseName);
  });

  const bank = window.QUESTION_BANK;

  if (phaseName === "phase1") {
    state.activeQueue = bank.typingDrills.map(item => ({ ...item, qType: "typing" }));
  } else if (phaseName === "phase2") {
    state.activeQueue = bank.abcdUntimed.map(item => ({ ...item, qType: "abcd", timed: false }));
  } else if (phaseName === "phase3") {
    state.activeQueue = bank.timedHard.map(item => ({ ...item, qType: "abcd", timed: true }));
  } else if (phaseName === "phase4") {
    state.activeQueue = bank.videoPrompts.map(item => ({ ...item, qType: "video", timed: true }));
  } else if (phaseName === "phase5") {
    // Full Outlier Exam Simulation: Mix of Untimed/Timed MCQs (all timed now!), Code Recall, and Video Prompts
    state.tabSwitchCount = 0;
    state.copyPasteAttempts = 0;
    updateProctorUI();
    state.activeQueue = buildFullExamQueue();
  } else if (phaseName === "retake") {
    // SMART ADAPTIVE ADVANCED RETAKE (Never starts from zero!)
    state.activeQueue = buildAdaptiveRetakeQueue();
  }

  renderCurrentQuestion();
}

function buildFullExamQueue() {
  const bank = window.QUESTION_BANK;
  const mcqs1 = shuffleArray([...bank.abcdUntimed]).slice(0, 5).map(q => ({
    ...q,
    qType: "abcd",
    timed: true,
    timeLimit: 45
  }));
  const mcqs2 = shuffleArray([...bank.timedHard]).slice(0, 7).map(q => ({
    ...q,
    qType: "abcd",
    timed: true,
    timeLimit: q.timeLimit || 50
  }));
  const codes = shuffleArray([...bank.codeRecall]).slice(0, 2).map(q => ({
    ...q,
    qType: "codeRecall",
    timed: true,
    timeLimit: q.timeLimit || 50
  }));
  const videos = shuffleArray([...bank.videoPrompts]).slice(0, 2).map(q => ({
    ...q,
    qType: "video",
    timed: true,
    timeLimit: q.timeLimit || 75
  }));

  return [...mcqs1, ...mcqs2, ...codes, ...videos];
}

function buildAdaptiveRetakeQueue() {
  const bank = window.QUESTION_BANK;
  const allAdvanced = [
    ...bank.timedHard.map(q => ({ ...q, qType: "abcd", timed: true, timeLimit: 45 })),
    ...bank.abcdUntimed.map(q => ({ ...q, qType: "abcd", timed: true, timeLimit: 40 })),
    ...bank.codeRecall.map(q => ({ ...q, qType: "codeRecall", timed: true, timeLimit: 45 })),
    ...bank.videoPrompts.map(q => ({ ...q, qType: "video", timed: true, timeLimit: 65 }))
  ];

  // Prioritize previously missed questions & weak categories
  const missedPool = allAdvanced.filter(q => state.missedQuestionIds.includes(q.id));
  const weakCatNames = Object.keys(state.weakCategories).sort(
    (a, b) => state.weakCategories[b] - state.weakCategories[a]
  );

  const weakCatPool = allAdvanced.filter(
    q => !state.missedQuestionIds.includes(q.id) && weakCatNames.includes(q.category)
  );

  const remainingHard = allAdvanced.filter(
    q => !missedPool.includes(q) && !weakCatPool.includes(q)
  );

  const combined = [
    ...missedPool,
    ...shuffleArray(weakCatPool),
    ...shuffleArray(remainingHard)
  ].slice(0, 12);

  return combined;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================================================
// TIMER ENGINE
// ============================================================================
function startTimer(seconds, onExpire) {
  stopTimer();
  state.maxTime = seconds;
  state.timeLeft = seconds;

  const timerContainer = document.getElementById("timer-container");
  const timerText = document.getElementById("timer-seconds");
  const timerFill = document.getElementById("timer-bar-fill");

  if (timerContainer) timerContainer.classList.add("visible");
  updateTimerUI(timerText, timerFill);

  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerUI(timerText, timerFill);
    if (state.timeLeft <= 0) {
      stopTimer();
      if (onExpire) onExpire();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  const timerContainer = document.getElementById("timer-container");
  if (timerContainer) timerContainer.classList.remove("visible");
}

function updateTimerUI(timerText, timerFill) {
  if (timerText) timerText.textContent = `${state.timeLeft}s`;
  if (timerFill) {
    const pct = Math.max(0, (state.timeLeft / state.maxTime) * 100);
    timerFill.style.width = `${pct}%`;
    timerFill.classList.toggle("danger", state.timeLeft <= 12);
  }
}

// ============================================================================
// RENDERING QUESTIONS BY TYPE
// ============================================================================
function renderCurrentQuestion() {
  const container = document.getElementById("question-stage");
  if (!container) return;

  if (state.currentIndex >= state.activeQueue.length) {
    renderPhaseSummary(container);
    return;
  }

  const q = state.activeQueue[state.currentIndex];
  state.answeredCurrent = false;

  if (q.qType === "typing") {
    stopTimer();
    renderTypingQuestion(container, q);
  } else if (q.qType === "abcd") {
    renderAbcdQuestion(container, q);
    if (q.timed) {
      startTimer(q.timeLimit || 50, () => handleTimeoutAbcd(q));
    } else {
      stopTimer();
    }
  } else if (q.qType === "codeRecall") {
    renderCodeRecallQuestion(container, q);
    startTimer(q.timeLimit || 50, () => handleTimeoutCodeRecall(q));
  } else if (q.qType === "video") {
    renderVideoQuestion(container, q);
    startTimer(q.timeLimit || 70, () => handleTimeoutVideo(q));
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildStepperHtml() {
  return `
    <div class="q-stepper" aria-label="Nawigacja po pytaniach w tej sekcji">
      ${state.activeQueue
        .map(
          (_, idx) =>
            `<button type="button" class="q-step-dot ${
              idx === state.currentIndex ? "current" : ""
            }" data-step-idx="${idx}" title="Przejdź do pytania ${idx + 1}">${idx + 1}</button>`
        )
        .join("")}
    </div>
  `;
}

function attachNavigationHandlers() {
  // Numbered stepper buttons
  document.querySelectorAll(".q-step-dot").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetIdx = parseInt(btn.getAttribute("data-step-idx"), 10);
      state.currentIndex = targetIdx;
      renderCurrentQuestion();
    });
  });

  // Prev button
  const prevBtn = document.getElementById("prev-q-btn");
  if (prevBtn) {
    prevBtn.disabled = state.currentIndex <= 0;
    prevBtn.addEventListener("click", () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderCurrentQuestion();
      }
    });
  }

  // Next button (ALWAYS visible!)
  const nextBtn = document.getElementById("next-q-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      state.currentIndex++;
      renderCurrentQuestion();
    });
  }
}

// ----------------------------------------------------------------------------
// 1. TYPING DRILL VIEW (Faza 1: Przepisujesz odpowiedź po angielsku)
// ----------------------------------------------------------------------------
function renderTypingQuestion(container, q) {
  container.innerHTML = `
    ${buildStepperHtml()}

    <div class="q-meta">
      <span class="badge-cat">Faza 1: Pamięć Mięśniowa • ${escapeHtml(q.category)}</span>
      <span class="q-counter">Pytanie ${state.currentIndex + 1} z ${state.activeQueue.length}</span>
    </div>

    <div class="q-title">${escapeHtml(q.question)}</div>

    <div class="hint-box">
      💡 <strong>Po polsku (Zrozum o co chodzi):</strong> ${escapeHtml(q.plHint)}
    </div>

    <div>
      <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">
        📌 <strong>Wzorcowa odpowiedź po angielsku (Przepisz ją poniżej własnoręcznie):</strong>
      </div>
      <div class="target-answer-box">${escapeHtml(q.targetAnswer)}</div>
    </div>

    <div>
      <textarea id="typing-input" class="typing-textarea" placeholder="Type the English answer here to build muscle memory..." autocomplete="off" spellcheck="false"></textarea>
      <div class="keyword-chips" id="typing-kw-chips">
        ${q.keywords
          .map(
            kw =>
              `<span class="kw-chip" data-kw="${escapeHtml(kw.toLowerCase())}">✓ ${escapeHtml(
                kw
              )}</span>`
          )
          .join("")}
      </div>
    </div>

    <div id="feedback-box" class="feedback-panel"></div>

    <div class="actions-row">
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-secondary" id="prev-q-btn" type="button">⬅ Poprzednie</button>
        <button class="btn btn-secondary" id="fill-hint-btn" type="button">⚡ Podpowiedz 50% tekstu</button>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-primary" id="check-typing-btn" type="button">✓ Sprawdź pisownię</button>
        <button class="btn btn-secondary" id="next-q-btn" type="button">Kolejne pytanie (${state.currentIndex + 1}/${state.activeQueue.length}) ➔</button>
      </div>
    </div>
  `;

  attachNavigationHandlers();

  const inputEl = document.getElementById("typing-input");
  const checkBtn = document.getElementById("check-typing-btn");
  const nextBtn = document.getElementById("next-q-btn");
  const hintBtn = document.getElementById("fill-hint-btn");

  inputEl.focus();

  inputEl.addEventListener("input", () => {
    const val = inputEl.value.toLowerCase();
    document.querySelectorAll("#typing-kw-chips .kw-chip").forEach(chip => {
      const kw = chip.getAttribute("data-kw");
      chip.classList.toggle("hit", val.includes(kw));
    });
  });

  hintBtn.addEventListener("click", () => {
    const halfLen = Math.floor(q.targetAnswer.length * 0.55);
    inputEl.value = q.targetAnswer.slice(0, halfLen);
    inputEl.dispatchEvent(new Event("input"));
    inputEl.focus();
  });

  checkBtn.addEventListener("click", () => {
    const userVal = inputEl.value.trim().toLowerCase();
    const matchedKws = q.keywords.filter(kw => userVal.includes(kw.toLowerCase()));
    const feedback = document.getElementById("feedback-box");

    if (matchedKws.length >= Math.ceil(q.keywords.length * 0.75) && userVal.length >= 12) {
      feedback.className = "feedback-panel visible success";
      feedback.innerHTML = `<strong>✅ Świetnie!</strong> Wszystkie kluczowe terminy angielskie użyte poprawnie (${matchedKws.length}/${q.keywords.length}). Kliknij „Kolejne pytanie ➔”.`;
      state.phaseScores.phase1.completed = Math.max(
        state.phaseScores.phase1.completed,
        state.currentIndex + 1
      );
      saveState();
      nextBtn.className = "btn btn-success";
      nextBtn.focus();
    } else {
      feedback.className = "feedback-panel visible error";
      feedback.innerHTML = `<strong>⚠️ Brakuje kluczowych zwrotów!</strong> Upewnij się, że przepisałaś słowa kluczowe widoczne pod polem tekstowym (lub kliknij „Kolejne pytanie ➔”, aby pominąć).`;
    }
  });
}

// ----------------------------------------------------------------------------
// 2. ABCD QUESTION VIEW (Faza 2, Faza 3, Faza 5, Retake)
// ----------------------------------------------------------------------------
function renderAbcdQuestion(container, q) {
  const letters = ["A", "B", "C", "D"];
  const phaseLabel =
    state.currentPhase === "phase2"
      ? "Faza 2: Trening ABCD (Bez limitu)"
      : state.currentPhase === "phase3"
      ? "Faza 3: Zaawansowane + Licznik ⏱️"
      : state.currentPhase === "retake"
      ? "🔥 Zaawansowana Powtórka Adaptacyjna"
      : "🚨 EGZAMIN OUTLIER.AI";

  container.innerHTML = `
    ${buildStepperHtml()}

    <div class="q-meta">
      <span class="badge-cat">${phaseLabel} • ${escapeHtml(q.category)}</span>
      <span class="q-counter">Pytanie ${state.currentIndex + 1} z ${state.activeQueue.length}</span>
    </div>

    <div class="q-title">${escapeHtml(q.question)}</div>

    ${q.code ? `<pre class="code-block">${escapeHtml(q.code)}</pre>` : ""}

    <div class="options-list" id="abcd-options">
      ${q.options
        .map(
          (opt, idx) => `
        <button class="option-btn" data-idx="${idx}" type="button">
          <span class="opt-letter">${letters[idx]}</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `
        )
        .join("")}
    </div>

    <div id="feedback-box" class="feedback-panel"></div>

    <div class="actions-row">
      <button class="btn btn-secondary" id="prev-q-btn" type="button">⬅ Poprzednie</button>
      <button class="btn btn-primary" id="next-q-btn" type="button">Kolejne pytanie (${state.currentIndex + 1}/${state.activeQueue.length}) ➔</button>
    </div>
  `;

  attachNavigationHandlers();

  document.querySelectorAll("#abcd-options .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.answeredCurrent) return;
      const chosenIdx = parseInt(btn.getAttribute("data-idx"), 10);
      evaluateAbcdAnswer(q, chosenIdx, false);
    });
  });
}

function evaluateAbcdAnswer(q, chosenIdx, isTimeout) {
  state.answeredCurrent = true;
  stopTimer();

  const isCorrect = !isTimeout && chosenIdx === q.correctIndex;
  const buttons = document.querySelectorAll("#abcd-options .option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add("correct");
    } else if (idx === chosenIdx && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  if (isCorrect) {
    recordMastery(q);
    if (state.currentPhase === "phase2") state.phaseScores.phase2.correct++;
    if (state.currentPhase === "phase3") state.phaseScores.phase3.correct++;
  } else {
    recordMistake(q);
  }

  if (state.currentPhase === "phase5" || state.currentPhase === "retake") {
    state.examAnswers.push({
      id: q.id,
      category: q.category,
      question: q.question,
      correct: isCorrect,
      timeout: isTimeout
    });
  }

  saveState();

  const feedback = document.getElementById("feedback-box");
  feedback.className = `feedback-panel visible ${isCorrect ? "success" : "error"}`;
  feedback.innerHTML = `
    <strong>${
      isTimeout
        ? "⏰ CZAS MINĄŁ! (Na Outlierze brak odpowiedzi = 0 pkt)"
        : isCorrect
        ? "✅ Poprawna odpowiedź!"
        : "❌ Błędna odpowiedź!"
    }</strong>
    <div>${escapeHtml(q.explanation)}</div>
  `;

  const nextBtn = document.getElementById("next-q-btn");
  if (nextBtn) {
    nextBtn.className = "btn btn-success";
    nextBtn.focus();
  }
}

function handleTimeoutAbcd(q) {
  if (!state.answeredCurrent) {
    evaluateAbcdAnswer(q, -1, true);
  }
}

// ----------------------------------------------------------------------------
// 3. CODE RECALL VIEW (Pisanie krótkiego kodu z pamięci na czas)
// ----------------------------------------------------------------------------
function renderCodeRecallQuestion(container, q) {
  container.innerHTML = `
    ${buildStepperHtml()}

    <div class="q-meta">
      <span class="badge-cat">⌨️ Pisanie Kodu z Pamięci • ${escapeHtml(q.category)}</span>
      <span class="q-counter">Pytanie ${state.currentIndex + 1} z ${state.activeQueue.length}</span>
    </div>

    <div class="q-title">${escapeHtml(q.prompt)}</div>

    <textarea id="code-recall-input" class="typing-textarea" placeholder="Write the exact HTML/CSS snippet from memory..." spellcheck="false"></textarea>

    <div id="feedback-box" class="feedback-panel"></div>

    <div class="actions-row">
      <button class="btn btn-secondary" id="prev-q-btn" type="button">⬅ Poprzednie</button>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary" id="submit-code-btn" type="button">✓ Zatwierdź kod</button>
        <button class="btn btn-secondary" id="next-q-btn" type="button">Kolejne pytanie (${state.currentIndex + 1}/${state.activeQueue.length}) ➔</button>
      </div>
    </div>
  `;

  attachNavigationHandlers();

  const input = document.getElementById("code-recall-input");
  const submitBtn = document.getElementById("submit-code-btn");

  input.focus();

  submitBtn.addEventListener("click", () => {
    if (state.answeredCurrent) return;
    evaluateCodeRecall(q, input.value, false);
  });
}

function evaluateCodeRecall(q, userCode, isTimeout) {
  state.answeredCurrent = true;
  stopTimer();

  const lower = (userCode || "").toLowerCase();
  const missing = q.mustContain.filter(token => !lower.includes(token.toLowerCase()));
  const isCorrect = !isTimeout && missing.length === 0;

  if (isCorrect) {
    recordMastery(q);
  } else {
    recordMistake(q);
  }

  if (state.currentPhase === "phase5" || state.currentPhase === "retake") {
    state.examAnswers.push({
      id: q.id,
      category: q.category,
      question: q.prompt,
      correct: isCorrect,
      timeout: isTimeout
    });
  }

  const feedback = document.getElementById("feedback-box");
  feedback.className = `feedback-panel visible ${isCorrect ? "success" : "error"}`;
  feedback.innerHTML = `
    <strong>${
      isTimeout
        ? "⏰ Czas minął!"
        : isCorrect
        ? "✅ Kod poprawny!"
        : `❌ Brakuje kluczowych elementów składni: ${missing.join(", ")}`
    }</strong>
    <div>Wzorcowy kod: <code>${escapeHtml(q.expectedSnippet)}</code></div>
  `;

  const nextBtn = document.getElementById("next-q-btn");
  if (nextBtn) nextBtn.className = "btn btn-success";
}

function handleTimeoutCodeRecall(q) {
  if (!state.answeredCurrent) {
    const input = document.getElementById("code-recall-input");
    evaluateCodeRecall(q, input ? input.value : "", true);
  }
}

// ----------------------------------------------------------------------------
// 4. SPOKEN / VIDEO & WRITTEN ACCESSIBILITY / THEORY SIMULATOR (Faza 4 & Egzamin)
// ----------------------------------------------------------------------------
function renderVideoQuestion(container, q) {
  container.innerHTML = `
    ${buildStepperHtml()}

    <div class="q-meta">
      <span class="badge-cat">🎥 Symulator Wypowiedzi Video / Teoria • ${escapeHtml(q.category)}</span>
      <span class="q-counter">Zadanie ${state.currentIndex + 1} z ${state.activeQueue.length}</span>
    </div>

    <div class="q-title">${escapeHtml(q.prompt)}</div>

    <div class="hint-box">
      🇵🇱 <strong>Wskazówka trenerska (O czym powiedzieć/napisać):</strong><br>
      ${escapeHtml(q.plGuide)}
    </div>

    <div style="display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn btn-secondary" id="mic-record-btn" type="button">
        🎙️ Nagrywaj odpowiedź głosowo (English Speech-to-Text)
      </button>
      <button class="btn btn-secondary" id="show-script-btn" type="button">
        👁️ Pokaż gotowy skrypt do przeczytania na głos
      </button>
    </div>

    <div id="model-script-preview" class="target-answer-box" style="display:none;">
      <strong>🎯 Gotowy skrypt (Możesz go przeczytać do mikrofonu/kamery lub sparafrazować):</strong><br><br>
      ${escapeHtml(q.modelScript)}
    </div>

    <div>
      <textarea id="video-response-input" class="typing-textarea" placeholder="Mów po angielsku (po kliknięciu 'Nagrywaj') LUB wpisz swoją własną wypowiedź tutaj... System na żywo sprawdzi, czy użyłaś kluczowych pojęć technicznych!"></textarea>
      <div style="font-size:0.82rem; color:var(--text-muted); margin-top:6px;">
        Kryteria oceny AI na Outlierze (Podświetlają się na zielono, gdy ich użyjesz):
      </div>
      <div class="keyword-chips" id="video-kw-chips">
        ${q.requiredKeywords
          .map(
            k =>
              `<span class="kw-chip" data-word="${escapeHtml(k.word.toLowerCase())}">${escapeHtml(
                k.label
              )}</span>`
          )
          .join("")}
      </div>
    </div>

    <div id="feedback-box" class="feedback-panel"></div>

    <div class="actions-row">
      <button class="btn btn-secondary" id="prev-q-btn" type="button">⬅ Poprzednie</button>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-primary" id="submit-video-btn" type="button">✓ Oceń moją wypowiedź</button>
        <button class="btn btn-secondary" id="next-q-btn" type="button">Kolejne pytanie (${state.currentIndex + 1}/${state.activeQueue.length}) ➔</button>
      </div>
    </div>
  `;

  attachNavigationHandlers();

  const textarea = document.getElementById("video-response-input");
  const micBtn = document.getElementById("mic-record-btn");
  const scriptBtn = document.getElementById("show-script-btn");
  const scriptPreview = document.getElementById("model-script-preview");
  const submitBtn = document.getElementById("submit-video-btn");

  textarea.addEventListener("input", () => {
    updateLiveKeywordChips(textarea.value, q);
  });

  micBtn.addEventListener("click", () => {
    toggleSpeechRecognition("video-response-input", q);
  });

  scriptBtn.addEventListener("click", () => {
    const isHidden = scriptPreview.style.display === "none";
    scriptPreview.style.display = isHidden ? "block" : "none";
  });

  submitBtn.addEventListener("click", () => {
    if (state.answeredCurrent) return;
    evaluateVideoResponse(q, textarea.value, false);
  });
}

function updateLiveKeywordChips(text, q) {
  const lower = (text || "").toLowerCase();
  document.querySelectorAll("#video-kw-chips .kw-chip").forEach(chip => {
    const word = chip.getAttribute("data-word");
    chip.classList.toggle("hit", lower.includes(word));
  });
}

function evaluateVideoResponse(q, text, isTimeout) {
  state.answeredCurrent = true;
  stopTimer();

  if (state.isRecordingSpeech && state.speechRecognition) {
    state.speechRecognition.stop();
    state.isRecordingSpeech = false;
  }

  const lower = (text || "").toLowerCase();
  const hits = q.requiredKeywords.filter(k => lower.includes(k.word.toLowerCase()));
  const wordCount = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const passed = hits.length >= Math.ceil(q.requiredKeywords.length * 0.6) && wordCount >= 18;

  if (passed) {
    recordMastery(q);
    state.phaseScores.phase4.completed++;
  } else {
    recordMistake(q);
  }

  if (state.currentPhase === "phase5" || state.currentPhase === "retake") {
    state.examAnswers.push({
      id: q.id,
      category: q.category,
      question: q.prompt,
      correct: passed,
      timeout: isTimeout
    });
  }

  saveState();

  const feedback = document.getElementById("feedback-box");
  feedback.className = `feedback-panel visible ${passed ? "success" : "error"}`;
  feedback.innerHTML = `
    <strong>${
      passed
        ? `✅ Wypowiedź zaliczona! (Trafione punkty klucza: ${hits.length}/${q.requiredKeywords.length}, Słów: ${wordCount})`
        : `⚠️ Wypowiedź wymaga dopracowania (Trafione punkty klucza: ${hits.length}/${q.requiredKeywords.length}, Słów: ${wordCount})`
    }</strong>
    <div style="margin-top:6px;"><strong>Wzorcowa odpowiedź ekspercka Outlier.ai:</strong><br>${escapeHtml(
      q.modelScript
    )}</div>
  `;

  const nextBtn = document.getElementById("next-q-btn");
  if (nextBtn) nextBtn.className = "btn btn-success";
}

function handleTimeoutVideo(q) {
  if (!state.answeredCurrent) {
    const textarea = document.getElementById("video-response-input");
    evaluateVideoResponse(q, textarea ? textarea.value : "", true);
  }
}

// ============================================================================
// SUMMARY & SMART ADAPTIVE RETAKE SCREEN
// ============================================================================
function renderPhaseSummary(container) {
  stopTimer();

  const isExamOrRetake = state.currentPhase === "phase5" || state.currentPhase === "retake";
  let total = state.activeQueue.length;
  let correctCount = state.examAnswers.filter(a => a.correct).length;
  let scorePct = isExamOrRetake ? Math.round((correctCount / Math.max(1, total)) * 100) : 100;
  const passedExam = scorePct >= 80 && state.tabSwitchCount === 0;

  // Build category breakdown if exam/retake
  const catStats = {};
  state.examAnswers.forEach(a => {
    if (!catStats[a.category]) catStats[a.category] = { correct: 0, total: 0 };
    catStats[a.category].total++;
    if (a.correct) catStats[a.category].correct++;
  });

  container.innerHTML = `
    <div class="q-meta">
      <span class="badge-cat">🏁 Podsumowanie Etapu</span>
    </div>

    <div class="q-title">
      ${
        isExamOrRetake
          ? passedExam
            ? "🎉 GRATULACJE! Zdałaś symulację egzaminu Outlier.ai!"
            : "⚠️ Wynik poniżej progu bezpieczeństwa Outlier.ai – czas na Zaawansowaną Powtórkę!"
          : "✅ Etap treningowy ukończony!"
      }
    </div>

    ${
      isExamOrRetake
        ? `
      <div class="results-grid">
        <div class="stat-card">
          <span style="color:var(--text-muted); font-size:0.85rem;">Wynik Końcowy</span>
          <span class="val" style="color:${
            scorePct >= 80 ? "var(--success)" : "var(--danger)"
          }">${scorePct}% (${correctCount}/${total})</span>
          <span style="font-size:0.8rem; color:var(--text-muted);">Próg zdawalności: 80%</span>
        </div>
        <div class="stat-card">
          <span style="color:var(--text-muted); font-size:0.85rem;">Flagi Proctoringu (Anty-Cheat)</span>
          <span class="val" style="color:${
            state.tabSwitchCount === 0 ? "var(--success)" : "var(--danger)"
          }">${state.tabSwitchCount} przełączeń kart</span>
          <span style="font-size:0.8rem; color:var(--text-muted);">Próby wklejenia: ${
            state.copyPasteAttempts
          }</span>
        </div>
        <div class="stat-card">
          <span style="color:var(--text-muted); font-size:0.85rem;">Pytania do poprawy w bazie</span>
          <span class="val" style="color:var(--warning)">${state.missedQuestionIds.length}</span>
          <span style="font-size:0.8rem; color:var(--text-muted);">Gotowe do treningu zaawansowanego</span>
        </div>
      </div>

      <div style="margin-top:10px;">
        <strong>📊 Wyniki według kategorii:</strong>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
          ${Object.entries(catStats)
            .map(([cat, st]) => {
              const p = Math.round((st.correct / st.total) * 100);
              return `
                <div style="display:flex; justify-content:space-between; background:var(--bg-card); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color);">
                  <span>${escapeHtml(cat)}</span>
                  <strong style="color:${p >= 80 ? "var(--success)" : "var(--danger)"}">${st.correct}/${
                st.total
              } (${p}%)</strong>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `
        : `
      <div class="hint-box">
        Świetna robota! Możesz teraz przejść do kolejnej fazy na pasku bocznym lub od razu wskoczyć w tryb z licznikiem czasu.
      </div>
    `
    }

    <div class="actions-row" style="margin-top:18px;">
      <button class="btn btn-primary" id="start-adaptive-retake-btn" type="button">
        🔥 Uruchom Zaawansowany Trening Adaptacyjny (Bez zaczynania od zera!)
      </button>
      <button class="btn btn-secondary" id="restart-exam-btn" type="button">
        🚨 Nowa Symulacja Egzaminu (Losowy zestaw)
      </button>
    </div>
  `;

  document.getElementById("start-adaptive-retake-btn").addEventListener("click", () => {
    switchPhase("retake");
  });

  document.getElementById("restart-exam-btn").addEventListener("click", () => {
    switchPhase("phase5");
  });
}

function updateSidebarBadges() {
  const missedCountEl = document.getElementById("missed-count-badge");
  if (missedCountEl) {
    missedCountEl.textContent = `${state.missedQuestionIds.length} błędów`;
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  loadState();
  initProctoringListeners();
  updateProctorUI();
  updateSidebarBadges();

  document.querySelectorAll(".phase-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPhase = btn.dataset.phase;
      switchPhase(targetPhase);
    });
  });

  const camBtn = document.getElementById("toggle-cam-btn");
  if (camBtn) {
    camBtn.addEventListener("click", toggleCamera);
  }

  switchPhase("phase1");
});
