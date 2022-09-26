import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';
export default class List extends Component {
  constructor() {
    console.log("constructor is called");
    super();
    this.state = {
      hover: "",
      movies: [],
      currPage: 1,
      fav: JSON.parse(localStorage.getItem("movies")).map((movieObj) => movieObj.id),
    };
  }
  handleEnter=(id)=>{
this.setState({
  hover:id,
})
}
  handleLeave=()=>{
    this.setState({
      hover:"",
    })
  }
async componentDidMount(){
console.log("CDM called");
// let res= await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2ba03c19ac9c2cc6ec52c091ccbfb961&language=en-US&page=1")
// let data= await res.json()
let data=await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=2ba03c19ac9c2cc6ec52c091ccbfb961&language=en-US&page=1")
console.log(data.data);
this.setState({
  movies:[...data.data.results]
})
  }
//   async componentDidUpdate(){
// console.log("CDU called");
// let data=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2ba03c19ac9c2cc6ec52c091ccbfb961&language=en-US&page=${this.state.currPage}`)
// console.log(data.data);
// this.setState({
//   movies:[...data.data.results]
// })
// }
async getUpdatedMovies(){
  console.log("getUpdatedMovies called");
  let data=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2ba03c19ac9c2cc6ec52c091ccbfb961&language=en-US&page=${this.state.currPage}`)
console.log(data.data);
this.setState({
  movies:[...data.data.results]
})
}
componentWillUnmount(){
console.log("CWU called");
  }
  handlePreviousPage=()=>{
    if(this.state.currPage>1){
this.setState({
  currPage:this.state.currPage-1
},this.getUpdatedMovies)}
  }
  handleNextPage=()=>{
    this.setState({
      currPage:this.state.currPage+1
  },this.getUpdatedMovies)
}
handleFavourites=(movieObj)=>{
let favouriteMovies=JSON.parse(localStorage.getItem("movies")) || []
if(this.state.fav.includes(movieObj.id)){
favouriteMovies=favouriteMovies.filter((movie)=>{
  return(
    movie.id!=movieObj.id
  )
})
}
else{
  favouriteMovies.push(movieObj)
}
localStorage.setItem("movies",JSON.stringify(favouriteMovies))
let tempData=favouriteMovies.map(movieObj=>{
  return(movieObj.id)
})  
this.setState({
fav:[...tempData]
})
}
  render() {
    // console.log("render called");
    console.log("qwerty", JSON.parse(localStorage.getItem("movies")));
    // let allMovies= movies.results; 
    return (  
   <> 
      {
        this.state.movies.length==0?
        <div className="spinner-border text-info" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
:
<>
      <div >
        <h3 className='trending display-3'>Trending</h3>
        <div className='movies-list'>
          {this.state.movies.map((movieObj)=>{
            return (
              <div className="card movie-card" onMouseEnter={()=>{this.handleEnter(movieObj.id)}} onMouseLeave={this.handleLeave} key={movieObj.id}>
            <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
              <h5 className="card-title movie-title">{movieObj.original_title}</h5>
      <div className='button-wrapper'>
        {this.state.hover==movieObj.id &&
              <a href="#" className="btn btn-primary movie-button" onClick={()=>{this.handleFavourites(movieObj)}}
              >
                {
                  this.state.fav.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"
                }
                </a>
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
        <li className="page-item"  onClick={this.handlePreviousPage}><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">{this.state.currPage}</a></li>
        <li className="page-item" onClick={this.handleNextPage}><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
    </>
      }
      </>
    )
  }
}