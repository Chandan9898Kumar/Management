export const getGlobalStyles = (isMobile) => ({
  // Common button styles
  primaryButton: {
    padding: isMobile ? "16px 24px" : "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: "600",
    cursor: "pointer",
    width: isMobile ? "100%" : "auto",
  },

  secondaryButton: {
    padding: isMobile ? "16px 24px" : "12px 24px",
    backgroundColor: "transparent",
    color: "#007bff",
    border: "1px solid #007bff",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: "600",
    cursor: "pointer",
    width: isMobile ? "100%" : "auto",
  },

  // Common card styles
  card: {
    border: "1px solid #ddd",
    borderRadius: isMobile ? "12px" : "8px",
    padding: isMobile ? "16px" : "20px",
    backgroundColor: "#ffffff",
    boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: isMobile ? "16px" : "20px",
  },

  // Common input styles
  input: {
    width: "100%",
    padding: isMobile ? "16px" : "12px",
    border: "1px solid #ddd",
    borderRadius: isMobile ? "8px" : "4px",
    fontSize: isMobile ? "16px" : "14px",
    boxSizing: "border-box",
  },

  // Common container styles
  container: {
    padding: isMobile ? "16px" : "24px",
    maxWidth: isMobile ? "100%" : "800px",
    margin: isMobile ? "0" : "0 auto",
    backgroundColor: isMobile ? "#f8f9fa" : "#ffffff",
    minHeight: isMobile ? "100vh" : "auto",
  },

  // Typography
  title: {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "600",
    marginBottom: isMobile ? "16px" : "24px",
    color: "#333",
  },

  subtitle: {
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: "600",
    marginBottom: isMobile ? "12px" : "16px",
    color: "#333",
  },

  text: {
    fontSize: isMobile ? "14px" : "16px",
    color: "#666",
    lineHeight: "1.5",
  },
});