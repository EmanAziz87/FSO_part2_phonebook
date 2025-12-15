import {useState, useEffect} from 'react'
import Filter from './components/Filter.jsx';
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from './services/personService.js';

const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')

    useEffect(() => {
        personService.getAll().then(returnedPersons => {
            setPersons(returnedPersons)
            setFilteredPersons(returnedPersons)
        })
    },[])

    const handleAddPerson = (event) => {
        event.preventDefault()

        const duplicate = persons.find((person) => newName === person.name)
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        if (!duplicate) {
            personService.create(newPerson).then(returnedPerson => {
                console.log('person before state change: ', persons)
                setPersons(persons.concat(returnedPerson))
                setFilteredPersons(persons.concat(returnedPerson))
                console.log('person after state change: ', persons)
            })

            setNewName('')
            setNumber('')
        } else {
            if (window.confirm('The person you are trying to add already exists. Would you like to update their information?')) {
                personService.update(duplicate.id, newPerson).then(updatedPerson => {
                    console.log("UPDATED PERSON RESPONSE", updatedPerson)
                    const newPersonsArray = persons.filter(person => person.id !== updatedPerson.id).concat(updatedPerson)
                    setPersons(newPersonsArray)
                    setFilteredPersons(newPersonsArray)
                })
            }
        }

    }

    const handleDeletePerson = (id) => {
        if (window.confirm("Are you sure you want to delete this person?")) {
            personService.destroy(id).then(response => {
                const newPersonsArray = persons.filter(person => person.id !== id)
                setPersons(newPersonsArray)
                setFilteredPersons(newPersonsArray)
            })
        }
    }

    const handleFilterChange = (event) => {
        const newPersonsArray = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredPersons(newPersonsArray)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleFilterChange={handleFilterChange}/>
            <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                        handleAddPerson={handleAddPerson} newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} persons={persons} handleDeletePerson={handleDeletePerson}/>
        </div>
    )
}

export default App
