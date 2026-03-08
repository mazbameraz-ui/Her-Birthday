function showMessage() {

    document.getElementById("message").style.display = "block";

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}
const questions = [

    {
        question: "আমায় ভালোবাসো?",
        options: ["ক. হ্যাঁ", "খ. ক", "গ. খ", "ঘ. সবগুলোই"],
        answer: "ঘ. সবগুলোই",
        letter:
            `তাই? সত্যি? তুমি আমার জিবনে দেয়া সেরা একটি উপহার।\nশুভ জন্মদিন জান!`
    },

    {
        question: "আমাকে ছাড়া বাঁচবে?",
        options: ["ক. উহু", "খ. ক", "গ. খ", "ঘ. সবগুলোই"],
        answer: "ঘ. সবগুলোই",
        letter:
            `আজকের দিন না আসলে আমি এমন একজন মানুষ আমার জিবনে পেতাম না। তুমি ভাবতেও পারবে না তুমি আমার জন্য কতটা দামি!`
    },
    {
        question: "আমাকে ছাড়া বাঁচবে?",
        options: ["ক. উহু", "খ. ক", "গ. খ", "ঘ. সবগুলোই"],
        answer: "ঘ. সবগুলোই",
        letter:
            `আজকের দিন না আসলে আমি এমন একজন মানুষ আমার জিবনে পেতাম না। তুমি ভাবতেও পারবে না তুমি আমার জন্য কতটা দামি!`
    }

];

let current = 0;

loadQuestion();

function loadQuestion() {

    const box = document.getElementById("questionBox");
    const optionsDiv = document.getElementById("options");
    const questionEl = document.getElementById("question");

    // Clear options and letter first
    optionsDiv.innerHTML = "";
    document.getElementById("letterText").innerHTML = "";

    // Get current question
    const q = questions[current];

    // Update question text
    questionEl.innerText = q.question;

    // Hide box before animation
    box.style.opacity = 0;
    box.style.transform = "translateY(20px)";

    // Add options buttons
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = function (e) {
            if (option === q.answer) {
                // Disable all option buttons
                const allButtons = optionsDiv.querySelectorAll("button");
                allButtons.forEach(b => b.disabled = true);

                // Add glow effect to the clicked button
                btn.classList.add("correct");
                setTimeout(() => btn.classList.remove("correct"), 700);

                // Heart burst at button location
                const burst = document.createElement("div");
                burst.classList.add("heart-burst");
                burst.style.left = (e.target.offsetLeft + e.target.offsetWidth / 2) + "px";
                burst.style.top = (e.target.offsetTop - 10) + "px";
                burst.innerText = "❤️";
                document.querySelector(".game").appendChild(burst);
                setTimeout(() => burst.remove(), 800);

                // Show typewriter letter
                typeWriter(q.letter);

                current++;

                if (current < questions.length) {
                    setTimeout(loadQuestion, 12000);
                } else {
                    // Show final message
                    const box = document.getElementById("questionBox");
                    box.innerHTML = "<h2>Happy Birthday My Love ❤️</h2><p>You completed the game!</p>";

                    // Create Next Page button dynamically
                    const nextBtn = document.createElement("a");
                    nextBtn.classList.add("theme-button");
                    nextBtn.href = "wish.html"; // <-- set your next page link
                    nextBtn.innerText = "চলো পরের পাতায়!";
                    nextBtn.style.opacity = 0;
                    nextBtn.style.transform = "translateY(20px)";

                    // Append button to game container
                    document.querySelector(".game").appendChild(nextBtn);

                    // Animate button fade-in + slide-up
                    setTimeout(() => {
                        nextBtn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                        nextBtn.style.opacity = 1;
                        nextBtn.style.transform = "translateY(0)";
                    }, 200);

                    // Optional: heart burst animation when clicked
                    nextBtn.addEventListener("click", (e) => {
                        const burst = document.createElement("div");
                        burst.classList.add("heart-burst");
                        burst.style.left = (nextBtn.offsetLeft + nextBtn.offsetWidth / 2) + "px";
                        burst.style.top = (nextBtn.offsetTop - 10) + "px";
                        burst.innerText = "❤️";
                        document.body.appendChild(burst);
                        setTimeout(() => burst.remove(), 800);
                    });
                }

            } else {
                // Wrong answer shake
                btn.classList.add("wrong");
                setTimeout(() => btn.classList.remove("wrong"), 400);
            }
        }

        optionsDiv.appendChild(btn);
    });

    // Trigger smooth fade + slide animation
    setTimeout(() => {
        box.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        box.style.opacity = 1;
        box.style.transform = "translateY(0)";
    }, 50);

}
function typeWriter(text) {
    let i = 0;
    const target = document.getElementById("letterText");
    target.innerHTML = "";

    function typing() {
        if (i < text.length) {
            let char = text.charAt(i);

            // Convert newline character to <br> for HTML
            if (char === "\n") char = "<br>";

            target.innerHTML += char;
            i++;
            setTimeout(typing, 60); // speed of typewriter
        }
    }

    typing();
}

function createHearts() {
    const container = document.querySelector(".floating-hearts");
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement("div");
        heart.innerText = "❤️";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 10 + Math.random() * 30 + "px";
        heart.style.opacity = 0.5 + Math.random() * 0.5;
        heart.style.animation = `floatHeart ${5 + Math.random() * 5}s linear infinite`;
        container.appendChild(heart);
    }
}

createHearts();

const bgText = document.getElementById("bgText");
const text = bgText.innerText;
bgText.innerHTML = ""; // clear original text

// Wrap each letter in a span
text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;

    // Random animation delay for cinematic effect
    span.style.animationDelay = (Math.random() * 5) + "s";

    bgText.appendChild(span);
});

// Target date: 9 March 2026, 12:00 AM
const targetDate = new Date("2026-03-09T00:00:00");

// Elements
const countdownContainer = document.getElementById("countdownContainer");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Update every second
const countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        countdownContainer.style.display = "none"; // hide countdown
        document.querySelector(".story-game").style.display = "block"; // unlock main page
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');

}, 1000);

// Hide story-game until countdown ends
document.querySelector(".story-game").style.display = "none";