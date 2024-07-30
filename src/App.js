import { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name && email && subject && message) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [name, email, subject, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (response.ok) {
        console.log('Message sent successfully');
        fetchReceivedMessage(); 
      } else {
        const errorMessage = await response.text();
        console.error('Failed to send message:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const fetchReceivedMessage = async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/getMessage');
      if (response.ok) {
        const data = await response.json();
        setReceivedMessage(data);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to fetch message:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <h1 className='form-title'>Informe a sua mensagem</h1>
      <form className='message-form' onSubmit={handleSubmit}>
        <div className='input-content'>
          <span className='input-label'>Nome:</span>
          <input
            id="name-input"
            className='message-input'
            type='text'
            placeholder='Nome'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-content'>
          <span className='input-label'>E-mail:</span>
          <input
            id="email-input"
            className='message-input'
            type='email'
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-content'>
          <span className='input-label'>Assunto:</span>
          <input
            id="subject-input"
            className='message-input'
            type='text'
            placeholder='Assunto'
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <span className='input-label'>Mensagem:</span>
        <textarea
          id="text"
          className='text-input'
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="button-container">
          <button
            type="submit"
            className={`button-send ${isButtonVisible ? 'visible' : 'invisible'}`}
          >
            Enviar
            <IoIosSend size={20} />
          </button>
        </div>
      </form>
      {error && <div className='error-message'>Error: {error}</div>}
      {receivedMessage && (
        <div className='received-message'>
          <h2>Mensagem Recebida:</h2>
          <p><strong>Nome:</strong> {receivedMessage.name}</p>
          <p><strong>E-mail:</strong> {receivedMessage.email}</p>
          <p><strong>Assunto:</strong> {receivedMessage.subject}</p>
          <p><strong>Mensagem:</strong> {receivedMessage.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
