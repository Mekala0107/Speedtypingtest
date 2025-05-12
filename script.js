document.addEventListener("DOMContentLoaded", function() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const quoteInput = document.getElementById("quoteInput");
    const timerElement = document.getElementById("timer");
    const resultElement = document.getElementById("result");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");
    const spinner = document.getElementById("spinner");

    let timer;
    let time = 0;
    let quoteText = "";

    function startTimer() {
        clearInterval(timer);
        time = 0;
        timerElement.textContent = "0 sec";
        timer = setInterval(() => {
            time++;
            timerElement.textContent = `${time} sec`;
        }, 1000);
    }

    async function fetchQuote() {
        spinner.classList.remove("d-none");
        try {
            const response = await fetch("https://apis.ccbp.in/random-quote");
            const data = await response.json();
            quoteText = data.content;
            quoteDisplay.textContent = quoteText;
            quoteInput.value = "";
            resultElement.textContent = "";
            startTimer();
        } catch (error) {
            quoteDisplay.textContent = "Failed to fetch quote. Try again!";
        } finally {
            spinner.classList.add("d-none");
        }
    }

    submitBtn.addEventListener("click", function() {
        if (quoteInput.value.trim() === quoteText) {
            clearInterval(timer);
            resultElement.textContent = `Success! You took ${time} seconds`;
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = "Incorrect! Keep trying...";
            resultElement.style.color = "red";
        }
    });

    resetBtn.addEventListener("click", function() {
        clearInterval(timer);
        timerElement.textContent = "0 sec";
        fetchQuote();
    });

    fetchQuote();
});
