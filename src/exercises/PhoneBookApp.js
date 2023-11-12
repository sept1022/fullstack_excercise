import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import {create, getAll, remove, update} from './services/PhoneBook';
import Notification from './components/Notification';

// const initialPersons = [
//   { name: 'Arto Hellas', number: '040-123456', id: 1 },
//   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
// ]

const initialState = {
  name: '',
  number: '',
}

const Filter = ({ onFilterChange }) => {
  return (
    <Fragment>
      filter shown with <input onChange={onFilterChange} />
    </Fragment>
  )
}

function PersonForm({ person, handleClickAdd, handleInputChange }) {
  return (
    <form onSubmit={handleClickAdd}>
      <div>
        <div>
          name:{' '}
          <input onChange={handleInputChange} name="name" value={person.name} />
        </div>
        <div>
          number:{' '}
          <input
            onChange={handleInputChange}
            name="number"
            value={person.number}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, onRemove }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => onRemove(person.id)}>Remove</button>
    </div>
  )
}

const Persons = ({ persons, onRemove }) => {
  // console.log(onRemove)
  return (
    <Fragment>
      {persons.map((person) => (
        <Person key={person.id} person={person} onRemove={onRemove} />
      ))}
    </Fragment>
  )
}

const PhoneBookApp = () => {
  const [persons, setPersons] = useState([])
  const [user, setUser] = useState(initialState)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [alertLevel, setAlertLevel] = useState('info');

  const filteredPersons =
    filter.length === 0
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().search(filter.toLowerCase()) !== -1
        )

  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response)
      })
  }, [])

  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleClickAdd = (e) => {
    e.preventDefault()
    setUser(initialState)
    const person = persons.find((person) => person.name === user.name)
    // console.log('person', person)
    if (person) {
      if (
        window.confirm(
          `${user.name} is already added to phonebook, replace the old number with a new one?`
        ) === false
      )
        return
      update(person.id, {...person, number: user.number}).then((response) => {
        setPersons(persons.map(p => p.id !== person.id ? p : response))
        setAlertLevel('info')
        setMessage(`Modified ${person.name}`)
        setTimeout(() => setMessage(null), 2000)
      })
    } else {
      create(user)
        .then((data) => {
        setPersons(persons.concat(data))
        setAlertLevel('info')
        setMessage(`Added ${data.name}`)
        setTimeout(() => setMessage(null), 2000)
      })
        .catch(e => {
          setAlertLevel('error')
          setMessage(e.response.data.error)
          setTimeout(() => setMessage(null), 2000)
        })
    }
  }

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    // console.log(state)
  }

  const handleRemove = (id) => {
    const user = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${user.name} ?`) === false) return

    remove(id).then((response) => {
      // console.log(response)
      setPersons(persons.filter((person) => person.id !== id))
    })
  }

  return (
    <div>
      <Notification className={alertLevel} message={message} />
      <h2>Phonebook</h2>
      <Filter onFilterChange={onFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        person={user}
        handleInputChange={handleInputChange}
        handleClickAdd={handleClickAdd}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onRemove={handleRemove} />
    </div>
  )
}

export default PhoneBookApp
