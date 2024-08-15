const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdown-form')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ""
let countdownDate = ""
let countdownValue = Date
let countdownActive
let savecountDown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

function updateDOM() 
{
  countdownActive = setInterval(() => 
  {
    const now = new Date().getTime()
    const distance = countdownValue - now

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    inputContainer.hidden = true

    if (distance < 0) 
    {
      countdownEl.hidden = true
      clearInterval(countdownActive)
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    }
    else 
    {
      countdownElTitle.textContent = `${countdownTitle}`
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      completeEl.hidden = true
      countdownEl.hidden = false
    }
  }, second)
}

function updateCountdown(e) 
{
  e.preventDefault()

  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value

  savecountDown = {
    title: countdownTitle,
    date: countdownDate,
  }
  console.log(savecountDown)
  localStorage.setItem('countdown', JSON.stringify(savecountDown))

  if (countdownDate === "") 
  {
    alert("Please select a date...")  
  }
  else 
  {
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

function reset() 
{
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false
  clearInterval(countdownActive)
  countdownTitle = ""
  countdownDate = ""
  localStorage.removeItem('countdown')
}

function restorePrevCountdown() 
{
  if (localStorage.getItem('countdown')) 
  {
    inputContainer.hidden = true
    savecountDown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savecountDown.title
    countdownDate = savecountDown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

restorePrevCountdown()
