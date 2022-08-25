import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

//   return (
//     <PageTemplate
//       title="Favourite Movies"
//       movies={movies}
//       selectFavorite={toDo}
//     />
//   );
// };

return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      /* code indicates that movie cards on the Favorite movies page 
      should have two action icons: Remove from the Favorites and Write a Review */
      action={(movie) => { //introducing the render prop
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;



// import React from "react";
// import PageTemplate from "../components/templateMovieListPage";

// const FavoriteMoviesPage = (props) => {
//   const toDo = () => true;
//   // Get movies from local storage.
//   const movies = JSON.parse(localStorage.getItem("favorites")); 

//   return (
//     <PageTemplate
//       title="Favourite Movies"
//       movies={movies}
//       selectFavorite={toDo}
//     />
//   );
// };

// export default FavoriteMoviesPage;

