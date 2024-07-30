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

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  return (
    <div className='container'>
      <h1 className='form-title'>Informe a sua mensagem</h1>
      <form className='message-form'>
        <div className='input-content'>
          <span className='input-label'>Nome:</span>
          <input
            id="name-input"
            className='message-input'
            type='text'
            placeholder='Nome'
            onChange={handleNameChange}
          />
        </div>
        <div className='input-content'>
          <span className='input-label'>E-mail:</span>
          <input
            id="email-input"
            className='message-input'
            type='email'
            placeholder='E-mail'
            onChange={handleEmailChange}
          />
        </div>
        <div className='input-content'>
          <span className='input-label'>Assunto:</span>
          <input
            id="subject-input"
            className='message-input'
            type='text'
            placeholder='Assunto'
            onChange={handleSubjectChange}
          />
        </div>
        <span className='input-label'>Mensagem:</span>
        <textarea
          id="text"
          className='text-input'
          onChange={handleMessageChange}
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
