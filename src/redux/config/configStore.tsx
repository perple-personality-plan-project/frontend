import { configureStore } from '@reduxjs/toolkit';
import groupSlice from '../modules/groupSlice';
import postSlice from '../modules/postSlice';
import mapSlice from '../modules/mapSlice';
import mySlice from '../modules/mySlice';

export const store = configureStore({
  reducer: {
    group: groupSlice,
    map: mapSlice,
    post: postSlice,
    mypage: mySlice,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// src/redux/modules/counterSlice.js
