import { configureStore } from '@reduxjs/toolkit';
import groupSlice from '../modules/groupSlice';
import postSlice from '../modules/postSlice';
export const store = configureStore({
  reducer: {
    group: groupSlice,
    post: postSlice,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
