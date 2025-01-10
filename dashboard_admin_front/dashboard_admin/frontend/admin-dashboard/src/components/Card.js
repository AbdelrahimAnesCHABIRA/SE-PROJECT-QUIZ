import React from "react";
import "../styles/Card.css";

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <i className={`fa ${icon}`}></i>
        </div>
        <div className="card-value">{value}</div>
      </div>
      <div className="card-text">{title}</div>
    </div>
  );
};

export default Card;
