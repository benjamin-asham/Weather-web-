const cards = document.getElementById('cards')
const locationName = document.getElementById("locationName")
const searchBtn = document.getElementById('searchBtn')
const cityInput = document.getElementById('cityInput')
const loader = document.getElementById('loader')
const API_KEY = "e7708a66c8fe48d5881185349251609"
async function getWeather(city = "Cairo") {
  loader.classList.remove('d-none')
  cards.innerHTML = ""
  try {
    let res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
    let data = await res.json()
    setTimeout(() => {
      if (data.error) {
        cards.innerHTML = `<p class="text-danger text-center">❌ ${data.error.message}</p>`
      } else {
        displayWeather(data)
      }
      loader.classList.add('d-none') 
    }, 2000)
  } catch (err) {
    setTimeout(() => {
      cards.innerHTML = `<p class="text-danger text-center">⚠️ Error fetching data</p>`
      loader.classList.add('d-none')
    }, 2000)
  }
}
function location1(weather) {

  box=`
   <p> <i class="fa-solid fa-location-dot"></i> ${weather.location.name}</p>
  `
  locationName.innerHTML=box
}
function displayWeather(weather) {
  const date = new Date(weather.location.localtime)
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  location1(weather)
  let box = `

  <div class="left">
  <h4  class="text-primary">${weather.current.temp_c} °C</h4> 
        <h3>${weather.location.name}, ${weather.location.country}</h3>
        <small>${formattedDate}</small>
        <img src="https:${weather.current.condition.icon}" alt="">
      </div>
      <div class="line"></div>
      <div class="right">
        <p class="text-primary">${weather.current.condition.text} : </p>
        <p> Feels like: ${weather.current.feelslike_c} °C</p>
        <p> Humidity: ${weather.current.humidity}%</p>
        <p> Wind: ${weather.current.wind_kph} km/h (${weather.current.wind_dir})</p>
      </div>`
  cards.innerHTML = box
}
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim()
  if (city) {
    getWeather(city)
  }
  else{
    getWeather("Cairo")
  }
})
getWeather()

