import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTransfer } from './TransferContext';
import { useDeviceType } from './hooks/useDeviceType';
import ROUTES from './routes';

function TransferDetails() {
  const { state, dispatch, canAccess } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [details, setDetails] = useState({
    amount: '',
    reference: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  if (!canAccess('details')) {
    return <Navigate to="/transfer/" replace />;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!details.amount || parseFloat(details.amount) <= 0) {
      newErrors.amount = 'Valid amount required';
    }
    if (parseFloat(details.amount) > state.selectedAccount?.balance) {
      newErrors.amount = 'Insufficient balance';
    }
    if (!details.reference.trim()) {
      newErrors.reference = 'Reference required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({ type: 'SET_DETAILS', payload: details });
      navigate(ROUTES.REVIEW, { replace: true });
    }
  };

  // Mobile Design - Form-focused layout
  if (isMobile) {
    return (
      <main style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "0"
      }}>
        <header style={{
          background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
          color: "white",
          padding: "20px 16px 30px 16px"
        }}>
          <button
            onClick={() => navigate(ROUTES.PAYEE_SELECT)}
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
          <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>Transfer Amount</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Step 3 of 3</p>
        </header>

        <section style={{ padding: "16px" }}>
          <aside style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#333" }}>Transfer Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "#666" }}>From:</span>
              <span style={{ fontWeight: "600" }}>{state.selectedAccount?.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "#666" }}>To:</span>
              <span style={{ fontWeight: "600" }}>{state.selectedPayee?.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #eee" }}>
              <span style={{ color: "#666" }}>Available:</span>
              <span style={{ fontWeight: "600", color: "#28a745" }}>₹{state.selectedAccount?.balance.toLocaleString()}</span>
            </div>
          </aside>

          <form style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            contentVisibility: "auto",
            containIntrinsicSize: "1px 300px"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "16px", fontWeight: "600", color: "#333" }}>Amount *</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#666" }}>₹</span>
                <input
                  type="number"
                  value={details.amount}
                  onChange={(e) => setDetails({...details, amount: e.target.value})}
                  placeholder="0.00"
                  style={{
                    width: "100%",
                    padding: "16px 16px 16px 40px",
                    border: errors.amount ? "2px solid #dc3545" : "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "18px",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              {errors.amount && <p style={{ color: "#dc3545", margin: "8px 0 0 0", fontSize: "14px" }}>{errors.amount}</p>}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "16px", fontWeight: "600", color: "#333" }}>Reference *</label>
              <input
                type="text"
                value={details.reference}
                onChange={(e) => setDetails({...details, reference: e.target.value})}
                placeholder="Payment reference"
                style={{
                  width: "100%",
                  padding: "16px",
                  border: errors.reference ? "2px solid #dc3545" : "2px solid #e0e0e0",
                  borderRadius: "12px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
              {errors.reference && <p style={{ color: "#dc3545", margin: "8px 0 0 0", fontSize: "14px" }}>{errors.reference}</p>}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "16px", fontWeight: "600", color: "#333" }}>Description</label>
              <textarea
                value={details.description}
                onChange={(e) => setDetails({...details, description: e.target.value})}
                placeholder="Optional description"
                rows="3"
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                  resize: "vertical"
                }}
              />
            </div>
          </form>

          <footer>
          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Review Transfer
          </button>
          </footer>
        </section>
      </main>
    );
  }

  // Web Design - Split layout with calculator-style
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f1f3f4"
    }}>
      <aside style={{
        width: "300px",
        backgroundColor: "#1a73e8",
        color: "white",
        padding: "40px 30px"
      }}>
        <h2 style={{ margin: "0 0 30px 0", fontSize: "28px" }}>Transfer Details</h2>
        
        <div style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#34a853", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>✓</div>
            <span>Account Selected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#34a853", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>✓</div>
            <span>Payee Selected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#fff", color: "#1a73e8", marginRight: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600" }}>3</div>
            <span style={{ fontWeight: "600" }}>Enter Details</span>
          </div>
        </div>

        <section style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 15px 0", fontSize: "14px", opacity: 0.8 }}>TRANSFER SUMMARY</h4>
          <div style={{ marginBottom: "10px" }}>
            <p style={{ margin: "0 0 5px 0", fontSize: "12px", opacity: 0.8 }}>FROM</p>
            <p style={{ margin: 0, fontSize: "16px" }}>{state.selectedAccount?.name}</p>
          </div>
          <div>
            <p style={{ margin: "0 0 5px 0", fontSize: "12px", opacity: 0.8 }}>TO</p>
            <p style={{ margin: 0, fontSize: "16px" }}>{state.selectedPayee?.name}</p>
          </div>
        </section>
      </aside>

      <main style={{ flex: 1, padding: "40px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <header style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
            <button
              onClick={() => navigate(ROUTES.PAYEE_SELECT)}
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
            <h1 style={{ margin: 0, fontSize: "32px", color: "#202124" }}>Enter Transfer Details</h1>
          </header>

          <form style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
            contentVisibility: "auto",
            containIntrinsicSize: "1px 400px"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px"
            }}>
              <div>
                <label style={{ display: "block", marginBottom: "12px", fontSize: "16px", fontWeight: "600", color: "#202124" }}>Amount *</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#5f6368" }}>₹</span>
                  <input
                    type="number"
                    value={details.amount}
                    onChange={(e) => setDetails({...details, amount: e.target.value})}
                    placeholder="0.00"
                    style={{
                      width: "100%",
                      padding: "16px 16px 16px 40px",
                      border: errors.amount ? "2px solid #ea4335" : "2px solid #dadce0",
                      borderRadius: "8px",
                      fontSize: "18px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                {errors.amount && <p style={{ color: "#ea4335", margin: "8px 0 0 0", fontSize: "14px" }}>{errors.amount}</p>}
                <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#5f6368" }}>Available: ₹{state.selectedAccount?.balance.toLocaleString()}</p>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "12px", fontSize: "16px", fontWeight: "600", color: "#202124" }}>Reference *</label>
                <input
                  type="text"
                  value={details.reference}
                  onChange={(e) => setDetails({...details, reference: e.target.value})}
                  placeholder="Payment reference"
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: errors.reference ? "2px solid #ea4335" : "2px solid #dadce0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box"
                  }}
                />
                {errors.reference && <p style={{ color: "#ea4335", margin: "8px 0 0 0", fontSize: "14px" }}>{errors.reference}</p>}
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "12px", fontSize: "16px", fontWeight: "600", color: "#202124" }}>Description (Optional)</label>
              <textarea
                value={details.description}
                onChange={(e) => setDetails({...details, description: e.target.value})}
                placeholder="Add a note for this transfer"
                rows="4"
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #dadce0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                  resize: "vertical"
                }}
              />
            </div>
          </form>

          <footer style={{ textAlign: "right" }}>
            <button
              onClick={handleNext}
              style={{
                padding: "16px 32px",
                backgroundColor: "#1a73e8",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                minWidth: "200px"
              }}
            >
              Review Transfer →
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default TransferDetails;