import { configureStore } from '@reduxjs/toolkit';
import groupSlice from '../modules/groupSlice';
// ...

export const store = configureStore({
  reducer: {
    group: groupSlice,
    // comments: commentsReducer,
    // users: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
