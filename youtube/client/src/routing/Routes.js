import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../component/Home';
import Search from '../component/Search';
import Video from '../component/Video';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/video/:video_id" component={Video} />
                <Route path="/search/:search_name" component={Search} />
            </Switch>
        </Router>
    )
}

export default Routes
