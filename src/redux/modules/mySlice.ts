import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import loggedIn from '../../api/loggedIn';

type profileState = {
  profileInfo: [];
  maplist: [];
  myGroupList: [];
  myFeed: [];
  myPick: [];
  toGoList: [];
  myData: {};
  modalOpen: boolean;
  isLoading: boolean;
  error: string | unknown;
};

const initialState: profileState = {
  profileInfo: [],
  maplist: [],
  myGroupList: [],
  myFeed: [],
  myPick: [],
  toGoList: [],
  myData: {},
  modalOpen: false,
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
type MapId = {
  MapId: number;
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
export const __profilePic = createAsyncThunk<FeedPost, {}>(
  'profilePic',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.post(`api/user/update-profile`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __backgroundpic = createAsyncThunk<FeedPost, {}>(
  'backgroundpic',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.post(
        `api/user/update-background`,
        payload,
      );
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

export const __withdrawal = createAsyncThunk(
  'withdrawal',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.delete(`api/user/delete`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __myFeedDetail = createAsyncThunk(
  'myFeedDetail',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.get(
        `api/feed/:${payload}?user_id=user_id`,
      );
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
export const __togoDelete = createAsyncThunk<MapId, number>(
  'togoDelete',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.delete(`/api/map/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __Togo = createAsyncThunk(
  'letsGo',
  async (payload: any, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __modalOpen = createAsyncThunk(
  'modalOpen',
  async (payload: any, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);
export const __modalData = createAsyncThunk(
  'modalData',
  async (payload: any, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
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
    builder.addCase(__Togo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__Togo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.toGoList = action.payload;
    });
    builder.addCase(__Togo.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(__modalOpen.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__modalOpen.fulfilled, (state, action) => {
      state.isLoading = false;
      state.modalOpen = action.payload;
    });
    builder.addCase(__modalOpen.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(__modalData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(__modalData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myData = action.payload;
    });
    builder.addCase(__modalData.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default mySlice.reducer;
