
(() => {
    "use strict";

    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    const area = document.getElementById("buttonsArea");
    const celebration = document.getElementById("celebration");
    const confetti = document.querySelector(".confetti");

    
    function moveNoButton() {
        if (!noButton || !area) return;

        const areaRect = area.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const maxX = Math.max(0, areaRect.width - buttonRect.width);
        const maxY = 110;

        const x = Math.random() * maxX - maxX / 2;
        const y = Math.random() * maxY - maxY / 2;

        noButton.style.position = "relative";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    if (noButton) {
        noButton.addEventListener("pointerenter", moveNoButton);

        noButton.addEventListener("pointerdown", event => {
            event.preventDefault();
            moveNoButton();
        });

        noButton.addEventListener("click", event => {
            event.preventDefault();
            moveNoButton();
        });
    }

    
    function launchConfetti() {
        if (!confetti) return;

        confetti.innerHTML = "";

        const colors = [
            "#e95f89",
            "#f4bd61",
            "#9bd9c2",
            "#a89be8",
            "#f18c9f"
        ];

        for (let i = 0; i < 90; i++) {
            const piece = document.createElement("span");

            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = colors[i % colors.length];
            piece.style.animationDuration = `${3 + Math.random() * 4}s`;
            piece.style.animationDelay = `${Math.random() * 1.8}s`;
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;

            confetti.appendChild(piece);
        }
    }

    
    if (yesButton && celebration) {
        yesButton.addEventListener("click", () => {
            celebration.classList.remove("hidden");
            launchConfetti();
        });
    }

    
    function startPokeballAnimation() {
        const introScreen = document.getElementById("introScreen");
        const pokeball = document.getElementById("pokeball");
        const proposalCard = document.querySelector(".proposal-card");

        if (!introScreen || !pokeball || !proposalCard) return;

        proposalCard.style.opacity = "0";

        
        setTimeout(() => {
            pokeball.classList.add("opening");
        }, 2200);

        
        setTimeout(() => {
            introScreen.classList.add("flash");
        }, 3300);

        
        setTimeout(() => {
            introScreen.classList.add("finished");
            proposalCard.style.opacity = "1";
            proposalCard.classList.add("revealed");
        }, 3900);

        
        setTimeout(() => {
            introScreen.remove();
        }, 4800);
    }

   
    startPokeballAnimation();

})();
