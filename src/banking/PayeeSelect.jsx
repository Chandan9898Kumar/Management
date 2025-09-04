import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTransfer } from './TransferContext';
import { useDeviceType } from './hooks/useDeviceType';
import ApiService from './services/api';
import ROUTES from './routes';

function PayeeSelect() {
  const [selectedId, setSelectedId] = useState('');
  const [payees, setPayees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state, dispatch, canAccess } = useTransfer();
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

  if (!canAccess('payee')) {
    return <Navigate to={ROUTES.ACCOUNT_SELECT} replace />;
  }

  const handleNext = () => {
    const payee = payees.find(p => p.id === selectedId);
    if (payee) {
      dispatch({ type: 'SET_PAYEE', payload: payee });
      navigate(ROUTES.TRANSFER_DETAILS, { replace: true });
    }
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
            borderTop: '4px solid #667eea',
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
              backgroundColor: '#667eea',
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

  // Mobile Design - Swipe-friendly cards
  if (isMobile) {
    return (
      <main style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "0"
      }}>
        {/* Header */}
        <header style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px 16px 30px 16px",
          position: "relative"
        }}>
          <button
            onClick={() => navigate(ROUTES.ACCOUNT_SELECT)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              padding: "8px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              marginBottom: "16px"
            }}
          >
            ← Back
          </button>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>Select Payee</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Step 2 of 3</p>
        </header>

        {/* Selected Account Info */}
        <aside style={{
          backgroundColor: "white",
          margin: "16px",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#666", textTransform: "uppercase" }}>FROM ACCOUNT</p>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "#333" }}>{state.selectedAccount?.name}</h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{state.selectedAccount?.number}</p>
        </aside>

        {/* Payees List */}
        <section style={{ padding: "0 16px" }}>
          {payees.map(payee => (
            <article
              key={payee.id}
              onClick={() => setSelectedId(payee.id)}
              style={{
                backgroundColor: selectedId === payee.id ? "#e8f5e8" : "white",
                border: selectedId === payee.id ? "2px solid #28a745" : "1px solid #e0e0e0",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                position: "relative",
                contentVisibility: "auto",
                containIntrinsicSize: "1px 100px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#666"
                }}>
                  {payee.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#333" }}>{payee.name}</h3>
                  <p style={{ margin: "0 0 2px 0", fontSize: "14px", color: "#666" }}>{payee.accountNumber}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{payee.bank}</p>
                </div>
                {selectedId === payee.id && (
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px"
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* Bottom Button */}
        <footer style={{ padding: "20px 16px", paddingBottom: "40px" }}>
          <button
            onClick={handleNext}
            disabled={!selectedId}
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: selectedId ? "#28a745" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: selectedId ? "pointer" : "not-allowed"
            }}
          >
            Continue to Transfer
          </button>
        </footer>
      </main>
    );
  }

  // Web Design - Professional dashboard layout
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: "300px",
        backgroundColor: "#343a40",
        color: "white",
        padding: "40px 30px"
      }}>
        <h2 style={{ margin: "0 0 30px 0", fontSize: "28px" }}>Banking Portal</h2>
        
        {/* Progress */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#28a745", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>✓</div>
            <span>Account Selected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#007bff", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "white" }}>2</div>
            <span style={{ fontWeight: "600" }}>Select Payee</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#6c757d", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>3</div>
            <span style={{ opacity: 0.7 }}>Transfer Details</span>
          </div>
        </div>

        {/* Selected Account */}
        <section style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>SELECTED ACCOUNT</h4>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>{state.selectedAccount?.name}</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>{state.selectedAccount?.number}</p>
        </section>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
            <button
              onClick={() => navigate(ROUTES.ACCOUNT_SELECT)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                marginRight: "20px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>
            <h1 style={{ margin: 0, fontSize: "32px", color: "#343a40" }}>Select Payee</h1>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {payees.map(payee => (
              <article
                key={payee.id}
                onClick={() => setSelectedId(payee.id)}
                style={{
                  backgroundColor: "white",
                  border: selectedId === payee.id ? "3px solid #007bff" : "1px solid #dee2e6",
                  borderRadius: "12px",
                  padding: "30px",
                  cursor: "pointer",
                  boxShadow: selectedId === payee.id ? "0 8px 25px rgba(0,123,255,0.15)" : "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "1px 200px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#e9ecef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#495057",
                    marginRight: "20px"
                  }}>
                    {payee.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "22px", color: "#343a40" }}>{payee.name}</h3>
                    <p style={{ margin: 0, color: "#6c757d", fontSize: "16px" }}>{payee.bank}</p>
                  </div>
                </div>
                
                <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>Account Number</p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#343a40" }}>{payee.accountNumber}</p>
                </div>

                {selectedId === payee.id && (
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px"
                  }}>
                    ✓
                  </div>
                )}
              </article>
            ))}
          </div>

          <footer style={{ marginTop: "40px", textAlign: "right" }}>
            <button
              onClick={handleNext}
              disabled={!selectedId}
              style={{
                padding: "15px 40px",
                backgroundColor: selectedId ? "#007bff" : "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: selectedId ? "pointer" : "not-allowed",
                minWidth: "200px"
              }}
            >
              Continue to Transfer →
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default PayeeSelect;