import React, { Component } from 'react'
import { movies } from './getMovies'
export default class List extends Component {
  render() {
    let movie=movies.results[0];
    return (
      <div>
        <h3>Trending</h3>
        <div className='movies-list'>
        <div className="card movie-card">
  <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} class="card-img-top banner-img" alt="..."/>
  <div className="card-body">
    <h5 className="card-title movie-title">{movie.original_title}</h5>
    {/* <p className="card-text banner-text">
      {movie.overview}</p> */}
    <a href="#" class="btn btn-primary">Add to Favourites</a>
  </div>
</div>
        </div>
      </div>
    )
  }
}
