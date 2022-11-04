import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector);
const delay = getEl('[name=delay]');
const step = getEl('[name=step]');
const amount = getEl('[name=amount]');
const form = getEl('.form');

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  // ...
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  let promiseDelay = Number(delay.value);
  let promisePosition = 0;

  let intervalId = setInterval(() => {
    if (promisePosition === Number(amount.value)) {
      clearInterval(intervalId);
      return;
    }
    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${delay}ms`
        );
      });
    promisePosition += 1;
    promiseDelay += Number(step.value);
  }, step.value);
}
