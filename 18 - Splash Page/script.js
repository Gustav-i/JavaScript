const { body } = document


function changeBackground(number) 
{
  let previousBackground
  
  if (body.className) 
  {
    previousBackground = body.className  
  }

  body.className = ""

  switch (number) 
  {
    case "1":
      return (previousBackground === "background-1" ? null 
        : body.classList.add("background-1"))

    case "2":
      return (previousBackground === "background-2" ? null 
        : body.classList.add("background-2"))

    case "3":
      return (previousBackground === "background-3" ? null 
        : body.classList.add("background-3"))
        
    default:
      break
  }
}