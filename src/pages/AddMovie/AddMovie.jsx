import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotAuthorized from "../../assets/not-authorized.png";
import { languages } from "../../utils/movies";
import { WithContext as ReactTags } from "react-tag-input";
import { getCurrentUser } from "../../store/userSlice";
import { toast } from "sonner";
import { addMovie } from "../../store/movieSlice";
// adult,
// backdrop_path,
// genre,
// id,
// tags,
// original_language,
// overview,
// popularity,
// poster_path,
// release_date,
// title,
// likedBy,
// video,
// vote_average,
// vote_count,
// trailer,
const initialMovieData = {
  adult: false,
  backdrop_path: "",
  genre: [],
  id: 0,
  tags: [],
  original_language: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  likedBy: [],
  video: true,
  vote_average: 0,
  vote_count: 0,
  trailer: "",
};
const isImageUrl = (url) => {
  // Define a regular expression for common image file extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;

  // Test if the URL ends with a valid image extension
  if (imageExtensions.test(url)) {
    return true;
  }

  // If none of the above conditions are met, return false
  return false;
};

const AddMovie = () => {
  const [formData, setFormData] = useState(initialMovieData);
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt_token"));
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);
  const [movieTags, setTags] = useState([]);
  const [genre, setGenre] = useState([]);
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDelete = (i) => {
    setTags(movieTags.filter((tag, index) => index !== i));
    setFormData({
      ...formData,
      tags: [...movieTags]
        .filter((tag, index) => index !== i)
        .map((item) => item.text),
    });
  };
  const handleAddition = (tag) => {
    setTags([...movieTags, tag]);
    setFormData({
      ...formData,
      tags: [...movieTags, tag].map((item) => item.text),
    });
  };
  const handleGenreDelete = (i) => {
    setGenre(genre.filter((gen, index) => index !== i));
    setFormData({
      ...formData,
      genre: [...genre]
        .filter((gen, index) => index !== i)
        .map((item) => item.text),
    });
  };
  const handleGenreAddition = (genreText) => {
    setGenre([...genre, genreText]);
    setFormData({
      ...formData,
      genre: [...genre, genreText].map((item) => item.text),
    });
  };
  const handleFormFieldChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddMovie = () => {
    if (formData.vote_average > 5) {
      toast.error("Please enter vote_average between 0-5");
      return;
    }
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    formData.vote_average = +formData.vote_average;
    formData.popularity = +formData.popularity;
    formData.vote_count = +formData.vote_count;
    dispatch(addMovie({ values: formData, token }));
  };
  console.log(formData);
  console.log(movieTags);
  return currentUser?.role === "admin" ? (
    <>
      <h1 className="text-center pt-[80px] text-[54px]">
        Add A Movie To The Collection
      </h1>
      <div className="flex w-[70%] pt-[40px] m-auto justify-between  h-full">
        <div className="flex flex-col gap-[15px] w-[45%]">
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            required
            onChange={handleFormFieldChange}
          />
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="">Date of Release</label>
            <input
              type="date"
              className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
              name="release_date"
              placeholder="Date Of Release"
              required
              onChange={handleFormFieldChange}
            />
          </div>
          <select
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            name="adult"
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                adult: e.target.value === "yes" ? true : false,
              });
            }}
          >
            <option value="" className="text-neutral-900">
              --Choose Verdict--
            </option>
            <option value="yes" className="text-neutral-900">
              Yes
            </option>
            <option value="no" className="text-neutral-900">
              No
            </option>
          </select>
          <textarea
            name="overview"
            id=""
            cols="30"
            rows="7"
            placeholder="Movie Overview"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            required
            onChange={handleFormFieldChange}
          ></textarea>
          <input
            type="text"
            name="poster_path"
            placeholder="Poster URL"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            required
            onChange={(e) => {
              if (isImageUrl(e.target.value)) {
                setFormData({
                  ...formData,
                  poster_path: e.target.value,
                });
                return;
              }
              toast.error("Enter a valid image url");
            }}
          />
          <input
            type="text"
            name="backdrop_path"
            placeholder="Backdrop URL"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            required
            onChange={(e) => {
              if (isImageUrl(e.target.value)) {
                setFormData({
                  ...formData,
                  backdrop_path: e.target.value,
                });
                return;
              }
              toast.error("Enter a valid image url");
            }}
          />
          <select
            name="original_language"
            placeholder="Original Movie Language"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            required
            onChange={handleFormFieldChange}
          >
            <option value="">--Select Language--</option>
            {languages.map((item) => (
              <option className="text-neutral-900">{item}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-[15px] w-[45%]">
          <input
            type="number"
            name="vote_count"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            placeholder="Number Of Votes"
            onChange={handleFormFieldChange}
          />
          <input
            type="number"
            name="vote_average"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            placeholder="Rating"
            onChange={(e) => {
              if (e.target.value > 5) {
                toast.error("Enter a valid vlaue between 0-5");
                return;
              }
              setFormData({
                ...formData,
                vote_average: e.target.value,
              });
            }}
          />
          <select
            name="popularity"
            id=""
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            onChange={handleFormFieldChange}
          >
            <option value="">--Choose Popularity--</option>
            {Array.from({ length: 100 }, (_, idx) => (
              <option className="text-neutral-900">{idx + 1}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Trailer URL"
            name="trailer"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            onChange={handleFormFieldChange}
          />
          <ReactTags
            tags={movieTags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            placeholder="Write tags and hit enter"
            autocomplete
          />
          <ReactTags
            tags={genre}
            delimiters={delimiters}
            handleDelete={handleGenreDelete}
            handleAddition={handleGenreAddition}
            inputFieldPosition="bottom"
            placeholder="Write genres and hit enter"
            autocomplete
          />
          <input
            name="id"
            type="text"
            placeholder="Enter Movie Id(if any)"
            className="py-2 px-4 outline-none border-neutral-400 rounded-md bg-transparent border-[1px]"
            onChange={handleFormFieldChange}
          />
          <button
            className="bg-red-500 text-white text-[20px] font-semibold px-4 py-2 rounded-md tracking-[2px]"
            onClick={handleAddMovie}
          >
            Add Movie
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="h-full text-red-400 flex flex-col items-center justify-center gap-[40px]">
      <h1 className="text-[52px] text-center w-[50%]">
        Sorry, You Are Not Authorized To Add a Movie. Logout And Enter As An
        Admin
      </h1>
      <img src={NotAuthorized} alt="" />
    </div>
  );
};

export default AddMovie;
