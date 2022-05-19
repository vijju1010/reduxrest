import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Pets from './Components/Pets';
import AddPets from './Components/AddPets';

function App() {
    return (
        <div className='App'>
            <h1>Welcome to Pet Store</h1>
            <AddPets />
            <Pets />
        </div>
    );
}

export default App;
