import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import FriendDetail from './Components/FriendDetail/FriendDetail';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import ExtraFriend from './Components/ExtraFriend/ExtraFriend';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
 const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
       <Navbar></Navbar>
        <Switch>
          <Route path ="/home" >
            <Home/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path = "/friend/:id">
            <FriendDetail/>
          </Route>
          <PrivateRoute path ="/about" >
            <About/>
          </PrivateRoute>
          <PrivateRoute path ="/contact" >
            <Contact/>
          </PrivateRoute>  
          <Route path ="/login" >
            <Login/>
          </Route>
          <PrivateRoute path ="/extrafriend" >
            <ExtraFriend/>
          </PrivateRoute>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
      
    </userContext.Provider>
  );
}

export default App;
