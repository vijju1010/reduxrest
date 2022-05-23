import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Pets from './Components/Pets';
import AddPets from './Components/AddPets';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    Routes,
    Link,
    NavLink,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    // console.log(user, 'user');
    return (
        <div className='App'>
            <h1>Welcome to Pet Store</h1>
            {/* <AddPets />
            <Pets /> */}
            <Link to='/home'>Home</Link>
            <br />
            <br />
            <Link to={'/login'}>Login</Link>
        </div>
    );
}

export default App;
