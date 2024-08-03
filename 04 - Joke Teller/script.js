const btnEl = document.getElementById('btn')
const jokeEl = document.getElementById('joke')


async function getJokes() 
{
  const API_URL = "https://v2.jokeapi.dev/joke/Programming?type=single"

  try 
  {
    const resp = await fetch(API_URL)
    const data = await resp.json()

    jokeEl.removeAttribute('hidden')
    jokeEl.textContent = data.joke
  } 
  catch (error) 
  {
    console.log(error)
  } 
}

btnEl.addEventListener('click', getJokes)
