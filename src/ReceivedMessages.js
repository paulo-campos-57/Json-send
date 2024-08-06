import { useLocation } from 'react-router-dom';

function ReceivedMessages() {
    const location = useLocation();
    const { name, email, subject, message } = location.state || {};

    return (
        <div>
            <h1>Mensagem Recebida:</h1>
            <p><strong>Nome:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Assunto:</strong> {subject}</p>
            <p><strong>Mensagem:</strong> {message}</p>
        </div>
    );
}

export default ReceivedMessages;
