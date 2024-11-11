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
  //   Skriv point og liv ud
  //   Start timer -animation
  //   Random position og random delay
  //   Start fald -animationer på elementer

  //   Gør gul ost klikbart (både gul og grøn da man skal kunne klikke på dem, hvilket også sker i funktionen ovenover)
  //   lyt efter at faldanimtion på gul ost har kørt én gang

  //   gør grøn ost klikbart
  //   lyt efter at faldanimtion på grøn ost har kørt én gang

  //   Lyt efter om timeranimation er færdig
}

function clickGood() {
  console.log("clickGood");
  //   Få 1 point
  point++;
  //   Skriv point ud
  //   Afspil lyd good
  //   Start goodForsvind -animation
  //   lyt efter goodForsvind-animation er færdig
}

function goodReset() {
  console.log("goodReset");
  // Vis element igen
  //   Ny random position
  //   Genstart fald -animation
}

function clickBad() {
  console.log("clickBad");
  // mist et liv
  //   Vis antal liv
  //   Afspil lyd bad
  //   badForsvind -animation
  //   lyt efter badForsvind-animation er færdig
}

function badReset() {}
console.log("badReset");
// Vis element igen
// Ny random position
// Genstart fald -animation

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
