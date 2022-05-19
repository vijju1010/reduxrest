import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './pets.slice';

export const store = configureStore({
    reducer: {
        pets: petsReducer,
    },
});
