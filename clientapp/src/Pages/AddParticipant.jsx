import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddParticipant = () => {

    const navigate = useNavigate();

    const [person, setPerson] = useState({
        name: '',
        email: ''
    });

    const onTextChange = e => {
        const copy = { ...person };
        copy[e.target.name] = e.target.value;
        setPerson(copy);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/bills/addperson', person);
        navigate('/');
    }

    const { name, email } = person;

    return (
        <div style={{ minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    <h2>Add a New Participant</h2>
                    <input type="text" className='form-control' name='name' value={name} onChange={onTextChange} placeholder="Name" />
                    <br />
                    <input type="text" className='form-control' name='email' value={email} onChange={onTextChange} placeholder="Email" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}


export default AddParticipant;