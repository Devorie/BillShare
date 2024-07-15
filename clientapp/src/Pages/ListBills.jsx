import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const ListBills = () => {

    const [bills, setBills] = useState([]);

    useEffect(() => {
        const getBills = async () => {

            const { data } = await axios.get('/api/bills/getallbills');
            setBills(data);
        }

        getBills();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Participants</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill.id}>
                            <th scope="row">{bill.id}</th>
                            <td>{dayjs(bill.date).format("MM/DD/YYYY")}</td>
                            <td>${bill.amount.toFixed(2)}</td>
                            <td>{bill.participantCount}</td>
                            <td>
                                <Link to={`/billdetails/${bill.id}`} className="btn btn-primary btn-sm">View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}


export default ListBills;