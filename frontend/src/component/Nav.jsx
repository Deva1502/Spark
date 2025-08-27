import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BsCameraReels } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]  ">
      <div>
        <IoMdHome className="text-3xl text-white cursor-pointer"  onClick={()=>navigate('/')}/>
      </div>
      <div>
        <FaSearch className="text-3xl text-white cursor-pointer"  onClick={()=>navigate('/search')}/>
      </div>
      <div>
        <BsCameraReels className="text-3xl text-white cursor-pointer"  onClick={()=>navigate('/reels')}/>
      </div>
      <div>
        <FaPlus className="text-3xl text-white cursor-pointer"  onClick={()=>navigate('/create')}/>
      </div>
      <div className="text-white w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={()=>{
        // navigate to profile page
        navigate(`/profile/${userData?.userName}`)
      }}>
        {/* profile photo will be in circular format */}
        <img
          src={userData.profileImage || dp}
          alt=""
          className="w-[50px] object-cover rounded-full "
        />
      </div>
    </div>
  );
};

export default Nav;
