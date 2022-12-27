import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { IResponse, IPlacesState, ITag, IPlace } from "../../types/placesTypes";

const url: string = "/v2/places/";

export async function getData() {
  const response = await axios.get(url);

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
  present: [],
  tags: { none: "choose a tag" },
  count: 0,
  filters: {
    tagID: "none",
  },
};

const placesSlicer: Slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateFilterTag: function (
      state: IPlacesState,
      action: PayloadAction<string>
    ) {
      state.filters.tagID = action.payload;
    },
    updatePresent: function (state: IPlacesState) {
      state.present = state.places.filter(function (p: IPlace) {
        const tagsID: string[] = [];
        p.tags.forEach(function (t: ITag) {
          tagsID.push(t.id);
        });

        return tagsID.includes(state.filters.tagID);
      });
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(
        getDataThunk.fulfilled,
        function (state: IPlacesState, action: PayloadAction<IResponse>) {
          state.count = Number(action.payload.meta.count);
          state.places = action.payload.data;
          state.tags = { ...state.tags, ...action.payload.tags };
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
export const { updateFilterTag, updatePresent } = placesSlicer.actions;
