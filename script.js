/* =====================================================
   FAMILY MEMBERS WORLD — script.js
   ===================================================== */

/* ────────────────────────────────────────
   DATA
──────────────────────────────────────── */
const FAMILY = [
  { word:"mother",      emoji:"👩",  trans:"mamá / madre" },
  { word:"father",      emoji:"👨",  trans:"papá / padre" },
  { word:"mom",         emoji:"🤱",  trans:"mamá (informal)" },
  { word:"dad",         emoji:"👨‍🍼", trans:"papá (informal)" },
  { word:"sister",      emoji:"👧",  trans:"hermana" },
  { word:"brother",     emoji:"👦",  trans:"hermano" },
  { word:"grandmother", emoji:"👵",  trans:"abuela" },
  { word:"grandfather", emoji:"👴",  trans:"abuelo" },
  { word:"aunt",        emoji:"👩‍🦰", trans:"tía" },
  { word:"uncle",       emoji:"👨‍🦳", trans:"tío" },
  { word:"cousin",      emoji:"🧒",  trans:"primo / prima" },
  { word:"baby",        emoji:"👶",  trans:"bebé" },
];

/* Guess-Who clue sets */
const GW_QUESTIONS = [
  { answer:"grandmother", clues:["She is older than your parents.","She loves to bake cookies 🍪","She is your father's mother.","She is female 👵"] },
  { answer:"brother",     clues:["He lives in your house.","He is a boy 👦","He is younger or older than you.","He is your parents' son."] },
  { answer:"uncle",       clues:["He is an adult man.","He is NOT your father.","He is your father's or mother's brother.","He might give you gifts 🎁"] },
  { answer:"baby",        clues:["This person is very small 🍼","They cannot walk yet.","They cry a lot!","They are the youngest in the family."] },
  { answer:"aunt",        clues:["She is a woman.","She is NOT your mother.","She is your parent's sister.","She might babysit you! 😊"] },
  { answer:"cousin",      clues:["They can be a boy or a girl.","They are NOT your brother or sister.","Their parent is your uncle or aunt.","You might play together! 🎮"] },
  { answer:"grandfather", clues:["He is older than your parents.","He is a man 👴","He is your mother's or father's father.","He might tell you stories 📖"] },
  { answer:"father",      clues:["He is a man.","He lives with your family.","He is your dad.","He might cook on weekends 🍳"] },
];

/* Sentence Builder sentences */
const SB_SENTENCES = [
  { words:["This","is","my","mother","."  ], display:"This is my mother." },
  { words:["He",  "is","my","brother","." ], display:"He is my brother." },
  { words:["She", "is","my","sister","."  ], display:"She is my sister." },
  { words:["I",   "love","my","family","!"], display:"I love my family!" },
  { words:["My",  "grandmother","bakes","cookies","."], display:"My grandmother bakes cookies." },
  { words:["My",  "uncle","is","funny","!"], display:"My uncle is funny!" },
  { words:["She", "is","my","aunt","."    ], display:"She is my aunt." },
  { words:["He",  "is","my","grandfather","."], display:"He is my grandfather." },
];

/* Practice exercises */
const PRACTICE_EX = [
  { sent:"___ is my mother.",           opts:["She","He","It"],             ans:"She" },
  { sent:"___ is my father.",           opts:["She","He","They"],           ans:"He" },
  { sent:"I have a little ___.",        opts:["brother","grandmother","aunt"], ans:"brother" },
  { sent:"My ___ bakes cookies.",       opts:["grandfather","grandmother","uncle"], ans:"grandmother" },
  { sent:"This is my baby ___.",        opts:["sister","brother","Both"],   ans:"Both" },
  { sent:"My ___ plays football.",      opts:["aunt","uncle","cousin"],     ans:"uncle" },
  { sent:"She is my ___.",              opts:["sister","brother","father"], ans:"sister" },
  { sent:"He is my ___.",               opts:["aunt","uncle","cousin"],     ans:"uncle" },
];

/* Quiz questions */
const QUIZ_Q = [
  { emoji:"👵", q:"Who is this?",                     opts:["grandmother","mother","aunt","cousin"],    ans:"grandmother" },
  { emoji:"👦", q:"Who is this?",                     opts:["father","brother","uncle","grandfather"],  ans:"brother" },
  { emoji:null, q:"How do you say 'tío' in English?", opts:["aunt","uncle","cousin","grandfather"],     ans:"uncle" },
  { emoji:null, q:"___ is my father.",                opts:["She","He","They","It"],                    ans:"He" },
  { emoji:"👶", q:"Who is this?",                     opts:["cousin","baby","sister","brother"],        ans:"baby" },
  { emoji:null, q:"'Prima' in English is:",           opts:["sister","aunt","cousin","mother"],         ans:"cousin" },
  { emoji:null, q:"My ___ bakes cookies.",            opts:["grandfather","grandmother","uncle","father"], ans:"grandmother" },
  { emoji:"👴", q:"Who is this?",                     opts:["father","uncle","grandfather","brother"],  ans:"grandfather" },
  { emoji:null, q:"'Hermana' in English is:",         opts:["mother","aunt","cousin","sister"],         ans:"sister" },
  { emoji:"👩‍🦰", q:"Who is this?",                    opts:["mother","sister","aunt","cousin"],          ans:"aunt" },
];

/* Activities for progress */
const ACTIVITIES = [
  { key:"learn",      name:"Learn Vocabulary", icon:"📖", pts:20 },
  { key:"flashcards", name:"Flashcards",        icon:"🃏", pts:20 },
  { key:"games",      name:"Games Zone",        icon:"🎮", pts:30 },
  { key:"practice",   name:"Practice",          icon:"✏️", pts:20 },
  { key:"quiz",       name:"Final Quiz",        icon:"🧠", pts:30 },
  { key:"allgames",   name:"All 7 Games",       icon:"🏆", pts:50 },
];

