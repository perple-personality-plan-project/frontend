import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import nonTokenClient from '../../api/noClient';
import loggedIn from '../../api/loggedIn';

type mapState = {
  MapPost: any;
  isLoading: boolean;
  error: string | unknown;
};

const initialState: mapState = {
  MapPost: [],
  isLoading: false,
  error: null,
};

type Cart = {
  place_name: string;
  address_name: string;
  x: number;
  y: number;
};

type RootMaker = {
  placeGroup: string;
  groupName: string;
};

export const __MoveCart = createAsyncThunk<Cart, {}>(
  'MoveCart',
  async (payload: any, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __RemoveItem = createAsyncThunk<Cart, {}>(
  'RemoveItem',
  async (payload: any, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const __RootMaker = createAsyncThunk<RootMaker, {}>(
  'RootMaker',
  async (payload, thunkAPI) => {
    try {
      const { data } = await loggedIn.post(`api/map`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const mapSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(__MoveCart.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__MoveCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.MapPost = [...state.MapPost, action.payload];
      if (state.MapPost.length > 6) {
        state.MapPost.shift();
        alert('최대 5개까지 저장 가능합니다.');
      }
    });

    builder.addCase(__MoveCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__RemoveItem.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(__RemoveItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.MapPost = state.MapPost.filter(
        (item: any) => item.place_name !== action.payload,
      );
    });

    builder.addCase(__RemoveItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default mapSlice.reducer;
