import React from "react";
import "../App.css";

const Welcome = () => {
  return (
    <div className="welcome-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)"
    }}>
      <img
        src="/tms.png"
        alt="Team Management System Logo"
        className="tms-logo"
        style={{ width: "180px", marginBottom: "2rem" }}
      />
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b" }}>
        Welcome to Team Management System (TMS)
      </h1>
      <p style={{ maxWidth: "500px", textAlign: "center", color: "#334155", margin: "1.5rem 0" }}>
        TMS streamlines team collaboration, task management, and performance tracking. Real-time communication, role assignment, document sharing, and dashboards help your team stay productive, transparent, and accountable.
      </p>
      <a href="/login">
        <button style={{
          padding: "0.75rem 2rem",
          fontSize: "1.1rem",
          background: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(99,102,241,0.15)"
        }}>
          Get Started
        </button>
      </a>
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .tms-logo {
          animation: zoomIn 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 4px 24px rgba(99,102,241,0.10);
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