const BADGES = [
  { key:"learner",  name:"Vocab Learner",  icon:"📚", act:"learn" },
  { key:"flipper",  name:"Card Flipper",   icon:"🃏", act:"flashcards" },
  { key:"gamer",    name:"Game Master",    icon:"🎮", act:"games" },
  { key:"practicer",name:"Super Practicer",icon:"✏️", act:"practice" },
  { key:"champion", name:"Quiz Champion",  icon:"🏆", act:"quiz" },
  { key:"legend",   name:"Legend",         icon:"🌟", act:"allgames" },
];

/* Wheel colors */
const WHEEL_COLORS = ["#FF6B35","#FF6B9D","#9B5DE5","#00BBF9","#06D6A0","#FFD93D","#FF8C6B","#7B2FBE","#00F5D4","#EF233C","#4CC9F0","#C77DFF"];

/* ────────────────────────────────────────
   STATE
──────────────────────────────────────── */
let S = { name:"", score:0, done:[], gamesPlayed:[] };

/* ────────────────────────────────────────
   STORAGE
──────────────────────────────────────── */
function save(){ try{ localStorage.setItem("fmw2",JSON.stringify(S)); }catch(e){} }
function load(){
  try{
    const d = localStorage.getItem("fmw2");
    if(d){ S = Object.assign(S,JSON.parse(d)); return true; }
  }catch(e){}
  return false;
}

/* ────────────────────────────────────────
   INIT
──────────────────────────────────────── */
document.addEventListener("DOMContentLoaded",()=>{
  const hasSaved = load();
  if(hasSaved && S.name){
    document.getElementById("welcome-modal").style.display="none";
    applyName();
    renderAll();
  } else {
    document.getElementById("start-btn").addEventListener("click",onStart);
    document.getElementById("student-name-input").addEventListener("keydown",e=>{ if(e.key==="Enter") onStart(); });
    setTimeout(()=>document.getElementById("student-name-input").focus(),300);
  }
  setupNav();
  document.getElementById("hamburger").addEventListener("click",()=>
    document.getElementById("main-nav").classList.toggle("open"));
});

function onStart(){
  const v = document.getElementById("student-name-input").value.trim()||"Student";
  S.name = v; save();
  document.getElementById("welcome-modal").style.display="none";
  applyName(); renderAll();
}

function applyName(){
  document.getElementById("hdr-name").textContent = S.name;
  document.getElementById("prog-greeting").textContent = `Great work, ${S.name}! 🌟 Keep going!`;
  updateScore();
}

function renderAll(){
  buildVocabGrid();
  initFlashcards();
  initBingo();
  initUnscramble();
  initGuessWho();
  resetBalloonUI();
  initSentenceBuilder();
  buildWheel();
  resetRaceUI();
  buildPractice();
  renderProgress();
}

function gotoGame(name){
  showSection("games");
  setTimeout(()=>showGame(name),80);
}

/* ────────────────────────────────────────
   NAVIGATION
──────────────────────────────────────── */
function setupNav(){
  document.querySelectorAll(".nav-link").forEach(l=>{
    l.addEventListener("click",e=>{
      e.preventDefault();
      showSection(l.dataset.section);
      document.getElementById("main-nav").classList.remove("open");
    });
  });
}

function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));
  const t = document.getElementById(id);
  if(t){ t.classList.add("active-section"); window.scrollTo({top:0,behavior:"smooth"}); }
  document.querySelectorAll(".nav-link").forEach(l=>l.classList.toggle("active",l.dataset.section===id));
  if(id==="progress") renderProgress();
}

function showGame(name){
  document.querySelectorAll(".game-panel").forEach(p=>p.classList.remove("active"));
  const el = document.getElementById("game-"+name);
  if(el) el.classList.add("active");
  document.querySelectorAll(".gtab").forEach((t,i)=>{
    const names=["bingo","unscramble","guesswho","balloon","sentence","wheel","race"];
    t.classList.toggle("active", names[i]===name);
  });
  // track games played
  if(!S.gamesPlayed.includes(name)){ S.gamesPlayed.push(name); save(); }
  if(S.gamesPlayed.length>=7) markActivity("allgames");
}

/* ────────────────────────────────────────
   SCORE / PROGRESS
──────────────────────────────────────── */
function addPts(n){
  S.score+=n; save(); updateScore();
  toast(`+${n} points! ⭐`);
}
function updateScore(){
  document.getElementById("hdr-pts").textContent=S.score;
}
function markActivity(key){
  if(!S.done.includes(key)){
    S.done.push(key);
    const a=ACTIVITIES.find(x=>x.key===key);
    if(a) addPts(a.pts);
    save();
  }
  renderProgress();
}
function renderProgress(){
  document.getElementById("pc-score").textContent = S.score;
  document.getElementById("pc-acts").textContent  = S.done.length+"/"+ACTIVITIES.length;
  document.getElementById("pc-stars").textContent = Math.floor(S.score/20);
  const pct = Math.min(100,Math.round(S.done.length/ACTIVITIES.length*100));
  document.getElementById("ob-fill").style.width = pct+"%";
  document.getElementById("ob-pct").textContent  = pct+"%";

  const list = document.getElementById("activity-list");
  list.innerHTML="";
  ACTIVITIES.forEach(a=>{
    const done=S.done.includes(a.key);
    const div=document.createElement("div");
    div.className="al-item"+(done?" done":"");
    div.innerHTML=`<span class="al-icon">${a.icon}</span><span class="al-name">${a.name}</span><span class="al-pts">${a.pts} pts</span><span class="al-check">${done?"✅":"⬜"}</span>`;
    list.appendChild(div);
  });

  const bg = document.getElementById("badges-grid");
  bg.innerHTML="";
  BADGES.forEach(b=>{
    const earned=S.done.includes(b.act);
    const div=document.createElement("div");
    div.className="bdg"+(earned?" earned":"");
    div.innerHTML=`<div class="bdg-icon">${b.icon}</div><div class="bdg-name">${b.name}</div>`;
    bg.appendChild(div);
  });

  document.getElementById("completion-msg").style.display =
    S.done.length>=ACTIVITIES.length ? "flex":"none";
  document.getElementById("prog-greeting").textContent =
    `Great work, ${S.name}! 🌟`;
}
function resetProgress(){
  if(!confirm("Reset all progress? / ¿Reiniciar progreso?")) return;
  S={name:S.name,score:0,done:[],gamesPlayed:[]};
  save(); updateScore(); renderProgress(); toast("Progress reset 🔄");
}

