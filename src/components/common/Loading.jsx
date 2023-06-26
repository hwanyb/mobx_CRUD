import React from "react";

import "../../styles/loading.css";

export default function Loading() {
  return (
    <div className="loadingBase">
      <div className="loadingWrapper">
        <svg
          className="cloud"
          width="50"
          viewBox="0 0 180 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M146.571 132H33.4286V131.923C15.0003 130.71 0.428558 115.378 0.428558 96.6429C0.428558 79.0045 13.3442 64.3828 30.2339 61.7191C29.2416 57.8108 28.7143 53.717 28.7143 49.5C28.7143 22.1619 50.8762 0 78.2143 0C100.311 0 119.027 14.479 125.39 34.4672C128.351 33.5145 131.508 33 134.786 33C151.709 33 165.429 46.7193 165.429 63.6429C165.429 66.2767 165.096 68.8328 164.471 71.2718C173.558 77.1497 179.571 87.3726 179.571 99C179.571 117.225 164.797 132 146.571 132Z"
            stroke="#1B3370"
            strokeWidth={3}
            strokeDasharray={630}
          />
        </svg>
        <div className="dots">
          <svg width="2.6" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#1B3370" className="dot1" />
          </svg>
          <svg width="2.6" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#1B3370" className="dot2" />
          </svg>
          <svg width="2.6" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#1B3370" className="dot3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
