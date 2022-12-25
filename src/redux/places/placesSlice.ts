import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IResponse, IPlacesState } from "../../types/placesTypes";

const url: string = "/v2/places/";

export async function getData() {
  const response = await axios.get(url)

  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}

export const getDataThunk = createAsyncThunk("getData", getData);

const initialState: IPlacesState = {
  loading: false,
  error: false,
  places: [],
  tags: [],
  count: 0,
};

const placesSlicer: Slice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(
        getDataThunk.fulfilled,
        function (state: IPlacesState, action: PayloadAction<IResponse>) {
          state.count = Number(action.payload.meta.count);
          state.places = action.payload.data;
          state.tags = action.payload.tags;
          state.loading = false;
        }
      )
      .addCase(getDataThunk.rejected, function (state: IPlacesState) {
        state.error = true;
        state.loading = false;
      })
      .addCase(getDataThunk.pending, function (state: IPlacesState) {
        state.loading = true;
      });
  },
});

export const placesReducer = placesSlicer.reducer;
