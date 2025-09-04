import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTransfer } from './TransferContext';
import { useDeviceType } from './hooks/useDeviceType';
import ApiService from './services/api';
import ROUTES from './routes';

function ReviewTransfer() {
  const { state, dispatch, canAccess } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!canAccess('review')) {
    return <Navigate to="/transfer/" replace />;
  }

  const processTransfer = async () => {
    setIsProcessing(true);
    
    try {
      const transferData = {
        fromAccount: state.selectedAccount,
        toPayee: state.selectedPayee,
        amount: state.transferDetails.amount,
        reference: state.transferDetails.reference,
        description: state.transferDetails.description
      };
      
      const response = await ApiService.processTransfer(transferData);
      
      if (response.success) {
        const sessionToken = response.data.transactionId;
        
        sessionStorage.setItem('transferSession', sessionToken);
        sessionStorage.setItem('transferTimestamp', Date.now().toString());
        sessionStorage.setItem('transferData', JSON.stringify(response.data));
        
        dispatch({ type: 'SET_SESSION', payload: sessionToken });
        navigate(ROUTES.SUCCESS, { replace: true });
      } else {
        sessionStorage.setItem('transferError', response.error);
        navigate(ROUTES.ERROR, { replace: true });
      }
    } catch (error) {
      sessionStorage.setItem('transferError', error.message);
      navigate(ROUTES.ERROR, { replace: true });
    } finally {
      setIsProcessing(false);
    }
  };

  // Mobile Design - Confirmation screen
  if (isMobile) {
    return (
      <main style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "0"
      }}>
        <header style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
          color: "white",
          padding: "20px 16px 30px 16px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>Review & Confirm</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Final step - Please verify all details</p>
        </header>

        <section style={{ padding: "20px 16px" }}>
          <article style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            contentVisibility: "auto",
            containIntrinsicSize: "1px 400px"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#333", textAlign: "center" }}>Transfer Summary</h3>
            
            <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666", textTransform: "uppercase" }}>FROM ACCOUNT</p>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#333" }}>{state.selectedAccount?.name}</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{state.selectedAccount?.number}</p>
            </div>

            <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666", textTransform: "uppercase" }}>TO PAYEE</p>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#333" }}>{state.selectedPayee?.name}</h4>
              <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#666" }}>{state.selectedPayee?.accountNumber}</p>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{state.selectedPayee?.bank}</p>
            </div>

            <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666", textTransform: "uppercase" }}>TRANSFER DETAILS</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Amount:</span>
                <span style={{ fontWeight: "600", fontSize: "18px", color: "#28a745" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Reference:</span>
                <span style={{ fontWeight: "600" }}>{state.transferDetails?.reference}</span>
              </div>
              {state.transferDetails?.description && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Description:</span>
                  <span style={{ fontWeight: "600" }}>{state.transferDetails.description}</span>
                </div>
              )}
            </div>

            <div style={{ textAlign: "center", backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "12px" }}>
              <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#666" }}>Total Amount</p>
              <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#28a745" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</p>
            </div>
          </article>

          <aside style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "20px", marginRight: "12px" }}>⚠️</span>
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "600", fontSize: "16px" }}>Important</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>This transaction cannot be reversed once processed.</p>
              </div>
            </div>
          </aside>

          <footer style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate(ROUTES.TRANSFER_DETAILS)}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: "16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: isProcessing ? "not-allowed" : "pointer",
                opacity: isProcessing ? 0.6 : 1
              }}
            >
              Edit
            </button>
            <button
              onClick={processTransfer}
              disabled={isProcessing}
              style={{
                flex: 2,
                padding: "16px",
                backgroundColor: isProcessing ? "#ffc107" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: isProcessing ? "not-allowed" : "pointer"
              }}
            >
              {isProcessing ? "Processing..." : "Confirm Transfer"}
            </button>
          </footer>
        </section>
      </main>
    );
  }

  // Web Design - Professional review layout
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "40px"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", color: "#2c3e50", marginBottom: "10px" }}>Review Transfer</h1>
          <p style={{ fontSize: "18px", color: "#7f8c8d" }}>Please verify all details before confirming</p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px"
        }}>
          <article style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            contentVisibility: "auto",
            containIntrinsicSize: "1px 500px"
          }}>
            <h2 style={{ margin: "0 0 30px 0", fontSize: "24px", color: "#2c3e50" }}>Transaction Details</h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px"
            }}>
              <div style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px"
              }}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#7f8c8d", textTransform: "uppercase" }}>From Account</h3>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#2c3e50" }}>{state.selectedAccount?.name}</h4>
                <p style={{ margin: 0, color: "#7f8c8d" }}>{state.selectedAccount?.number}</p>
              </div>

              <div style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px"
              }}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#7f8c8d", textTransform: "uppercase" }}>To Payee</h3>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#2c3e50" }}>{state.selectedPayee?.name}</h4>
                <p style={{ margin: "0 0 4px 0", color: "#7f8c8d" }}>{state.selectedPayee?.accountNumber}</p>
                <p style={{ margin: 0, color: "#7f8c8d" }}>{state.selectedPayee?.bank}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              padding: "25px",
              marginBottom: "30px"
            }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#2c3e50" }}>Transfer Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#7f8c8d" }}>Amount</p>
                  <p style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#27ae60" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#7f8c8d" }}>Reference</p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>{state.transferDetails?.reference}</p>
                </div>
              </div>
              {state.transferDetails?.description && (
                <div style={{ marginTop: "20px" }}>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#7f8c8d" }}>Description</p>
                  <p style={{ margin: 0, fontSize: "16px", color: "#2c3e50" }}>{state.transferDetails.description}</p>
                </div>
              )}
            </div>

            <div style={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "24px", marginRight: "15px" }}>⚠️</span>
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#856404" }}>Important Notice</h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>Please review all details carefully. This transaction cannot be reversed once processed.</p>
              </div>
            </div>
          </article>

          <aside>
            <section style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              marginBottom: "20px"
            }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#2c3e50", textAlign: "center" }}>Total Amount</h3>
              <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <p style={{ margin: 0, fontSize: "36px", fontWeight: "700", color: "#27ae60" }}>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</p>
              </div>
            </section>

            <footer style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <button
                onClick={() => navigate(ROUTES.TRANSFER_DETAILS)}
                disabled={isProcessing}
                style={{
                  padding: "15px 25px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  opacity: isProcessing ? 0.6 : 1
                }}
              >
                ← Back to Edit
              </button>
              
              <button
                onClick={processTransfer}
                disabled={isProcessing}
                style={{
                  padding: "20px 25px",
                  backgroundColor: isProcessing ? "#ffc107" : "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: isProcessing ? "not-allowed" : "pointer"
                }}
              >
                {isProcessing ? "Processing..." : "Confirm Transfer"}
              </button>
            </footer>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ReviewTransfer;