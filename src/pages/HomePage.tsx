import { useEffect, ChangeEvent } from "react";

import { IPlacesState, tTag } from "../types/placesTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getDataThunk,
  updateFilterTag,
  updatePresent,
} from "../redux/places/placesSlice";
import Place from "../components/Place";

export function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const placesState: IPlacesState = useAppSelector(function (state) {
    return state.places;
  });
  const count: string = (
    placesState.present.length ? placesState.present.length.toString() : "0"
  )
    .concat("/")
    .concat(placesState.count.toString());
  const tags: tTag = placesState.tags;

  useEffect(function () {
    dispatch(getDataThunk());
  }, []);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(updateFilterTag(event.target.value));
    dispatch(updatePresent(null));
  }

  return (
    <div>
      <header className="App-header">
        <h4>React Helsinki Places App - Extra assignment</h4>
        <p>{count}</p>
        <label>Choose tag:</label>
        <select name="tags" id="tags" onChange={handleChange}>
          {Object.keys(tags).map((key) => {
            return (
              <option key={key} value={key}>
                {tags[key]}
              </option>
            );
          })}
        </select>
      </header>
      <main>
        <Place />
      </main>
      <footer>
        <div>&copy; Copyright, Integrify, OTI, Dec 2022</div>
      </footer>
    </div>
  );
}
