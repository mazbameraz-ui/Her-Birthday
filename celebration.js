
let currentStory = 0; // Track current story

const startContainer = document.getElementById("startContainer");
const startBtn = document.getElementById("startBtn");
const bgMusic = document.getElementById("bgMusic");
const storyGame = document.querySelector(".story-game");
const storyImage = document.getElementById("storyImage");
const storyText = document.getElementById("storyText");
const storyNextContainer = document.getElementById("storyNextContainer");

// Initially hide story container
storyGame.style.display = "none";

// ------------------------------
// Stories data
// ------------------------------
const stories = [
    {
        image: "assets/images/stories/image1.png",
        text: "যদিও আমরা দূরে, তবুও তো আমাদের জন্মদিন এভাবে celebrate করতে পারি? চলো তাহলে তাই করি? ❤️"
    },
    {
        image: "assets/images/stories/image2.png",
        text: "এরপর যাচ্ছি তোমার সেই প্রিয় রেস্টুরেন্ট এ। এটাই শেষ না, রাতে আবার আসবো। এসেছি, আমি বললাম, চলো ঐ টেবিল টায় বসি? তুমিও বললে চলো। আমাকে কখনই খাইয়ে দেয়া ভুলে যাও না! 😋। এতই ভালোবাসো আমাকে? ❤️"
    },
    {
        image: "assets/images/stories/image3.png",
        text: "এখন আমরা একটি সুন্দর ফুলের বাগানে আমার দুনিয়ার সবচেয়ে সুন্দর ফুল কে নিয়ে যাচ্ছি! 🌸"
    },
    {
        image: "assets/images/stories/image4.png",
        text: "এখন আমরা সিনেমা দেখতে যাবো! সিনেপ্লক্সের টিকেট কেটে রেখেছি! কত সুন্দর না আমাদের মুহূর্ত?🎬"
    },
    {
        image: "assets/images/stories/image5.png",
        text: "অবশেষে আমরা তোমার পছন্দের একটি রেস্টুরেন্ট এ গিয়ে তোমার পছন্দের খাবার খেয়ে একটি Candlelight Dinner শেষ করলাম। কেমন লাগলো দিনটি? জানিও। শুভ জন্মদিন জান 🎉"
    }
];

// ------------------------------
// Start button click
// ------------------------------
startBtn.addEventListener("click", () => {
    startContainer.style.display = "none"; // hide start button
    storyGame.style.display = "block";     // show story container
    bgMusic.play();                         // play music
    loadStory(currentStory);                // start first story
});

// ------------------------------
// Typewriter effect
// ------------------------------
function typeWriterStory(text, callback) {
    let i = 0;
    storyText.innerHTML = "";
    function typing() {
        if (i < text.length) {
            let char = text.charAt(i);
            if (char === "\n") char = "<br>";
            storyText.innerHTML += char;
            i++;
            setTimeout(typing, 30);
        } else {
            if (callback) callback();
        }
    }
    typing();
}

// ------------------------------
// Load story
// ------------------------------
function loadStory(index) {
    storyImage.style.opacity = 0;
    storyImage.style.transform = "translateY(20px)";
    storyText.style.opacity = 0;
    storyText.style.transform = "translateY(20px)";
    storyNextContainer.innerHTML = "";

    // First story
    if (index === 0) {
        const s = stories[0];
        storyImage.src = s.image;
        setTimeout(() => {
            storyImage.style.opacity = 1;
            storyImage.style.transform = "translateY(0)";
        }, 100);
        setTimeout(() => {
            typeWriterStory(s.text, showNextButton);
            storyText.style.opacity = 1;
            storyText.style.transform = "translateY(0)";
        }, 500);
    }

    // Cake section
    else if (index === 1) {
        showCakeSection();
    }

    // Subsequent stories
    else if (index > 1) {
        const s = stories[index - 1]; // subtract 1 because cake is index 1
        storyImage.src = s.image;
        setTimeout(() => {
            storyImage.style.opacity = 1;
            storyImage.style.transform = "translateY(0)";
        }, 100);
        setTimeout(() => {
            typeWriterStory(s.text, showNextButton);
            storyText.style.opacity = 1;
            storyText.style.transform = "translateY(0)";
        }, 500);
    }
}

// ------------------------------
// Show next button
// ------------------------------
function showNextButton() {
    const btn = document.createElement("a");
    btn.classList.add("theme-button");
    btn.innerText = "পরবর্তী";
    btn.href = "javascript:void(0)";
    storyNextContainer.appendChild(btn);

    // Animate button
    btn.style.opacity = 0;
    btn.style.transform = "translateY(20px)";
    setTimeout(() => {
        btn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        btn.style.opacity = 1;
        btn.style.transform = "translateY(0)";
    }, 100);

    btn.addEventListener("click", () => {
        currentStory++;
        if (currentStory <= stories.length) {
            loadStory(currentStory);
        } else {
            storyNextContainer.innerHTML = "<p>🎉 আর কি? আজকের মতো আসি? শুভ জন্মদিন আশা জান! 🎉</p>";
        }
    });
}

// ------------------------------
// Cake section
// ------------------------------
function showCakeSection() {
    // Set cake image
    storyImage.src = "assets/images/cake.png";

    // Make sure the image is visible and animated
    storyImage.style.opacity = 1;
    storyImage.style.transform = "translateY(0)";
    storyImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    // Cake message
    storyText.innerText = "চলো কেক কাটি! 🎂";
    storyText.style.opacity = 1;
    storyText.style.transform = "translateY(0)";

    // Clear any previous buttons
    storyNextContainer.innerHTML = "";

    // Create cut cake button
    const cutBtn = document.createElement("button");
    cutBtn.id = "cutCakeBtn";
    cutBtn.innerText = "🎂 কেক কাটো";
    storyNextContainer.appendChild(cutBtn);

    cutBtn.addEventListener("click", () => {
        cutBtn.disabled = true;

        // Cake wiggle animation
        storyImage.style.transform = "scale(0.9) rotate(-5deg)";
        setTimeout(() => storyImage.style.transform = "scale(1) rotate(0deg)", 500);

        // Heart bursts
        for (let i = 0; i < 5; i++) {
            const burst = document.createElement("div");
            burst.classList.add("heart-burst");
            burst.style.left = (Math.random() * 100) + "vw";
            burst.style.top = (Math.random() * 50 + 20) + "vh";
            burst.innerText = "❤️";
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 1000);
        }

        // Next button
        const btn = document.createElement("a");
        btn.classList.add("theme-button");
        btn.innerText = "পরবর্তী";
        btn.href = "javascript:void(0)";
        storyNextContainer.appendChild(btn);

        // Animate button
        btn.style.opacity = 0;
        btn.style.transform = "translateY(20px)";
        setTimeout(() => {
            btn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            btn.style.opacity = 1;
            btn.style.transform = "translateY(0)";
        }, 100);

        // Move to next story after cutting
        btn.addEventListener("click", () => {
            currentStory++; // now currentStory = 2
            loadStory(currentStory); // load next story normally
        });
    });
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