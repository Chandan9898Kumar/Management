
import MobileLayout from './MobileLayout';
const SettingsPage = ({ setCurrentTab }) => {
  return (
    <MobileLayout
      backgroundColor="#f2f2f7"
      header={
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px 16px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px' }}>Settings</h1>
        </div>
      }
    >
      {/* Settings List */}
      {[
        { icon: '👤', title: 'Profile' },
        { icon: '🔒', title: 'Privacy' },
        { icon: '🔔', title: 'Notifications' },
        { icon: '🎨', title: 'Appearance' },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'white',
            marginBottom: '1px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '24px', marginRight: '16px' }}>
            {item.icon}
          </span>
          <span style={{ flex: '1' }}>{item.title}</span>
          <span onClick={() => setCurrentTab('')}>›</span>
        </div>
      ))}
    </MobileLayout>
  );
};
export default SettingsPage;
