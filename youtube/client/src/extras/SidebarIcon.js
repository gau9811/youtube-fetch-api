import React from 'react'

const SidebarIcon = ({ Icon }) => {
    return (
        <div>
            {Icon && <Icon style={{ color: "white" }} fontSize="large" />}
        </div>
    )
}

export default SidebarIcon
