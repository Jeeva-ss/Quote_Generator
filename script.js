const quoteContainer = document.getElementById("quote-container");
const buttonContainer = document.getElementById("button-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const icon = document.getElementById("quote-icon");

let apiQuotes = [];
let counter = 0;

function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function showError() {
    quoteText.textContent = "An unknown error occured";
    authorText.textContent = "Possibly a network error";
    newQuoteBtn.textContent = "Try Again";
    twitterBtn.hidden = true;
    icon.style.display = "none";
    buttonContainer.classList.add("error");
}

function getQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    !quote.author ? (authorText.textContent = "Unknown") : (authorText.textContent = quote.author);
    quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
    hideLoader();
}

// Get Quotes From API
const getQuotes = async () => {
    showLoader();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getQuote();
    } catch (error) {
        counter++;
        counter < 10 ? getQuotes() : hideLoader();
        showError();
    }
};

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, "_blank");
}

// events
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
