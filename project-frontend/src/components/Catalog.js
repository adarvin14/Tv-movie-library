const BASE_URL = 'http://127.0.0.1:3001/catalogs'
const MOVIE_URL = 'http://127.0.0.1:3001/movies'

class Catalog {
    constructor(data){
        this.id = data.id
        this.name = data.name
    }

    static newCatalogForm(){
        let newCatalogForm = document.getElementById('catalog-form')
        newCatalogForm.innerHTML = `
        <form onsubmit="createCatalgog(); return false;">` +
        CatalogForm +
        `<input type="submit" value="Create Catalog" >
        </form>
        <br> `  
    }

    static newMovieForm(data){
        let newMovieForm = document.getElementById('main')
        newMovieForm.innerHTML += `
        <form onsubmit="createMovie(); return false;">
                <label>Movie Title: </label>
                    <input id="movieTitle" placeholder="Title"></input>
                <label>Release Year: </label>
                    <input id="release_year" placeholder="Release Year"></input>
                
                    <input type="hidden" id="movieID"></input>
                <input type="hidden" id="${data}"></input>
                <input type="submit" value="Create Song">
        </form>
        <br> `  
    }


}