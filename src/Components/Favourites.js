import React, { Component } from 'react'
import axios from 'axios';
import Navbar from "./Navbar"
export default class Favourites extends Component {
    constructor(){
        super()
        this.state={
            movies:[],
            genre:[],
            currGenre:"All Genre",
            currText:"",
            limit:5,
            currPage:1
        }
    }
    async componentDidMount(){
        console.log("CDM called");
        // let res= await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2ba03c19ac9c2cc6ec52c091ccbfb961&language=en-US&page=1")
        // let data= await res.json()
        let data=JSON.parse(localStorage.getItem("movies"));
        let genreId={
          28:"Action",
          12:"Adventure",
          16:"Animation",
          35:"Comedy",
          80:"Crime",
          99:"Documentary",
          18:"Drama",
          10751:"Family",
          14:"Fantasy",
          36:"History",
          27:"Horror",
          10402:"Music",
          9648:"Mystery",
          10749:"Romance",
          878:"Sci-Fi",
          10770:"TV",
          53:"Thriller",
          10752:"War",
          37:"Western",
      }
let allGenre=[];
data.map((movieObj)=>{
if(!allGenre.includes(genreId[movieObj.genre_ids[0]])){
allGenre.push(genreId[movieObj.genre_ids[0]])
}
})
allGenre.unshift("All Genre");
console.log(allGenre);        
this.setState({
movies:[...data],
genre:[...allGenre]
})
}
handleGenre=(e)=>{
  let genre=e.target.innerText
this.setState({
  currGenre:genre
})
}
handleText=(e)=>{
  this.setState({
    currText:e.target.value
  })
}
sortPopularityAsc=()=>{
  let allMovies=this.state.movies
  allMovies.sort((objA,objB)=>{
    return objA.popularity - objB.popularity;
  })
  this.setState({
    movies:[...allMovies]
  });
}
sortPopularityDesc=()=>{
  let allMovies=this.state.movies
  allMovies.sort((objA,objB)=>{
    return objB.popularity - objA.popularity;
  })
  this.setState({
    movies:[...allMovies]
  });
}
sortRatingAsc=()=>{
  let allMovies=this.state.movies
  allMovies.sort((objA,objB)=>{
    return objA.vote_average - objB.vote_average;
  })
  this.setState({
    movies:[...allMovies]
  });
}
sortRatingDesc=()=>{
  let allMovies=this.state.movies
  allMovies.sort((objA,objB)=>{
    return objB.vote_average - objA.vote_average;
  })
  this.setState({
    movies:[...allMovies]
  });
}
handleDelete=(id)=>{
  let newMovies=this.state.movies.filter((movieObj)=>{
    return movieObj.id!=id
  })
  this.setState({
    movies:[...newMovies]
  })
  localStorage.setItem("movies",JSON.stringify(newMovies))
}
  render() {
    let genreId={
        28:"Action",
        12:"Adventure",
        16:"Animation",
        35:"Comedy",
        80:"Crime",
        99:"Documentary",
        18:"Drama",
        10751:"Family",
        14:"Fantasy",
        36:"History",
        27:"Horror",
        10402:"Music",
        9648:"Mystery",
        10749:"Romance",
        878:"Sci-Fi",
        10770:"TV",
        53:"Thriller",
        10752:"War",
        37:"Western",
    }
    let filteredMovies=this.state.movies
    // if(this.state.currText==""){
    //   filteredMovies=this.state.movies
    // }
    if(this.state.currText !== ""){
      filteredMovies=filteredMovies.filter((movieObj)=>{
        let movieName=movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText.toLowerCase())
      })
    }
    if(this.state.currGenre!="All Genre"){
      filteredMovies=filteredMovies.filter((movieObj)=>{
        return(
        genreId[movieObj.genre_ids[0]]==this.state.currGenre
        )
      })
    }
    // else{
    //   filteredMovies=this.state.movies
    // }
    let numOfPages=Math.ceil(filteredMovies.length/this.state.limit)
    let pagesArr=[]
    for(let i=1;i<=numOfPages;i++){
      pagesArr.push(i);
    }
    let si=(this.state.currPage-1)*this.state.limit;
    let ei=si+this.state.limit;
    filteredMovies=filteredMovies.slice(si,ei);
    return (
      <div className='row'>
        <div className='col-3 p-5 favourites-list' >
        <ul class="list-group">
          {
            this.state.genre.map((genre)=>{
              return(
                this.state.currGenre==genre?
             <li class="list-group-item active">{genre}</li>
             :
             <li class="list-group-item" onClick={this.handleGenre}>{genre}</li>
              )
            })
          }
  {/* <li class="list-group-item">Fantasy</li>
  <li class="list-group-item">Action</li>
  <li class="list-group-item">Animation</li> */}
  </ul>
  </div>
  <div className='col p-5 favourites-table' >
  <div className='row'>
    <input type="text" placeholder='Search' className='col-8 mx-1' value={this.state.currText} onChange={this.handleText}/>
    <input type="number" placeholder='Results per page' className='col' value={this.state.limit} onChange={(e)=>{
      this.setState({
        limit:Number(e.target.value)})
      }}/>
  </div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityAsc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityDesc}></i></th>
      <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingAsc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingDesc}></i></th>
    </tr>
  </thead>
  <tbody>
    
        {
filteredMovies.map((movieObj)=>{
  return(
<tr>
 <td>
  <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} style={{width:"8rem"}}/>
 {movieObj.original_title}
 </td>
      <td>{genreId[movieObj.genre_ids[0]]}</td>
      <td>{movieObj.popularity}</td>
      <td>{movieObj.vote_average}</td>
      <td><button className='btn btn-outline-danger' onClick={()=>{this.handleDelete(movieObj.id)}}>Delete</button></td>
</tr>
)
})
        } 
  </tbody>
</table>
</div>
<nav aria-label="Page navigation example" className='pagination'>
      <ul className="pagination">
        {
        pagesArr.map((pageNum)=>{
          return(
        <li className="page-item" onClick={()=>{this.setState({currPage:pageNum})}}><a className="page-link" href="#">{pageNum}</a></li>
        )})
      }
      </ul>
    </nav>
      </div>
    )
  }
}
