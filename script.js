const familyData = [
  { word: "mother", emoji: "👩", translation: "mamá / madre", sentence: "This is my mother." },
  { word: "father", emoji: "👨", translation: "papá / padre", sentence: "This is my father." },
  { word: "sister", emoji: "👧", translation: "hermana", sentence: "She is my sister." },
  { word: "brother", emoji: "👦", translation: "hermano", sentence: "He is my brother." },
  { word: "grandmother", emoji: "👵", translation: "abuela", sentence: "She is my grandmother." },
  { word: "grandfather", emoji: "👴", translation: "abuelo", sentence: "He is my grandfather." },
  { word: "aunt", emoji: "👩‍🦰", translation: "tía", sentence: "She is my aunt." },
  { word: "uncle", emoji: "👨‍🦳", translation: "tío", sentence: "He is my uncle." },
  { word: "cousin", emoji: "🧒", translation: "primo / prima", sentence: "This is my cousin." },
  { word: "baby", emoji: "👶", translation: "bebé", sentence: "This is the baby." },
  { word: "mom", emoji: "🤱", translation: "mamá", sentence: "My mom is kind." },
  { word: "dad", emoji: "👨‍🍼", translation: "papá", sentence: "My dad is funny." }
];

const storageKey = "familyMembersAppV1";

let appState = {
  name: "Guest",
  score: 0,
  completed: [],
  gameWins: []
};

let flashIndex = 0;
let flashFlipped = false;

let matchingState = {
  selectedWord: null,
  selectedImage: null,
  correct: 0,
  locked: false,
  pairs: []
};

let memoryState = {
  open: [],
  matched: 0,
  cards: []
};

let dragState = {
  correct: 0
};

let bingoState = {
  board: [],
  target: null,
  hits: 0
};

let unscrambleState = {
  index: 0,
  solved: 0,
  current: null,
  answer: []
};

let guessState = {
  index: 0,
  correct: 0,
  items: []
};

let balloonState = {
  target: null,
  correct: 0
};

let builderState = {
  index: 0,
  solved: 0,
  current: null,
  answer: []
};

let wheelState = {
  index: 0,
  correct: 0,
  current: null
};

let raceState = {
  step: 0,
  current: null
};

let practiceState = {
  part1Done: false,
  part2Done: false
};

let quizState = {
  index: 0,
  score: 0,
  answered: false
};

const guessQuestions = [
  { clue: "She is my mother’s mother.", answer: "grandmother", options: ["grandmother", "mother", "aunt"] },
  { clue: "He is my father’s brother.", answer: "uncle", options: ["father", "uncle", "brother"] },
  { clue: "He is my parents’ son.", answer: "brother", options: ["brother", "uncle", "cousin"] },
  { clue: "She is my father’s sister.", answer: "aunt", options: ["sister", "aunt", "mother"] }
];

const builderSentences = [
  ["This", "is", "my", "mother."],
  ["He", "is", "my", "brother."],
  ["She", "is", "my", "sister."],
  ["This", "is", "my", "grandmother."]
];

const raceQuestions = [
  { clue: "She is my father's mother.", answer: "grandmother", options: ["grandmother", "mother", "aunt"] },
  { clue: "He is my mother's brother.", answer: "uncle", options: ["uncle", "father", "brother"] },
  { clue: "He is my parents' son.", answer: "brother", options: ["brother", "cousin", "uncle"] },
  { clue: "She is my parents' daughter.", answer: "sister", options: ["sister", "mother", "aunt"] },
  { clue: "This person is very small.", answer: "baby", options: ["baby", "cousin", "dad"] }
];

const quizQuestions = [
  { emoji: "👩", question: "Who is she?", options: ["mother", "aunt", "sister"], answer: "mother" },
  { emoji: "👨", question: "Who is he?", options: ["father", "uncle", "brother"], answer: "father" },
  { emoji: "👵", question: "Who is she?", options: ["grandmother", "mother", "aunt"], answer: "grandmother" },
  { emoji: "👴", question: "Who is he?", options: ["grandfather", "father", "uncle"], answer: "grandfather" },
  { emoji: "👧", question: "Who is she?", options: ["sister", "mother", "cousin"], answer: "sister" },
  { emoji: "👦", question: "Who is he?", options: ["brother", "father", "uncle"], answer: "brother" },
  { emoji: "👶", question: "Who is this?", options: ["baby", "cousin", "brother"], answer: "baby" },
  { emoji: "👩‍🦰", question: "Who is she?", options: ["aunt", "mother", "sister"], answer: "aunt" },
  { emoji: "👨‍🦳", question: "Who is he?", options: ["uncle", "grandfather", "father"], answer: "uncle" },
  { emoji: "🧒", question: "Who is this?", options: ["cousin", "brother", "baby"], answer: "cousin" }
];

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  bindBaseEvents();
  updateHeader();
  buildVocabCards();
  initFlashcards();
  initMatchingGame();
  initMemoryGame();
  initDragGame();
  initBingoGame();
  initUnscrambleGame();
  initGuessGame();
  initBalloonGame();
  initBuilderGame();
  initWheelGame();
  initRaceGame();
  initPractice();
  initQuiz();
  updateProgressUI();
});

