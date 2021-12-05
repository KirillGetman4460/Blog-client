import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import Post from "./post.jsx"
import PostList from "./postList.jsx"
import PostPage from "./postPage.jsx"
import Auth from "./auth.jsx"
import Header from "./header.jsx"
import userPage from "./userPage.jsx"
import ChangePassword from './changePassword.jsx'

const Wrapper = ()=>{    
    return(
        <div className="wrapper">
            <Router>
            <Header/>   
                <Switch>
                    <Route exact path="/">
                        <PostList/>
                    </Route>  
                    <Route path="/auth">
                        {JSON.parse(localStorage.getItem("token")) ? <Redirect to="/userPage" /> : <Auth/>}
                    </Route> 
                    <Route path="/userPage">
                        <userPage/>
                    </Route> 
                    <Route path="/post">
                        <Post/>
                    </Route>  
                    <Route path="/ChangePassword/:email">
                        <ChangePassword />
                    </Route>
                    <Route path="/postPage/:id">
                        <PostPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default Wrapper; 