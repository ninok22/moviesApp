import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MustWatchListPage from './pages/mustWatchListPage';
import TopRatedMoviesPage from './pages/topRatedMoviesPage';
import MovieCreditsPage from './pages/movieCreditsPage';
import PersonPage from './pages/personDetailsPage';

//retain all data in the cache for 1 hour before it becomes invalidated.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
    return (
    <QueryClientProvider client={queryClient}>  
      <BrowserRouter>
          <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
            {" "}
          <Switch></Switch>
        <Switch>
          <Route path="/person/" component={PersonPage} />
          <Route path="/movies/:id/moviecredits" component={MovieCreditsPage} />
          <Route exact path="/movies/topRated" component={TopRatedMoviesPage} />
          <Route exact path="/movies/mustWatchList" component={MustWatchListPage} />
          <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <Route exact path="/" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    );
  };

ReactDOM.render(<App />, document.getElementById("root"));