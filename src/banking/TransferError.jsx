import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTransfer } from './TransferContext';
import { useDeviceType } from './hooks/useDeviceType';
import ROUTES from './routes';

function TransferError() {
  const { state, dispatch } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();

  const isValidSession = () => {
    const sessionToken = sessionStorage.getItem('transferSession');
    const timestamp = sessionStorage.getItem('transferTimestamp');
    
    if (!sessionToken || !timestamp || sessionToken !== state.sessionToken) {
      return false;
    }
    
    const fiveMinutes = 5 * 60 * 1000;
    return (Date.now() - parseInt(timestamp)) < fiveMinutes;
  };

  useEffect(() => {
    if (!isValidSession()) {
      navigate('/transfer/', { replace: true });
      return;
    }

    const handlePopState = () => {
      navigate('/transfer/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, state.sessionToken]);

  if (!isValidSession()) {
    return <Navigate to="/transfer/" replace />;
  }

  const handleRetry = () => {
    navigate(ROUTES.REVIEW, { replace: true });
  };

  const handleStartOver = () => {
    sessionStorage.removeItem('transferSession');
    sessionStorage.removeItem('transferTimestamp');
    dispatch({ type: 'RESET' });
    navigate('/transfer/', { replace: true });
  };

  const getErrorMessage = () => {
    const storedError = sessionStorage.getItem('transferError');
    return storedError || 'Network connectivity issue';
  };

  const errorMessage = getErrorMessage();

  // Mobile Design - Error screen with support options
  if (isMobile) {
    return (
      <main style={{
        backgroundColor: "#fff5f5",
        minHeight: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column"
      }}>
        <header style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "40px 16px",
          textAlign: "center",
          flex: "0 0 auto"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>❌</div>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>Transfer Failed</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Transaction could not be completed</p>
        </header>

        <section style={{ flex: 1, padding: "20px 16px" }}>
          <article style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(220,53,69,0.15)",
            border: "1px solid #f5c6cb",
            contentVisibility: "auto",
            containIntrinsicSize: "1px 200px"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#721c24", textAlign: "center" }}>Transaction Details</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>Amount:</span>
                <span style={{ fontWeight: "600", color: "#dc3545" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>From:</span>
                <span style={{ fontWeight: "600" }}>{state.selectedAccount?.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>To:</span>
                <span style={{ fontWeight: "600" }}>{state.selectedPayee?.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>Reference:</span>
                <span style={{ fontWeight: "600" }}>{state.transferDetails?.reference}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f5c6cb" }}>
                <span style={{ color: "#666" }}>Status:</span>
                <span style={{ fontWeight: "600", color: "#dc3545", textTransform: "uppercase" }}>Failed</span>
              </div>
            </div>
          </article>

          <aside style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: "24px", marginRight: "12px" }}>⚠️</span>
              <div>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#856404" }}>Error Reason</h4>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#856404" }}>{errorMessage}</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>Your account has not been debited. Please try again.</p>
              </div>
            </div>
          </aside>

          <aside style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#333", textAlign: "center" }}>Need Help?</h4>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "16px" }}>📞 <strong>Customer Support</strong></p>
              <p style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600", color: "#007bff" }}>1800-XXX-XXXX</p>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>💬 Live Chat available 24/7</p>
            </div>
          </aside>

          <footer style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={handleRetry}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#ffc107",
                color: "#212529",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
            
            <button
              onClick={handleStartOver}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Start New Transfer
            </button>
          </footer>
        </section>
      </main>
    );
  }

  // Web Design - Professional error page
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px"
    }}>
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <article style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          overflow: "hidden",
          contentVisibility: "auto",
          containIntrinsicSize: "1px 600px"
        }}>
          <header style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "40px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>❌</div>
            <h1 style={{ margin: "0 0 10px 0", fontSize: "36px" }}>Transfer Failed</h1>
            <p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>We encountered an issue processing your transaction</p>
          </header>

          <section style={{ padding: "40px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "30px",
              marginBottom: "30px"
            }}>
              <article>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#2c3e50" }}>Transaction Details</h3>
                <div style={{
                  border: "1px solid #f5c6cb",
                  borderRadius: "8px",
                  padding: "25px",
                  backgroundColor: "#fff5f5"
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#721c24", fontWeight: "600" }}>Amount</p>
                      <p style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#dc3545" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#721c24", fontWeight: "600" }}>Status</p>
                      <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#dc3545", textTransform: "uppercase" }}>Failed</p>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#721c24", fontWeight: "600" }}>From</p>
                      <p style={{ margin: 0, fontSize: "16px", color: "#721c24" }}>{state.selectedAccount?.name}</p>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#721c24", fontWeight: "600" }}>To</p>
                      <p style={{ margin: 0, fontSize: "16px", color: "#721c24" }}>{state.selectedPayee?.name}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #f5c6cb" }}>
                    <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#721c24", fontWeight: "600" }}>Reference</p>
                    <p style={{ margin: 0, fontSize: "16px", color: "#721c24" }}>{state.transferDetails?.reference}</p>
                  </div>
                </div>
              </article>

              <aside>
                <div style={{
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "8px",
                  padding: "25px",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "28px", marginRight: "15px" }}>⚠️</span>
                    <div>
                      <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#856404" }}>Error Details</h4>
                      <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#856404", fontWeight: "600" }}>{errorMessage}</p>
                      <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>Your account has not been debited. You can safely retry this transaction.</p>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: "#e7f3ff",
                  border: "1px solid #b3d9ff",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center"
                }}>
                  <h4 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#0c5460" }}>Need Assistance?</h4>
                  <p style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "600", color: "#0c5460" }}>📞 1800-XXX-XXXX</p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#0c5460" }}>💬 Live Chat • Email Support</p>
                </div>
              </aside>
            </div>

            <footer style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              paddingTop: "30px",
              borderTop: "1px solid #dee2e6"
            }}>
              <button
                onClick={handleRetry}
                style={{
                  padding: "15px 30px",
                  backgroundColor: "#ffc107",
                  color: "#212529",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  minWidth: "150px"
                }}
              >
                🔄 Try Again
              </button>
              
              <button
                onClick={handleStartOver}
                style={{
                  padding: "15px 30px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  minWidth: "180px"
                }}
              >
                🆕 Start New Transfer
              </button>
            </footer>
          </section>
        </article>
      </div>
    </main>
  );
}

export default TransferError;