function bindBaseEvents() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));

  document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  document.getElementById("saveNameBtn").addEventListener("click", saveStudentName);
  document.getElementById("studentName").addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveStudentName();
  });

  document.getElementById("completeLearnBtn").addEventListener("click", () => completeActivity("learn", 20));
  document.getElementById("completeFlashBtn").addEventListener("click", () => completeActivity("flashcards", 20));
  document.getElementById("resetProgressBtn").addEventListener("click", resetProgress);

  document.getElementById("flashcard").addEventListener("click", flipFlashcard);
  document.getElementById("prevFlashcard").addEventListener("click", prevFlashcard);
  document.getElementById("nextFlashcard").addEventListener("click", nextFlashcard);
  document.getElementById("speakFlashBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    speak(familyData[flashIndex].word);
  });

  document.getElementById("resetMatchingBtn").addEventListener("click", initMatchingGame);
  document.getElementById("resetMemoryBtn").addEventListener("click", initMemoryGame);
  document.getElementById("resetDragBtn").addEventListener("click", initDragGame);

  document.getElementById("nextBingoBtn").addEventListener("click", nextBingoPrompt);
  document.getElementById("resetBingoBtn").addEventListener("click", initBingoGame);

  document.getElementById("resetUnscrambleBtn").addEventListener("click", initUnscrambleGame);

  document.getElementById("resetGuessBtn").addEventListener("click", initGuessGame);

  document.getElementById("resetBalloonBtn").addEventListener("click", initBalloonGame);

  document.getElementById("builderCheckBtn").addEventListener("click", checkBuilderSentence);
  document.getElementById("builderClearBtn").addEventListener("click", clearBuilderAnswer);
  document.getElementById("resetBuilderBtn").addEventListener("click", initBuilderGame);

  document.getElementById("spinWheelBtn").addEventListener("click", spinWheel);
  document.getElementById("resetWheelBtn").addEventListener("click", initWheelGame);

  document.getElementById("resetRaceBtn").addEventListener("click", initRaceGame);

  document.getElementById("nextQuizBtn").addEventListener("click", nextQuizQuestion);
  document.getElementById("restartQuizBtn").addEventListener("click", initQuiz);
}

function saveStudentName() {
  const input = document.getElementById("studentName");
  const value = input.value.trim();
  appState.name = value || "Guest";
  saveState();
  updateHeader();
  showToast(`Welcome, ${appState.name}!`);
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(appState));
}

function loadState() {
  const data = localStorage.getItem(storageKey);
  if (!data) return;
  try {
    const parsed = JSON.parse(data);
    appState = { ...appState, ...parsed };
  } catch (error) {
    console.error("Error loading localStorage", error);
  }
}

function updateHeader() {
  document.getElementById("studentNameDisplay").textContent = appState.name || "Guest";
  document.getElementById("scoreDisplay").textContent = appState.score;
  document.getElementById("studentName").value = appState.name === "Guest" ? "" : appState.name;
}

function addPoints(points) {
  appState.score += points;
  saveState();
  updateHeader();
}

function completeActivity(key, points) {
  if (!appState.completed.includes(key)) {
    appState.completed.push(key);
    addPoints(points);
    saveState();
    updateProgressUI();
    showToast(`Activity completed! +${points} pts`);
  } else {
    showToast("This activity is already completed.");
  }
}

function registerGameWin(gameName) {
  if (!appState.gameWins.includes(gameName)) {
    appState.gameWins.push(gameName);
    saveState();
  }

  if (appState.gameWins.length >= 10 && !appState.completed.includes("games")) {
    completeActivity("games", 30);
  }
}

