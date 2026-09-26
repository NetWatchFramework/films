import React from 'react'
import './Search.css'

class Search extends React.Component{
    state = {
        search: '',
        type: 'all',
        page: 1 
    }

    triggerSearch = (newPage) =>{
        this.setState({ page: newPage }, () =>{
            this.props.searchMovie(this.state.search, this.state.type, newPage)
        })
    }

    handleKey = (e) => {
        if(e.key === 'Enter'){
            this.triggerSearch(1)
        }
    }

    handleSearchClick = () => {
        this.triggerSearch(1)
    }

    handleFilter = (e) =>{
        this.setState(
            {type: e.target.dataset.type},
            ()=>{this.triggerSearch(1)}
        )
    }

    prevPage = () =>{
        if(this.state.page > 1){
            this.triggerSearch(this.state.page - 1)
        }
    }

    nextPage = () =>{
        let limit = 10
        let totalPage = Math.ceil(this.props.totalCount / limit) || 1
        if(this.state.page < totalPage){
            this.triggerSearch(this.state.page + 1)
        }
    }

    render(){
        let limit = 10
        let totalPage = Math.ceil(this.props.totalCount / limit) || 1

        let maxButtons = 5 
        let startPage = Math.max(1, this.state.page - Math.floor(maxButtons / 2))
        let endPage = Math.min(totalPage, startPage + maxButtons - 1)

        if(endPage - startPage + 1 < maxButtons){
            startPage = Math.max(1, endPage - maxButtons + 1)
        }

        let num = []
        for(let i = startPage; i <= endPage; i++){
            num.push(i)
        }

        return(
            <>
                <div className="search">
                    <input 
                        type="search"
                        placeholder='search' 
                        value={this.state.search}
                        onChange={(e)=> this.setState({search: e.target.value})}
                        onKeyDown={this.handleKey}
                    />
                    <button 
                        className='btn'
                        onClick={this.handleSearchClick}
                        >Search</button>
                </div>
                <div className="radio">
                    <label htmlFor="all">
                        <input type="radio" name="type" id="all" data-type='all' checked={this.state.type === 'all'} onChange={this.handleFilter} />
                        All
                    </label>
                    <label htmlFor="movie">
                        <input type="radio" name="type" id="movie" data-type='movie' checked={this.state.type === 'movie'} onChange={this.handleFilter} />
                        Movies only
                    </label>
                    <label htmlFor="series">
                        <input type="radio" name="type" id="series" data-type='series' checked={this.state.type === 'series'} onChange={this.handleFilter} />
                        Series only
                    </label>
                    <label htmlFor="game">
                        <input type="radio" name="type" id="game" data-type='game' checked={this.state.type === 'game'} onChange={this.handleFilter} />
                        Games only
                    </label>
                </div>
                
                {totalPage > 1 && (
                    <div className="navigation">
                        <button 
                            className="btn nav-btn" 
                            onClick={() => this.triggerSearch(1)} 
                            disabled={this.state.page === 1}
                        >
                            &lt;&lt; First
                        </button>

                        <button 
                            className="btn nav-btn" 
                            onClick={this.prevPage} 
                            disabled={this.state.page === 1}
                        >
                            Prev
                        </button>

                        <div className="items">
                            {startPage > 1 && <span className="dots">...</span>}
                            
                            {
                                num.map((el, index)=> (
                                    <button 
                                        className={`btn num-btn ${this.state.page === el ? 'active' : ''}`} 
                                        key={index}
                                        onClick={() => this.triggerSearch(el)}
                                    >
                                        {el}
                                    </button>
                                ))
                            }

                            {endPage < totalPage && <span className="dots">...</span>}
                        </div>

                        <button 
                            className="btn nav-btn" 
                            onClick={this.nextPage}
                            disabled={this.state.page === totalPage}
                        >
                            Next
                        </button>

                        <button 
                            className="btn nav-btn" 
                            onClick={() => this.triggerSearch(totalPage)} 
                            disabled={this.state.page === totalPage}
                        >
                            Last &gt;&gt;
                        </button>
                    </div>
                )}
            </>
        )
    }
}

export default Search

