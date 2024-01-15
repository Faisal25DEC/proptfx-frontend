export const checkWatchlist = (userId, movie) => {
  return movie?.likedBy?.includes(userId);
};