function updateProgressUI() {
  const totalActivities = 5;
  const percent = Math.round((appState.completed.length / totalActivities) * 100);

  document.getElementById("progressPercent").textContent = percent;
  document.getElementById("progressBar").style.width = `${percent}%`;

  const activityNames = {
    learn: "Learn",
    flashcards: "Flashcards",
    games: "Games",
    practice: "Practice",
    quiz: "Quiz"
  };

  const activityList = document.getElementById("activityList");
  activityList.innerHTML = "";
  if (appState.completed.length === 0) {
    activityList.innerHTML = "<li>No activities completed yet.</li>";
  } else {
    appState.completed.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `✅ ${activityNames[item] || item}`;
      activityList.appendChild(li);
    });
  }

  const stars = Math.max(1, Math.floor(appState.score / 20));
  const badgeContainer = document.getElementById("badgeContainer");
  badgeContainer.innerHTML = "";
  for (let i = 0; i < Math.min(stars, 10); i++) {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "⭐";
    badgeContainer.appendChild(badge);
  }

  document.getElementById("badgeText").textContent =
    appState.score >= 100 ? "Amazing work! You are a star!" : "Keep playing to earn more stars!";

  document.getElementById("motivationText").textContent =
    percent === 100
      ? `Excellent, ${appState.name}! You completed everything!`
      : percent >= 60
      ? `Great job, ${appState.name}! You are doing really well.`
      : `Great start, ${appState.name}! Keep learning and playing.`;
}

function resetProgress() {
  const ok = confirm("Do you want to reset your progress?");
  if (!ok) return;

  const currentName = appState.name || "Guest";
  appState = {
    name: currentName,
    score: 0,
    completed: [],
    gameWins: []
  };

  saveState();
  updateHeader();
  updateProgressUI();

  initMatchingGame();
  initMemoryGame();
  initDragGame();
  initBingoGame();
  initUnscrambleGame();
  initGuessGame();
  initBalloonGame();
  initBuilderGame();
  initWheelGame();
  initRaceGame();
  initPractice();
  initQuiz();

  showToast("Progress reset.");
}

function buildVocabCards() {
  const container = document.getElementById("vocabCards");
  container.innerHTML = "";

  familyData.forEach(item => {
    const card = document.createElement("article");
    card.className = "vocab-card";
    card.innerHTML = `
      <div class="vocab-emoji">${item.emoji}</div>
      <div class="vocab-word">${item.word}</div>
      <div class="vocab-translation">${item.translation}</div>
      <button class="small-btn" style="margin-top:12px;">🔊 Listen</button>
    `;
    card.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      speak(item.word);
    });
    card.addEventListener("click", () => speak(item.word));
    container.appendChild(card);
  });
}

function initFlashcards() {
  flashIndex = 0;
  flashFlipped = false;
  document.getElementById("flashTotal").textContent = familyData.length;
  renderFlashcard();
}

function renderFlashcard() {
  const item = familyData[flashIndex];
  document.getElementById("flashEmoji").textContent = item.emoji;
  document.getElementById("flashWord").textContent = item.word;
  document.getElementById("flashSentence").textContent = item.sentence;
  document.getElementById("flashIndex").textContent = flashIndex + 1;
  document.getElementById("flashcard").classList.remove("flipped");
  flashFlipped = false;
}

function flipFlashcard() {
  flashFlipped = !flashFlipped;
  document.getElementById("flashcard").classList.toggle("flipped");
}

function prevFlashcard(e) {
  e.stopPropagation();
  flashIndex = (flashIndex - 1 + familyData.length) % familyData.length;
  renderFlashcard();
}

function nextFlashcard(e) {
  e.stopPropagation();
  flashIndex = (flashIndex + 1) % familyData.length;
  renderFlashcard();
}

function initMatchingGame() {
  matchingState = {
    selectedWord: null,
    selectedImage: null,
    correct: 0,
    locked: false,
    pairs: shuffle([...familyData]).slice(0, 4)
  };

  const wordCol = document.getElementById("matchingWords");
  const imgCol = document.getElementById("matchingImages");
  wordCol.innerHTML = "";
  imgCol.innerHTML = "";

  const words = shuffle([...matchingState.pairs]);
  const images = shuffle([...matchingState.pairs]);

  words.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "match-btn";
    btn.textContent = item.word;
    btn.dataset.word = item.word;
    btn.addEventListener("click", () => selectMatchingWord(btn, item.word));
    wordCol.appendChild(btn);
  });

  images.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "match-btn";
    btn.innerHTML = `${item.emoji} <br>${item.translation}`;
    btn.dataset.word = item.word;
    btn.addEventListener("click", () => selectMatchingImage(btn, item.word));
    imgCol.appendChild(btn);
  });

  document.getElementById("matchingStatus").textContent = "0 / 4 correct";
}

