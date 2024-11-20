// VARIABLER
let point;
let liv;

// START APLIKATIONEN NÅR SIDEN VISES
window.addEventListener("load", sidenVises);

// KONSTANTER
const max = 6;
const godOst = document.querySelector("#god_ost_container");
const mugOst = document.querySelector("#mug_ost_container");
const godOst2 = document.querySelector("#god_ost_container2");
const mugOst2 = document.querySelector("#mug_ost_container2");

function sidenVises() {
  console.log("SidenVises");

  // AFSPIL BAGGRUNDSMUSIK
  document.querySelector("#forside_lyd").volume = 0.3;
  document.querySelector("#forside_lyd").play();

  //   VIS STARTSKÆRM
  // SKJUL ANDRE SKÆRME
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  //   GØR START-KNAP KLIKBAR, KLIK PÅ START/PLAY
  document.querySelector("#play_knap").addEventListener("click", startSpillet);
}
// GENERERER ET TILFÆLDIGT TAL FRA 1 TIL MAX
function nytRand(max) {
  return Math.floor(Math.random() * max) + 1;
}

function startSpillet() {
  console.log("startSpillet");

  //  STOP INTROMUSIK
  document.querySelector("#forside_lyd").pause();

  // AFSPIL BAGGRUNDSMUSIK
  document.querySelector("#musik").volume = 0.3;
  document.querySelector("#musik").play();

  // SKJUL ANDRE SKÆRME

  // NULSTIL POINT OG LIV
  point = 0;
  console.log(point);
  document.querySelector("#score_board").innerHTML = point;

  //  SKRIV POINT OG LIV UD
  liv = 3;
  console.log(liv);
  document.querySelector("#life_board").innerHTML = liv;

  //   START TIMER-ANIMATION
  document.querySelector("#minut_viser").classList.add("minut_animation");
  document.querySelector("#time_viser").classList.add("time_animation");
  document.querySelector("#time_board").addEventListener("animationend", stopSpillet);

  //   RANDOM POSITION OG RANDOM DELAY
  //   START FALD-ANIMATIONER PÅ ELEMENTER
  godOst.classList.add("fald", "delay" + nytRand(5));
  godOst2.classList.add("fald", "delay" + nytRand(5));
  godOst.classList.add("pos" + nytRand(6));
  godOst2.classList.add("pos" + nytRand(6));

  mugOst.classList.add("fald", "delay" + nytRand(5));
  mugOst2.classList.add("fald", "delay" + nytRand(5));
  mugOst.classList.add("pos2");
  mugOst2.classList.add("pos2");

  //   LYT EFTER AT FALDANIMATION PÅ GUL HAR KØRT EN GANG
  godOst.addEventListener("animationiteration", goodReset);
  godOst2.addEventListener("animationiteration", goodReset);

  //  LYT EFTER AT FALDANIMATION PÅ GRØN HAR KØRT EN GANG
  mugOst.addEventListener("animationiteration", badReset);
  mugOst2.addEventListener("animationiteration", badReset);

  //   GØR GRØN OST KLIKBAR
  mugOst.addEventListener("click", clickBad);
  mugOst2.addEventListener("click", clickBad);

  //   GØR GUL OST KLIKBAR
  godOst.addEventListener("click", clickGood);
  godOst2.addEventListener("click", clickGood);

  //  LYT EFTER OM TIMERANIMATION ER FÆRDIG
  document.querySelector("#minut_viser").addEventListener("animationend", stopSpillet);

  // SKJUL ANDRE SKRÆRME OG GAME OVER
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#igen_mug").classList.remove("hide");

  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#igen_gul").classList.remove("hide");

  document.querySelector("#start").classList.add("hide");
}
// FRYS ANIMATION PÅ KLIK
function clickGood() {
  console.log("clickGood");
  this.classList.add("frys");

  //   FÅ 1 POINT
  point++;
  document.querySelector("#score_board").textContent = point;
  //   Skriv point ud

  //   AFSPIL GOD_LYD
  document.querySelector("#god_lyd").volume = 1;
  document.querySelector("#god_lyd").currentTime = 0;
  document.querySelector("#god_lyd").play();

  //   START GOODFORSVIND-ANIMATION
  this.firstElementChild.classList.add("forsvind_good");

  //   LYT EFTER GOODFORSVIND-ANIMATION ER FÆRDIG
  this.addEventListener("animationend", goodReset);

  //FJERN EVENTLISTENER
  this.removeEventListener("click", clickGood);
}

