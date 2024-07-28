// Get Quotes From API

// function newQuote() 
// {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote)
// }

// newQuote()

let apiQuotes = []

function newQuote() 
{
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote)
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

getQuotes()

