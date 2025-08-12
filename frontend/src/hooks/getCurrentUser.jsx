import axios from 'axios';
import React, { useEffect } from 'react'
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const getCurrentUser = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
        // const data = await response.json();
        // console.log(data);
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error(error);
      }

    }
    fetchUser();
  },[])
}

export default getCurrentUser
