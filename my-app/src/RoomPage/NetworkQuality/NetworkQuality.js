import React from "react";
// import "./styles.css";
import { useNetworkStatus } from "./useNetworkStatus";

export default function NetworkQuality() {
  const [online, status] = useNetworkStatus();
  return (
    <div className="NetworkQuality">
      {online ? (
        <div
          style={{
            backgroundColor: "limegreen",
            width: 90,
            height: 40,
            margin: "auto",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <p style={{fontSize:'12px',color:'white'}}>You are {status}</p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#FF0000",
            width: 90,
            margin: "auto",
            padding: 5,
            color: "white"
          }}
        >
          <p>You are {status}, try connecting your network</p>
        </div>
      )}
    </div>
  );
}
