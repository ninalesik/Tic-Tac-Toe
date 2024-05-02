const arr = Array(9).fill(0);
let step = 1;

arr.forEach((item, index) => {
  const div = document.createElement("div");
  div.setAttribute("data-n", index);
  ttt.append(div);
});

const click = (event) => {
  const n = +event.target.getAttribute("data-n");
  if (arr[n] !== 0) return;
  arr[n] = step;
  draw();
  isWinner(step);

  if (step === 1) {
    step = 2;
  } else {
    step = 1;
  }
};

tttDiv = document.querySelectorAll("#ttt>div");
const draw = () => {
  arr.forEach((item, index) => {
    switch (item) {
      case 1:
        tttDiv[index].textContent = "X";
        break;
      case 2:
        tttDiv[index].textContent = "0";
        break;
    }
  });
};

const isWinner = (step) => {
  const winnerArr = ["012", "345", "678", "036", "147", "258", "048", "246"];
  let indexStep = [];
  arr.forEach((item, index) => {
    if (item === step) indexStep.push(index);
  });

  for (let i = 0; i < winnerArr.length; i++) {
    const winPattern = winnerArr[i];
    let count = 0;
    winPattern.split("").forEach((item) => {
      if (indexStep.includes(+item)) count++;
    });
    if (count === 3) {
      showWin(step);
      return;
    }
  }
  if (!arr.includes(0)) showInDraw();
};

const showWin = (step) => {
  ttt.removeEventListener("click", click);
  ttt.style.opacity = 0.7;
  document.querySelector(".result").textContent =
    (step === 1 ? "X" : "0") + " won!";
};

const showInDraw = () => {
  ttt.removeEventListener("click", click);
  ttt.style.opacity = 0.7;
  document.querySelector(".result").textContent = "The game ended in a draw!";
};

document.querySelector(".new-game-btn").addEventListener("click", () => {
  location.reload();
});

ttt.addEventListener("click", click);
