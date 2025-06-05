import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../App";

const PendingApplication = () => {
  const navigate = useNavigate();
  const [showCongrats, setShowCongrats] = useState(false);

useEffect(() => {
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  const timer = setTimeout(async () => {
    setShowCongrats(true);

    // ✅ Call API to set affiliator = true
    if (localUser?.email) {
      try {
        await fetch(`${API}/api/affiliate/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: localUser.email }),
        });
      } catch (err) {
        console.error("Failed to update affiliate status:", err);
      }
    }

    setTimeout(() => {
      if (localUser?.name && localUser?.email) {
        const updatedUser = { ...localUser, affiliate: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        const { affiliate, ...rest } = localUser;
        localStorage.setItem("user", JSON.stringify(rest));
      }

      if (localUser?.isNewUser) {
        window.location.href = "/verifyemail?affiliate=true";
      } else {
        window.location.href = "/affiliate-dashboard";
      }
    }, 3000);
  }, 20000);

  return () => clearTimeout(timer);
}, []);




  return (
    <div className="pending-container text-center">
      {!showCongrats ? (
        <>
          <div className="magnifier-orbit">
            <div className="magnifier">
              <i className="bi bi-search"></i>
            </div>
          </div>

          <div className="loading-dots mt-3">
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>

          <h2 className="mt-4">Processing Your Application</h2>
          <p className="">Hang tight! We’re reviewing your details 🚀</p>
        </>
      ) : (
        <div className="congrats-animation">
          <i className="bi bi-check-circle-fill check-icon"></i>
          <h2 className="text-success mt-3">Congrats! You are accepted</h2>
        </div>
      )}

      <style>{`
        .pending-container {
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .magnifier-orbit {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          position: relative;
          animation: orbit 3s linear infinite;
        }

        .magnifier {
          font-size: 40px;
          color: #0d6efd;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .loading-dots span {
          font-size: 30px;
          animation: dotFlashing 1.2s infinite;
          margin: 0 2px;
        }
        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        .loading-dots span:nth-child(4) {
          animation-delay: 0.6s;
        }
        .loading-dots span:nth-child(5) {
          animation-delay: 0.8s;
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dotFlashing {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }

        .congrats-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s ease-in-out forwards;
        }

        .check-icon {
          font-size: 60px;
          color: #28a745;
          animation: popIn 0.8s ease-in-out;
        }

        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PendingApplication;
