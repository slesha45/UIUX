import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const ForgotPassword = () => {
  const [stage, setStage] = useState(2); // Start from Stage 2
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNextStage = () => {
    if (stage < 3) setStage(stage + 1);
  };

  const handlePreviousStage = () => {
    if (stage > 2) setStage(stage - 1);
  };

  return (
    <>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {/* Stage 2: Enter OTP */}
        {stage === 2 && (
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the OTP sent to your registered contact
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border w-full px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNextStage}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-2"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Stage 3: Reset Password */}
        {stage === 3 && (
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter your new password
            </p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border w-full px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="border w-full px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => alert("Password successfully changed!")}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-2"
            >
              Reset Password
            </button>
            <button
              onClick={handlePreviousStage}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