/* ────────────────────────────────────────
   TOAST
──────────────────────────────────────── */
function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove("show"),2400);
}

/* ────────────────────────────────────────
   TTS
──────────────────────────────────────── */
function speak(w){
  if(!window.speechSynthesis) return;
  const u=new SpeechSynthesisUtterance(w);
  u.lang="en-US"; u.rate=0.85;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

/* ────────────────────────────────────────
   LEARN – Vocab Grid
──────────────────────────────────────── */
function buildVocabGrid(){
  const g=document.getElementById("vocab-grid"); g.innerHTML="";
  FAMILY.forEach(f=>{
    const c=document.createElement("div"); c.className="vc";
    c.innerHTML=`<div class="vc-em">${f.emoji}</div><div class="vc-wd">${f.word}</div><div class="vc-tr">${f.trans}</div>`;
    c.addEventListener("click",()=>{ speak(f.word); toast("🔊 "+f.word); });
    g.appendChild(c);
  });
}

/* ────────────────────────────────────────
   FLASHCARDS
──────────────────────────────────────── */
let fcIdx=0, fcFlipped=false;

function initFlashcards(){
  fcIdx=0; fcFlipped=false;
  document.getElementById("fc-tot").textContent=FAMILY.length;
  renderFC();
}
function renderFC(){
  const f=FAMILY[fcIdx];
  document.getElementById("fc-emoji").textContent=f.emoji;
  document.getElementById("fc-word").textContent=f.word;
  document.getElementById("fc-trans").textContent=f.trans;
  document.getElementById("fc-cur").textContent=fcIdx+1;
  document.getElementById("flashcard").classList.remove("flipped");
  fcFlipped=false;
  document.getElementById("fc-fill").style.width=(fcIdx/FAMILY.length*100)+"%";
  document.getElementById("fc-prev").disabled=(fcIdx===0);
  document.getElementById("fc-next").textContent=fcIdx===FAMILY.length-1?"Finish 🎉":"Next →";
}
function flipCard(){
  const c=document.getElementById("flashcard");
  c.classList.toggle("flipped"); fcFlipped=!fcFlipped;
  if(fcFlipped) speak(FAMILY[fcIdx].word);
}
function nextCard(){
  if(fcIdx<FAMILY.length-1){ fcIdx++; renderFC(); }
  else{ document.getElementById("fc-fill").style.width="100%"; toast("🎉 All cards done!"); markActivity("flashcards"); }
}
function prevCard(){ if(fcIdx>0){ fcIdx--; renderFC(); } }
function sayWord(){ speak(FAMILY[fcIdx].word); }

/* ════════════════════════════════════════
   GAME 1 – BINGO
════════════════════════════════════════ */
let bingoCard=[], bingoCalled=[], bingoWords=[];

function initBingo(){
  bingoCalled=[]; bingoWords=FAMILY.map(f=>f.word);
  // 5×5 card – 24 random words + FREE centre
  const pool = shuffle([...FAMILY]);
  bingoCard = [];
  for(let i=0;i<12;i++) bingoCard.push(pool[i]);
  bingoCard.push({word:"FREE",emoji:"⭐",trans:""});
  for(let i=12;i<24;i++) bingoCard.push(pool[i]);

  const board=document.getElementById("bingo-board");
  board.innerHTML="";
  bingoCard.forEach((f,idx)=>{
    const c=document.createElement("div");
    c.className="bcell"+(f.word==="FREE"?" free marked":"");
    c.id="bcell-"+idx;
    c.innerHTML=`<div class="bcell-em">${f.emoji}</div><div class="bcell-wd">${f.word==="FREE"?"★FREE★":f.word}</div>`;
    if(f.word!=="FREE") c.addEventListener("click",()=>onBingoMark(c,f.word,idx));
    board.appendChild(c);
  });

  document.getElementById("caller-emoji").textContent="❓";
  document.getElementById("caller-word").textContent="Press Call!";
  document.getElementById("bingo-called-list").textContent="—";
  setFB("bingo-fb","","");
}

function bingoDraw(){
  const remaining = FAMILY.filter(f=>!bingoCalled.includes(f.word));
  if(!remaining.length){ setFB("bingo-fb","All words called! New game?","ok"); return; }
  const pick = remaining[Math.floor(Math.random()*remaining.length)];
  bingoCalled.push(pick.word);
  document.getElementById("caller-emoji").textContent=pick.emoji;
  document.getElementById("caller-word").textContent=pick.word;
  document.getElementById("bingo-called-list").textContent=bingoCalled.join(", ");
  speak(pick.word);
  // auto-highlight matching cells
  bingoCard.forEach((f,i)=>{
    if(f.word===pick.word){
      const c=document.getElementById("bcell-"+i);
      if(c) c.style.borderColor="var(--orange)";
    }
  });
}

function onBingoMark(cell,word,idx){
  if(!bingoCalled.includes(word)){
    cell.classList.add("shake");
    setTimeout(()=>cell.classList.remove("shake"),400);
    setFB("bingo-fb","❌ That word hasn't been called yet!","ko"); return;
  }
  cell.classList.add("marked");
  cell.style.borderColor="";
  checkBingo();
}

function checkBingo(){
  const rows=[[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]];
  const cols=[[0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24]];
  const diags=[[0,6,12,18,24],[4,8,12,16,20]];
  const isMarked=i=>{ const c=document.getElementById("bcell-"+i); return c&&c.classList.contains("marked"); };
  const check=line=>line.every(i=>isMarked(i));
  const allLines=[...rows,...cols,...diags];
  for(const line of allLines){
    if(check(line)){
      line.forEach(i=>{
        const c=document.getElementById("bcell-"+i);
        if(c) c.classList.add("bingo-win");
      });
      setFB("bingo-fb","🎱 BINGO! You won! 🎉","ok");
      addPts(20); markActivity("games");
      return;
    }
  }
}

/* ════════════════════════════════════════
   GAME 2 – UNSCRAMBLE
════════════════════════════════════════ */
let usIndex=0, usOrder=[], usAnswer=[], usTiles=[], usScore=0;

function initUnscramble(){
  usScore=0; usOrder=shuffle([...FAMILY]);
  document.getElementById("us-score").textContent=0;
  usLoadWord();
}
function usLoadWord(){
  if(usIndex>=usOrder.length){ usIndex=0; usOrder=shuffle([...FAMILY]); }
  const item=usOrder[usIndex];
  document.getElementById("us-emoji").textContent=item.emoji;
  document.getElementById("us-hint").textContent=item.word.split("").map(()=>"_").join(" ");
  document.getElementById("us-num").textContent=(usIndex%FAMILY.length)+1;

  usAnswer=[]; usTiles=[];
  // scramble letters
  const letters=shuffle([...item.word]);
  const letDiv=document.getElementById("us-letters");
  letDiv.innerHTML="";
  const ansDiv=document.getElementById("us-answer");
  ansDiv.innerHTML="";

  letters.forEach((ch,i)=>{
    const t=document.createElement("div"); t.className="us-tile";
    t.textContent=ch; t.id="ust-"+i; t.dataset.ch=ch; t.dataset.idx=i;
    t.addEventListener("click",()=>usPick(t,i,ch));
    letDiv.appendChild(t);
  });
  setFB("us-fb","","");
}
function usPick(tile,idx,ch){
  if(tile.classList.contains("used")) return;
  tile.classList.add("used");
  usAnswer.push({ch,idx});
  // add answer tile
  const a=document.createElement("div"); a.className="us-answer-tile";
  a.textContent=ch; a.dataset.fromIdx=idx;
  a.addEventListener("click",()=>usUnpick(a,idx));
  document.getElementById("us-answer").appendChild(a);
}
function usUnpick(tile,fromIdx){
  tile.remove();
  usAnswer=usAnswer.filter(x=>x.idx!==fromIdx);
  const orig=document.getElementById("ust-"+fromIdx);
  if(orig) orig.classList.remove("used");
}
function usClear(){
  usAnswer=[];
  document.getElementById("us-answer").innerHTML="";
  document.querySelectorAll(".us-tile").forEach(t=>t.classList.remove("used"));
  setFB("us-fb","","");
}
function usCheck(){
  const typed=usAnswer.map(x=>x.ch).join("");
  const correct=usOrder[usIndex].word;
  if(typed.toLowerCase()===correct){
    setFB("us-fb","✅ Correct! "+correct.toUpperCase()+"!","ok");
    speak(correct); usScore+=10;
    document.getElementById("us-score").textContent=usScore;
    addPts(5);
    setTimeout(()=>{ usIndex++; usLoadWord(); },1200);
  } else {
    setFB("us-fb","❌ Try again! You wrote: "+typed,"ko");
  }
}
function usSkip(){
  setFB("us-fb","Skipped! The answer was: "+usOrder[usIndex].word,"ko");
  setTimeout(()=>{ usIndex++; usLoadWord(); },1000);
}

/* ════════════════════════════════════════
   GAME 3 – GUESS WHO
════════════════════════════════════════ */
let gwIdx=0, gwClueIdx=0, gwOrder=[], gwScore=0, gwAnswered=false;

function initGuessWho(){
  gwScore=0; gwIdx=0; gwClueIdx=0;
  gwOrder=shuffle([...GW_QUESTIONS]);
  document.getElementById("gw-score").textContent=0;
  document.getElementById("gw-round").textContent=1;
  gwLoadRound();
}
function gwLoadRound(){
  if(gwIdx>=GW_QUESTIONS.length){ gwIdx=0; gwOrder=shuffle([...GW_QUESTIONS]); }
  gwClueIdx=0; gwAnswered=false;
  const q=gwOrder[gwIdx];
  const clueList=document.getElementById("gw-clues");
  clueList.innerHTML="";
  const li=document.createElement("li"); li.textContent=q.clues[0];
  clueList.appendChild(li);
  document.getElementById("gw-hint-btn").disabled=false;

  // options: correct + 3 random
  const others=FAMILY.filter(f=>f.word!==q.answer&&f.word.length>2);
  const opts=shuffle([q.answer,...shuffle(others).slice(0,3).map(x=>x.word)]);
  const optsDiv=document.getElementById("gw-opts");
  optsDiv.innerHTML="";
  opts.forEach(o=>{
    const b=document.createElement("button"); b.className="gw-opt";
    const fam=FAMILY.find(f=>f.word===o);
    b.innerHTML=`${fam?fam.emoji:""} ${o}`;
    b.addEventListener("click",()=>{ if(!gwAnswered) onGwAnswer(b,o,q.answer); });
    optsDiv.appendChild(b);
  });
  setFB("gw-fb","","");
  document.getElementById("gw-round").textContent=gwIdx+1;
}
function gwNextClue(){
  const q=gwOrder[gwIdx];
  gwClueIdx++;
  if(gwClueIdx>=q.clues.length){ document.getElementById("gw-hint-btn").disabled=true; return; }
  const li=document.createElement("li"); li.textContent=q.clues[gwClueIdx];
  document.getElementById("gw-clues").appendChild(li);
}
function onGwAnswer(btn,chosen,correct){
  gwAnswered=true;
  document.querySelectorAll(".gw-opt").forEach(b=>{
    if(b.textContent.includes(correct)) b.classList.add("ok");
    else if(b===btn&&chosen!==correct) b.classList.add("ko");
    b.disabled=true;
  });
  if(chosen===correct){
    setFB("gw-fb","✅ Correct! You guessed it!","ok");
    gwScore+=10; document.getElementById("gw-score").textContent=gwScore; addPts(5);
  } else {
    setFB("gw-fb","❌ It was: "+correct,"ko");
  }
  speak(correct);
  setTimeout(()=>{ gwIdx++; gwLoadRound(); },1600);
}

/* ════════════════════════════════════════
   GAME 4 – BALLOON POP
════════════════════════════════════════ */
let blTimer=null, blScore=0, blLives=3, blTarget="", blActive=false, blInterval=null;
const BL_COLORS=["#FF6B35","#9B5DE5","#00BBF9","#FF6B9D","#06D6A0","#FFD93D","#EF233C","#00F5D4"];

function resetBalloonUI(){
  clearInterval(blInterval); clearInterval(blTimer);
  blActive=false;
  document.getElementById("balloon-stage").innerHTML="";
  document.getElementById("bl-score").textContent=0;
  document.getElementById("bl-timer").textContent=30;
  document.getElementById("bl-lives").textContent="❤️❤️❤️";
  document.getElementById("bl-start-btn").style.display="block";
  document.getElementById("balloon-target").textContent="—";
  setFB("bl-fb","","");
}

function startBalloon(){
  blScore=0; blLives=3; blActive=true;
  let timeLeft=30;
  document.getElementById("bl-start-btn").style.display="none";
  document.getElementById("bl-score").textContent=0;
  document.getElementById("bl-timer").textContent=30;
  document.getElementById("bl-lives").textContent="❤️❤️❤️";
  setFB("bl-fb","","");
  pickBalloonTarget();

  // Spawn balloons every 1.2s
  blInterval=setInterval(spawnBalloon,1200);

  // Countdown
  blTimer=setInterval(()=>{
    timeLeft--;
    document.getElementById("bl-timer").textContent=timeLeft;
    if(timeLeft<=0||blLives<=0){
      clearInterval(blInterval); clearInterval(blTimer); blActive=false;
      document.getElementById("balloon-stage").innerHTML="";
      const msg = blScore>=50?"🎉 Amazing! "+blScore+" pts!":blScore>=30?"🌟 Great! "+blScore+" pts!":"💪 You got "+blScore+" pts! Try again!";
      setFB("bl-fb",msg,blScore>=30?"ok":"ko");
      document.getElementById("bl-start-btn").style.display="block";
      if(blScore>=20){ addPts(10); markActivity("games"); }
    }
  },1000);
}

function pickBalloonTarget(){
  blTarget=FAMILY[Math.floor(Math.random()*FAMILY.length)].word;
  document.getElementById("balloon-target").textContent=blTarget;
}

function spawnBalloon(){
  if(!blActive) return;
  const stage=document.getElementById("balloon-stage");
  // random word (40% chance it matches target)
  const isTarget=Math.random()<0.4;
  const word = isTarget ? blTarget : FAMILY[Math.floor(Math.random()*FAMILY.length)].word;
  const fam=FAMILY.find(f=>f.word===word)||FAMILY[0];
  const color=BL_COLORS[Math.floor(Math.random()*BL_COLORS.length)];
  const left=5+Math.random()*80;
  const dur=3.5+Math.random()*2;

  const b=document.createElement("div");
  b.className="balloon";
  b.style.left=left+"%";
  b.style.animationDuration=dur+"s";
  b.innerHTML=`<div class="balloon-body" style="background:${color}">${fam.emoji}<br/><small style="font-size:.62rem">${word}</small></div><div class="balloon-string"></div>`;

  b.addEventListener("click",()=>{
    if(!blActive||b.classList.contains("popped")) return;
    b.classList.add("popped");
    if(word===blTarget){
      blScore+=10; document.getElementById("bl-score").textContent=blScore;
      setFB("bl-fb","💥 POP! +10 pts!","ok"); speak(word);
      // change target occasionally
      if(Math.random()<0.35) setTimeout(pickBalloonTarget,500);
    } else {
      blLives--;
      const hearts="❤️".repeat(Math.max(0,blLives));
      document.getElementById("bl-lives").textContent=hearts||"💔";
      setFB("bl-fb","❌ Wrong balloon! -1 life","ko");
    }
    setTimeout(()=>b.remove(),300);
  });

  stage.appendChild(b);
  setTimeout(()=>{ if(b.parentNode) b.remove(); },dur*1000+200);
}

/* ════════════════════════════════════════
   GAME 5 – SENTENCE BUILDER
════════════════════════════════════════ */
let sbIdx=0, sbOrder=[], sbScore=0, sbDropped=[];

function initSentenceBuilder(){
  sbScore=0; sbIdx=0; sbOrder=shuffle([...SB_SENTENCES]);
  document.getElementById("sb-score").textContent=0;
  sbLoadSentence();
}
function sbLoadSentence(){
  if(sbIdx>=SB_SENTENCES.length){ sbIdx=0; sbOrder=shuffle([...SB_SENTENCES]); }
  sbDropped=[];
  const sent=sbOrder[sbIdx];
  document.getElementById("sb-target").textContent="🏗️ Build: "+sent.display.replace(/\w/g,"_");
  document.getElementById("sb-num").textContent=(sbIdx%SB_SENTENCES.length)+1;

  // Drop zone
  const drop=document.getElementById("sb-drop");
  drop.innerHTML=`<span class="sb-hint-text">Drop words here ↓</span>`;
  drop.addEventListener("dragover",e=>{ e.preventDefault(); drop.classList.add("drag-over"); });
  drop.addEventListener("dragleave",()=>drop.classList.remove("drag-over"));
  drop.addEventListener("drop",e=>{ e.preventDefault(); drop.classList.remove("drag-over"); onSbDrop(e); });

  // Word tags (shuffled)
  const wordsDiv=document.getElementById("sb-words");
  wordsDiv.innerHTML="";
  const shuffledWords=shuffle([...sent.words]);
  shuffledWords.forEach(w=>{
    const tag=document.createElement("div"); tag.className="sb-word";
    tag.textContent=w; tag.draggable=true; tag.dataset.word=w;
    tag.addEventListener("dragstart",e=>{ e.dataTransfer.setData("text/plain",w); sbLastDrag=w; });
    // touch
    tag.addEventListener("click",()=>sbClickAdd(tag,w));
    wordsDiv.appendChild(tag);
  });
  setFB("sb-fb","","");
}
let sbLastDrag="";
function onSbDrop(e){
  const w=e.dataTransfer.getData("text/plain")||sbLastDrag;
  sbAddToZone(w);
}
function sbClickAdd(tag,w){
  if(tag.classList.contains("placed")) return;
  sbAddToZone(w,tag);
}
function sbAddToZone(w,sourceTag){
  const drop=document.getElementById("sb-drop");
  if(drop.querySelector(".sb-hint-text")) drop.innerHTML="";
  sbDropped.push(w);
  const chip=document.createElement("div"); chip.className="sb-word in-drop"; chip.textContent=w;
  chip.addEventListener("click",()=>{
    chip.remove(); sbDropped.splice(sbDropped.lastIndexOf(w),1);
    if(sourceTag){ sourceTag.classList.remove("placed"); }
    else{
      // re-enable source by word text
      document.querySelectorAll(".sb-word:not(.in-drop)").forEach(t=>{
        if(t.textContent===w&&t.classList.contains("placed")){ t.classList.remove("placed"); }
      });
    }
    if(!drop.children.length) drop.innerHTML=`<span class="sb-hint-text">Drop words here ↓</span>`;
  });
  drop.appendChild(chip);
  if(sourceTag) sourceTag.classList.add("placed");
  else{
    document.querySelectorAll(".sb-word:not(.in-drop)").forEach(t=>{
      if(t.textContent===w&&!t.classList.contains("placed")){ t.classList.add("placed"); return; }
    });
  }
}
function sbClear(){
  const drop=document.getElementById("sb-drop");
  drop.innerHTML=`<span class="sb-hint-text">Drop words here ↓</span>`;
  sbDropped=[];
  document.querySelectorAll(".sb-word:not(.in-drop)").forEach(t=>t.classList.remove("placed"));
  setFB("sb-fb","","");
}
function sbCheck(){
  const sent=sbOrder[sbIdx];
  const built=sbDropped.join(" ");
  const correct=sent.words.join(" ");
  if(built===correct){
    setFB("sb-fb","✅ Perfect sentence! 🎉","ok");
    speak(sent.display.replace(/[.!?]/g,""));
    sbScore+=15; document.getElementById("sb-score").textContent=sbScore; addPts(8);
    setTimeout(()=>{ sbIdx++; sbLoadSentence(); },1500);
  } else {
    setFB("sb-fb","❌ Not quite! Check word order. Built: "+built,"ko");
  }
}
function sbSkip(){
  const sent=sbOrder[sbIdx];
  setFB("sb-fb","Answer: "+sent.display,"ko");
  setTimeout(()=>{ sbIdx++; sbLoadSentence(); },1200);
}

/* ════════════════════════════════════════
   GAME 6 – FAMILY WHEEL
════════════════════════════════════════ */
let wheelSpinning=false, wheelAngle=0, wheelScore=0;

const WHEEL_Q = [
  { emoji:"👵", q:"Who is this?",                   opts:["grandmother","aunt","sister","mother"],   ans:"grandmother" },
  { emoji:"👦", q:"Who is this?",                   opts:["father","brother","uncle","cousin"],       ans:"brother" },
  { emoji:"👶", q:"Who is this?",                   opts:["baby","cousin","sister","nephew"],          ans:"baby" },
  { emoji:"👴", q:"Who is this?",                   opts:["uncle","grandfather","father","cousin"],   ans:"grandfather" },
  { emoji:null, q:"'Tía' in English:",              opts:["uncle","aunt","cousin","sister"],           ans:"aunt" },
  { emoji:null, q:"'Abuelo' in English:",           opts:["grandfather","grandmother","uncle","father"], ans:"grandfather" },
  { emoji:null, q:"'Hermano' in English:",          opts:["sister","brother","cousin","uncle"],       ans:"brother" },
  { emoji:null, q:"She is your mom's sister:",      opts:["grandmother","aunt","cousin","sister"],    ans:"aunt" },
  { emoji:"👩", q:"Who is this?",                   opts:["mother","aunt","sister","grandmother"],    ans:"mother" },
  { emoji:null, q:"He is your dad's brother:",      opts:["grandfather","cousin","uncle","father"],   ans:"uncle" },
  { emoji:"👧", q:"Who is this?",                   opts:["mother","cousin","sister","aunt"],          ans:"sister" },
  { emoji:null, q:"Your aunt's child is your:",     opts:["brother","uncle","cousin","nephew"],       ans:"cousin" },
];

function buildWheel(){
  const canvas=document.getElementById("wheel-canvas");
  if(!canvas) return;
  const ctx=canvas.getContext("2d");
  drawWheel(ctx,0);
}

function drawWheel(ctx,angle){
  const cx=140,cy=140,r=130;
  ctx.clearRect(0,0,280,280);
  const n=WHEEL_Q.length;
  WHEEL_Q.forEach((q,i)=>{
    const start=angle+(i/n)*Math.PI*2;
    const end=angle+((i+1)/n)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,end);
    ctx.closePath();
    ctx.fillStyle=WHEEL_COLORS[i%WHEEL_COLORS.length];
    ctx.fill();
    ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.stroke();
    // text
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(start+(end-start)/2);
    ctx.textAlign="right";
    ctx.fillStyle="#fff";
    ctx.font="bold 10px Nunito,sans-serif";
    ctx.fillText(q.emoji||q.q.slice(0,10), r-8, 4);
    ctx.restore();
  });
  // center circle
  ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2);
  ctx.fillStyle="#fff"; ctx.fill();
  ctx.strokeStyle="#ddd"; ctx.lineWidth=3; ctx.stroke();
  ctx.fillStyle="#333"; ctx.font="bold 18px Baloo 2,sans-serif";
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText("🏡",cx,cy);
}

