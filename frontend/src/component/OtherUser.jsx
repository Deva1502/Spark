// import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpg";

const OtherUser = ({ user }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/40 transition-colors duration-200 rounded-lg">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={() => navigate(`/profile/${user?.userName}`)}>
          <img
            src={user?.profileImage || dp}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border border-gray-700"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-400">
            {user?.userName}
          </div>
          <div className="text-lg font-semibold text-white">{user?.name}</div>
        </div>
      </div>

      {/* Optional Right Side Button (like Follow) */}
      <button className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium cursor-pointer text-white transition-colors">
        Follow
      </button>
    </div>
  );
};

export default OtherUser;
