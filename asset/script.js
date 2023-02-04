const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const quoteBtn = document.querySelector(".new-quote");
const volumeIcon = document.querySelector(".volume-icon");
const copyIcon = document.querySelector(".copy-icon");
const twitterIcon = document.querySelector(".twitter-icon");

const endpoint = "https://dummyjson.com/quotes/random";

async function getQuote() {
  const res = await fetch(endpoint);
  const data = await res.json();
  quoteText.textContent = data.quote;
  quoteAuthor.textContent = `${data.author}`;
}
getQuote();

quoteBtn.addEventListener("click", handleClick);
async function handleClick() {
  quoteBtn.classList.add("loading");
  quoteBtn.textContent = "Loading...";
  await getQuote();
  quoteBtn.textContent = "New quote";
  quoteBtn.classList.remove("loading");
}

volumeIcon.addEventListener("click", handleVoice);
function handleVoice() {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.textContent} by ${quoteAuthor.textContent}`
  );
  speechSynthesis.speak(utterance);
}

copyIcon.addEventListener("click", handleCopy);
function handleCopy() {
  navigator.clipboard.writeText(quoteText.textContent);
}

twitterIcon.addEventListener("click", handlePostTweet);
function handlePostTweet() {
  let tweetURL = `https://twitter.com/intent/tweet?url=${quoteText.textContent}`;
  window.open(tweetURL, "_blank");
}