function spinWheel(){
  if(wheelSpinning) return;
  wheelSpinning=true;
  document.getElementById("wheel-btn").disabled=true;
  document.getElementById("wheel-qbox").style.display="none";
  setFB("wheel-fb","","");

  const canvas=document.getElementById("wheel-canvas");
  const ctx=canvas.getContext("2d");
  const totalRot=(5+Math.random()*5)*Math.PI*2;
  const duration=3000;
  const start=performance.now();
  const startAngle=wheelAngle;

  function anim(now){
    const elapsed=now-start;
    const t=Math.min(elapsed/duration,1);
    const ease=1-Math.pow(1-t,4);
    wheelAngle=startAngle+totalRot*ease;
    drawWheel(ctx,wheelAngle);
    if(t<1){ requestAnimationFrame(anim); }
    else{
      wheelAngle=wheelAngle%(Math.PI*2);
      wheelSpinning=false;
      document.getElementById("wheel-btn").disabled=false;
      showWheelQuestion();
    }
  }
  requestAnimationFrame(anim);
}

function showWheelQuestion(){
  const n=WHEEL_Q.length;
  // Which segment is at the top (pointer at angle π*1.5 = top)
  const norm=((Math.PI*1.5-wheelAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
  const idx=Math.floor(norm/(Math.PI*2)*n)%n;
  const q=WHEEL_Q[idx];

  const qbox=document.getElementById("wheel-qbox");
  qbox.style.display="block";
  document.getElementById("wq-emoji").textContent=q.emoji||"❓";
  document.getElementById("wq-text").textContent=q.q;
  const opts=document.getElementById("wq-opts");
  opts.innerHTML="";
  shuffle([...q.opts]).forEach(o=>{
    const b=document.createElement("button"); b.className="wq-opt"; b.textContent=o;
    b.addEventListener("click",()=>onWheelAnswer(b,o,q.ans));
    opts.appendChild(b);
  });
}
function onWheelAnswer(btn,chosen,ans){
  document.querySelectorAll(".wq-opt").forEach(b=>{
    if(b.textContent===ans) b.classList.add("ok");
    else if(b===btn&&chosen!==ans) b.classList.add("ko");
    b.disabled=true;
  });
  if(chosen===ans){
    wheelScore+=10; document.getElementById("wheel-score").textContent=wheelScore;
    setFB("wheel-fb","✅ Correct! +10 pts!","ok"); speak(ans); addPts(5);
  } else {
    setFB("wheel-fb","❌ The answer was: "+ans,"ko");
  }
  if(wheelScore>=30) markActivity("games");
}

/* ════════════════════════════════════════
   GAME 7 – RACE TO HOUSE
════════════════════════════════════════ */
let raceStep=0, raceScore=0, raceQ=[], raceIdx=0, raceActive=false;

const RACE_Q = [
  { emoji:"👵", q:"Who is this?",               opts:["grandmother","mother","aunt","sister"],   ans:"grandmother" },
  { emoji:"👦", q:"Who is this?",               opts:["brother","father","uncle","cousin"],       ans:"brother" },
  { emoji:null, q:"'Tío' in English is:",       opts:["aunt","uncle","cousin","grandfather"],     ans:"uncle" },
  { emoji:null, q:"She is your dad's mother:",  opts:["aunt","grandmother","sister","mother"],    ans:"grandmother" },
  { emoji:"👶", q:"Who is this?",               opts:["baby","cousin","sister","nephew"],         ans:"baby" },
  { emoji:null, q:"'Prima' in English is:",     opts:["sister","aunt","cousin","mother"],         ans:"cousin" },
  { emoji:null, q:"He is your mom's dad:",      opts:["father","uncle","grandfather","brother"],  ans:"grandfather" },
  { emoji:"👩‍🦰",q:"Who is this?",                opts:["mother","aunt","sister","cousin"],         ans:"aunt" },
  { emoji:null, q:"Your sister's brother is:", opts:["cousin","uncle","brother","father"],        ans:"brother" },
  { emoji:"👴", q:"Who is this?",               opts:["grandfather","father","uncle","cousin"],   ans:"grandfather" },
];

function resetRaceUI(){
  raceActive=false; raceStep=0; raceScore=0; raceIdx=0;
  document.getElementById("race-runner").style.left="2%";
  document.getElementById("race-step").textContent=0;
  document.getElementById("race-score").textContent=0;
  document.getElementById("rq-emoji").textContent="❓";
  document.getElementById("rq-text").textContent="Press Start to play!";
  document.getElementById("rq-opts").innerHTML="";
  document.getElementById("race-btn").style.display="block";
  setFB("race-fb","","");
}

function startRace(){
  raceActive=true; raceStep=0; raceScore=0; raceIdx=0;
  document.getElementById("race-btn").style.display="none";
  document.getElementById("race-runner").style.left="2%";
  raceQ=shuffle([...RACE_Q]);
  loadRaceQ();
}

function loadRaceQ(){
  if(raceIdx>=raceQ.length) raceIdx=0;
  const q=raceQ[raceIdx];
  document.getElementById("rq-emoji").textContent=q.emoji||"❓";
  document.getElementById("rq-text").textContent=q.q;
  const opts=document.getElementById("rq-opts");
  opts.innerHTML="";
  shuffle([...q.opts]).forEach(o=>{
    const b=document.createElement("button"); b.className="rq-opt"; b.textContent=o;
    b.addEventListener("click",()=>onRaceAnswer(b,o,q.ans));
    opts.appendChild(b);
  });
  setFB("race-fb","","");
}
function onRaceAnswer(btn,chosen,ans){
  if(!raceActive) return;
  document.querySelectorAll(".rq-opt").forEach(b=>{
    if(b.textContent===ans) b.classList.add("ok");
    else if(b===btn&&chosen!==ans) b.classList.add("ko");
    b.disabled=true;
  });
  if(chosen===ans){
    raceStep++; raceScore+=10;
    document.getElementById("race-step").textContent=raceStep;
    document.getElementById("race-score").textContent=raceScore;
    const pct=Math.min(92,(raceStep/10)*90)+2;
    document.getElementById("race-runner").style.left=pct+"%";
    speak(ans); setFB("race-fb","✅ Correct! Keep running! 🏃","ok"); addPts(5);
    if(raceStep>=10){
      raceActive=false;
      document.getElementById("rq-emoji").textContent="🏡";
      document.getElementById("rq-text").textContent="🎉 You reached the house! Amazing!";
      document.getElementById("rq-opts").innerHTML="";
      setFB("race-fb","🏆 WINNER! Score: "+raceScore,"ok");
      addPts(20); markActivity("games");
      document.getElementById("race-btn").textContent="🔄 Play Again"; document.getElementById("race-btn").style.display="block";
      document.getElementById("race-btn").onclick=startRace;
      return;
    }
  } else {
    setFB("race-fb","❌ Wrong! Stay back! 😅","ko");
  }
  setTimeout(()=>{ raceIdx++; loadRaceQ(); },1200);
}

/* ════════════════════════════════════════
   PRACTICE
════════════════════════════════════════ */
let pxAnswered=0;
function buildPractice(){
  pxAnswered=0;
  const area=document.getElementById("practice-area"); area.innerHTML="";
  PRACTICE_EX.forEach((ex,i)=>{
    const d=document.createElement("div"); d.className="pex"; d.id="pex"+i;
    const display=ex.sent.replace("___",`<em>___</em>`);
    d.innerHTML=`<div class="pex-num">Exercise ${i+1}</div>
      <div class="pex-sent">${display}</div>
      <div class="pex-opts" id="po${i}"></div>
      <div class="pex-res" id="pr${i}"></div>`;
    area.appendChild(d);
    const od=d.querySelector("#po"+i);
    ex.opts.forEach(o=>{
      const b=document.createElement("button"); b.className="pex-opt"; b.textContent=o;
      b.addEventListener("click",()=>onPx(b,o,ex.ans,i,od));
      od.appendChild(b);
    });
  });
}
function onPx(btn,chosen,ans,i,optsDiv){
  optsDiv.querySelectorAll(".pex-opt").forEach(b=>{
    b.disabled=true;
    if(b.textContent===ans) b.classList.add("ok");
    else if(b===btn&&chosen!==ans) b.classList.add("ko");
  });
  const res=document.getElementById("pr"+i);
  if(chosen===ans){ res.textContent="✅ Correct!"; res.style.color="var(--green)"; speak(ans); }
  else { res.textContent=`❌ Answer: "${ans}"`; res.style.color="var(--red)"; document.getElementById("pex"+i).classList.add("shake"); setTimeout(()=>document.getElementById("pex"+i).classList.remove("shake"),400); }
  pxAnswered++;
  if(pxAnswered===PRACTICE_EX.length){ toast("🌟 All exercises done!"); markActivity("practice"); }
}

/* ════════════════════════════════════════
   QUIZ
════════════════════════════════════════ */
let qIdx=0, qScore=0, qAnswered=false;

function startQuiz(){
  qIdx=0; qScore=0; qAnswered=false;
  document.getElementById("quiz-start-screen").style.display="none";
  document.getElementById("quiz-game").style.display="block";
  document.getElementById("quiz-results").style.display="none";
  renderQuizQ();
}
function renderQuizQ(){
  qAnswered=false;
  const q=QUIZ_Q[qIdx];
  document.getElementById("q-num").textContent=qIdx+1;
  document.getElementById("q-score").textContent=qScore;
  document.getElementById("quiz-pfill").style.width=(qIdx/QUIZ_Q.length*100)+"%";
  const area=document.getElementById("quiz-q-area");
  area.innerHTML=`
    ${q.emoji?`<div class="qq-emoji">${q.emoji}</div>`:""}
    <div class="qq-text">${q.q}</div>
    <div class="qq-opts" id="qq-opts"></div>
    <div class="qq-fb" id="qq-fb"></div>`;
  const opts=document.getElementById("qq-opts");
  shuffle([...q.opts]).forEach(o=>{
    const b=document.createElement("button"); b.className="qq-opt"; b.textContent=o;
    b.addEventListener("click",()=>onQuizAns(b,o,q.ans));
    opts.appendChild(b);
  });
}
function onQuizAns(btn,chosen,ans){
  if(qAnswered) return; qAnswered=true;
  document.querySelectorAll(".qq-opt").forEach(b=>{
    b.disabled=true;
    if(b.textContent===ans) b.classList.add("ok");
    else if(b===btn&&chosen!==ans) b.classList.add("ko");
  });
  const fb=document.getElementById("qq-fb");
  if(chosen===ans){ qScore++; fb.textContent="✅ Correct!"; fb.style.color="var(--green)"; speak(ans); }
  else { fb.textContent="❌ Answer: "+ans; fb.style.color="var(--red)"; }
  document.getElementById("q-score").textContent=qScore;
  setTimeout(()=>{
    qIdx++;
    if(qIdx<QUIZ_Q.length) renderQuizQ();
    else finishQuiz();
  },1500);
}
function finishQuiz(){
  document.getElementById("quiz-game").style.display="none";
  document.getElementById("quiz-results").style.display="block";
  document.getElementById("quiz-pfill").style.width="100%";
  document.getElementById("res-score").textContent=qScore;
  let em="🏆",msg="";
  if(qScore>=9){ em="🏆"; msg="Outstanding! You're a champion! 🎉"; }
  else if(qScore>=7){ em="🌟"; msg="Excellent! You are learning so fast!"; }
  else if(qScore>=5){ em="😊"; msg="Good job! Keep practicing!"; }
  else { em="💪"; msg="Keep going! You can do it!"; }
  document.getElementById("res-emoji").textContent=em;
  document.getElementById("res-msg").textContent=msg;
  const stars="⭐".repeat(Math.ceil(qScore/2))+"☆".repeat(5-Math.ceil(qScore/2));
  document.getElementById("res-stars").textContent=stars;
  addPts(qScore*3); markActivity("quiz");
}
function restartQuiz(){
  document.getElementById("quiz-start-screen").style.display="block";
  document.getElementById("quiz-game").style.display="none";
  document.getElementById("quiz-results").style.display="none";
}

/* ────────────────────────────────────────
   HELPERS
──────────────────────────────────────── */
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function setFB(id,msg,type){
  const el=document.getElementById(id); if(!el) return;
  el.textContent=msg; el.className="gfb"+(type?" "+type:"");
}
