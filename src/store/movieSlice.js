import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/config";
import { toast } from "sonner";
import axios from "axios";

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/movies`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async ({ values, token }) => {
    try {
      const res = await axios.post(`${baseUrl}/movies/add`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Movie added to database");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const updateWatchlist = createAsyncThunk(
  "movies/updateWatchlist",
  async ({ movieId, token }) => {
    console.log(token);
    console.log(movieId);
    try {
      const res = await axios.patch(
        `${baseUrl}/movies/watchlist`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      return res.data.movies;
    } catch (error) {
      console.log(error);
    }
  }
);
export const removeFromWatchlist = createAsyncThunk(
  "movies/removeFromWatchlist",
  async ({ movieId, token }) => {
    console.log(token);
    console.log(movieId);
    try {
      const res = await axios.patch(
        `${baseUrl}/movies/watchlist/remove`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      return res.data.movies;
    } catch (error) {
      console.log(error);
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    moviesPending: false,
    moviesError: false,
    watchlistUpdatePending: false,
    watchlistUpdateError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        toast.loading("Loading Movies");
        state.moviesPending = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.moviesPending = false;
        state.moviesError = false;

        state.movies = action.payload;
        toast.success("Succes");
      })
      .addCase(getAllMovies.rejected, (state) => {
        state.moviesPending = false;
        state.moviesError = true;
        toast.error("Error Loading Movies");
      })
      .addCase(updateWatchlist.pending, (state) => {
        state.watchlistUpdatePending = true;
        toast.loading("Updating Watchlist");
      })
      .addCase(updateWatchlist.fulfilled, (state, action) => {
        state.watchlistUpdateError = false;
        state.watchlistUpdatePending = false;
        state.movies = action.payload;
        toast.success("Watchlist updated successfully");
      })
      .addCase(updateWatchlist.rejected, (state) => {
        state.watchlistUpdateError = true;
        state.watchlistUpdatePending = false;
        toast.error("Error updating watchlist");
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.watchlistUpdatePending = true;
        toast.loading("Updating Watchlist");
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlistUpdateError = false;
        state.watchlistUpdatePending = false;
        state.movies = action.payload;
        toast.success("Watchlist updated successfully");
      })
      .addCase(removeFromWatchlist.rejected, (state) => {
        state.watchlistUpdateError = true;
        state.watchlistUpdatePending = false;
        toast.error("Error updating watchlist");
      });
  },
});

export default movieSlice.reducer;
export const { increment, decrement, reset } = movieSlice.actions;
