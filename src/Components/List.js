import React, { Component } from 'react'
import { movies } from './getMovies'
export default class List extends Component {
  constructor(){
    super()
    this.state={
      hover:"",
    }
  }
  handleEnter=(id)=>{
this.setState({
  hover:id
})
  }
  handleLeave=()=>{
    this.setState({
      hover:""
    })
  }
  render() {
    let allMovies= movies.results;
    return (
      <>
      {
        allMovies.length==0?
        <div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
:
<>
      <div >
        <h3 className='trending display-3'>Trending</h3>
        <div className='movies-list'>
          {allMovies.map((movieObj)=>{
            return (
              <div className="card movie-card" onMouseEnter={()=>{this.handleEnter(movieObj.id)}} onMouseLeave={this.handleLeave}>
            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} class="card-img-top movie-img" alt="..." />
              <h5 className="card-title movie-title">{movieObj.original_title}</h5>
      <div className='button-wrapper'>
        {this.state.hover==movieObj.id &&
              <a href="#" className="btn btn-primary movie-button">
                Add to Favourites</a>
              }
            </div>
          </div>
            )
            })
          }
        </div>
      </div>
      <nav aria-label="Page navigation example" className='pagination'>
      <ul className="pagination">
        <li className="page-item"><a class="page-link" href="#">Previous</a></li>
        <li className="page-item"><a class="page-link" href="#">1</a></li>
        <li className="page-item"><a class="page-link" href="#">2</a></li>
        <li className="page-item"><a class="page-link" href="#">3</a></li>
        <li className="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
    </>
      }
      </>
    )
  }
}