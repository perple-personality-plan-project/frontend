import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';
import loggedIn from '../../api/loggedIn';
import { type } from 'os';

type profileState = {
  profileInfo: [];
  maplist: [];
  myGroupList: [];
  myFeed: [];
  myPick: [];
  isLoading: boolean;
  error: string | unknown;
};

const initialState: profileState = {
  profileInfo: [],
  maplist: [],
  myGroupList: [],
  myFeed: [],
  myPick: [],
  isLoading: false,
  error: null,
};

type patchProfile = {
  nickname: string;
  mbti: string;
};

type FeedPost = {
  thumbnail: string;
  description: string;
  location: number;
};

export const __getMap = createAsyncThunk(
  'getmap',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(`api/map`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __getMyProfile = createAsyncThunk(
  'getMyProfile',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(`api/user/mypage`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __getPicked = createAsyncThunk(
  'getPicked',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(`/api/user/my-pick`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __updateProfile = createAsyncThunk<patchProfile, {}>(
  'updateProfile',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.patch(`api/user/edit`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __FeedPost = createAsyncThunk<FeedPost, {}>(
  'FeedPost',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.post(`api/feed`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __myGroupList = createAsyncThunk(
  'myGroupList',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(`api/user/my-group-list`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __myFeed = createAsyncThunk(
  'myFeed',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(`api/user/my-feed`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(__getMap.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__getMap.fulfilled, (state, action) => {
      state.isLoading = false;
      state.maplist = action.payload;
    });
    builder.addCase(__getMap.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(__getMyProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__getMyProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profileInfo = action.payload;
    });
    builder.addCase(__getMyProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(__myGroupList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__myGroupList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myGroupList = action.payload;
    });
    builder.addCase(__myGroupList.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(__myFeed.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__myFeed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myFeed = action.payload;
    });
    builder.addCase(__myFeed.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(__getPicked.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__getPicked.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myPick = action.payload;
    });
    builder.addCase(__getPicked.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default mySlice.reducer;