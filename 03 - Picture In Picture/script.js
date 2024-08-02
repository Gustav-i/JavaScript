const videoEl = document.getElementById('video')
const buttonEl = document.getElementById('btn')


async function selectMediaStream() 
{
  try 
  {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia()
    videoEl.srcObject = mediaStream

    videoEl.onloadeddata = () => 
    {
      videoEl.play()
    }
  } 
  catch (error) 
  {
    console.log(error)
  }  
}

buttonEl.addEventListener('click', async () => 
{
  buttonEl.disabled = true
  await videoEl.requestPictureInPicture()
  buttonEl.disabled = false
})

selectMediaStream()
