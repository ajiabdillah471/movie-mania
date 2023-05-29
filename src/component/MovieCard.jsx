import React from "react";

const MovieCard = ({ film, select }) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <div
      className="p-2 w-56 mb-2 ml-2 bg-stone-950"
      onClick={() => {
        select(film);
      }}
    >
      {film.poster_path ? <img src={`${imgUrl}${film.poster_path}`} /> : null}
      <h1 className="font-bold text-white text-center">{film.title}</h1>
    </div>
  );
};

export default MovieCard;
