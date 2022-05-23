import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './pets.slice';
import userReducer from './user.slice';
export const store = configureStore({
    reducer: {
        pets: petsReducer,
        user: userReducer,
    },
});
