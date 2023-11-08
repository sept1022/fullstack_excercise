import { Fragment, useEffect, useState, useSyncExternalStore } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  return (
    <Fragment>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={country.flags.png} />
      {/*<p>{JSON.stringify(country)}</p>*/}
    </Fragment>
  )
}

const CountryInfoApp = () => {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    const promise = axios.get(
      'https://studies.cs.helsinki.fi/restcountries/api/all'
    )
    promise.then((response) => {
      setCountries(response.data)
      // console.log(response.data)
    })
  }, [])

  const onChange = (e) => {
    if (countries) {
      console.log(countries)
      const filtered = countries.filter((c) => c.name.common.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
      setFilteredCountries(filtered)
      if (filtered.length == 1)
        setCountry(filtered[0].name)
    }
  }

  return (
    <Fragment>
      <div>
        find countries <input onChange={onChange} />
        {countries === null ? (
          <div>loading...</div>
        ) : filteredCountries === null ? (
          <div>ready</div>
        ) :
          filteredCountries.length < 10 ? (
           country ? (
            <CountryDetail country={filteredCountries[0]} />
          ) : (
            <div>
              {filteredCountries.map((c) => (
                <div key={c.name.common}>
                  {c.name.common}
                  <button onClick={() => setCountry(c.name.common)}>show</button>
                </div>
              ))}
            </div>
          )
        ) : (
          <div>
            Too many matches({filteredCountries.length}), specify another filter
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default CountryInfoApp
