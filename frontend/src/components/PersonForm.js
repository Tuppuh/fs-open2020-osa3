import React, { useState }from 'react'

const PersonForm = ({persons, addPerson}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
  
    const handleAddPerson = event => {
      event.preventDefault()
      /*
      if (persons.some(person => person.name === newName)){
        window.alert(`${newName} is already added to phonebook`)
        return
      }
      */
      const newperson = {
        name: newName,
        number: newNumber,
      }
      addPerson(newperson)
      .then( () => {
        setNewName('')
        setNewNumber('')
      })
    }

    const handleNameChange = event => {
        setNewName(event.target.value)
    }
    
    const handleNumberChange = event => {
        setNewNumber(event.target.value)
    }

    return(
    <form onSubmit={handleAddPerson}>
        <div>
        name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm