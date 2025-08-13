import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import spark from "../assets/logo.png";
import StoryCard from "./StoryCard";

const Feed = () => {
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className=" w-full flex justify-between items-center p-[20px] lg:hidden">
        <img src={spark} alt="" className="w-[80px]" />
        <div>
          <IoIosNotificationsOutline className="text-4xl text-white h-[35px]" />
        </div>
      </div>

      {/* story card */}
      <div className = 'flex w-full overflow-auto gap-[20px] p-[20px]'>
        <StoryCard userName="user1"/>
        <StoryCard userName="user2"/>
        <StoryCard userName="user3"/>
        <StoryCard userName="user4"/>
        <StoryCard userName="user5"/>
        <StoryCard userName="user6"/>
        <StoryCard userName="user7"/>
        <StoryCard userName="user8"/>
        <StoryCard userName="user9"/>
        <StoryCard userName="user10"/>
      </div>

      {/* post area */}
       
    </div>
  );
};

export default Feed;
