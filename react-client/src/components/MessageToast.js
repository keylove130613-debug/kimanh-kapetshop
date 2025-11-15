// MessageToast.js
import React from "react";

export default function MessageToast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        padding: "20px 32px",
        borderRadius: 12,
        color: "white",
        cursor: "pointer",
        fontSize: "1.5rem",
        fontWeight: "500",
        boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
        backgroundColor: message.type === "error" ? "#f56565" : "#48bb78",
      }}
      onClick={onClose}
    >
      {message.text} 
    </div>
  );
}
