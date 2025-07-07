import Country from './Country'

const CountryList = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 0) {
    return null
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => 
        <div key={country.name.common}>
          {country.name.common} {' '}
          <button onClick={() => onShowCountry(country)}>show</button>
        </div>
      )}
    </div>
  )
}

export default CountryList