// NULSTIL ELEMENT
function goodReset() {
  console.log("goodReset");
  this.classList = "";
  this.firstElementChild.classList = "";

  // VIS ELEMENT IGEN
  // NY RANDOM POSITION
  this.classList.add("pos" + nytRand(6));

  // GENSTART FALD-ANIMATION
  this.offsetLeft;
  this.classList.add("fald");

  //TILFØJ EVENTLISTENER IGEN
  this.addEventListener("click", clickGood);
}

function clickBad() {
  console.log("clickBad");

  //   AFSPIL LYD MUG_LYD
  document.querySelector("#mug_lyd").volume = 0.5;
  document.querySelector("#mug_lyd").currentTime = 0;
  document.querySelector("#mug_lyd").play();

  //  START BADFORSVIND-ANIMATION
  this.firstElementChild.classList.add("forsvind_bad");

  //   LYT EFTER OM BADFORSVIND-ANIMATION ER FÆRDIG
  this.addEventListener("animationend", badReset);

  //FJERN EVENTLISTENER FOR KLIK
  this.removeEventListener("click", clickBad);

  // MIST ET LIV
  liv--;

  //TJEK OM DER ER MERE END NUL LIV
  if (liv <= 0) {
    stopSpillet();
  }

  // VIS ANTAL LIV
  document.querySelector("#life_board").textContent = liv;
}

// NULSTIL ELEMENT
function badReset() {
  console.log("badReset");
  this.classList = "";
  this.firstElementChild.classList = "";

  // VIS ELEMENT IGEN
  // NY RANDOM POSITION
  let myRand = Math.floor(Math.random() * max) + 1;
  this.classList.add("pos" + myRand);

  //   GENSTART FALD-ANIMATION
  this.offsetLeft;
  this.classList.add("fald");

  //TILFØJ EVENTLISTENER IGEN
  this.addEventListener("click", clickBad);
}

function stopSpillet() {
  console.log("stopSpillet");

  // STOP TIMER
  document.querySelector("#minut_viser").classList = "";
  document.querySelector("#time_viser").classList = "";
  document.querySelector("#time_board").removeEventListener("animationend", stopSpillet);

  // NULSTIL ANIMATIONER OG EVENTLISTENERS FOR GUL OST
  godOst.classList = "";
  godOst2.classList = "";
  godOst.firstElementChild.classList = "";
  godOst2.firstElementChild.classList = "";

  godOst.removeEventListener("animationiteration", goodReset);
  godOst2.removeEventListener("animationiteration", goodReset);

  godOst.removeEventListener("animationend", goodReset);
  godOst2.removeEventListener("animationend", goodReset);

  godOst.removeEventListener("mousedown", clickGood);
  godOst2.removeEventListener("mousedown", clickGood);

  // NULSTIL ANIMATIONER OG EVENTLISTENERS FOR GRØN OST
  mugOst.classList = "";
  mugOst2.classList = "";
  mugOst.firstElementChild.classList = "";
  mugOst2.firstElementChild.classList = "";

  mugOst.removeEventListener("animationiteration", badReset);
  mugOst2.removeEventListener("animationiteration", badReset);

  mugOst.removeEventListener("animationend", badReset);
  mugOst2.removeEventListener("animationend", badReset);

  mugOst.removeEventListener("mousedown", clickBad);
  mugOst2.removeEventListener("mousedown", clickBad);

  // TJEK SPILSTATUS (OM JEG HAR MERE END 15 POINT)
  // TJEK OM JEG HAR LIV TILBAGE
  if (liv <= 0) {
    console.log("Du har tabt");
    gameOver();
  } else if (point >= 15) {
    console.log("Du har vundet");
    levelComplete();
  } else {
    console.log("Du har tabt");
    gameOver();
  }
}
//   VIS GAME-OVER SKÆRM
function gameOver() {
  console.log("gameOver");

  //   GØR "SPIL IGEN" KLIKBAR
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#igen_mug").addEventListener("click", startSpillet);

  // AFSPIL BAGGRUNDSMUSIK
  document.querySelector("#musik").volume = 0.1;
  document.querySelector("#musik").play();

  // AFSPIL LYD FOR GAME-OVER
  document.querySelector("#over_lyd").volume = 1;
  document.querySelector("#over_lyd").play();
}

// VIS LEVEL-COMPLETE SKÆRM
function levelComplete() {
  // AFSPIL BAGGRUNDSMUSIK
  document.querySelector("#musik").volume = 0.1;
  document.querySelector("#musik").play();

  // AFSPIL LUD FOR LEVEL COMPLETE
  document.querySelector("#complete_lyd").volume = 1;
  document.querySelector("#complete_lyd").play();

  //   GØR SPIL IGEN KLIKBART
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#igen_gul").addEventListener("click", startSpillet);
}
