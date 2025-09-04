import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransfer } from './TransferContext';
import { useDeviceType } from './hooks/useDeviceType';
import ApiService from './services/api';
import ROUTES from './routes';

function ManagePayee() {
  const [payees, setPayees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayee, setNewPayee] = useState({ name: '', accountNumber: '', bank: '' });
  const [submitting, setSubmitting] = useState(false);
  const { dispatch } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getPayees();
        if (response.success) {
          setPayees(response.data);
        } else {
          setError(response.error || 'Failed to load payees');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPayees();
  }, []);

  const handleAddPayee = async () => {
    if (!newPayee.name || !newPayee.accountNumber || !newPayee.bank) {
      alert('Please fill all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await ApiService.createPayee(newPayee);
      if (response.success) {
        setPayees([...payees, response.data]);
        setNewPayee({ name: '', accountNumber: '', bank: '' });
        setShowAddForm(false);
      } else {
        alert(response.error || 'Failed to add payee');
      }
    } catch (err) {
      alert('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTransferToPayee = (payee) => {
    dispatch({ type: 'SET_PAYEE', payload: payee });
    dispatch({ type: 'SET_SKIP_PAYEE_SELECT', payload: true });
    navigate(ROUTES.ACCOUNT_SELECT);
    // announceToScreenReader(`Starting transfer to ${payee.name}`);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #6c5ce7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p>Loading payees...</p>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{ color: '#dc3545', marginBottom: '16px' }}>Error Loading Payees</h2>
          <p style={{ marginBottom: '24px', color: '#666' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c5ce7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <main style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '0' }}>
        <header style={{
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
          color: 'white',
          padding: '20px 16px 30px 16px'
        }}>
          <button
            onClick={() => navigate(ROUTES.ACCOUNT_SELECT)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
          >
            ← Back to Accounts
          </button>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Manage Payees</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Add and manage your payees</p>
        </header>

        <section style={{ padding: '16px' }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            {showAddForm ? 'Cancel' : '+ Add New Payee'}
          </button>

          {showAddForm && (
            <form style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Add New Payee</h3>
              <input
                type="text"
                placeholder="Payee Name"
                value={newPayee.name}
                onChange={(e) => setNewPayee({...newPayee, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '12px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Account Number"
                value={newPayee.accountNumber}
                onChange={(e) => setNewPayee({...newPayee, accountNumber: e.target.value})}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '12px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={newPayee.bank}
                onChange={(e) => setNewPayee({...newPayee, bank: e.target.value})}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleAddPayee}
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: submitting ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Adding...' : 'Add Payee'}
              </button>
            </form>
          )}

          {payees.map((payee) => (
            <article
              key={payee.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{payee.name}</h3>
              <p style={{ margin: '0 0 4px 0', color: '#666' }}>{payee.accountNumber}</p>
              <p style={{ margin: '0 0 16px 0', color: '#666' }}>{payee.bank}</p>
              <button
                onClick={() => handleTransferToPayee(payee)}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Transfer Amount
              </button>
            </article>
          ))}
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => navigate(ROUTES.ACCOUNT_SELECT)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              marginRight: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Accounts
          </button>
          <h1 style={{ margin: 0, fontSize: '32px', color: '#2c3e50' }}>Manage Payees</h1>
        </header>
        
        <section style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ margin: 0, fontSize: '24px' }}>Your Payees</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {showAddForm ? 'Cancel' : '+ Add New Payee'}
            </button>
          </div>

          {showAddForm && (
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '30px',
              backgroundColor: '#f8f9fa'
            }}>
              <h3 style={{ margin: '0 0 20px 0' }}>Add New Payee</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Payee Name"
                  value={newPayee.name}
                  onChange={(e) => setNewPayee({...newPayee, name: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={newPayee.accountNumber}
                  onChange={(e) => setNewPayee({...newPayee, accountNumber: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={newPayee.bank}
                  onChange={(e) => setNewPayee({...newPayee, bank: e.target.value})}
                  style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              </div>
              <button
                onClick={handleAddPayee}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Add Payee
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {payees.map((payee) => (
              <article
                key={payee.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '25px',
                  backgroundColor: 'white'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{payee.name}</h3>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>Account: {payee.accountNumber}</p>
                <p style={{ margin: '0 0 20px 0', color: '#666' }}>Bank: {payee.bank}</p>
                <button
                  onClick={() => handleTransferToPayee(payee)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Transfer Amount
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ManagePayee;