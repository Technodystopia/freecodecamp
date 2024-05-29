document.addEventListener('DOMContentLoaded', function () {
    const breakDecrement = document.getElementById('break-decrement');
    const breakIncrement = document.getElementById('break-increment');
    const sessionDecrement = document.getElementById('session-decrement');
    const sessionIncrement = document.getElementById('session-increment');
    const startStop = document.getElementById('start_stop');
    const reset = document.getElementById('reset');
    const breakLength = document.getElementById('break-length');
    const sessionLength = document.getElementById('session-length');
    const timerLabel = document.getElementById('timer-label');
    const timeLeft = document.getElementById('time-left');
    const beep = document.getElementById('beep');

    let breakTime = parseInt(breakLength.textContent) * 60; 
    let sessionTime = parseInt(sessionLength.textContent) * 60; 
    let isSession = true;
    let isRunning = false;
    let interval;

    function displayTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeLeft.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function toggleTimer() {
        if (isRunning) {
            clearInterval(interval);
            isRunning = false;
        } else {
            isRunning = true;
            interval = setInterval(updateTimer, 1000);
        }
    }

    function updateTimer() {
        if (isSession) {
            sessionTime--;
            if (sessionTime < 0) {
                beep.play();
                isSession = false;
                timerLabel.textContent = 'Break';
                sessionTime = parseInt(sessionLength.textContent) * 60;
                breakTime = parseInt(breakLength.textContent) * 60; 
            }
        } else {
            breakTime--;
            if (breakTime < 0) {
                beep.play();
                isSession = true;
                timerLabel.textContent = 'Session';
                breakTime = parseInt(breakLength.textContent) * 60;
                sessionTime = parseInt(sessionLength.textContent) * 60; 
            }
        }
        displayTime(isSession ? sessionTime : breakTime);
    }

    breakDecrement.addEventListener('click', function () {
        if (!isRunning && parseInt(breakLength.textContent) > 1) {
            breakLength.textContent = parseInt(breakLength.textContent) - 1;
            breakTime = parseInt(breakLength.textContent) * 60;
            if (!isSession) {
                displayTime(breakTime);
            }
        }
    });

    breakIncrement.addEventListener('click', function () {
        if (!isRunning && parseInt(breakLength.textContent) < 60) {
            breakLength.textContent = parseInt(breakLength.textContent) + 1;
            breakTime = parseInt(breakLength.textContent) * 60;
            if (!isSession) {
                displayTime(breakTime);
            }
        }
    });

    sessionDecrement.addEventListener('click', function () {
        if (!isRunning && parseInt(sessionLength.textContent) > 1) {
            sessionLength.textContent = parseInt(sessionLength.textContent) - 1;
            sessionTime = parseInt(sessionLength.textContent) * 60;
            if (isSession) {
                displayTime(sessionTime);
            }
        }
    });

    sessionIncrement.addEventListener('click', function () {
        if (!isRunning && parseInt(sessionLength.textContent) < 60) {
            sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
            sessionTime = parseInt(sessionLength.textContent) * 60;
            if (isSession) {
                displayTime(sessionTime);
            }
        }
    });

    startStop.addEventListener('click', function () {
        toggleTimer();
    });

    reset.addEventListener('click', function () {
        clearInterval(interval);
        isRunning = false;
        isSession = true;
        breakLength.textContent = '5';
        sessionLength.textContent = '25';
        breakTime = parseInt(breakLength.textContent) * 60;
        sessionTime = parseInt(sessionLength.textContent) * 60;
        timerLabel.textContent = 'Session';
        displayTime(sessionTime);
        beep.pause();
        beep.currentTime = 0;
    });

    beep.addEventListener('loadedmetadata', function() {
        if (beep.duration < 1) {
            console.error("Audio duration should be at least 1 second.");
        }
    });

    beep.addEventListener('ended', function() {
        beep.pause();
        beep.currentTime = 0;
    });

    displayTime(sessionTime);
});
