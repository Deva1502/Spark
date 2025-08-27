import React from "react";

import spark from "../assets/logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import dp from "../assets/dp.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import OtherUser from "./OtherUser";
import { useNavigate } from "react-router-dom";

const LeftHome = () => {
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async()=>{
    try {
        const res  = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
        dispatch(setUserData(null))
    } catch (error) {
        
    }
  }
  return (
    <div className="w-[30%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-500">
      <div className=" w-full flex justify-between items-center p-[20px]">
        <img src={spark} alt="" className="w-[80px]" />
        <div>
          <IoIosNotificationsOutline className="text-4xl text-white h-[35px]" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-[10px] px-[20px] border-b-2 border-b-gray-900 py-2">
        <div className="flex items-center gap-[10px] p-[20px] ">
          <div>
            {/* profile photo will be in circular format */}
            <img
              src={userData.profileImage || dp}
              alt=""
              className="w-[50px] object-cover rounded-full cursor-pointer " onClick={() => navigate(`/profile/${userData?.userName}`)}
            />
          </div>
          <div>
            <div className="font-bold text-xl text-gray-400">
              {userData.userName}
            </div>
            <div className="font-bold text-2xl text-white">{userData.name}</div>
          </div>
        </div>
        <div className="text-blue-500 font-semibold cursor-pointer" onClick={handleLogout}>LogOut</div>
      </div>
      <div className="w-full p-[20px] gap-[20px] flex flex-col">
        <h1 className="text-2xl font-bold text-white">Suggested Users</h1>
        {
          suggestedUsers&&suggestedUsers.slice(0,3).map((user,index)=>(
            <OtherUser key={index} user={user}/>
          ))
        }
      </div>
    </div>
  );
};

export default LeftHome;
