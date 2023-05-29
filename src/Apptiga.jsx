import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./component/MovieCard";
import YouTube from "react-youtube";

const AppTiga = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectMovie, setSelectMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);

  const API_URL = "https://api.themoviedb.org/3/";
  //   const apiKey = "d23ede28a0705a62134b1efa38c65fbb";
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const fetchMovie = async (searchKey) => {
    const type = searchKey ? `search` : `discover`;
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie?`, {
      params: {
        api_key: process.env.REACT_APP_APIKEY,
        query: searchKey,
      },
    });

    selectMovies(results[0]);
    setMovies(results);
  };
  //   const fetchMovie = async () => {
  //     // const type = searchKey
  //     //   ? `/search/movie?query=${searchKey}`
  //     //   : `/discover/movie/?api_key=${apiKey}`;
  //     const data = await axios
  //       //   .get(`${API_URL}${type}`)
  //       .get(`${API_URL}/discover/movie/?api_key=${apiKey}`)
  //       .then((response) => {
  //         // setMovies(results);
  //         setMovies(response.data.results);
  //       })
  //       .catch((err) => {
  //         console.log("errorr");
  //       });
  //   };

  // ini data untuk menjalankan trailer
  const fetchMovies = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_APIKEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovies = async (movie) => {
    const data = await fetchMovies(movie.id);
    // console.log("mov data", data);
    setPlayTrailer(false);
    setSelectMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  //   console.log(movies.results);

  const renderMovie = () => {
    return movies.map((movie) => {
      return <MovieCard key={movie.id} film={movie} select={selectMovies} />;
    });
  };

  const searchMovie = (e) => {
    e.preventDefault();
    fetchMovie(searchKey);
  };

  // console.log(hero);

  // ini bagian render youtube trailer
  const renderTrailer = () => {
    const trailer = selectMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );

    const key = trailer ? trailer.key : selectMovie.videos.results[0].key;
    return (
      <YouTube
        className="absolute bottom-0 left-0 top-0 right-0"
        videoId={key}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
  };

  console.log(selectMovies.videos);
  return (
    <div className="bg-[#090a0e]">
      <header className="container flex justify-between mx-auto p-10">
        <h1 className="text-white font-bold text-2xl capitalize">
          movie mania
        </h1>
        <form action="" onSubmit={searchMovie} className="">
          <input
            type="text"
            className="border-2 py-1 p-2 rounded-sm "
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />

          <button
            type={"submit"}
            className="px-6 py-1 bg-white ml-2 rounded-sm shadow-md hover:bg-slate-900 hover:text-white hover:border hover:border-white transition duration-500"
          >
            Search!
          </button>
        </form>
        {/* {searchKey} ini untuk mengecek e.target.value */}
      </header>

      {/* ini bagian hero */}
      <section>
        <div
          className="flex items-end  text-white  h-[500px] bg-cover bg-center p-6 relative"
          style={{
            backgroundImage: `url('${imgUrl}${selectMovie.backdrop_path}')`,
          }}
        >
          {selectMovie.videos && playTrailer ? renderTrailer() : null}
          <div className="container w-[80%] mx-auto ">
            {playTrailer ? (
              <button
                className="font-bold text-xl px-8 py-2 bg-slate-900 rounded-sm shadow-md transition duration-300 mb-10 hover:bg-slate-950 absolute z-10 bottom-8 left-8"
                onClick={() => {
                  setPlayTrailer(false);
                }}
              >
                Close
              </button>
            ) : null}
            <button
              className="font-bold text-xl px-8 py-2 bg-slate-900 rounded-sm shadow-md transition duration-300 mb-10 hover:bg-slate-950"
              onClick={() => {
                setPlayTrailer(true);
              }}
            >
              Play Trailer
            </button>
            <div className="">
              <h1 className="font-bold text-5xl mb-5 text-white ">
                {selectMovie.title}
              </h1>
              <p className="mb-10">
                {selectMovie.overview ? selectMovie.overview : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ini bagian popular movie */}
      <section className="">
        <div>
          <h2 className="bg-slate-900 container mx-auto pt-6 pl-10 text-white font-bold text-2xl">
            Popular
          </h2>
        </div>
        <div className="container flex flex-wrap justify-center p-10 mx-auto  bg-slate-900 ">
          {renderMovie()}
        </div>
      </section>
    </div>
  );
};

// ini contoh bg inline css
// const bg = {
//   backgroundImage: `url(https://image.tmdb.org/t/p/original/fI5RsaM0NSU6TqztRhA2pal5ezv.jpg)`,
// };
export default AppTiga;
