import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useTransfer } from "./TransferContext";
import { useDeviceType } from "./hooks/useDeviceType";
import { getTransferStyles } from "./styles/transferStyles";
import ROUTES from "./routes";

function TransferSuccess() {
  const { state, dispatch } = useTransfer();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const styles = getTransferStyles(isMobile);

  // Security check - validate session
  const isValidSession = () => {
    const sessionToken = sessionStorage.getItem("transferSession");
    const timestamp = sessionStorage.getItem("transferTimestamp");

    if (!sessionToken || !timestamp || sessionToken !== state.sessionToken) {
      return false;
    }

    
    // Session expires after 5 minutes
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - parseInt(timestamp) < fiveMinutes;
  };

  useEffect(() => {
    if (!isValidSession()) {
      navigate('/transfer/', { replace: true });
      return;
    }

    // Block back navigation
    const handlePopState = () => {
      navigate('/transfer/', { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    // Auto cleanup after 30 seconds
    const cleanup = setTimeout(() => {
      sessionStorage.removeItem("transferSession");
      sessionStorage.removeItem("transferTimestamp");
      dispatch({ type: "RESET" });
    }, 30000);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearTimeout(cleanup);
    };
  }, [navigate, dispatch, state.sessionToken]);

  const handleNewTransfer = () => {
    // Clean up session data
    sessionStorage.removeItem("transferSession");
    sessionStorage.removeItem("transferTimestamp");
    dispatch({ type: "RESET" });
    
    // Navigate to account selection page
    navigate("/transfer/", { replace: true });
  };

  const getTransactionData = () => {
    const storedData = sessionStorage.getItem('transferData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {
      transactionId: `TXN${Date.now().toString().slice(-8)}`,
      status: 'SUCCESS',
      timestamp: new Date().toISOString()
    };
  };

  const transactionData = getTransactionData();

  if (!isValidSession()) {
    return <Navigate to="/transfer/" replace />;
  }

  return (
    <main style={{ ...styles.container, textAlign: "center" }}>
      <header style={styles.successIcon}>
        ✅
      </header>

      <h2 style={styles.title}>Transfer Successful!</h2>

      <section style={{
        ...styles.detailsCard,
        contentVisibility: "auto",
        containIntrinsicSize: "1px 300px"
      }}>
        <h3 style={styles.detailsTitle}>Transaction Details</h3>
        <div style={styles.detailRow}>
          <strong>Transaction ID:</strong> 
          <span>{transactionData.transactionId}</span>
        </div>
        <div style={styles.detailRow}>
          <strong>Amount:</strong> 
          <span>₹{parseFloat(state.transferDetails?.amount || 0).toLocaleString()}</span>
        </div>
        <div style={styles.detailRow}>
          <strong>From:</strong> 
          <span>{state.selectedAccount?.name}</span>
        </div>
        <div style={styles.detailRow}>
          <strong>To:</strong> 
          <span>{state.selectedPayee?.name}</span>
        </div>
        <div style={styles.detailRow}>
          <strong>Reference:</strong> 
          <span>{state.transferDetails?.reference}</span>
        </div>
        <div style={styles.detailRow}>
          <strong>Date:</strong> 
          <span>{new Date().toLocaleString()}</span>
        </div>
      </section>

      <aside style={styles.notificationCard}>
        <p>
          📧 A confirmation email has been sent to your registered email address.
        </p>
        <p>📱 SMS notification sent to your registered mobile number.</p>
      </aside>

      <footer>
        <button onClick={handleNewTransfer} style={styles.button}>
          Make Another Transfer
        </button>
      </footer>
    </main>
  );
}

export default TransferSuccess;
