import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuthenticated: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setUser, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
export const loginAsync = (user) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const res = await response.json();
        if (res.success) {
            dispatch(setUser(res.user));
            localStorage.setItem('token', res.token);
        }
        console.log(res, 'user');
        // dispatch(setUser(res));
    };
};
export const checkAuth = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await fetch('http://localhost:3001/checkAuth', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            const res = await response.json();
            if (res.success) {
                dispatch(setUser(res.user));
                dispatch(setIsAuthenticated(true));
            }
        }
    };
};
