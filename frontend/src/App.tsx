import React from 'react';
import Chat from './Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import MainPage from './MainPage';
import DestinationDetail from "./DestinationDetail";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/chat" element={<Layout><Chat/></Layout>} />
                <Route path="/" element={<Layout><MainPage/></Layout>} />
                <Route path="/detail/:destinationId" element={<DestinationDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
