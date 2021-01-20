import React from 'react'

const PersonForm = (props) => {
    const { add,
            nameChange, 
            numberChange,
            newName,
            newNumber } = props 
    return(
        <form onSubmit={add}>
            <div>
            name: <input onChange={nameChange} value={newName}/>
            </div>
            <div>
            number: <input onChange={numberChange} value={newNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm