import React from 'react';
import {
    getPetsAsync,
    addPetAsync,
    setPet,
    putPetAsync,
    setEdid,
} from '../Store/pets.slice';
import { useDispatch, useSelector } from 'react-redux';

const AddPets = () => {
    const dispatch = useDispatch();
    const pet = useSelector((state) => state.pets.pet);
    const edid = useSelector((state) => state.pets.edid);
    const changeHandler = (e) => {
        e.target.name !== 'vaccinated'
            ? dispatch(setPet({ ...pet, [e.target.name]: e.target.value }))
            : dispatch(setPet({ ...pet, [e.target.name]: e.target.checked }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.vaccinated.checked, 'vac');
        const pet = {
            name: e.target.name.value,
            type: e.target.type.value,
            vaccinated: e.target.vaccinated.checked ? true : false,
            description: e.target.description.value,
            image: e.target.image.value,
            color: e.target.color.value,
        };
        dispatch(addPetAsync(pet));
        e.target.reset();
    };

    return (
        <div>
            <h1>Add Pets</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    value={pet.name}
                    onChange={changeHandler}
                />
                <br />
                <br />
                <label>Type:</label>
                <input
                    type='text'
                    name='type'
                    value={pet.type}
                    onChange={changeHandler}
                />
                <br />
                <br />
                <label>Vaccinated:</label>
                <input
                    type='checkbox'
                    name='vaccinated'
                    onChange={changeHandler}
                />
                <br />
                <br />
                <label>Description:</label>
                <input
                    type='text'
                    name='description'
                    value={pet.description}
                    onChange={changeHandler}
                />
                <br />
                <br />
                <label>Image:</label>
                <input
                    type='text'
                    name='image'
                    value={pet.image}
                    onChange={changeHandler}
                />
                <br />
                <br />
                <label>Color:</label>
                <input
                    type='text'
                    name='color'
                    value={pet.color}
                    onChange={changeHandler}
                />
                <br />
                <br />
                {edid === '' ? (
                    <input type='submit' value='Submit' />
                ) : (
                    <button
                        type='button'
                        onClick={() => {
                            dispatch(setPet({}));
                            dispatch(putPetAsync(pet));
                            dispatch(setEdid(''));
                        }}>
                        update
                    </button>
                )}
            </form>
        </div>
    );
};

export default AddPets;
