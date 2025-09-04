
import MobileLayout from './MobileLayout'
const ChatPage = ({setCurrentTab}) => {
  return (
    <MobileLayout
      backgroundColor="#e5ddd5"
      header={
        <div style={{
          backgroundColor: '#075e54',
          color: 'white',
          padding: '15px 16px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#128c7e',
            marginRight: '12px'
          }}>👤</div>
          <div>
            <h3 style={{ margin: 0 }}>John Doe</h3>
            <p style={{ margin: 0, fontSize: '12px' }}>Online</p>
          </div>
        </div>
      }
      footer={
        <div style={{
          padding: '16px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Type message..."
            style={{
              flex: '1',
              padding: '12px',
              borderRadius: '25px',
              border: 'none'
            }}
          />
          <button style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#075e54',
            color: 'white',
            border: 'none'
          }}
          onClick={() => setCurrentTab('setting')}
          >➤</button>
        </div>
      }
    >
      {/* Messages */}
      <div style={{ padding: '16px' }}>
        {['Hello!', 'How are you?', 'Good!'].map((msg, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '18px',
            marginBottom: '12px',
            alignSelf: i % 2 ? 'flex-end' : 'flex-start'
          }}>
            {msg}
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};


export default ChatPage