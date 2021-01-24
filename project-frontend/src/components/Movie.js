class Movie{
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.release_year = data.release_year
        this.catalog_id = data.catalog_id
    }

    renderMovies() {
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.title}</a> 
        </li>
        `
    }

    renderMovie() {
        let main = document.getElementById('main')
        main.innerHTML += `
        <li >${this.title}, ${this.release_year}
            <button class="delete-movie" data-id="${this.id}">Remove Movie</button>
        </li>
        `
    }
}