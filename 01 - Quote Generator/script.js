const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")


let apiQuotes = []

function loading() 
{
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete() 
{
  quoteContainer.hidden = false
  loader.hidden = true
}

function newQuote() 
{
  loading()

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  quoteText.textContent = quote.text

  if (quote.text.length > 100) 
  {
    quoteText.classList.add("long-quote")
  }
  else 
  {
    quoteText.classList.remove("long-quote")
  }

  if (!quote.author) 
  {
    authorText.textContent = "Unknown"  
  }
  else 
  {
    authorText.textContent = quote.author
  }

  complete()
}

async function getQuotes() 
{
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  
  try 
  {
    const resp = await fetch(apiUrl)
    apiQuotes = await resp.json()
    newQuote()
  }
  catch (error)
  {
    alert(error)
  }
}

function tweetQuote() 
{
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`
  window.open(twitterURL, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
