import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getPetsAsync,
    deletePetAsync,
    setPet,
    setEdid,
} from '../Store/pets.slice';
const Pets = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);
    const pet = useSelector((state) => state.pets.pet);

    useEffect(() => {
        dispatch(getPetsAsync());
    }, [dispatch]);
    return (
        <div>
            <h1>Pets</h1>
            <ul>
                {pets.pets &&
                    pets.pets.map((pet) => (
                        <li key={pet._id}>
                            <h2>{pet.name}</h2>
                            <p>{pet.type}</p>
                            <p>
                                {pet.vaccinated
                                    ? 'Vaccinated'
                                    : 'Not Vaccinated'}
                            </p>
                            <p>{pet.description}</p>
                            <p>{pet.image}</p>
                            <p>{pet.color}</p>
                            <button
                                onClick={() => {
                                    dispatch(deletePetAsync(pet._id));
                                }}>
                                remove
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(setPet(pet));
                                    dispatch(setEdid(pet._id));
                                }}>
                                edit
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Pets;