function selectMatchingWord(btn, word) {
  if (matchingState.locked || btn.classList.contains("correct")) return;
  document.querySelectorAll("#matchingWords .match-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  matchingState.selectedWord = { btn, word };
  checkMatchingPair();
}

function selectMatchingImage(btn, word) {
  if (matchingState.locked || btn.classList.contains("correct")) return;
  document.querySelectorAll("#matchingImages .match-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  matchingState.selectedImage = { btn, word };
  checkMatchingPair();
}

function checkMatchingPair() {
  if (!matchingState.selectedWord || !matchingState.selectedImage) return;

  matchingState.locked = true;
  const isCorrect = matchingState.selectedWord.word === matchingState.selectedImage.word;

  if (isCorrect) {
    matchingState.selectedWord.btn.classList.add("correct");
    matchingState.selectedImage.btn.classList.add("correct");
    matchingState.correct++;
    addPoints(3);
    speak(matchingState.selectedWord.word);
    document.getElementById("matchingStatus").textContent = `${matchingState.correct} / 4 correct`;

    if (matchingState.correct === 4) {
      registerGameWin("matching");
      showToast("Matching game completed!");
    }
  } else {
    setTimeout(() => {
      matchingState.selectedWord.btn.classList.remove("selected");
      matchingState.selectedImage.btn.classList.remove("selected");
    }, 500);
  }

  setTimeout(() => {
    matchingState.selectedWord = null;
    matchingState.selectedImage = null;
    matchingState.locked = false;
  }, 500);
}

function initMemoryGame() {
  const picks = shuffle([...familyData]).slice(0, 6);
  const cards = [];

  picks.forEach((item, index) => {
    cards.push({ id: index, type: "emoji", value: item.emoji, word: item.word });
    cards.push({ id: index, type: "word", value: item.word, word: item.word });
  });

  memoryState = {
    open: [],
    matched: 0,
    cards: shuffle(cards)
  };

  const board = document.getElementById("memoryBoard");
  board.innerHTML = "";

  memoryState.cards.forEach((card, idx) => {
    const el = document.createElement("div");
    el.className = "memory-card";
    el.dataset.index = idx;
    el.textContent = "❓";
    el.addEventListener("click", () => flipMemoryCard(idx, el));
    board.appendChild(el);
  });

  document.getElementById("memoryStatus").textContent = "Pairs found: 0 / 6";
}

function flipMemoryCard(index, el) {
  const card = memoryState.cards[index];
  if (!card || el.classList.contains("matched") || el.classList.contains("flipped")) return;
  if (memoryState.open.length === 2) return;

  el.classList.add("flipped");
  el.textContent = card.value;
  memoryState.open.push({ index, el, card });

  if (memoryState.open.length === 2) {
    const [a, b] = memoryState.open;
    if (a.card.word === b.card.word && a.card.type !== b.card.type) {
      a.el.classList.add("matched");
      b.el.classList.add("matched");
      memoryState.matched++;
      document.getElementById("memoryStatus").textContent = `Pairs found: ${memoryState.matched} / 6`;
      addPoints(4);

      if (memoryState.matched === 6) {
        registerGameWin("memory");
        showToast("Memory game completed!");
      }
      memoryState.open = [];
    } else {
      setTimeout(() => {
        a.el.classList.remove("flipped");
        b.el.classList.remove("flipped");
        a.el.textContent = "❓";
        b.el.textContent = "❓";
        memoryState.open = [];
      }, 700);
    }
  }
}

function initDragGame() {
  dragState.correct = 0;
  const dragBank = document.getElementById("dragBank");
  dragBank.innerHTML = "";

  const words = ["grandmother", "grandfather", "mother", "father", "baby"];
  shuffle(words).forEach(word => {
    const chip = document.createElement("div");
    chip.className = "drag-word";
    chip.draggable = true;
    chip.textContent = word;
    chip.dataset.word = word;

    chip.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", word);
    });

    dragBank.appendChild(chip);
  });

  document.querySelectorAll(".tree-slot").forEach(slot => {
    slot.classList.remove("filled");
    slot.dataset.filled = "false";
    slot.querySelectorAll(".placed-word").forEach(el => el.remove());

    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", handleTreeDrop);
  });

  document.getElementById("dragStatus").textContent = "0 / 5 correct";
}

