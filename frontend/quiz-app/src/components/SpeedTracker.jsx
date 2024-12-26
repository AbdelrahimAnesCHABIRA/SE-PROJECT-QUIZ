import React from "react";

const SpeedTracker = ({ value }) => {
  if (value < 1 || value > 5) {
    return <p>Please provide a value between 1 and 5.</p>;
  }

  // Map value to color and remark
  const getColorAndRemark = (value) => {
    switch (parseInt(value)) {
      case 1:
        return { color: "red", remark: "Try harder next time" };
      case 2:
        return { color: "orange", remark: "Needs improvement" };
      case 3:
        return { color: "yellow", remark: "Acceptable" };
      case 4:
        return { color: "lightgreen", remark: "Good" };
      case 5:
        return { color: "green", remark: "Excellent" };
      default:
        return { color: "gray", remark: "Unknown" };
    }
  };

  const { color, remark } = getColorAndRemark(value);

  const circumference = 100; // For the circular arc
  const offset = ((5 - value) / 5) * circumference; // Adjust the arc based on value

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "inline-block" }}>
        <svg
          width={120}
          height={120}
          viewBox="0 0 36 36"
        >
          {/* Background Circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="2"
          />

          {/* Foreground Arc */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />

          {/* Center Text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fontWeight={'bold'}
            fill="#333"
          >
            {value}
          </text>
        </svg>
      </div>

      {/* Remark Text */}
      <p style={{ 
        marginTop: "12px", 
        fontSize: "21px", 
        fontWeight: "bold", 
        color: "blue" 
      }}>
        {remark}
      </p>
    </div>
  );
};

export default SpeedTracker;
