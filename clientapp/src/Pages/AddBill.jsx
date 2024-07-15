import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBill = () => {

    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const getPeople = async () => {
            const { data } = await axios.get('/api/bills/getallpeople');
            setPeople(data);
        }

        getPeople();
    }, []);


    const onSelectPerson = person => {
        if (selectedPeople.includes(person)) {
            setSelectedPeople(selectedPeople.filter(t => t !== person));
        } else {
            setSelectedPeople([...selectedPeople, person]);
        }
    }

    const onSubmitClick = async () => {
        const bill = {
            amount: amount,
            participantIds: selectedPeople.map(s => s.id)
        };
        await axios.post('/api/bills/addbill', bill);
        navigate('/');
    }
    return (
        <div style={{ minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    <h2>Add Bill</h2>
                    <input type="text" className='form-control' name='amount' value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
                    <br />
                    <div className="mb-3">
                        <label className="form-label">Select Participants</label>
                        {people.map(p => {
                            return <div key={p.id} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedPeople.includes(p)}
                                    onChange={() => onSelectPerson(p)}
                                />
                                <label className="form-check-label">{p.name}</label>
                            </div>
                        })}
                    </div>
                    {selectedPeople.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-center">Split Amounts</h3>
                            <ul className="list-group">
                                {selectedPeople.map(participant => (
                                    <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{participant.name}</span>
                                        <span>${(amount/selectedPeople.length).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}


export default AddBill;