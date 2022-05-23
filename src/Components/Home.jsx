import React, { useEffect } from 'react';
import AddPets from './AddPets';
import Pets from './Pets';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkAuth, setIsAuthenticated } from '../Store/user.slice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    useEffect(() => {
        dispatch(checkAuth());
        console.log(isAuthenticated, 'isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <div>
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    dispatch(setIsAuthenticated(false));
                }}>
                logout
            </button>
            <AddPets />
            <Pets />
        </div>
    );
};

export default Home;
