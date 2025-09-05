import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTransfer } from '../TransferContext';
import { useDeviceType } from '../hooks/useDeviceType';
import VirtualInfiniteScroll from './VirtualInfiniteScroll';
import ApiService from '../services/api';
import ROUTES from '../routes';

function VirtualPayeeSelect() {
  const [selectedId, setSelectedId] = useState('');
  const { state, dispatch, canAccess } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();

  if (!canAccess('payee')) {
    return <Navigate to="/transfer/" replace />;
  }

  const handleNext = () => {
    if (!selectedId) return;
    
    // For demo, create payee object
    const payee = { id: selectedId, name: `Payee ${selectedId}` };
    dispatch({ type: 'SET_PAYEE', payload: payee });
    navigate(ROUTES.TRANSFER_DETAILS, { replace: true });
  };

  const renderPayeeItem = (payee, index) => (
    <div
      onClick={() => setSelectedId(payee.id)}
      style={{
        padding: '15px',
        margin: '5px 10px',
        border: selectedId === payee.id ? '2px solid #007bff' : '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: selectedId === payee.id ? '#e3f2fd' : 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        height: '80px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '15px',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        {payee.name.charAt(0)}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{payee.name}</h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          {payee.accountNumber} - {payee.bank}
        </p>
      </div>
      {selectedId === payee.id && (
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}>
          ✓
        </div>
      )}
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        flexShrink: 0
      }}>
        <button
          onClick={() => navigate('/transfer/')}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '10px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <h1 style={{ margin: '0', fontSize: '24px' }}>Select Payee</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
          Choose from {isMobile ? 'your' : 'available'} payees
        </p>
      </div>

      {/* Account Info */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        flexShrink: 0
      }}>
        <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666' }}>FROM ACCOUNT</p>
        <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>
          {state.selectedAccount?.name} - {state.selectedAccount?.number}
        </p>
      </div>

      {/* Virtual Scrolling List */}
      <div style={{ flex: 1, padding: '10px 0', overflow: 'hidden' }}>
        <VirtualInfiniteScroll
          fetchData={(params) => ApiService.getPayees(params)}
          renderItem={renderPayeeItem}
          itemHeight={90}
          containerHeight={400}
          pageSize={10}
          threshold={3}
        />
      </div>

      {/* Continue Button */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderTop: '1px solid #dee2e6',
        flexShrink: 0
      }}>
        <button
          onClick={handleNext}
          disabled={!selectedId}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: selectedId ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: selectedId ? 'pointer' : 'not-allowed'
          }}
        >
          Continue to Transfer
        </button>
      </div>
    </div>
  );
}

export default VirtualPayeeSelect;