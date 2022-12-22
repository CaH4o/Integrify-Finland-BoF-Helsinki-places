import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";

import { getDataThunk } from "../redux/places/placesSlice";
import Place from "../components/Place";

export function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(getDataThunk());
  }, []);

  return (
    <div>
      <header className="App-header">
        React Helsinki Places App - Extra assignment
      </header>
      <main>
        <Place />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
