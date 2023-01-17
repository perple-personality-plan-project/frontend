import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';

type groupState = {
  groupRank: [];
  groupDate: [];
  isLoading: boolean;
  error: string | unknown;
};

const initialState: groupState = {
  groupRank: [],
  groupDate: [],
  isLoading: false,
  error: null,
};

export const __groupGetRank = createAsyncThunk(
  'groupRank/get',
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(`/group?sort=rank`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __groupGetDate = createAsyncThunk(
  'groupDate/get',
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(`/group?sort=date`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

interface postPreset {
  group_name: string;
  thumbnail: string;
  description: string;
  hashtag: string;
}

export const __groupPost = createAsyncThunk<postPreset, object>(
  'groupRank/post',
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const { data } = await nonTokenClient.post(`/group`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(__groupGetRank.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupGetRank.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupRank = action.payload;
    });

    builder.addCase(__groupGetRank.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__groupGetDate.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupGetDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupDate = action.payload;
    });

    builder.addCase(__groupGetDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__groupPost.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupPost.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.groupDate = action.payload;
    });

    builder.addCase(__groupPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default groupSlice.reducer;
