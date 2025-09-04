import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceType } from './hooks/useDeviceType';
import AccountSelect from './AccountSelect';
import ROUTES from './routes';

function AccountDashboard() {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();

  const handleManagePayee = () => {
    navigate(ROUTES.MANAGE_PAYEE);
  };

  return (
    <main style={{ backgroundColor: isMobile ? '#f8f9fa' : '#ffffff', minHeight: '100vh' }}>
      <header style={{
        padding: isMobile ? '16px' : '20px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'white'
      }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px' }}>Banking</h2>
          <button
            onClick={handleManagePayee}
            style={{
              padding: isMobile ? '12px 16px' : '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: isMobile ? '8px' : '6px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Manage Payees
          </button>
        </nav>
      </header>
      <section>
        <AccountSelect />
      </section>
    </main>
  );
}

export default AccountDashboard;