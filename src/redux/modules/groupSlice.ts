import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';

type groupState = {
  groupRank: [];
  groupDate: [];
  groupFeedList: [];
  groupSubscribe: object;
  groupFeedDetail: object;
  isLoading: boolean;
  error: string | unknown;
};

const initialState: groupState = {
  groupRank: [],
  groupDate: [],
  groupSubscribe: {},
  groupFeedList: [],
  groupFeedDetail: {},
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

interface subscribePreset {
  id: number;
}

export const __groupSubscribeCheck = createAsyncThunk<
  {},
  { id: string | undefined }
>('group/subscribeCheck', async (payload, thunkAPI) => {
  try {
    const { data } = await nonTokenClient.get(`/group/${payload.id}`);
    console.log(data);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const __groupFeedList = createAsyncThunk<[], { id: string | undefined }>(
  'group/feedlist',
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(`/group/${payload.id}/feed`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __groupFeedDetail = createAsyncThunk<
  [],
  { groupId: any; feedId: number }
>('group/feedlist/detail', async (payload, thunkAPI) => {
  try {
    const { data } = await nonTokenClient.get(
      `/group/${payload.groupId.id}/feed/${payload.feedId}`,
    );
    return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

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

    builder.addCase(__groupSubscribeCheck.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupSubscribeCheck.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupSubscribe = action.payload;
    });

    builder.addCase(__groupSubscribeCheck.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__groupFeedList.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupFeedList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupFeedList = action.payload;
    });

    builder.addCase(__groupFeedList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__groupFeedDetail.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__groupFeedDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupFeedDetail = action.payload;
    });

    builder.addCase(__groupFeedDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // builder.addCase(__groupPost.pending, state => {
    //   state.isLoading = true;
    // });

    // builder.addCase(__groupPost.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   //   state.groupDate = action.payload;
    // });

    // builder.addCase(__groupPost.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export default groupSlice.reducer;
