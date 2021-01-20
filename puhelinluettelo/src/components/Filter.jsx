import React from 'react'

const Filter = ({change}) => {
    return (
        <div>
            filter shown with <input onChange={change}></input>
        </div>
    )
}

export default Filter