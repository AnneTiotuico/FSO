import { useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }

  const handleNewSearch = (e) => {
    setNewSearch(e.target.value)
    setShowAll(false)
  }

  const displayPersons = () => {  
    return showAll
    ? persons
    : persons.filter(({ name }) => name.toLowerCase().includes(newSearch.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={displayPersons()} />
    </div>
  )
}

export default App