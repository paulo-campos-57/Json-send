import { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (name && email && subject && message) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [name, email, subject, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
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
    </div>
  );
}

export default App;
