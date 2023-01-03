// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import client, { nonTokenClient } from '../../api/client';

// interface initialState {
//   postId: number;
//   posts: [];
//   isLoading: boolean;
// }

// const initialState: initialState = {
//   postId: 0,
//   posts: [],
//   isLoading: false,
// };

// export const __getPosts = createAsyncThunk(
//   'getPosts',
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await client.get(`/posts`);
//       return thunkAPI.fulfillWithValue(data.allPost);
//     } catch (e) {
//       thunkAPI.rejectWithValue(e);
//     }
//   },
// );

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

// const postsSlice = createSlice(
//   {
//   name: 'posts',
//   initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(__getPosts.pending, state => {
//         state.isLoading = true;
//       })
//       .addCase(__getPosts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state = action.payload;
//       })
//       .addCase(__getPosts.pending, state => {
//         state.isLoading = true;
//       });
//   },
// }
// );

export default {};
