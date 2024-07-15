import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import dayjs from 'dayjs';

const BillDetails = () => {
    const { id } = useParams();
    const [bill, setBill] = useState([]);

    useEffect(() => {
        const getBill = async () => {

            const { data } = await axios.get(`/api/bills/getbilldetails?id=${id}`);
            setBill(data);
        }
        getBill();
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg" style={{ width: '100%', maxWidth: '600px', paddingTop: 10 }}>
                <div className="card-header bg-dark text-white">
                    <h2 className="card-title text-center mb-0">Bill Details</h2>
                </div>
                <div className="card-body">
                    <p>
                        <strong>Date:</strong> {dayjs(bill.date).format("MM/DD/YYYY")}</p>
                    <p>
                        <strong>Total Amount:</strong>${bill.amount}</p>
                    <h3 className="mt-4">Participants</h3>
                    <ul className="list-group">
                        {bill.people && bill.people.map((p) => (
                            <tr key={p.id}>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span><FaUser className="me-2" />{p.name}</span>
                                    <span className="badge bg-success rounded-pill">${(bill.amount / bill.people.length).toFixed(2)}</span>
                                </li>
                            </tr>
                        ))}
                       
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default BillDetails;