import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IResource, dataState } from "../../types/placesTypes";

const page: number = 10;
//const url: string = `https://hauki.api.hel.fi/v1/resource/?format=json&page=${page}`;
const url: string = `https://hauki.api.hel.fi/v1/resource/?format=json&page=${page}`;

export async function getData() {
  const response = await axios.get(url);

  console.log(response.data);
  if (response.status < 400) {
    return response.data;
    console.log(response.data)

  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}

export const getDataThunk = createAsyncThunk("getData", getData);

const initialState: dataState = {
  loading: false,
  error: false,
  data: [],
};

const dataSlicer: Slice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(
        getDataThunk.fulfilled,
        function (state: dataState, action: PayloadAction<IResource>) {
          state.data.push(action.payload);
        }
      )
      .addCase(getDataThunk.rejected, function (state: dataState) {
        state.error = true;
        state.loading = false;
      })
      .addCase(getDataThunk.pending, function (state: dataState) {
        state.loading = true;
      });
  },
});

export const dataReducer = dataSlicer.reducer;
