let score;
let liv;

const godOst = document.querySelector("#god_ost_container");
const mugOst = document.querySelector("#mug_ost_container");

window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("SidenVises");
  // Skjul andre skærme
  //   Vis start skærm
  //   Gør start-knap klikbar, klik på start/play
  startSpillet();
}

function startSpillet() {
  console.log("startSpillet");
  // skjul andre skærme
  //Nulstil point og liv
  point = 0;
  console.log(point);
  document.querySelector("#score_board").innerHTML = point;

  liv = 3;
  console.log(liv);
  document.querySelector("#life_board").innerHTML = liv;

  //   Skriv point og liv ud
  //   Start timer -animation
  //   Random position og random delay
  //   Start fald -animationer på elementer
  godOst.classList.add("fald");
  godOst.classList.add("pos1");

  mugOst.classList.add("fald");
  mugOst.classList.add("pos5");

  //   lyt efter at faldanimtion på gul ost har kørt én gang
  //   lyt efter at faldanimtion på grøn ost har kørt én gang
  godOst.addEventListener("animationiteration", goodReset);
  mugOst.addEventListener("animationiteration", badReset);

  //   Gør gul ost klikbart
  //   gør grøn ost klikbart
  mugOst.addEventListener("click", clickBad);
  godOst.addEventListener("click", clickGood);
}

//   Lyt efter om timeranimation er færdig

function clickGood() {
  console.log("clickGood");
  godOst.classList.add("frys");

  //   Få 1 point
  point++;
  document.querySelector("#score_board").textContent = point;
  //   Skriv point ud
  //   Afspil lyd good
  //   Start goodForsvind -animation
  document.querySelector("#god_ost_sprite").classList.add("forsvind_good");
  //   lyt efter goodForsvind-animation er færdig
  godOst.addEventListener("animationend", goodReset);
}

function goodReset() {
  console.log("goodReset");
  godOst.classList = "";
  document.querySelector("#god_ost_sprite").classList = "";

  // Vis element igen
  //   Ny random position
  godOst.classList.add("pos6");
  //   Genstart fald -animation
  godOst.offsetLeft;
  godOst.classList.add("fald");
}

function clickBad() {
  console.log("clickBad");
  // mist et liv
  liv--;
  document.querySelector("#life_board").textContent = liv;

  //   Vis antal liv
  //   Afspil lyd bad
  //   badForsvind -animation
  document.querySelector("#mug_ost_sprite").classList.add("forsvind_bad");
  //   lyt efter badForsvind-animation er færdig
  mugOst.addEventListener("animationend", badReset);
}

function badReset() {
  console.log("badReset");
  mugOst.classList = "";
  document.querySelector("#mug_ost_sprite").classList = "";

  // Vis element igen
  //   Ny random position
  mugOst.classList.add("pos5");
  //   Genstart fald -animation
  mugOst.offsetLeft;
  mugOst.classList.add("fald");
}

function stopSpillet() {
  console.log("stopSpillet");
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
