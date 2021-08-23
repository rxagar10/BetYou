import './App.scss';
import React from 'react';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

const recOptions = {
  MOVIE: "Movie",
  TVSHOW: "TVShow",
  REST: "Restaurant",
  BOOK: "Book",
  GAME: "Games",
  MUSIC: "Music",
  OTHER: "Other",
}

export { recOptions }


export default App;