function handleTreeDrop(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  if (slot.dataset.filled === "true") return;

  const droppedWord = e.dataTransfer.getData("text/plain");
  const answer = slot.dataset.answer;

  if (droppedWord === answer) {
    const label = document.createElement("div");
    label.className = "placed-word";
    label.style.fontWeight = "800";
    label.style.marginTop = "6px";
    label.textContent = droppedWord;
    slot.appendChild(label);
    slot.classList.add("filled");
    slot.dataset.filled = "true";

    const chip = [...document.querySelectorAll(".drag-word")].find(el => el.dataset.word === droppedWord);
    if (chip) chip.remove();

    dragState.correct++;
    document.getElementById("dragStatus").textContent = `${dragState.correct} / 5 correct`;
    addPoints(4);

    if (dragState.correct === 5) {
      registerGameWin("drag");
      showToast("Family tree completed!");
    }
  } else {
    showToast("Oops! Try again.");
  }
}

function initBingoGame() {
  bingoState = {
    board: shuffle([...familyData]).slice(0, 9),
    target: null,
    hits: 0
  };

  const board = document.getElementById("bingoBoard");
  board.innerHTML = "";

  bingoState.board.forEach(item => {
    const cell = document.createElement("div");
    cell.className = "bingo-cell";
    cell.innerHTML = `${item.emoji}<br>${item.word}`;
    cell.dataset.word = item.word;
    cell.addEventListener("click", () => handleBingoClick(cell, item.word));
    board.appendChild(cell);
  });

  document.getElementById("bingoPrompt").textContent = "Tap Start Bingo!";
  document.getElementById("bingoStatus").textContent = "Hits: 0 / 5";
}

function nextBingoPrompt() {
  const possible = shuffle([...bingoState.board]);
  bingoState.target = possible[0].word;
  document.getElementById("bingoPrompt").textContent = `Find: ${bingoState.target}`;
  speak(bingoState.target);
}

function handleBingoClick(cell, word) {
  if (!bingoState.target || cell.classList.contains("hit")) return;

  if (word === bingoState.target) {
    cell.classList.add("hit");
    bingoState.hits++;
    addPoints(3);
    document.getElementById("bingoStatus").textContent = `Hits: ${bingoState.hits} / 5`;

    if (bingoState.hits >= 5) {
      registerGameWin("bingo");
      showToast("Bingo completed!");
    } else {
      nextBingoPrompt();
    }
  } else {
    showToast("That is not the correct word.");
  }
}

function initUnscrambleGame() {
  unscrambleState = {
    index: 0,
    solved: 0,
    current: null,
    answer: []
  };
  loadUnscrambleRound();
  document.getElementById("unscrambleStatus").textContent = "0 / 4 solved";
}

function loadUnscrambleRound() {
  const targetList = shuffle([...familyData]).slice(0, 4);
  unscrambleState.roundWords = targetList;
  unscrambleState.index = 0;
  unscrambleState.solved = 0;
  renderUnscrambleWord();
}

function renderUnscrambleWord() {
  const item = unscrambleState.roundWords[unscrambleState.index];
  unscrambleState.current = item;
  unscrambleState.answer = [];

  const container = document.getElementById("unscrambleGame");
  container.innerHTML = "";

  const top = document.createElement("div");
  top.className = "unscramble-top";
  top.innerHTML = `<div class="unscramble-emoji">${item.emoji}</div><div><strong>Unscramble:</strong> ${scrambleWord(item.word)}</div>`;

  const answerLine = document.createElement("div");
  answerLine.className = "answer-line";
  answerLine.id = "unscrambleAnswer";

  const bank = document.createElement("div");
  bank.className = "letter-bank";

  shuffle(item.word.split("")).forEach(letter => {
    const tile = document.createElement("button");
    tile.className = "letter-tile";
    tile.textContent = letter;
    tile.addEventListener("click", () => {
      tile.classList.add("used");
      unscrambleState.answer.push(letter);
      const answerTile = document.createElement("div");
      answerTile.className = "answer-tile";
      answerTile.textContent = letter;
      answerLine.appendChild(answerTile);
    });
    bank.appendChild(tile);
  });

  const buttons = document.createElement("div");
  buttons.className = "inline-actions";
  buttons.innerHTML = `
    <button class="small-btn" id="checkUnscrambleBtn">Check</button>
    <button class="ghost-btn" id="clearUnscrambleBtn">Clear</button>
  `;

  container.appendChild(top);
  container.appendChild(answerLine);
  container.appendChild(bank);
  container.appendChild(buttons);

  document.getElementById("checkUnscrambleBtn").addEventListener("click", checkUnscramble);
  document.getElementById("clearUnscrambleBtn").addEventListener("click", renderUnscrambleWord);
}

