import React from "react";
import logo from "../assets/logo.png";
import spark from "../assets/spark.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const SignUp = () => {
  const [clicked, setClicked] = useState({
    name: false,
    email: false,
    password: false,
    userName: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      // console.log(result.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white rounded-2xl flex justify-center flex-col items-center p-[10px]">
          <div className="flex gap-3 items-center text-2xl font-semibold mt-[40px]  ">
            <span>Sign up to</span>
            <img src={spark} alt="" className="w-[70px]" />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setClicked({ ...clicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                clicked.name ? "top-[-18px]" : ""
              }`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setClicked({ ...clicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                clicked.email ? "top-[-18px]" : ""
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
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setClicked({ ...clicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                clicked.userName ? "top-[-18px]" : ""
              }`}
            >
              Enter Your Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black "
            onClick={() => setClicked({ ...clicked, password: true })}
          >
            <label
              htmlFor="name"
              className={`absolute left-[10px] p-[5px] bg-white text-[15px] ${
                clicked.password ? "top-[-18px]" : ""
              }`}
            >
              Enter Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[100%] h-[100%] rounded-2xl outline-none border-0 pl-[10px] "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-[20px] cursor-pointer w-[25px] h-[25px]"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-[20px] cursor-pointer w-[25px] h-[25px]"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <button
            className="w-[70%] px-[10px] py-[10px] rounded-2xl mt-[30px] bg-[#1a1f23] text-white cursor-pointer font-semibold hover:bg-blue-500"
            onClick={handleSignUp}
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Sign Up"}
          </button>
          <div className="flex justify-center items-center gap-2 mt-[20px]">
            <span className="text-[15px] font-semibold">
              Already have an account?
            </span>
            <Link to="/signin">
              <span className="text-[15px] font-semibold text-blue-500 cursor-pointer">
                Sign In
              </span>
            </Link>
          </div>
        </div>
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#e86e0a] flex-col gap-[10px] text-white text-[20px] font-semibold shadow-2xl shadow-orange-300 rounded-xl  ">
          <img src={logo} alt="Logo of Social Media App" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
