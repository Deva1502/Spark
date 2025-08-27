import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.jpg";
import Nav from "../component/Nav";

const Profile = () => {
  const { userName } = useParams();
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData } = useSelector((state) => state.user);
  console.log(profileData);
  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      console.log("resss", result.data);
      dispatch(setProfileData(result.data)); // <-- Add this line
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {}
  };
  return (
    <div className=" w-full min-h-screen bg-black">
      <div className=" w-full h-[80px] flex justify-between items-center px-[30px]">
        <div>
          <IoMdArrowRoundBack
            className="text-white w-[25px] h-[25px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="text-white font-semibold text-[25px]">
          {profileData?.userName}
        </div>
        <div
          className="text-blue-500 font-semibold cursor-pointer text-[20px]"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <div className="w-full h-[150px]  flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[70px] h-[70px] md:h-[140px] md:w-[140px] border-2 border-black rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={userData.profileImage || dp}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-white font-semibold">
          <div className="text-3xl font-bold">{profileData?.name}</div>
          <div className="text-gray-400">{profileData?.userName}</div>
          <div>{profileData?.profession}</div>
          <div>{profileData?.bio}</div>
        </div>
      </div>

      {/* //followers */}
      <div className="w-full h-[100px] flex items-center gap-[40px] md:gap-[60px] px-[20%] pt-[20px] text-white rounded-lg shadow-lg justify-center">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">
            {profileData?.posts.length ?? 0}
          </div>
          <div className="text-sm text-gray-400">Posts</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">
            {profileData?.followers.length ?? 0}
          </div>
          <div className="text-sm text-gray-400">Followers</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">
            {profileData?.following.length ?? 0}
          </div>
          <div className="text-sm text-gray-400">Following</div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center gap-[40px] md:gap-[60px] px-[20%] pt-[20px] text-white rounded-lg shadow-lg justify-center">
        {profileData?._id == userData._id && (
          <button
            className=" cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}

        {profileData?._id != userData._id && (
          <>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Follow
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded">
              Message
            </button>
          </>
        )}
      </div>

      <div className="w-full min-h-[100vh] flex justify-center">
        <div className=" w-full max-w-[900px] flex flex-col items-center rounded-t-2xl bg-white relative gap-[30px] pt-[20px]">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
