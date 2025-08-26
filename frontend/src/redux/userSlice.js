import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    //ye batata hai ki initially kya value hamne rakhi thi
    userData: null,
    suggestedUsers: null,
  },
  reducers: {
    // This is a reducer function in Redux, specifically designed to update the userData state property.

    // When dispatched, it sets the userData state to the value passed in the action.payload.
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
  },
});

export const { setUserData, setSuggestedUsers } = userSlice.actions;
export default userSlice.reducer;
