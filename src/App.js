import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=ecad1774";

const App = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleClickSearch = (title) => {
    searchMovies(title);
  };
  const handleEnterKey = (e)=>{
    if(e.key === 'Enter'){
        searchMovies(e.target.value);
    }
  }

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MoviesCookies</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search Movies"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
        />
        <img src={SearchIcon} alt="search" onClick={()=>handleClickSearch(input)} />
      </div>
      {movies.length > 0
        ? <div className="container">
            {movies.map((item, index) => <MovieCard movie={item} />)}
        </div>
        : "No Movies related"}
    </div>
  );
};

export default App;
