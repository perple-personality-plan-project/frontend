// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import client, { nonTokenClient } from '../../api/client';

// const initialState = {
//   postId: null,
//   posts: [],
//   isLoading: false,
//   isIdDuplicated: true,
// };

// export const __signIn = createAsyncThunk(
//   'signin',
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await nonTokenClient.post('/users/login', payload);
//       localStorage.setItem('accessToken', data.token);
//       localStorage.setItem('userId', data.userId);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       alert('회원정보가 없습니다!');
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const __signUp = createAsyncThunk(
//   'signUp',
//   async (payload, thunkAPI) => {
//     try {
//       await nonTokenClient.post('/users/signup', payload);
//       return alert('회원가입이 완료되었습니다');
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const __idCheck = createAsyncThunk(
//   'idCheck',
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await nonTokenClient.get(
//         `/users/signup/emailNnickname?email=${payload.email}&nickname=${''}`,
//       );
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(__idCheck.pending, state => {
//         state.isLoading = true;
//       })
//       .addCase(__idCheck.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isIdDuplicated = false;
//       })
//       .addCase(__idCheck.pending, state => {
//         state.isLoading = true;
//       });
//   },
// });

export default {};
