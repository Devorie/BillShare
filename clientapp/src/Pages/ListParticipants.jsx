import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListParticipants = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const getBills = async () => {
            const { data } = await axios.get('/api/bills/getallpeople');
            setPeople(data);
        }

        getBills();
    }, []);
    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 1 }}>
        <div className="container mt-5">
            <h2>Participants List</h2>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((p) => (
                        <tr key={p.id}>
                            <th scope="row">{p.id}</th>
                            <td>{p.name}</td>
                            <td>{p.email}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

    )
}


export default ListParticipants;