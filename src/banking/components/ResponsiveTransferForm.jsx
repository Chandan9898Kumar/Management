import React from 'react';
import { useDeviceType } from '../hooks/useDeviceType';

const ResponsiveTransferForm = ({ 
  transferDetails, 
  onAmountChange, 
  onReferenceChange, 
  onSubmit, 
  selectedAccount, 
  selectedPayee 
}) => {
  const { isMobile } = useDeviceType();

  const containerStyle = {
    padding: isMobile ? "16px" : "24px",
    backgroundColor: isMobile ? "#f8f9fa" : "#ffffff",
    minHeight: isMobile ? "100vh" : "auto",
  };

  const formStyle = {
    maxWidth: isMobile ? "100%" : "500px",
    margin: isMobile ? "0" : "0 auto",
  };

  const fieldGroupStyle = {
    marginBottom: isMobile ? "20px" : "24px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: isMobile ? "8px" : "12px",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "600",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: isMobile ? "16px" : "12px",
    border: "1px solid #ddd",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    boxSizing: "border-box",
  };

  const summaryCardStyle = {
    border: "1px solid #ddd",
    padding: isMobile ? "16px" : "20px",
    marginBottom: isMobile ? "20px" : "24px",
    borderRadius: isMobile ? "12px" : "8px",
    backgroundColor: "#f8f9fa",
  };

  const buttonStyle = {
    width: "100%",
    padding: isMobile ? "16px" : "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: "600",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={onSubmit}>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Amount</label>
          <input
            type="number"
            value={transferDetails.amount}
            onChange={(e) => onAmountChange(e.target.value)}
            style={inputStyle}
            placeholder="Enter amount"
            required
          />
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Reference (Optional)</label>
          <input
            type="text"
            value={transferDetails.reference}
            onChange={(e) => onReferenceChange(e.target.value)}
            style={inputStyle}
            placeholder="Enter reference"
          />
        </div>

        <div style={summaryCardStyle}>
          <h3 style={{ marginBottom: "12px", fontSize: isMobile ? "16px" : "18px" }}>
            Transfer Summary
          </h3>
          <p><strong>From:</strong> {selectedAccount?.name}</p>
          <p><strong>To:</strong> {selectedPayee?.name}</p>
          <p><strong>Amount:</strong> ₹{transferDetails.amount || 0}</p>
        </div>

        <button type="submit" style={buttonStyle}>
          Confirm Transfer
        </button>
      </form>
    </div>
  );
};

export default ResponsiveTransferForm;