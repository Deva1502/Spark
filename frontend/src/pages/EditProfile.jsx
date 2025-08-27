import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import axios from "axios"; // you also forgot to import this

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const ImageInput = useRef();

  const [frontendImage, setFrontendImage] = useState(userData?.profileImage || dp);
  const [backendImage, setBackendImage] = useState(userData?.profileImage || dp);
  const [name, setName] = useState(userData?.name || "");
  const [username, setUsername] = useState(userData?.userName || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const dispatch = useDispatch();

  // ✅ Redirect only inside useEffect
  useEffect(() => {
    if (!userData) {
      navigate("/login"); // example: if not logged in
    }
  }, [userData, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault(); // prevent form reload
    try {
      const formdata = new FormData();
      if (backendImage) formdata.append("profileImage", backendImage);
      formdata.append("name", name);
      formdata.append("userName", username); // ✅ fixed variable name
      formdata.append("bio", bio);
      formdata.append("profession", profession);
      formdata.append("gender", gender);

      const result = await axios.post(
        `${serverUrl}/api/user/editProfile`,
        formdata,
        { withCredentials: true }
      );

      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
      navigate(`/profile/${username}`); // ✅ navigate after saving
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <IoMdArrowRoundBack
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-white">Edit Profile</h1>
      </div>

      <div
        className=" w-[70px] h-[70px] md:h-[140px] md:w-[140px] border-2 border-black rounded-full cursor-pointer justify-center overflow-hidden"
        onClick={() => ImageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={ImageInput}
          hidden
          onChange={handleImage}
        />
        <img
          src={frontendImage}
          alt=""
          className="w-full object-cover rounded-full cursor-pointer"
        />
      </div>

      <div
        className="text-blue-400 cursor-pointer"
        onClick={() => ImageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      <form
        className="max-w-[600px] w-[90%] mx-auto p-4 bg-[#011010] rounded-2xl shadow-md"
        onSubmit={handleEditProfile}
      >
        <div className="space-y-4">
          <input
            type="text"
            className="h-[60px] w-full bg-[#011010] border-2 border-green-700 rounded-2xl text-white font-semibold px-4 outline-none"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            className="h-[60px] w-full bg-[#011010] border-2 border-green-700 rounded-2xl text-white font-semibold px-4 outline-none"
            placeholder="Enter Your UserName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            className="h-[60px] w-full bg-[#011010] border-2 border-green-700 rounded-2xl text-white font-semibold px-4 outline-none"
            placeholder="Enter Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <input
            type="text"
            className="h-[60px] w-full bg-[#011010] border-2 border-green-700 rounded-2xl text-white font-semibold px-4 outline-none"
            placeholder="Enter Your Profession"
            onChange={(e) => setProfession(e.target.value)}
            value={profession}
          />
          <input
            type="text"
            className="h-[60px] w-full bg-[#011010] border-2 border-green-700 rounded-2xl text-white font-semibold px-4 outline-none"
            placeholder="Enter Your Gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-2xl w-full mt-4 cursor-pointer"
          type="submit"
        >
          Save profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
