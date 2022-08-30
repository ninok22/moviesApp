import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getUpcomingMovies } from "../api/tmdb-api"; 
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'
 
const UpcomingMoviesPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const mustWatchList = movies.filter(m => m.mustWatch)
    localStorage.setItem('mustWatchList', JSON.stringify(mustWatchList))
    const addToMustWatch = (movieId) => true 
    
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => { //render prop's function returns the icon to display in movie cards on the upcoming movies page
        return <AddToMustWatchIcon movie={movie} />
      }}
    />
   );
  };
  
  export default UpcomingMoviesPage;
