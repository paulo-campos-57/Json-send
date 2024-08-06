import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MessageForm from './MessageForm';
import ReceivedMessages from './ReceivedMessages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MessageForm />} />
        <Route path="/messages" element={<ReceivedMessages />} />
      </Routes>
    </Router>
  );
}

export default App;
