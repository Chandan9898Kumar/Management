import React, { useState } from 'react';
import './style.css';
import AccountSelectPage from './AccountSelectPage';
import ChatPage from './ChatPage';
import SettingsPage from './SettingsPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('best');

  if (currentTab === 'account') {
    return <AccountSelectPage setCurrentTab={setCurrentTab} />;
  }
  if (currentTab === 'chat') {
    return <ChatPage setCurrentTab={setCurrentTab} />;
  }
  if (currentTab === 'settting') {
    return <SettingsPage setCurrentTab={setCurrentTab} />;
  }

  return (
    <>
      <BestPracticeforMobile setCurrentTab={setCurrentTab} />
    </>
  );
}

const BestPracticeforMobile = ({ setCurrentTab }) => {
  return (
    <div
      style={{
        height: '100vh', // Fixed viewport height
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Fixed Header - Never scrolls */}
      <header
        style={{
          flex: '0 0 auto',
          background: 'linear-gradient(135deg, #007bff, #0056b3)',
          color: 'white',
          padding: '20px 16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px' }}>💳 Banking App</h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>Select Bank Account</p>
      </header>

      {/* Scrollable Content Area */}
      <main
        style={{
          flex: '1', // Takes remaining space
          overflow: 'auto', // Internal scrolling
          padding: '16px',
        }}
      >
        {/* Account Cards */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>Savings Account {i}</h3>
            <p style={{ margin: '0 0 4px 0', color: '#666' }}>****123{i}</p>
            <p style={{ margin: 0, color: '#28a745', fontWeight: '600' }}>
              ₹{(50000 * i).toLocaleString()}
            </p>
          </div>
        ))}
      </main>

      {/* Fixed Bottom Button - Never scrolls */}
      <footer
        style={{
          flex: '0 0 auto',
          padding: '16px',
          paddingBottom: '40px', // Safe area for iPhone
          backgroundColor: 'white',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
          }}
          onClick={() => setCurrentTab('account')}
        >
          Continue
        </button>
      </footer>
    </div>

    // <div
    //   style={{
    //     minHeight: '100vh', // ALWAYS fills screen, grows if needed
    //     display: 'flex',
    //     flexDirection: 'column',
    //   }}
    // >
    //   <header
    //     style={{
    //       flex: '0 0 auto', // Fixed header - takes only needed space
    //       padding: '20px',
    //       backgroundColor: 'red',
    //     }}
    //   >
    //     Header Content
    //   </header>

    //   <main
    //     style={{
    //       flex: '1', // Grows to fill ALL remaining space
    //       backgroundColor: 'blue',
    //     }}
    //   >
    //     Main Content
    //     <br />
    //     <div>Content 1</div>
    //     <div>Content 8</div>
    //   </main>

    //   <footer
    //     style={{
    //       flex: '0 0 auto', // Fixed footer - takes only needed space
    //       backgroundColor: 'green',
    //     }}
    //   >
    //     Footer Content
    //   </footer>
    // </div>
  );
};
