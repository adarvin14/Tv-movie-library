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

    renderMovie() {
        let main = document.getElementById('main')
        main.innerHTML += 
            `
            <h4>Movie Title: ${this.title}</h4>
            <h4>Release Year: ${this.release_year}</h4>
            <button class="delete-movie" data-id="${this.id}">Delete Movie</button>
            <br>
            ` 
    }
}