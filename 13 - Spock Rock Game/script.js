const playerScoreEl = document.getElementById("player-score")
const playerChoiceEl = document.getElementById("player-choice")

const computerScoreEl = document.getElementById("computer-score")
const computerChoiceEl = document.getElementById("computer-choice")

const resultText = document.getElementById("result-text")

const playerRock = document.getElementById("player-rock")
const playerPaper = document.getElementById("player-paper")
const playerScissors = document.getElementById("player-scissors")
const playerLizard = document.getElementById("player-lizard")
const playerSpock = document.getElementById("player-spock")

const computerRock = document.getElementById("computer-rock")
const computerPaper = document.getElementById("computer-paper")
const computerScissors = document.getElementById("computer-scissors")
const computerLizard = document.getElementById("computer-lizard")
const computerSpock = document.getElementById("computer-spock")

const allGameIcons = document.querySelectorAll(".far")

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
}

let computerChoice = ""

let playerScore = 0
let computerScore = 0

function resetSelected() 
{
  allGameIcons.forEach((icon) => 
  { 
    icon.classList.remove("selected")
  })
}

function computerRandomChoice() 
{
  const computerChoiceNumber = Math.random()

  if (computerChoiceNumber < 0.2) 
  {
    computerChoice = "rock"  
  } 
  else if (computerChoiceNumber <= 0.4)
  {
    computerChoice = "paper"
  }
  else if (computerChoiceNumber <= 0.6)
  {
    computerChoice = "scissors"
  }
  else if (computerChoiceNumber <= 0.8)
  {
    computerChoice = "lizard"
  }
  else 
  {
    computerChoice = "spock"
  }
}

function checkResult(playerChoice) 
{
  resetSelected()
  computerRandomChoice()
  displayComputerChoice()
  updateScore(playerChoice)
}

function displayPlayerChoice(playerChoice) 
{
  checkResult(playerChoice)

  switch (playerChoice) 
  {
    case "rock":
      playerRock.classList.add("selected")
      playerChoiceEl.textContent = " ► Rock"
      break
    case "paper":
      playerPaper.classList.add("selected")
      playerChoiceEl.textContent = " ► Paper"
      break
    case "scissors":
      playerScissors.classList.add("selected")
      playerChoiceEl.textContent = " ► Scissors"
      break
    case "lizard":
      playerLizard.classList.add("selected")
      playerChoiceEl.textContent = " ► Lizard"
      break
    case "spock":
      playerSpock.classList.add("selected")
      playerChoiceEl.textContent = " ► Spock"
      break
    default:
      break
  }
}

function displayComputerChoice() 
{
  switch (computerChoice) 
  {
    case "rock":
      computerRock.classList.add("selected")
      computerChoiceEl.textContent = " ► Rock"
      break
    case "paper":
      computerPaper.classList.add("selected")
      computerChoiceEl.textContent = " ► Paper"
      break
    case "scissors":
      computerScissors.classList.add("selected")
      computerChoiceEl.textContent = " ► Scissors"
      break
    case "lizard":
      computerLizard.classList.add("selected")
      computerChoiceEl.textContent = " ► Lizard"
      break
    case "spock":
      computerSpock.classList.add("selected")
      computerChoiceEl.textContent = " ► Spock"
      break
    default:
      break
  }  
}

function updateScore(playerChoice) 
{
  if (playerChoice === computerChoice) 
  {
    resultText.textContent = "It's a tie..."
    resultText.style.color = "#999"
  } 
  else 
  {
    const choice = choices[playerChoice]

    if (choice.defeats.indexOf(computerChoice) > -1) 
    {
      resultText.textContent = "You Won!"
      resultText.style.color = "#0078D7"
      playerScore++
      playerScoreEl.textContent = playerScore
      startConfetti()
    } 
    else 
    {
      resultText.textContent = "You Lost!"
      resultText.style.color = "crimson"
      computerScore++
      computerScoreEl.textContent = computerScore
      stopConfetti()
    }
  }
}

// Reset
function reset() 
{
  playerScore = 0
  computerScore = 0
  playerScoreEl.textContent = playerScore
  computerScoreEl.textContent = computerScore
  playerChoiceEl.textContent = ""
  computerChoiceEl.textContent = ""
  resultText.textContent = "Waiting..."
  resultText.style.color = ""
  resetSelected()
  stopConfetti()
}


// Confetti
var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

startConfetti = startConfettiInner
stopConfetti = stopConfettiInner
toggleConfetti = toggleConfettiInner
removeConfetti = removeConfettiInner
var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
var streamingConfetti = false
var animationTimer = null
var particles = []
var waveAngle = 0

function resetParticle(particle, width, height) 
{
	particle.color = colors[(Math.random() * colors.length) | 0]
	particle.x = Math.random() * width
	particle.y = Math.random() * height - height
	particle.diameter = Math.random() * 10 + 5
	particle.tilt = Math.random() * 10 - 10
	particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05
	particle.tiltAngle = 0
	return particle
}

function startConfettiInner() 
{
	var width = window.innerWidth
	var height = window.innerHeight
	window.requestAnimFrame = (function() 
  {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) 
      {
				return window.setTimeout(callback, 16.6666667)
			}
	})()
	var canvas = document.getElementById("confetti-canvas")
	if (canvas === null) 
  {
		canvas = document.createElement("canvas")
		canvas.setAttribute("id", "confetti-canvas")
		canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:absolute")
		document.body.appendChild(canvas)
		canvas.width = width
		canvas.height = height
		window.addEventListener("resize", function() 
    {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}, true)
	}
	var context = canvas.getContext("2d")
	while (particles.length < maxParticleCount)
		particles.push(resetParticle({}, width, height))
	streamingConfetti = true
	if (animationTimer === null) 
  {
		(function runAnimation() 
    {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight)
			if (particles.length === 0)
				animationTimer = null
			else 
      {
				updateParticles()
				drawParticles(context)
				animationTimer = requestAnimFrame(runAnimation)
			}
		})()
	}
}

function stopConfettiInner() 
{
	streamingConfetti = false
}

function removeConfettiInner() 
{
	stopConfetti()
	particles = []
}

function toggleConfettiInner() 
{
	if (streamingConfetti)
		stopConfettiInner()
	else
		startConfettiInner()
}

function drawParticles(context) 
{
	var particle
	var x
	for (var i = 0; i < particles.length; i++) 
  {
		particle = particles[i]
		context.beginPath()
		context.lineWidth = particle.diameter
		context.strokeStyle = particle.color
		x = particle.x + particle.tilt
		context.moveTo(x + particle.diameter / 2, particle.y)
		context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2)
		context.stroke()
	}
}

function updateParticles()
{
	var width = window.innerWidth
	var height = window.innerHeight
	var particle
	waveAngle += 0.01
	for (var i = 0; i < particles.length; i++) 
  {
		particle = particles[i]
		if (!streamingConfetti && particle.y < -15)
			particle.y = height + 100
		else 
    {
			particle.tiltAngle += particle.tiltAngleIncrement
			particle.x += Math.sin(waveAngle)
			particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5
			particle.tilt = Math.sin(particle.tiltAngle) * 15
		}
		if (particle.x > width + 20 || particle.x < -20 || particle.y > height) 
    {
			if (streamingConfetti && particles.length <= maxParticleCount)
				resetParticle(particle, width, height)
			else 
      {
				particles.splice(i, 1)
				i--
			}
		}
	}
}
