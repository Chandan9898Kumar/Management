export const getTransferStyles = (isMobile) => ({
  container: {
    padding: isMobile ? "16px" : "40px",
    maxWidth: isMobile ? "100%" : "800px",
    margin: isMobile ? "0" : "0 auto",
    backgroundColor: isMobile ? "#f8f9fa" : "#ffffff",
    minHeight: isMobile ? "100vh" : "auto",
  },

  successIcon: {
    fontSize: isMobile ? "48px" : "64px",
    color: "#28a745",
    marginBottom: isMobile ? "16px" : "24px",
  },

  title: {
    fontSize: isMobile ? "24px" : "32px",
    color: "#28a745",
    marginBottom: isMobile ? "20px" : "30px",
    fontWeight: "600",
  },

  detailsCard: {
    border: "1px solid #28a745",
    padding: isMobile ? "16px" : "24px",
    marginBottom: isMobile ? "16px" : "24px",
    backgroundColor: isMobile ? "#ffffff" : "#f8fff9",
    borderRadius: isMobile ? "12px" : "8px",
    boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
  },

  detailsTitle: {
    fontSize: isMobile ? "18px" : "20px",
    marginBottom: isMobile ? "12px" : "16px",
    fontWeight: "600",
  },

  detailRow: {
    marginBottom: isMobile ? "8px" : "12px",
    fontSize: isMobile ? "14px" : "16px",
    display: isMobile ? "flex" : "block",
    justifyContent: isMobile ? "space-between" : "flex-start",
    alignItems: isMobile ? "center" : "flex-start",
  },

  notificationCard: {
    marginBottom: isMobile ? "20px" : "24px",
    padding: isMobile ? "12px" : "16px",
    backgroundColor: "#e7f3ff",
    border: "1px solid #b3d9ff",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "14px" : "16px",
  },

  button: {
    padding: isMobile ? "16px 24px" : "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: "600",
    width: isMobile ? "100%" : "auto",
    cursor: "pointer",
  },
});