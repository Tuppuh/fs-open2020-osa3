import React from 'react'
import Person from './Person'

const PersonList = ({persons, filter, removePerson}) => {
  const filtered_persons = persons.filter( person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <ul>
      {filtered_persons.map(person => <Person key={person.name} person={person} removePerson={removePerson}/>)}
    </ul>
  )
}

export default PersonList
