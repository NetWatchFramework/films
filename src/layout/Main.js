import React from 'react'
import MovieList from '../components/MovieList'
import Preloader from '../components/Preloader'
import Search from '../components/Search'
import './Main.css'

class Main extends React.Component{
    state = {
        movies: [],
        loading: true,
        count: 0,
        isFirstLoad: true
    }

    componentDidMount(){
        this.setState({loading: false})
        fetch('http://www.omdbapi.com/?apikey=b641cc31')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search || [], 
                loading: false, 
                count: Number(data.totalResults) || 0}))
    }

    searchMovie = (str, type='all', page = 1) =>{
        if (!str.trim()) return
        this.setState({loading: true})

        fetch(`http://www.omdbapi.com/?apikey=b641cc31&s=${str}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search || [], 
                loading: false, 
                count: Number(data.totalResults) || 0, 
                isFirstLoad: false}))
    }

    render(){
        const {movies, loading, count, isFirstLoad} = this.state
        
        return(
            <div className="main">
                <div className="wrap">
                    <Search searchMovie={this.searchMovie} totalCount={count} />
                    {
                        loading ? <Preloader /> : <MovieList movies={movies} isFirstLoad={isFirstLoad} />
                    }
                </div>
            </div>
        )
    }
}

export default Main






