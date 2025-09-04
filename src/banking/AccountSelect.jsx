import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransfer } from "./TransferContext";
import { useDeviceType } from "./hooks/useDeviceType";
import HorizontalScroller from "./components/HorizontalScroller";
import ApiService from "./services/api";
import ROUTES from "./routes";

function AccountSelect() {
  const [selectedId, setSelectedId] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state, dispatch } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getAccounts();
        if (response.success) {
          setAccounts(response.data);
        } else {
          setError(response.error || 'Failed to load accounts');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const accountFilters = useMemo(() => [
    { id: "all", label: "All Accounts", icon: "🏦" },
    { id: "savings", label: "Savings", icon: "🏪" },
    { id: "current", label: "Current", icon: "🏢" },
    { id: "salary", label: "Salary", icon: "💰" },
  ], []);

  const filteredAccounts = useMemo(() => {
    if (filterType === "all") return accounts;
    return accounts.filter((acc) => acc.type === filterType);
  }, [filterType, accounts]);

  const handleNext = useCallback(() => {
    if (!selectedId) {
      console.warn('No account selected');
      return;
    }
    
    const account = accounts.find((acc) => acc.id === selectedId);
    if (!account) {
      console.error('Selected account not found');
      return;
    }
    
    dispatch({ type: "SET_ACCOUNT", payload: account });
    const nextRoute = state.skipPayeeSelect
      ? ROUTES.TRANSFER_DETAILS
      : ROUTES.PAYEE_SELECT;
    navigate(nextRoute, { replace: true });
  }, [selectedId, accounts, state.skipPayeeSelect, dispatch, navigate]);

  const handleAccountSelect = useCallback((accountId) => {
    if (!accountId) return;
    setSelectedId(accountId);
  }, []);

  const handleFilterChange = useCallback((item) => {
    if (!item?.id) return;
    setFilterType(item.id);
  }, []);

  // Loading state
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
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p>Loading accounts...</p>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
        }} />
      </div>
    );
  }

  // Error state
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
          <h2 style={{ color: '#dc3545', marginBottom: '16px' }}>Error Loading Accounts</h2>
          <p style={{ marginBottom: '24px', color: '#666' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
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

  // Mobile Design - Card-based with full screen
  if (isMobile) {
    return (
      <main
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          padding: "20px 16px",
        }}
      >
        <header
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>Select Your Account</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>
            Choose account to transfer from
          </p>
        </header>

        <HorizontalScroller
          items={accountFilters}
          selectedId={filterType}
          onSelect={handleFilterChange}
          title="Filter by Type"
        />

        <section>
        {filteredAccounts.map((account) => (
          <article
            key={account.id}
            onClick={() => handleAccountSelect(account.id)}
            style={{
              backgroundColor: selectedId === account.id ? "#e3f2fd" : "white",
              border:
                selectedId === account.id
                  ? "2px solid #007bff"
                  : "1px solid #e0e0e0",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #007bff",
                  backgroundColor:
                    selectedId === account.id ? "#007bff" : "white",
                  marginRight: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedId === account.id && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
                {account.name}
              </h3>
            </div>
            <div style={{ paddingLeft: "32px" }}>
              <p style={{ margin: "4px 0", color: "#666", fontSize: "14px" }}>
                Account: {account.number}
              </p>
              <p
                style={{
                  margin: "4px 0",
                  color: "#28a745",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                ₹{account.balance.toLocaleString()}
              </p>
            </div>
          </article>
        ))}
        </section>

        <footer>
        <button
          onClick={handleNext}
          disabled={!selectedId}
          style={{
            width: "100%",
            padding: "18px",
            backgroundColor: selectedId ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "20px",
            cursor: selectedId ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
        </footer>
      </main>
    );
  }

  // Web Design - Table-like layout with sidebar
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "300px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "40px 30px",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", fontSize: "28px" }}>
          Banking Portal
        </h2>
        <section
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
            Step 1 of 3
          </h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Select your account to begin the transfer process
          </p>
        </section>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{ fontSize: "32px", marginBottom: "40px", color: "#2c3e50" }}
          >
            Select Account
          </h1>

          <HorizontalScroller
            items={accountFilters}
            selectedId={filterType}
            onSelect={handleFilterChange}
            title="Filter Accounts"
          />

          <section
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <header
              style={{
                backgroundColor: "#34495e",
                color: "white",
                padding: "20px 30px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Available Accounts
            </header>

            {filteredAccounts.map((account, index) => (
              <article
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "25px 30px",
                  borderBottom:
                    index < filteredAccounts.length - 1
                      ? "1px solid #eee"
                      : "none",
                  backgroundColor:
                    selectedId === account.id ? "#f8f9fa" : "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="account"
                  value={account.id}
                  checked={selectedId === account.id}
                  onChange={() => {}}
                  style={{ marginRight: "20px", transform: "scale(1.2)" }}
                />
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "20px",
                      color: "#2c3e50",
                    }}
                  >
                    {account.name}
                  </h3>
                  <p
                    style={{ margin: "0", color: "#7f8c8d", fontSize: "16px" }}
                  >
                    Account: {account.number}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#27ae60",
                    }}
                  >
                    ₹{account.balance.toLocaleString()}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "#7f8c8d",
                      fontSize: "14px",
                    }}
                  >
                    Available Balance
                  </p>
                </div>
              </article>
            ))}
          </section>

          <footer style={{ marginTop: "30px", textAlign: "right" }}>
            <button
              onClick={handleNext}
              disabled={!selectedId}
              style={{
                padding: "15px 40px",
                backgroundColor: selectedId ? "#3498db" : "#bdc3c7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: selectedId ? "pointer" : "not-allowed",
                minWidth: "150px",
              }}
            >
              Next Step →
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AccountSelect;
