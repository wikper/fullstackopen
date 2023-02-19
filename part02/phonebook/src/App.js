import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  const addPerson = (event) => {
    event.preventDefault()
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const person = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
            setNotificationMessage(
              `Information of ${returnedPerson.name} has been updated`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch((error) => {
            if (error.name === 'ValidationError') {
              setNotificationMessage(error.response.data.error)
            } else {
              setPersons(persons.filter((p) => p.id !== person.id))
              setNotificationMessage(
                `Information of ${person.name} has already been removed from server`
              )
            }
            setNotificationType('error')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 3000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(() => {
          setPersons(persons.filter((p) => p.id !== person.id))
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3000)
        })
    }
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setFilter(event.target.value)
  }

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
