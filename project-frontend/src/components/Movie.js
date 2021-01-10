class Movie{
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.release_year = data.release_year
        this.catalog_id = data.catalog_id
    }

    catalogMovieHTML = function() {
        return `<div class="card" movie-id="${this.id}">
                    <h3><strong class="movie-name">${this.title} by: </strong></h3> 
                    <h3><strong class="movie-name">${this.release_year}</strong></h3>
                    <button class="delete-movie-button">Delete Movie</button> <br>
                </div>
        `
    }
}