function checkUnscramble() {
  const typed = unscrambleState.answer.join("");
  if (typed === unscrambleState.current.word) {
    unscrambleState.solved++;
    addPoints(4);
    speak(typed);
    document.getElementById("unscrambleStatus").textContent = `${unscrambleState.solved} / 4 solved`;

    if (unscrambleState.solved >= 4) {
      registerGameWin("unscramble");
      showToast("Unscramble completed!");
    } else {
      unscrambleState.index++;
      renderUnscrambleWord();
    }
  } else {
    showToast("Try again.");
  }
}

function initGuessGame() {
  guessState = {
    index: 0,
    correct: 0,
    items: shuffle([...guessQuestions])
  };
  renderGuessQuestion();
  document.getElementById("guessStatus").textContent = "0 / 4 correct";
  document.getElementById("guessFeedback").textContent = "";
}

function renderGuessQuestion() {
  const item = guessState.items[guessState.index];
  document.getElementById("guessPrompt").textContent = item.clue;

  const container = document.getElementById("guessOptions");
  container.innerHTML = "";

  shuffle([...item.options]).forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleGuess(option, btn));
    container.appendChild(btn);
  });
}

function handleGuess(option, btn) {
  const item = guessState.items[guessState.index];
  const buttons = document.querySelectorAll("#guessOptions .option-btn");

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === item.answer) b.classList.add("correct");
  });

  if (option === item.answer) {
    btn.classList.add("correct");
    guessState.correct++;
    addPoints(4);
    document.getElementById("guessFeedback").textContent = "Correct!";
    speak(item.answer);
  } else {
    btn.classList.add("wrong");
    document.getElementById("guessFeedback").textContent = `Wrong. Correct answer: ${item.answer}`;
  }

  document.getElementById("guessStatus").textContent = `${guessState.correct} / 4 correct`;

  setTimeout(() => {
    guessState.index++;
    if (guessState.index >= guessState.items.length) {
      registerGameWin("guess");
      showToast("Guess Who completed!");
      document.getElementById("guessFeedback").textContent = "Game finished!";
    } else {
      document.getElementById("guessFeedback").textContent = "";
      renderGuessQuestion();
    }
  }, 900);
}

function initBalloonGame() {
  balloonState = {
    target: null,
    correct: 0
  };
  renderBalloonRound();
  document.getElementById("balloonStatus").textContent = "0 / 5 correct";
}

function renderBalloonRound() {
  const area = document.getElementById("balloonArea");
  area.innerHTML = "";

  const options = shuffle([...familyData]).slice(0, 6);
  balloonState.target = options[Math.floor(Math.random() * options.length)];

  document.getElementById("balloonPrompt").textContent = `Pop: ${balloonState.target.word}`;

  options.forEach(item => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.background = randomBalloonColor();
    balloon.innerHTML = `${item.emoji}<br>${item.word}`;
    balloon.addEventListener("click", () => {
      if (item.word === balloonState.target.word) {
        balloonState.correct++;
        addPoints(3);
        document.getElementById("balloonStatus").textContent = `${balloonState.correct} / 5 correct`;

        if (balloonState.correct >= 5) {
          registerGameWin("balloon");
          showToast("Balloon Pop completed!");
        } else {
          renderBalloonRound();
        }
      } else {
        showToast("Wrong balloon!");
      }
    });
    area.appendChild(balloon);
  });
}

function initBuilderGame() {
  builderState = {
    index: 0,
    solved: 0,
    current: null,
    answer: []
  };
  renderBuilderRound();
  document.getElementById("builderStatus").textContent = "0 / 4 solved";
  document.getElementById("builderFeedback").textContent = "";
}

function renderBuilderRound() {
  const sentenceWords = builderSentences[builderState.index];
  builderState.current = sentenceWords;
  builderState.answer = [];

  document.getElementById("builderTarget").textContent = `Build: ${sentenceWords.join(" ")}`;
  document.getElementById("builderAnswer").innerHTML = "";
  document.getElementById("builderFeedback").textContent = "";

  const bank = document.getElementById("builderBank");
  bank.innerHTML = "";

  shuffle([...sentenceWords]).forEach(word => {
    const tile = document.createElement("button");
    tile.className = "builder-tile";
    tile.textContent = word;
    tile.addEventListener("click", () => {
      if (tile.classList.contains("used")) return;
      tile.classList.add("used");
      builderState.answer.push(word);

      const answerTile = document.createElement("div");
      answerTile.className = "answer-tile";
      answerTile.textContent = word;
      document.getElementById("builderAnswer").appendChild(answerTile);
    });
    bank.appendChild(tile);
  });
}

