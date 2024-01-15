import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Navbar from "../../components/Navbar/Navbar";

import { FaClock, FaWindowClose } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/userSlice";
import {
  getAllMovies,
  removeFromWatchlist,
  updateWatchlist,
} from "../../store/movieSlice";
import { checkWatchlist } from "../../utils/movies";

const Home = () => {
  const { currentUser, auth } = useSelector((store) => store.user);
  const { movies, moviesPending, moviesError } = useSelector(
    (store) => store.movies
  );
  const [jwtToken, setJWTToken] = useState(null);
  const dispatch = useDispatch();

  const [trendingMovies, setTrendingMovies] = useState(null);
  const [showMovieDetail, setShowMovieDetails] = useState(null);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("movie_token"));
    if (token) {
      setJWTToken(token);
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);
  useEffect(() => {
    if (movies) {
      setTrendingMovies(
        [...movies]
          .sort((a, b) => b.popularity - a.popularity)
          .filter((item) => item.popularity > 90)
      );
    }
  }, [movies]);
  return (
    <div className="py-2 h-full w-full px-4  flex ">
      <div className="flex-[9.5] overflow-scroll overflow-x-hidden ">
        <Navbar />
        <div className="pt-6">
          <p className="text-[36px]">Trending</p>
          <Swiper
            id="testimonials"
            style={{
              "--swiper-pagination-color": "#00d6ce",
              "--swiper-pagination-bullet-inactive-color": "#00d6ce",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-width": "9px",
              "--swiper-pagination-bullet-size": "8px",
              "--swiper-pagination-bullet-horizontal-gap": "2px",
              width: "100%",
              margin: "auto",
              paddingTop: "25px",
              paddingRight: "10px",
            }}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              500: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                delay: 1000,
                spaceBetween: 10,
              },

              1224: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                delay: 1000,
                spaceBetween: 20,
              },
            }}
          >
            {trendingMovies?.map((item) => {
              return (
                <SwiperSlide style={{ height: "400px" }}>
                  <div className="flex flex-col">
                    <div className="">
                      <img
                        src={item.backdrop_path}
                        alt=""
                        className="w-full h-[340px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="pt-4 w-[99%] m-auto">
          <p className="text-[36px]">Movies</p>
          <div className="grid grid-cols-4 gap-6 py-8 ">
            {movies?.map((item, idx) => {
              return (
                <div
                  className="flex w-full flex-col cursor-pointer relative movie-detail-drawer"
                  onMouseEnter={() => setShowMovieDetails(idx)}
                  onMouseLeave={() => setShowMovieDetails(false)}
                >
                  <div className="w-full">
                    <img
                      src={`${item.poster_path}`}
                      alt=""
                      className="h-[350px] w-full object-cover rounded-md"
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
                        {auth && checkWatchlist(currentUser?._id, item) ? (
                          <div
                            className="flex items-center gap-[5px]"
                            onClick={() => {
                              const token = JSON.parse(
                                localStorage.getItem("movie_token")
                              );
                              if (auth && token) {
                                dispatch(
                                  removeFromWatchlist({
                                    movieId: item._id,
                                    token,
                                  })
                                );
                              }
                            }}
                          >
                            <FaWindowClose /> Remove from watchlist
                          </div>
                        ) : (
                          <div
                            className="flex gap-[5px] items-center "
                            onClick={() => {
                              const token = JSON.parse(
                                localStorage.getItem("movie_token")
                              );
                              if (auth && token) {
                                dispatch(
                                  updateWatchlist({ movieId: item._id, token })
                                );
                              }
                            }}
                          >
                            <FaClock /> Add to Watchlist
                          </div>
                        )}
                        {!auth && (
                          <div className="flex gap-[5px] items-center ">
                            <FaClock /> Add to Watchlist
                          </div>
                        )}
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
