document.addEventListener('DOMContentLoaded', () => {
    // --- COUNTDOWN SCRIPT ---
    // Set a fixed end date for the countdown. 
    // This will be the same for every user and will not reset on refresh.
    // I've set it to 30 days from now (approx. August 15, 2025). 
    // You can change this to your actual launch date.
    const countDownDate = new Date("Aug 15, 2025 12:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // If the count down is finished, show a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p class="text-lg font-medium">We are now live!</p>';
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements, adding a leading zero if the number is less than 10
        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // --- HINT FEATURE SCRIPT ---
    const getHintBtn = document.getElementById('getHintBtn');
    const hintModal = document.getElementById('hintModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const hintContent = document.getElementById('hintContent');

    const hints = [
        "Arge is where the unseen becomes unforgettable.",
        "Prepare to experience creativity in its purest form. Arge is coming.",
        "The digital canvas is about to change forever. Arge is near.",
        "Unlock a new dimension of interaction. Arge holds the key.",
        "Beyond the code, beyond the design, lies Arge.",
        "It's not just a tool, it's a new way of thinking. Get ready for Arge.",
        "The power of unseen forces, harnessed. That is Arge.",
        "Where logic meets imagination, you will find Arge.",
        "A new era of digital creation dawns with Arge.",
        "The barrier between thought and reality is about to dissolve. Arge is the catalyst.",
        "See what's hidden in plain sight. Arge will show you.",
        "Your ideas, amplified. Your vision, realized. Arge is the future.",
        "The next leap forward isn't a step, it's a paradigm shift. It's Arge.",
        "Arge: The architecture of tomorrow's ideas.",
        "What if your tools could anticipate your next move? Arge can.",
        "Prepare for a seamless flow between inspiration and creation. Arge is coming.",
        "The fabric of digital reality is being rewoven. Arge is the thread.",
        "Complexity, simplified. Possibility, expanded. Arge is the answer.",
        "Don't just build, innovate. Arge will lead the way.",
        "The future is not built, it's grown. Arge is the seed.",
        "A whisper of what's to come, a promise of what's possible. That is Arge.",
        "The lines between art and technology are blurring. Arge is the new spectrum.",
        "Imagine a world where your only limit is your imagination. Arge is that world.",
        "The unseen is about to be revealed. Are you ready for Arge?",
        "A revolution in digital craftsmanship is upon us. Arge is its name.",
        "The next generation of innovation is not about more, but about better. Arge is better.",
        "The symphony of creation is about to begin. Arge is the conductor.",
        "Where data dances and ideas sing, Arge is the stage.",
        "The future is a conversation, and Arge is the new language.",
        "The unseen power of connection, made tangible. Arge is almost here."
    ];

    let lastHintIndex = -1;

    const showModal = () => {
        hintModal.style.opacity = '1';
        hintModal.style.pointerEvents = 'auto';
    };

    const hideModal = () => {
        hintModal.style.opacity = '0';
        hintModal.style.pointerEvents = 'none';
    };
    
    const getHint = () => {
        hintContent.innerHTML = '<div class="spinner"></div>';

        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * hints.length);
            } while (hints.length > 1 && randomIndex === lastHintIndex);
            
            lastHintIndex = randomIndex;
            const hint = hints[randomIndex];
            
            hintContent.innerHTML = `<p>${hint}</p>`;
        }, 500);
    };

    getHintBtn.addEventListener('click', () => {
        showModal();
        getHint();
    });

    closeModalBtn.addEventListener('click', hideModal);
    
    hintModal.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hideModal();
        }
    });
});
