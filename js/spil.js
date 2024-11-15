let point;
let liv;

window.addEventListener("load", sidenVises);
const max = 6;
const godOst = document.querySelector("#god_ost_container");
const mugOst = document.querySelector("#mug_ost_container");

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
  godOst.classList.add("pos" + nytRand(6));

  mugOst.classList.add("fald", "delay" + nytRand(5));
  mugOst.classList.add("pos2");

  // console.log("her er mit random delay", randomDelay);

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
document.querySelector("#minut_viser").addEventListener("animationend", stopSpillet);

function clickGood() {
  console.log("clickGood");
  godOst.classList.add("frys");

  //   Få 1 point
  point++;
  document.querySelector("#score_board").textContent = point;
  //   Skriv point ud
  //   Afspil lyd good
  //   Start goodForsvind -animation
  godOst.firstElementChild.classList.add("forsvind_good");
  //   lyt efter goodForsvind-animation er færdig
  godOst.addEventListener("animationend", goodReset);

  //fjern event listener
  godOst.removeEventListener("click", clickGood);
}

function goodReset() {
  console.log("goodReset");
  godOst.classList = "";
  godOst.firstElementChild.classList = "";

  // Vis element igen
  //   Ny random position

  godOst.classList.add("pos" + nytRand(6));
  //   Genstart fald -animation
  godOst.offsetLeft;
  godOst.classList.add("fald");

  //add eventlistener igen
  godOst.addEventListener("click", clickGood);
}

function clickBad() {
  console.log("clickBad");
  // mist et liv
  liv--;

  //TJEK OM DER ER MERE END NUL LIV
  if (liv <= 0) {
    stopSpillet();
  }

  //   Vis antal liv
  document.querySelector("#life_board").textContent = liv;

  //   Afspil lyd bad
  //   badForsvind -animation
  mugOst.firstElementChild.classList.add("forsvind_bad");
  //   lyt efter badForsvind-animation er færdig
  mugOst.addEventListener("animationend", badReset);

  //fjern event listener
  mugOst.removeEventListener("click", clickBad);
}

function badReset() {
  console.log("badReset");
  mugOst.classList = "";
  mugOst.firstElementChild.classList = "";

  // Vis element igen
  //   Ny random position
  let myRand = Math.floor(Math.random() * max) + 1;
  mugOst.classList.add("pos" + myRand);
  //   Genstart fald -animation
  mugOst.offsetLeft;
  mugOst.classList.add("fald");

  //add eventlistener igen
  mugOst.addEventListener("click", clickBad);
}

function stopSpillet() {
  console.log("stopSpillet");

  // stop timer
  document.querySelector("#minut_viser").classList = "";
  document.querySelector("#time_viser").classList = "";
  document.querySelector("#time_board").removeEventListener("animationend", stopSpillet);

  godOst.classList = "";
  godOst.firstElementChild.classList = "";

  godOst.removeEventListener("animationiteration", goodReset);
  godOst.removeEventListener("animationend", goodReset);
  godOst.removeEventListener("mousedown", clickGood);

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
