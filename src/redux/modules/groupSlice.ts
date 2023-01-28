import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import loggedIn from '../../api/loggedIn';
import nonTokenClient from '../../api/noClient';

type groupState = {
  groupRank: [];
  groupDate: [];
  groupFeedList: [];
  groupSubscribe: {
    admin_flag?: number;
    created_at?: string;
    group_id?: number;
    group_user_id?: number;
    updated_at?: string;
    user_id?: number;
  };
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
      const { data } = await nonTokenClient.get(`api/group?sort=rank`);
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
      const { data } = await nonTokenClient.get(`api/group?sort=date`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __groupSubscribeCheck = createAsyncThunk<
  {},
  { id: string | undefined }
>('group/subscribeCheck', async (payload, thunkAPI) => {
  try {
    const { data } = await loggedIn.get(`api/group/${payload.id}`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const __groupFeedList = createAsyncThunk<
  [],
  { id: string | undefined; userId: string | number | null }
>('group/feedlist', async (payload, thunkAPI) => {
  try {
    const { data } = await nonTokenClient.get(
      `api/group/${payload.id}/feed?user_id=${payload.userId}`,
    );
    return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const __groupFeedDetail = createAsyncThunk<
  [],
  { groupId: any; feedId: number }
>('group/feedlist/detail', async (payload, thunkAPI) => {
  try {
    const { data } = await nonTokenClient.get(
      `api/group/${payload.groupId}/feed/${payload.feedId}`,
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
      const { data } = await nonTokenClient.post(`api/group`, payload);
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
