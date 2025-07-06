import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
  }

  const countriesToShow = filter === ''
    ? []
    : countries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  const renderCountries = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map(language => 
              <li key={language}>{language}</li>
            )}
          </ul>
          <img 
            src={country.flags.png} 
            alt={`flag of ${country.name.common}`}
            width="200"
          />
          <Weather capital={country.capital} />
        </div>
      )
    }

    return (
      <div>
        {countriesToShow.map(country => 
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {renderCountries()}
    </div>
  )
}

export default App