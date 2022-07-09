import { useEffect, useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Weather = ({ countryName }) => {
  const [weather, setWeather] = useState({})
  let key = 'f79767af757b4df990f175528220807'

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${countryName}`)
      .then(response => response.json())
      .then(weather => {
        console.log(weather.current['temp_c'])
        setWeather(weather.current)
      })
  }, [key, countryName])

  return (
    <>
      <h2>Weather in {countryName}</h2>
      <p>temperature {weather['temp_c']} Celsius</p>
      <p>wind {(weather['wind_mph'] / 60).toFixed(2)} m/s</p> 
    </>
  )
}

const CountryData = ({ country }) => {
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {
          Object.entries(country.languages).map(lang => 
            <li key={lang[0]}>{lang[1]}</li>
          )
        }
      </ul>
      <img src={country.flags.png} alt="flag" />
      <Weather countryName={country.name.common} />
    </>
  )
}

const Countries = ({ countries, setSearch }) => {
  if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (countries.length === 1) {
    let country = countries[0]
    return (<CountryData country={country} />)
  }

  return (
      countries.map(country => 
        <div key={country.name.common} id={country.name.common}>
          <p>{country.name.common}</p>
          <Button handleClick={() => setSearch(country.name.common)} text={"show"} />
        </div>
      )
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => setCountries(countries))
  }, [])

  let filteredCountries = showCountries 
      ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      : []

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (e.target.value.trim().length > 0) {
      setShowCountries(true)
    } else {
      setShowCountries(false)
    }
  }

  return (
    <>
      find countries <input type="text" value={search} onChange={handleSearch}/>
      <Countries countries={filteredCountries} search={search} setSearch={setSearch} />
    </>
  )
}

export default App