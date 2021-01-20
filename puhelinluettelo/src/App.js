import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import {createPerson,getAllPersons, deletePersonFromDb, updatePerson} from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState('');
    const [ filter, setFilter] = useState('');
    const [ message, setMessage] = useState('');
    const [ errorStatus, setErrorStatus ] = useState(false); 
    
    useEffect(() => {
        getAllPersons().then(initialNotes => {
            setPersons(initialNotes);
        })
    },[])

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const addPerson = (event) => {
    event.preventDefault();
    if(newName==='' || newNumber==='') {
        setErrorStatus(true);
        setMessage("You must submit both a name and a phonenumber");
        setTimeout(() => {
            setMessage('');
            setErrorStatus(false);
        }, 5000)
    }
    else if(!persons.some((person) => person.name === newName)) {
        const personObject =  {
            name: newName,
            number: newNumber,
        }
        createPerson(personObject).then(returnedPerson => {
            if(typeof returnedPerson !== 'number') {
                setPersons(persons.concat(returnedPerson));
                setNewNumber('');
                setNewName('');
                setMessage(`Added ${returnedPerson.name}`);
                setTimeout(() => {
                    setMessage('');
                }, 5000)
            } else {
                setErrorStatus(true);
                setMessage("Wrong return from server");
                setTimeout(() => {
                    setMessage('');
                    setErrorStatus(false);
                }, 5000)
            }
        })
    } else {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const oldObj = persons.find(person => person.name === newName);
            const updatedPerson = {
                name: oldObj.name,
                number: newNumber,
            }

            updatePerson(oldObj.id,updatedPerson).then(returnedPerson => {
                const newArr = persons.filter(person =>
                    person.id !== returnedPerson.id);
                setPersons(newArr.concat(returnedPerson));
                setMessage(`Updated ${returnedPerson.name}`);
                setTimeout(() => {
                    setMessage('');
                }, 5000)
            })
            .catch(error => {
                //console.log(error);
                setErrorStatus(true);
                setMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
                setTimeout(() => {
                    setMessage('');
                    setErrorStatus(false);
                }, 5000)
                setPersons(persons.filter(obj =>
                    obj.id !== oldObj.id))
            })            
        }            
    }
  }

    const deletePerson = (person) => {
        if(window.confirm(`Do you really want to delete ${person.name}`)) {
            deletePersonFromDb(person.id).then(status => {
                if(status===204) {
                    setPersons(persons.filter(obj =>
                        obj.id !== person.id))
                    setMessage(`Deleted ${person.name}`);
                    setTimeout(() => {
                        setMessage('');
                    }, 5000)
                }
            })            
        }
    }

  return (
    <div>
        <Notification message={message} err={errorStatus}/>
        <h2>Phonebook</h2>
        <Filter change={handleFilterChange}/>
        <h3>Add a new number</h3>
        <PersonForm add={addPerson} nameChange={handleNameChange} numberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
        <h3>Numbers</h3>
        <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App