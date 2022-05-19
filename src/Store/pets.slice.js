import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pets: [],
    pet: {},
    edid: '',
};
const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        getPets: (state, action) => {
            state.pets = action.payload;
        },
        setPet: (state, action) => {
            state.pet = action.payload;
        },
        setEdid: (state, action) => {
            state.edid = action.payload;
        },
        getPet: (state, action) => {
            state.pet = action.payload;
        },
        addPet: (state, action) => {
            state.pets.push(action.payload);
        },
    },
});
export const { getPets, getPet, addPet, setPet, setEdid } = petsSlice.actions;
export default petsSlice.reducer;

export const getPetsAsync = () => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/pets');
        const pets = await response.json();
        console.log(pets, 'pets');
        dispatch(getPets(pets));
    };
};
export const addPetAsync = (pet) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        });
        dispatch(getPetsAsync());
    };
};
export const putPetAsync = (pet) => {
    console.log(pet, 'pet');
    return async (dispatch) => {
        const response = await fetch(`http://localhost:3001/pets/${pet._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        });
        // dispatch(getPets());
        dispatch(getPetsAsync());
    };
};
export const deletePetAsync = (petid) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:3001/pets/${petid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(getPetsAsync());
        // dispatch(getPets());
    };
};
