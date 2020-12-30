import React from 'react'
import SidebarIcon from './SidebarIcon';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import HistoryIcon from '@material-ui/icons/History';
import '../css/Videos.css'
const SideBar = () => {
    return (

        <div className="sidenav">
            <a href="#about">
                <SidebarIcon Icon={HomeIcon} />
                <p>Home</p>
            </a>
            <a href="#services">
                <SidebarIcon Icon={WhatshotIcon} />
                <p>Trending</p>
            </a>
            <a href="#clients">
                <SidebarIcon Icon={SubscriptionsIcon} />
                <p>Subscription</p>
            </a>
            <a href="#contact">
                <SidebarIcon Icon={LibraryAddCheckIcon} />
                <p>Library</p>
            </a>
            <a href="#contact">

                <SidebarIcon Icon={HistoryIcon} />
                <p>History</p>
            </a>
        </div>

    )
}

export default SideBar
