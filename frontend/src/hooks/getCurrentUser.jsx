import axios from 'axios';
import React, { use, useEffect } from 'react'
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const getCurrentUser = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        // if(!userData) return null
        const response = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
        // const data = await response.json();
        // console.log(data);
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error(error);
      }

    }
    fetchUser();
  },[userData])
}

export default getCurrentUser
