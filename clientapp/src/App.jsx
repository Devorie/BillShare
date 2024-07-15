import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddParticipant from './Pages/AddParticipant';
import AddBill from './Pages/AddBill';
import ListBills from './Pages/ListBills';
import ListParticipants from './Pages/ListParticipants';
import BillDetails from './Pages/BillDetails'
import Layout from './components/Layout';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/addparticipant' element={<AddParticipant />} />
                    <Route path='/addbill' element={<AddBill />} />
                    <Route path='/listbills' element={<ListBills />} />
                    <Route path='/listparticipants' element={<ListParticipants />} />
                    <Route path='/billdetails/:id' element={<BillDetails/> } />
                </Routes>
            </Layout>
        );
    }

}

export default App;
