import React from 'react'

const Persons = ({persons,filter, deletePerson}) => {
    return (
        <div>
            {persons.filter(person =>
            person.name.match(new RegExp(filter, 'i'))
            ).sort((a, b) => a.id - b.id).map(person => 
                <div key= { person.id }>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => deletePerson(person)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons