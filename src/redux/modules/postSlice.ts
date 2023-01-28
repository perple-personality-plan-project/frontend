import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';

//타입지정
type mainPostState = {
  mainFeedList: [];
  mainMbtiList: [];
  mainFeedDetail: object;
  isLoading: boolean;
  error: string | unknown;
};

//초기값설정
const initialState: mainPostState = {
  mainFeedList: [],
  mainMbtiList: [],
  mainFeedDetail: {},
  isLoading: false,
  error: null,
};

//thunk 함수

export const __mainFeedlist = createAsyncThunk<
  [],
  { userId: number | string | null }
>(
  'main/feedlist',

  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(
        `api/feed?user_id=${payload.userId}`,
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __mainMbtilist = createAsyncThunk<
  [],
  { mbtiCheck: string; userId: number | string | null }
>(
  'main/feedlist/mbti',

  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(
        `api/feed/search?mbti=${payload.mbtiCheck}&user_id=${payload.userId}`,
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __mainFeedDetail = createAsyncThunk<
  {},
  { feedId: number | string; userId: string | number | null }
>(
  'main/feedDetail',

  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(
        `/api/feed/${payload.feedId}?user_id=${payload.userId}`,
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

//리듀서
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(__mainFeedlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(__mainFeedlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainFeedList = action.payload;
      })
      .addCase(__mainFeedlist.rejected, state => {
        state.isLoading = false;
      })
      .addCase(__mainFeedDetail.pending, state => {
        state.isLoading = true;
      })
      .addCase(__mainFeedDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainFeedDetail = action.payload;
      })
      .addCase(__mainFeedDetail.rejected, state => {
        state.isLoading = false;
      })
      .addCase(__mainMbtilist.pending, state => {
        state.isLoading = true;
      })
      .addCase(__mainMbtilist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainMbtiList = action.payload;
      })
      .addCase(__mainMbtilist.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
