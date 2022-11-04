function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let getEl = element => document.querySelector(element);
const startBtn = getEl('button[data-start]');
const stopBtn = getEl('button[data-stop]');

// *ПЕРШИЙ ВАРІАНТ (прямий)*

// let timerId = null;
// let switcherIsActive = false;

// startBtn.addEventListener('click', onStartBtnClick);

// function onStartBtnClick() {
//   if (switcherIsActive === true) {
//     return;
//   }
//   switcherIsActive = true;
//   timerId = setInterval(() => {
//     document.querySelector('body').style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// stopBtn.addEventListener('click', () => {
//   clearInterval(timerId);
//   switcherIsActive = false;
// });

// *ДРУГИЙ ВАРІАНТ (ОБ'ЄКТ)*

// const colorSwitcher = {
//   timerId: null,
//   isActive: false,

//   start() {
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;
//     this.timerId = setInterval(() => {
//       document.querySelector('body').style.backgroundColor =
//         getRandomHexColor();
//     }, 1000);
//   },

//   stop() {
//     clearInterval(this.timerId);
//     this.isActive = false;
//   },
// };

// *ТРЕТІЙ ВАРІАНТ (КЛАС)*
class Switcher {
  constructor({ onTick, startBtn }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.startBtn = startBtn;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(this.onTick, 1000);
    this.startBtn.setAttribute('disabled', true);
  }

  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    this.startBtn.removeAttribute('disabled');
  }
}

const colorSwitcher = new Switcher({ onTick: bgColorCng, startBtn: startBtn });

function bgColorCng() {
  document.querySelector('body').style.backgroundColor = getRandomHexColor();
  console.log(Date.now());
}

startBtn.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));
stopBtn.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));
