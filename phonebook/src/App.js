import { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message, msgType }) => {
  const notifStyle = {
    color: '#027b00',
    fontSize: 16,
    fontWeight: 400,
    background: '#d3d3d3',
    borderRadius: 5,
    borderColor: '#027b00',
    borderWidth: 3,
    borderStyle: 'solid',
    padding: 5
  }

  if (msgType === 'error') {
    notifStyle.color = 'red'
    notifStyle.borderColor = 'red'
  }
  
  if (message === null) {
    return null
  }

  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState('')

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
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setMsgType('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== existing.id))
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
          setMessage(`Added ${newName}`)
          setMsgType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      <Notification message={message} msgType={msgType}/>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <h2>Add Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  )
}

export default App