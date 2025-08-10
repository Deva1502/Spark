import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp : false,
    newPassword : false,
    confirmPassword : false
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col justify-center items-center">
      {step == 1 && (
        <div className="w-[60%] lg:max-w-[50%] h-[500px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 flex-col border-[#1a1f23]">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-start w-[60%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                inputClicked.email ? "top-[-18px]" : ""
              }`}
            >
              Enter Your Email
            </label>
            <input
              type="text"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button className="w-[30%] px-[10px] py-[10px] rounded-2xl mt-[30px] bg-[#1a1f23] text-white cursor-pointer font-semibold hover:bg-blue-500">
            {loading ? <ClipLoader color="white" size={20} /> : "Send Otp"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="w-[60%] lg:max-w-[50%] h-[500px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 flex-col border-[#1a1f23]">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-start w-[60%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                inputClicked.otp ? "top-[-18px]" : ""
              }`}
            >
              Enter Otp
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setOtp(e.target.value)} value={otp}
            />
          </div>
          <button className="w-[30%] px-[10px] py-[10px] rounded-2xl mt-[30px] bg-[#1a1f23] text-white cursor-pointer font-semibold hover:bg-blue-500">
            {loading ? <ClipLoader color="white" size={20} /> : "Submit"}
          </button>
        </div>
      )}

      {
        step==3 && <div className="w-[60%] lg:max-w-[50%] h-[500px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 flex-col border-[#1a1f23]">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <div
            className="relative flex items-center justify-start w-[60%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}
          >
            <label
              htmlFor="newPassword"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                inputClicked.newPassword ? "top-[-18px]" : ""
              }`}
            >
              Enter newPassword
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[60%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setInputClicked({ ...inputClicked, confirmPassword: true })}
          >
            <label
              htmlFor="confirmPassword"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                inputClicked.confirmPassword ? "top-[-18px]" : ""
              }`}
            >
              confirm new Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
            />
          </div>
          <button className="w-[30%] px-[10px] py-[10px] rounded-2xl mt-[30px] bg-[#1a1f23] text-white cursor-pointer font-semibold hover:bg-blue-500">
            {loading ? <ClipLoader color="white" size={20} /> : "Reset Password"}
          </button>
        
        </div>
      }
    </div>
  );
};

export default ForgotPassword;
