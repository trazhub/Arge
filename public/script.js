document.addEventListener('DOMContentLoaded', () => {
    // --- COUNTDOWN SCRIPT ---
    const countDownDate = new Date();
    // Set the countdown for 30 days from now
    countDownDate.setDate(countDownDate.getDate() + 30); 

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p class="text-lg">We are live!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // --- SUBSCRIBE FORM SCRIPT ---
    const subscribeForm = document.getElementById('subscribe-form');
    const mainContent = document.getElementById('main-content');

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Replace the form with a success message
        mainContent.innerHTML = `
            <h1 class="title">Thank You!</h1>
            <p class="subtitle">You're on the list. We'll be in touch shortly.</p>
        `;
    });
});
