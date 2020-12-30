import React from 'react'

const Icons = ({ Icons }) => {
    return (
        <div className="ml-4">
            {Icons && <Icons style={{ color: "white" }} fontSize="large" />}
        </div>
    )
}

export default Icons
