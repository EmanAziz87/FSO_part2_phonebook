
const Persons = ({filteredPersons, persons, handleDeletePerson}) => {
    return (<ul>
        {filteredPersons.length < persons.length ? filteredPersons.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
            </li>) : persons.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
            </li>
        )}
    </ul>)
}

export default Persons;