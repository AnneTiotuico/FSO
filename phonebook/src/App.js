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

  const updatePerson = (existing) => {    
    if (existing.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
    } else {
      if (window.confirm(`${existing.name} is already added to phonebook, replace old number with a new one?`)) {
        existing.number = newNumber
        personService
          .updatePerson(existing.id, existing)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : updatedPerson))
          })
      }
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = () => {
      return persons.filter(person => 
        person.name.toLowerCase() === newName.toLowerCase()
      )[0]
    }

    let existing = existingPerson();

    if (existing) {
      updatePerson(existing)
      setNewName('')
      setNewNumber('')
    } else if (newName !== '') {
      let newPerson = {name: newName, number: newNumber};

      personService
        .create(newPerson)
        .then(addedPerson => {
          setPersons([...persons, addedPerson])
          setNewName('')
          setNewNumber('')
      })
    }
  }


  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
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
      <h2>Add Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  )
}

export default App