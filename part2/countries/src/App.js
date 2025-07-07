import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import countryService from './services/countries'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      countryService
        .getByName(search)
        .then(foundCountries => {
          setCountries(foundCountries)
        })
        .catch(error => {
          console.log('Error fetching countries:', error)
          setCountries([])
        })
    } else {
      setCountries([])
    }
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShowCountry = (country) => {
    setCountries([country])
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <CountryList countries={countries} onShowCountry={handleShowCountry} />
    </div>
  )
}

export default App