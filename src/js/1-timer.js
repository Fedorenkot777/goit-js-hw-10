import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("start-button")
let userSelectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date,
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (userSelectedDate <= new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); 
console.log(convertMs(140000)); 
console.log(convertMs(24140000));

function addLeadingZero(value) {
    return value < 10 ? "0" + value : value;
}

function updateTimer({ days, hours, minutes, seconds }) {
    document.getElementById("days").textContent = addLeadingZero(days);
    document.getElementById("hours").textContent = addLeadingZero(hours);
    document.getElementById("minutes").textContent = addLeadingZero(minutes);
    document.getElementById("seconds").textContent = addLeadingZero(seconds);
}
function startCountdown(endDate) {
    const timerInterval = setInterval(() => {
        const now = new Date();
        const timeDifference = endDate - now;
        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            iziToast.success({
                title: "Success",
                message: "Countdown completed!",
            });
            document.querySelector("#datetime-picker").disabled = false;
            startBtn.disabled = true;
            return;
        }
        
        const timeRemaining = convertMs(timeDifference);
        updateTimer(userSelectedDate);
    }, 1000);
}

startBtn.addEventListener("click", () => {
    if (userSelectedDate) {
        startCountdown(userSelectedDate);
        document.querySelector("#datetime-picker").disabled = true;
        startBtn.disabled = true;
    }
});
