import React, { useState, } from 'react'
import '../css/Navbar.css'
import Youtube from '../img/youtube.png'
import MicIcon from '@material-ui/icons/Mic';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SearchIcon from '@material-ui/icons/Search';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import {
    BrowserRouter as Router,

} from "react-router-dom";
import Icons from './Icons';
const Navbar = ({ onClk }) => {

    let history = useHistory()
    const [search, setSearch] = useState("")
    const [displaymsg, setDisplayMsg] = useState("")
    const handleSubmit = () => {




        if (search.length == 0) {
            setDisplayMsg("please fill the fields")
        }

        if (search.length > 0) {
            const location = {
                pathname: `search/${search}`,

            }

            history.replace('/')
            history.replace(location.pathname)


        }
    }


    setTimeout(() => {
        setDisplayMsg("")
    }, 2000)

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-left">
                    <MenuIcon style={{ color: "white", marginLeft: "20px", marginRight: "0px" }} fontSize="large" />
                    <img src={Youtube} className="navbar-logo" style={{ height: "50px" }} />
                    <p className="navbar-brand" style={{ marginRight: "100px" }}>YouTube</p>

                </div>

                <div className="navbar-center ">

                    <input className="navbar-input" placeholder="Search Videos" value={search.length === 0 ? displaymsg : search} onChange={e => setSearch(e.target.value)} />
                    <SearchIcon style={{ marginRight: "10px", color: search.length > 0 ? "black" : "grey" }} onClick={handleSubmit} />

                </div>
                <div className="navbar-right ml-5">
                    <Icons Icons={MicIcon} />
                    {"  "}
                    <Icons Icons={VideoCallIcon} />
                    <Icons Icons={ViewModuleIcon} />
                    <MoreVertIcon style={{ color: "white", marginLeft: "20px", marginRight: "0px" }} fontSize="large" />


                    <button className="btn btn-outline-primary ml-5" >
                        <div className="navbar-button">
                            <PersonRoundedIcon />
                            <p className="ml-2 mt-3 ">SIGN IN</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
