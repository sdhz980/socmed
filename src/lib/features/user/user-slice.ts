import { UserState } from "@/types/Global.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState : UserState = {
  feedPost: [],
  user: {
    id:0,
    name: '',
    profileImage: '',
    token: '',
    username:'',
  },
  loginSwitch: false,
  isFetchingFeed: false,
  isUserLoggedIn: false,
  loading: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addFeedPost: (state,action) => {
        state.feedPost = action.payload;
    },
    setUserStatus: (state,action) => {
      state.isUserLoggedIn = action.payload;
    },
    setFetchingStatus: (state,action) => {
      state.isFetchingFeed = action.payload;
    },
    setLoginSwitch: (state,action) => {
      state.loginSwitch = action.payload;
    },
    setLoading: (state,action) => {
      state.loading = action.payload;
    },
  },
});

export const { addUser , addFeedPost , setLoginSwitch , setUserStatus , setFetchingStatus , setLoading} = user.actions;
export default user.reducer;