function clearBuilderAnswer() {
  renderBuilderRound();
}

function checkBuilderSentence() {
  const built = builderState.answer.join(" ");
  const correct = builderState.current.join(" ");

  if (built === correct) {
    builderState.solved++;
    addPoints(4);
    document.getElementById("builderFeedback").textContent = "Correct!";
    document.getElementById("builderStatus").textContent = `${builderState.solved} / 4 solved`;

    if (builderState.solved >= 4) {
      registerGameWin("builder");
      showToast("Sentence Builder completed!");
    } else {
      builderState.index++;
      renderBuilderRound();
    }
  } else {
    document.getElementById("builderFeedback").textContent = "Try again.";
  }
}

function initWheelGame() {
  wheelState = {
    index: 0,
    correct: 0,
    current: null
  };
  document.getElementById("wheelDisplay").textContent = "🎡 Spin!";
  document.getElementById("wheelOptions").innerHTML = "";
  document.getElementById("wheelFeedback").textContent = "";
  document.getElementById("wheelStatus").textContent = "0 / 4 correct";
}

function spinWheel() {
  const items = shuffle([...quizQuestions]).slice(0, 1);
  wheelState.current = items[0];

  document.getElementById("wheelDisplay").textContent = `${wheelState.current.emoji} ${wheelState.current.question}`;

  const container = document.getElementById("wheelOptions");
  container.innerHTML = "";
  document.getElementById("wheelFeedback").textContent = "";

  shuffle([...wheelState.current.options]).forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleWheelAnswer(option, btn));
    container.appendChild(btn);
  });
}

function handleWheelAnswer(option, btn) {
  const answer = wheelState.current.answer;
  const buttons = document.querySelectorAll("#wheelOptions .option-btn");

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === answer) b.classList.add("correct");
  });

  if (option === answer) {
    wheelState.correct++;
    addPoints(4);
    btn.classList.add("correct");
    document.getElementById("wheelFeedback").textContent = "Correct!";
  } else {
    btn.classList.add("wrong");
    document.getElementById("wheelFeedback").textContent = `Correct answer: ${answer}`;
  }

  document.getElementById("wheelStatus").textContent = `${wheelState.correct} / 4 correct`;

  if (wheelState.correct >= 4) {
    registerGameWin("wheel");
    showToast("Family Wheel completed!");
  }
}

function initRaceGame() {
  raceState = {
    step: 0,
    currentIndex: 0
  };

  document.getElementById("raceRunner").style.left = "8%";
  document.getElementById("raceFeedback").textContent = "";
  document.getElementById("raceStatus").textContent = "Steps: 0 / 5";
  renderRaceQuestion();
}

function renderRaceQuestion() {
  const item = raceQuestions[raceState.currentIndex];
  document.getElementById("raceQuestion").textContent = item.clue;

  const container = document.getElementById("raceOptions");
  container.innerHTML = "";

  shuffle([...item.options]).forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleRaceAnswer(option, btn));
    container.appendChild(btn);
  });
}

function handleRaceAnswer(option, btn) {
  const item = raceQuestions[raceState.currentIndex];
  const buttons = document.querySelectorAll("#raceOptions .option-btn");

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === item.answer) b.classList.add("correct");
  });

  if (option === item.answer) {
    raceState.step++;
    addPoints(4);
    document.getElementById("raceFeedback").textContent = "Correct! Move forward!";
    const left = 8 + raceState.step * 16;
    document.getElementById("raceRunner").style.left = `${left}%`;
  } else {
    btn.classList.add("wrong");
    document.getElementById("raceFeedback").textContent = "Wrong answer.";
  }

  document.getElementById("raceStatus").textContent = `Steps: ${raceState.step} / 5`;

  setTimeout(() => {
    raceState.currentIndex++;
    if (raceState.step >= 5) {
      registerGameWin("race");
      showToast("Race completed!");
      document.getElementById("raceFeedback").textContent = "You reached the house!";
      document.getElementById("raceOptions").innerHTML = "";
      return;
    }

    if (raceState.currentIndex >= raceQuestions.length) {
      raceState.currentIndex = 0;
    }

    renderRaceQuestion();
  }, 800);
}

function initPractice() {
  practiceState = {
    part1Done: false,
    part2Done: false
  };

  renderPracticePart1();
  renderPracticePart2();
}

