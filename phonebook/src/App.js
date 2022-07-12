import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    let newPerson = {name: newName, number: newNumber};

    personService
      .create(newPerson)
      .then(addedPerson => {
      setPersons([...persons, addedPerson])
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNewSearch = (e) => {
    setNewSearch(e.target.value)
    setShowAll(false)
  }

  const filteredPersons = showAll
                          ? persons
                          : persons.filter(({ name }) => 
                            name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App