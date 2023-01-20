import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';

type mainPostState = {
  mainFeedList: [];
  isLoading: boolean;
  error: string | unknown;
};

const initialState: mainPostState = {
  mainFeedList: [],
  isLoading: false,
  error: null,
};

export const __mainFeedlist = createAsyncThunk(
  'main/feedlist',

  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(`api/feed`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

// export const __addPost = createAsyncThunk(
//   'addPost',
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await client.post(`/posts`, payload);
//       return thunkAPI.fulfillWithValue(data.createdPost);
//     } catch (e) {
//       alert(`addPostError: ${e}`);
//     }
//   },
// );

// export const __deletePost = createAsyncThunk(
//   'deletePost',
//   async (payload, thunkAPI) => {
//     try {
//       await client.delete(`/posts/${payload}`);
//       return thunkAPI.fulfillWithValue(payload);
//     } catch (e) {
//       alert(`deletePostError: ${e}`);
//     }
//   },
// );

// export const __updatePost = createAsyncThunk(
//   'updatePost',
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await client.put(`/posts/${payload.id}`, payload.post);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       alert(`updatePostError: ${e}`);
//     }
//   },
// );

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
      });
  },
});

export default postSlice.reducer;
