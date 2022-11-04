import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector);
startBtn = getEl('button[data-start]');
daysValue = getEl('[data-days]');
hoursValue = getEl('[data-hours]');
minutesValue = getEl('[data-minutes]');
secondsValue = getEl('[data-seconds]');

startBtn.setAttribute('disabled', true);

Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '0px',
  opacity: 1,
  // ...
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      startBtn.removeAttribute('disabled');
      getEl('input').classList.add('input--correct');
      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
  },
};

// Перший варіант (з об'єктом). Початок ===================================================================
// const InputCalendar = flatpickr('#datetime-picker', options);

// const countDownTimer = {
//   timerId: null,
//   isActive: false,

//   start() {
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;

//     const startTime = InputCalendar.selectedDates[0].getTime();

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = startTime - currentTime;
//       const timerValue = convertMs(deltaTime);

//       updateCountDownFace(timerValue);
//     }, 1000);
//   },
// };

// startBtn.addEventListener('click', countDownTimer.start.bind(countDownTimer));

// function adjustTimeValue(v) {
//   return String(v).padStart(2, '0');
// }

// function updateCountDownFace({ days, hours, minutes, seconds }) {
//   daysValue.textContent = days;
//   hoursValue.textContent = hours;
//   minutesValue.textContent = minutes;
//   secondsValue.textContent = seconds;
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = adjustTimeValue(Math.floor(ms / day));
//   // Remaining hours
//   const hours = adjustTimeValue(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = adjustTimeValue(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = adjustTimeValue(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }
// Перший варіант (з об'єктом). Кінець. ========================================================

const InputCalendar = flatpickr('#datetime-picker', options);

class CountDownTimer {
  constructor({ onTick, startTime }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.startTime = startTime;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = InputCalendar.selectedDates[0].getTime();
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = startTime - currentTime;

      const timerValue = this.convertMs(deltaTime);

      this.onTick(timerValue);
    }, 1000);
  }

  adjustTimeValue(v) {
    return String(v).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.adjustTimeValue(Math.floor(ms / day));
    // Remaining hours
    const hours = this.adjustTimeValue(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.adjustTimeValue(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.adjustTimeValue(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const countDownTimer = new CountDownTimer({
  onTick: updateCountDownFace,
});

function updateCountDownFace({ days, hours, minutes, seconds }) {
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
}

startBtn.addEventListener('click', countDownTimer.start.bind(countDownTimer));
