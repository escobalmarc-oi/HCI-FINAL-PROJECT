// ===== GLOBAL AUDIO PLAYER =====
const globalAudio = document.getElementById("globalAudio");

if (globalAudio) {

    // Load last state
    window.addEventListener("load", () => {
        const savedSrc = localStorage.getItem("musicSrc");
        const isPlaying = localStorage.getItem("isPlaying");

        if (savedSrc) {
            globalAudio.src = savedSrc;

            if (isPlaying === "true") {
               
            }
        }
    });

    // PLAY / PAUSE / SWITCH
    window.togglePlay = function (src) {

        if (globalAudio.src.includes(src)) {
            if (globalAudio.paused) {
                globalAudio.play();
                localStorage.setItem("isPlaying", "true");
            } else {
                globalAudio.pause();
                localStorage.setItem("isPlaying", "false");
            }
        } else {
            globalAudio.src = src;
            globalAudio.play();

            localStorage.setItem("musicSrc", src);
            localStorage.setItem("isPlaying", "true");
        }
    };
}


// ===== ABOUT PAGE MUSIC (FIXED: di na magcoconflict) =====
const music = document.getElementById("bg-music");

if (music && !localStorage.getItem("musicSrc")) {
    music.volume = 0;

    document.addEventListener("click", () => {
        music.play();

        let vol = 0;
        const fade = setInterval(() => {
            vol = Math.min(vol + 0.05, 1);
            music.volume = vol;

            if (vol === 1) clearInterval(fade);
        }, 50);
    }, { once: true });
}


// ===== OLD PLAYER (DISABLED na kasi global na gamit) =====
/*
const player = document.getElementById("player");

function playMusic(src) {
    if (player) {
        player.src = src;
        player.play();
    }
}
*/


// ===== PRODUCT PAGE (WALANG BINAGO) =====
const popup = document.getElementById("popup");

if (popup) {

    const productName = document.getElementById("product-name");
    const productPrice = document.getElementById("product-price");
    const qtyText = document.getElementById("qty");
    const successMsg = document.getElementById("success-msg");
    const totalText = document.getElementById("total");

    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const confirmBtn = document.getElementById("confirm");
    const cancelBtn = document.getElementById("cancel");

    let quantity = 1;
    let currentPrice = 0;

    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));

            productName.textContent = name;
            productPrice.textContent = price;

            currentPrice = price;
            quantity = 1;

            qtyText.textContent = quantity;
            successMsg.style.display = "none";

            updateTotal();
            popup.style.display = "flex";
        });
    });

    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                qtyText.textContent = quantity;
                updateTotal();
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            if (quantity < 10) {
                quantity++;
                qtyText.textContent = quantity;
                updateTotal();
            }
        });
    }

    function updateTotal() {
        totalText.textContent = currentPrice * quantity;
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            successMsg.style.display = "block";

            setTimeout(() => {
                popup.style.display = "none";
            }, 2000);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }
}