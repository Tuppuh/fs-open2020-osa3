import React, { useState, useEffect }from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter] = useState('')
  const [ statusMessage, setStatusMessage] = useState(null)

  const addPerson = newPerson => {
    const matchingPerson = persons.find(person => person.name === newPerson.name)
    if (matchingPerson !== undefined){
      const msg = `${newPerson.name} is already added to phonebook replace the old number with a new one?`
      if (window.confirm(msg)){
        return(
          personService
            .update(matchingPerson.id, newPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== matchingPerson.id ? person : updatedPerson))
              setStatusMessage({status: 'success', message: `Succesfully updated number for ${matchingPerson.name}`})
            })
            .catch(error => {
              setStatusMessage({status: 'error', message: `Updating ${matchingPerson.name} failed,
                              probably removed from the server`})
            })
        )
      }
    }
    else{
      // Return promise so that the caller can chain onto it and perform its own actions
      return(
        personService
        .create(newPerson)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setStatusMessage({status: 'success', message: `Succesfully added number for ${returnedPerson.name}`})
        })
      )
    }
  }

  const removePerson = id => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setStatusMessage({status: 'success', message: `Deleted ${personName}`})
        })
        .catch(error => {
          setStatusMessage({status: 'error', message: `Deleting ${personName} failed,
                          probably already removed from the server`})
        })
      }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return ( 
    <div>
      <h2>Phonebook</h2>
      <Notification notification={statusMessage} setNotification={setStatusMessage}/>
      <FilterForm filter={filter} setFilter={setFilter}/>
      <h2>Add new number</h2>
      <PersonForm persons={persons} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )

}

export default App