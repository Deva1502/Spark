import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";
import { serverUrl } from "../App";

const useSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/user/suggested`,
          { withCredentials: true }
        );
        dispatch(setSuggestedUsers(data));
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useSuggestedUsers;
