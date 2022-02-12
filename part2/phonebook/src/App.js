import React, { useState, useEffect } from 'react'
import Title from './Components/Title'
import Filter from './Components/Filter'
import Form from './Components/Form'
import RenderPeople from './Components/RenderPeople'
import RenderPerson from './Components/RenderPerson'
import personService from './Services/Persons'
import "./index.css"
import Message from './Components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

useEffect(() => {
  console.log("effect")
  personService
  .getAll()
  .then(initialPersons => {
    console.log("promise fulfilled")
    setPersons(initialPersons)
  })

}, [])

console.log("render", persons.length, "persons")
  
const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

const resetForm = () => {
  setNewName("");
  setNewNumber("");
}

const addPerson = (e) => {
      e.preventDefault();
      
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

    const personExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    const numberEntered = newNumber !== "";
    const numberIsEqual = persons.some(person => person.number === newNumber)
    const prevPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const newPerson = { ...prevPerson, number: newNumber}
    const numberChangeMsg = () => {alert("The number was successfully changed.")}

    if (personExists && numberEntered && !numberIsEqual) {
      if(window.confirm(`${newName} is already in the list, would you like to change the contact number?`)) {
       personService
       .update(prevPerson.id, newPerson)
       .then(returnedPerson => {
         setPersons(persons.map(person => person.id !== prevPerson.id ? person : returnedPerson))
         resetForm();
         numberChangeMsg();
       })
      }  
    } else if (personExists && !numberEntered || personExists && numberIsEqual) {
      alert(`${newName} is alraedy in the list.`)
      resetForm();
    } else {
      personService
      .createNew(personObject)
      .then(returnedPerson => {
        setSuccessMessage(
          `'${newName}' was scuccesfully added to the list.`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
        setPersons(persons.concat(returnedPerson))
        resetForm();
      })
    }    
  }

  
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  }

  const filtered = !newFilter ?
  persons :
  persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

  const handleDelete = (id) => {
   const personToDelete = persons.find(person => person.id === id)
   const nameToDelete = personToDelete.name;
   if(window.confirm(`Are you sure you want to delete "${nameToDelete}" from the list?`)) {
      personService
      .deletePerson(personToDelete, id)
      .then(() => {
        const newPerson = persons.filter(person => person.id !== id)
        setPersons(newPerson);
      })
      .catch(error => {
        setErrorMessage(
          `'${nameToDelete}' was already removed from server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setPersons(persons.filter(n => n.id !== id))
      })
   }
  }
  
  
  return (
    <div>
      <Title title="Phonebook"/>
      <Filter handleFilter={handleFilterChange} newFilter={newFilter}/>
      <Title title="Add new"/>
      <Form 
      submit={addPerson}
      name={newName}
      nameChange={handlePersonChange}
      number={newNumber}
      numberChange={handleNumberChange}
      />
      <Message 
      message={successMessage}
      classe="message"
      />
      <Title title="Numbers"/>
      <RenderPeople 
      render={filtered.map((person) =>
        <RenderPerson 
        key={person.id}
        name={person.name}
        number={person.number}
        delete={() => handleDelete(person.id)}
        /> 
       )}
      />
      <Message 
      message={errorMessage}
      classe="error"
      />
    </div>
  )
}

export default App