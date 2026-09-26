import Movie from "./Movie";
import './MovieList.css'

function MovieList(props){
    const {movies=[], isFirstLoad} = props
    if(isFirstLoad){
        return <h3 className="placeholder-text">Enter something in Search field</h3>
    }
    return(
        <div className="movies">
            {
                movies.length ? movies.map(movie =>(
                    <Movie key={movie.imdbID} {...movie}/>
                )) : <h3>Movie not found</h3>
            }
        </div>
    )
}

export default MovieList


