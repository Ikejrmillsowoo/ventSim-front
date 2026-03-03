import React from "react";
import "./componentStyle.css";        

export default function LoadingGraphic() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}