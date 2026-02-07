import React, { useState, useRef, useEffect } from 'react';
import data from './data.json';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userInput = input.toLowerCase().trim();
    const found = data.find(item => item.question === userInput);

    setMessages(prev => [
      ...prev, 
      `User: ${input}`, 
      `Assistant: ${found ? found.answer : "Sorry, I don't understand that."}`
    ]);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Assistant</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    height: '600px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#4a90e2',
    color: 'white',
    margin: 0
  },
  chatBox: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f4f4f4',
    whiteSpace: 'pre-line'  // preserve line breaks
  },
  message: {
    margin: '5px 0',
    lineHeight: '1.5em'
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
    marginRight: '10px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: 'white',
    cursor: 'pointer'
  }
};

export default App;
