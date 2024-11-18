let point;
let liv;

window.addEventListener("load", sidenVises);
const max = 6;
const godOst = document.querySelector("#god_ost_container");
const mugOst = document.querySelector("#mug_ost_container");

const godOst2 = document.querySelector("#god_ost_container2");
const mugOst2 = document.querySelector("#mug_ost_container2");

function sidenVises() {
  console.log("SidenVises");
  // Skjul andre skærme
  //   Vis start skærm
  //   Gør start-knap klikbar, klik på start/play
  startSpillet();
}

function nytRand(max) {
  return Math.floor(Math.random() * max) + 1;
}

function startSpillet() {
  console.log("startSpillet");
  // skjul andre skærme
  //Nulstil point og liv
  point = 0;
  console.log(point);
  document.querySelector("#score_board").innerHTML = point;
  //  Skriv point og liv ud
  liv = 3;
  console.log(liv);
  document.querySelector("#life_board").innerHTML = liv;

  //   Start timer -animation
  document.querySelector("#minut_viser").classList.add("minut_animation");
  document.querySelector("#time_viser").classList.add("time_animation");
  document.querySelector("#time_board").addEventListener("animationend", stopSpillet);

  //   Random position og random delay
  //   Start fald -animationer på elementer
  godOst.classList.add("fald", "delay" + nytRand(5));
  godOst2.classList.add("fald", "delay" + nytRand(5));
  godOst.classList.add("pos" + nytRand(6));
  godOst2.classList.add("pos" + nytRand(6));

  mugOst.classList.add("fald", "delay" + nytRand(5));
  mugOst2.classList.add("fald", "delay" + nytRand(5));
  mugOst.classList.add("pos2");
  mugOst2.classList.add("pos2");

  // console.log("her er mit random delay", randomDelay);

  //   lyt efter at faldanimtion på gul ost har kørt én gang
  //   lyt efter at faldanimtion på grøn ost har kørt én gang
  godOst.addEventListener("animationiteration", goodReset);
  godOst2.addEventListener("animationiteration", goodReset);

  mugOst.addEventListener("animationiteration", badReset);
  mugOst2.addEventListener("animationiteration", badReset);

  //   Gør gul ost klikbart
  //   gør grøn ost klikbart
  mugOst.addEventListener("click", clickBad);
  mugOst2.addEventListener("click", clickBad);

  godOst.addEventListener("click", clickGood);
  godOst2.addEventListener("click", clickGood);
}

//   Lyt efter om timeranimation er færdig
document.querySelector("#minut_viser").addEventListener("animationend", stopSpillet);

// ændrer alle god og dårlig til this, fordi jeg har fået flere elementer
function clickGood() {
  console.log("clickGood");
  this.classList.add("frys");

  //   Få 1 point
  point++;
  document.querySelector("#score_board").textContent = point;
  //   Skriv point ud
  //   Afspil lyd good
  //   Start goodForsvind -animation
  this.firstElementChild.classList.add("forsvind_good");
  //   lyt efter goodForsvind-animation er færdig
  this.addEventListener("animationend", goodReset);

  //fjern event listener
  this.removeEventListener("click", clickGood);
}

function goodReset() {
  console.log("goodReset");
  this.classList = "";
  this.firstElementChild.classList = "";

  // Vis element igen
  //   Ny random position

  this.classList.add("pos" + nytRand(6));
  //   Genstart fald -animation
  this.offsetLeft;
  this.classList.add("fald");

  //add eventlistener igen
  this.addEventListener("click", clickGood);
}

function clickBad() {
  console.log("clickBad");

  //   Afspil lyd bad
  //   badForsvind -animation
  this.firstElementChild.classList.add("forsvind_bad");
  //   lyt efter badForsvind-animation er færdig
  this.addEventListener("animationend", badReset);

  //fjern event listener
  this.removeEventListener("click", clickBad);

  // mist et liv
  liv--;

  //TJEK OM DER ER MERE END NUL LIV
  if (liv <= 0) {
    stopSpillet();
  }

  //   Vis antal liv
  document.querySelector("#life_board").textContent = liv;
}

function badReset() {
  console.log("badReset");
  this.classList = "";
  this.firstElementChild.classList = "";

  // Vis element igen
  //   Ny random position
  let myRand = Math.floor(Math.random() * max) + 1;
  this.classList.add("pos" + myRand);
  //   Genstart fald -animation
  this.offsetLeft;
  this.classList.add("fald");

  //add eventlistener igen
  this.addEventListener("click", clickBad);
}

function stopSpillet() {
  console.log("stopSpillet");

  // stop timer
  document.querySelector("#minut_viser").classList = "";
  document.querySelector("#time_viser").classList = "";
  document.querySelector("#time_board").removeEventListener("animationend", stopSpillet);

  // god
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

  // Dårlig
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

  if (liv <= 0) {
    console.log("Du har tabt");
    gameOver();
  } else if (point >= 5) {
    console.log("Du har vundet");
    levelComplete();
  } else {
    console.log("Du har tabt");
    gameOver();
  }

  //Fjern alle animationer
  //   Fjern alle eventListerner-ere
  //   tjek om jeg har mere end 20 point
  // tjek om jeg har liv tilbage
}

function gameOver() {
  console.log("gameOver");
  //   Vis gameover skærm
  //   gør "spil igen" klikbart
}

function levelComplete() {
  console.log("levelComplete");
  //   Vis levelcomplete skærm
  //   gør "spil igen" klikbart
}
