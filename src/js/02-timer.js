import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    };
    btnStart.disabled = false;
    
    let timerId = null;
    let ms = 0;

    btnStart.addEventListener('click', () => {
      Notiflix.Notify.success('Start');
      timerId = setInterval(() => {
        ms = selectedDates[0] - new Date();
        const updateTimerObj = convertMs(ms);
        
        updateTimer(updateTimerObj);

        if (ms <= 1000) {
          clearInterval(timerId);
          Notiflix.Notify.success('Stop');
        }
      }, 1000);
    });
  },
};
flatpickr(input, options);
  

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimer(updateTimerObj) {
  days.textContent = addLeadingZero(updateTimerObj.days);
  hours.textContent = addLeadingZero(updateTimerObj.hours);  
  minutes.textContent = addLeadingZero(updateTimerObj.minutes);
  seconds.textContent = addLeadingZero(updateTimerObj.seconds);
  
};

