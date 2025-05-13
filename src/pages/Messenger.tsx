// MessengerLink.tsx (React + TypeScript)
import React from 'react';

const MessengerLink: React.FC = () => {
  const pageId = '27591365487176004';
  const messengerUrl = `https://m.me/${pageId}`;

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }} className='animate-drop'>
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#0084FF',
          color: 'white',
          padding: '12px 18px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        💬 Chat with us
      </a>
    </div>
  );
};

export default MessengerLink;
