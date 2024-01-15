import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { baseUrl } from "../../utils/config";
import { FaClock } from "react-icons/fa";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [showMovieDetail, setShowMovieDetails] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${baseUrl}/movies`);
        console.log(res);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {}, []);
  return (
    <div className="py-2 px-4 h-full w-full  flex ">
      <div className="flex-[9.5] overflow-scroll overflow-x-hidden ">
        <Navbar />
        <div className="pt-6">
          <p className="text-[36px]">Trending</p>
        </div>
        <div className="pt-4">
          <p className="text-[36px]">Movies</p>
          <div className="grid grid-cols-4 gap-8 py-8 ">
            {movies?.map((item, idx) => {
              return (
                <div
                  className="flex flex-col cursor-pointer relative movie-detail-drawer"
                  onMouseEnter={() => setShowMovieDetails(idx)}
                  onMouseLeave={() => setShowMovieDetails(false)}
                >
                  <div>
                    <img
                      src={`${item.poster_path}`}
                      alt=""
                      className="h-[350px] min-w-[240px] object-cover rounded-md"
                    />
                  </div>
                  <div
                    className={`${
                      showMovieDetail === idx ? "flex" : "hidden"
                    } absolute  z-[1]  bottom-0 w-full h-[150px] flex-col movie-detail-drawer bg-neutral-950 rounded-t-[10px] justify-center items-center`}
                  >
                    <p className="text-[18px] font-medium">{item.title}</p>
                    <p>{item.release_date}</p>
                    <div className="pt-4">
                      <button className="flex gap-[5px] items-center text-red-400 border-[1px] border-red-400 py-2 px-2 rounded-md">
                        <FaClock /> Add to Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-[2.5]">tags</div>
    </div>
  );
};

export default Home;