function renderPracticePart1() {
  const container = document.getElementById("practiceChoices");
  container.innerHTML = "";

  const item = { emoji: "👦", answer: "He is my brother.", options: ["She is my sister.", "He is my brother.", "He is my father."] };
  document.querySelector(".practice-image").textContent = item.emoji;

  item.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      if (practiceState.part1Done) return;
      const buttons = container.querySelectorAll(".option-btn");
      buttons.forEach(b => {
        b.disabled = true;
        if (b.textContent === item.answer) b.classList.add("correct");
      });

      if (option === item.answer) {
        btn.classList.add("correct");
        addPoints(5);
      } else {
        btn.classList.add("wrong");
      }

      practiceState.part1Done = true;
      checkPracticeCompletion();
    });
    container.appendChild(btn);
  });
}

function renderPracticePart2() {
  const item = {
    sentence: "She is my ______.",
    answer: "mother",
    options: ["mother", "father", "brother"]
  };

  document.getElementById("fillSentence").textContent = item.sentence;
  document.getElementById("fillFeedback").textContent = "";

  const container = document.getElementById("fillOptions");
  container.innerHTML = "";

  item.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      if (practiceState.part2Done) return;
      const buttons = container.querySelectorAll(".option-btn");
      buttons.forEach(b => {
        b.disabled = true;
        if (b.textContent === item.answer) b.classList.add("correct");
      });

      if (option === item.answer) {
        btn.classList.add("correct");
        document.getElementById("fillFeedback").textContent = "Correct!";
        addPoints(5);
      } else {
        btn.classList.add("wrong");
        document.getElementById("fillFeedback").textContent = `Correct answer: ${item.answer}`;
      }

      practiceState.part2Done = true;
      checkPracticeCompletion();
    });
    container.appendChild(btn);
  });
}

function checkPracticeCompletion() {
  if (practiceState.part1Done && practiceState.part2Done) {
    completeActivity("practice", 20);
  }
}

function initQuiz() {
  quizState = {
    index: 0,
    score: 0,
    answered: false
  };

  document.getElementById("quizTotal").textContent = quizQuestions.length;
  document.getElementById("quizScoreMini").textContent = "0";
  document.getElementById("nextQuizBtn").disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const item = quizQuestions[quizState.index];
  quizState.answered = false;

  document.getElementById("quizNumber").textContent = quizState.index + 1;
  document.getElementById("quizEmoji").textContent = item.emoji;
  document.getElementById("quizQuestion").textContent = item.question;
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("nextQuizBtn").disabled = true;

  const container = document.getElementById("quizOptions");
  container.innerHTML = "";

  shuffle([...item.options]).forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleQuizAnswer(option, btn));
    container.appendChild(btn);
  });
}

function handleQuizAnswer(option, btn) {
  if (quizState.answered) return;
  quizState.answered = true;

  const item = quizQuestions[quizState.index];
  const buttons = document.querySelectorAll("#quizOptions .option-btn");

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === item.answer) b.classList.add("correct");
  });

  if (option === item.answer) {
    quizState.score++;
    btn.classList.add("correct");
    document.getElementById("quizFeedback").textContent = "Correct!";
    speak(item.answer);
  } else {
    btn.classList.add("wrong");
    document.getElementById("quizFeedback").textContent = `Correct answer: ${item.answer}`;
  }

  document.getElementById("quizScoreMini").textContent = quizState.score;
  document.getElementById("nextQuizBtn").disabled = false;
}

function nextQuizQuestion() {
  quizState.index++;

  if (quizState.index >= quizQuestions.length) {
    document.getElementById("quizQuestion").textContent = `Finished! Final score: ${quizState.score}/${quizQuestions.length}`;
    document.getElementById("quizEmoji").textContent = quizState.score >= 8 ? "🏆" : "🎉";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("quizFeedback").textContent =
      quizState.score >= 8 ? "Excellent work!" : "Good job! Keep practicing.";
    document.getElementById("nextQuizBtn").disabled = true;
    completeActivity("quiz", 30);
    addPoints(quizState.score * 2);
    return;
  }

  renderQuizQuestion();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function scrambleWord(word) {
  const arr = word.split("");
  const mixed = shuffle(arr).join("");
  return mixed === word ? shuffle(arr).join("") : mixed;
}

function randomBalloonColor() {
  const colors = [
    "#ff6b6b",
    "#ff9f1c",
    "#ffd166",
    "#06d6a0",
    "#4cc9f0",
    "#9b5de5"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
