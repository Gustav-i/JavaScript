const count = 10
const API_KEY = '-Fnu3GWCV_TucIkxRjr91T7B8TbiZbTBxETi8jCFbos'

const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

async function getPhotos() 
{
  try 
  {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log(data)
  }
  catch (error) 
  {
    console.log(error)
  }   
}

getPhotos()
