import React from 'react';
import { useDeviceType } from '../hooks/useDeviceType';

const ResponsiveAccountSelect = ({ accounts, selectedAccount, onSelect }) => {
  const { isMobile } = useDeviceType();

  const containerStyle = {
    padding: isMobile ? "16px" : "24px",
    backgroundColor: isMobile ? "#f8f9fa" : "#ffffff",
    minHeight: isMobile ? "100vh" : "auto",
  };

  const titleStyle = {
    fontSize: isMobile ? "20px" : "24px",
    marginBottom: isMobile ? "16px" : "24px",
    fontWeight: "600",
    color: "#333",
  };

  const accountCardStyle = (isSelected) => ({
    border: isSelected ? "2px solid #007bff" : "1px solid #ddd",
    padding: isMobile ? "16px" : "20px",
    marginBottom: isMobile ? "12px" : "16px",
    borderRadius: isMobile ? "12px" : "8px",
    backgroundColor: isSelected ? "#f0f8ff" : "#ffffff",
    cursor: "pointer",
    boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
  });

  const accountNameStyle = {
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: "600",
    marginBottom: "4px",
  };

  const accountDetailsStyle = {
    fontSize: isMobile ? "14px" : "16px",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Select Account</h2>
      {accounts.map((account) => (
        <div
          key={account.id}
          style={accountCardStyle(selectedAccount?.id === account.id)}
          onClick={() => onSelect(account)}
        >
          <div style={accountNameStyle}>{account.name}</div>
          <div style={accountDetailsStyle}>
            {account.number} • ₹{account.balance.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResponsiveAccountSelect;