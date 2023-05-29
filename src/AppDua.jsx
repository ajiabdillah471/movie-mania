import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./component/MovieCard";
import { type } from "@testing-library/user-event/dist/type";

const AppDua = () => {
  // ini variabel di ambil dari api tmdb
  const baseURL = "https://api.themoviedb.org/3/";
  const apiKey = "d23ede28a0705a62134b1efa38c65fbb";

  // ini const untuk menyimpan data sementara movie yg di ambil dari api
  const [movies, setMovies] = useState([]);

  // ini hooks untuk search
  const [searchKey, setSearchKey] = useState("");

  // ini mengambil datanya
  const fetchMovie = async () => {
    const data = await axios.get(`${baseURL}/discover/movie?api_key=${apiKey}`);

    return data.data.results;
  };

  // const fetMovie = async (searchKey) => {
  //   const tipe = searchKey ? "search" : "discover";
  //   const {data: (results)} = await axios.get(`${baseURL}/${tipe}/movie`), {
  //     params: (
  //       api_key: apiKey,
  //       query: searchKey
  //     )
  //   }
  // }

  // ini memasukan data ke setMovies
  useEffect(() => {
    fetchMovie().then((result) => {
      setMovies(result);
    });
  }, []);
  //   console.log(movies);

  // ini arrow function untuk looping movie dan dimasukan di componen moviecard lalu dipanggil
  const RenderMovies = () => {
    return movies
      .filter((movie) => {
        if (searchKey === "") {
          return movie;
        } else if (
          movie.title.toLowerCase().includes(searchKey.toLocaleLowerCase())
        ) {
          return movie;
        }
      })
      .map((movie) => {
        return (
          <MovieCard key={movie.id} film={movie} />
          // <div key={index}>
          //   <p>{movie.title}</p>
          // </div>
        );
      });
  };

  // const searchMovies = (e) => {
  //   e.preventDefault(e);
  // };
  console.log(setSearchKey);
  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold p-6">hallo aji abdillah</h1>

        <form action="">
          <input
            type="text"
            className="border py-2"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          {/* <button type="submit" className="px-8 py-2 bg-slate-400">
            Search!
          </button> */}
        </form>
      </header>
      <div className="flex flex-wrap justify-around gap-6 container mx-auto border border-slate-300">
        <RenderMovies />
      </div>
    </div>
  );
};

export default AppDua;
