
import MobileLayout from './MobileLayout';
const AccountSelectPage = ({ setCurrentTab }) => {
  return (
    <MobileLayout
      header={
        <div
          style={{
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            color: 'white',
            padding: '20px 16px',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '24px' }}>Select Account</h1>
          <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
            Choose your account
          </p>
        </div>
      }
      footer={
        <div
          style={{
            padding: '16px',
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
            }}
            onClick={() => setCurrentTab('chat')}
          >
            Continue
          </button>
        </div>
      }
    >
      {/* Account Cards */}
      <div style={{ padding: '16px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <h3>Account {i}</h3>
            <p>****123{i}</p>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default AccountSelectPage;
