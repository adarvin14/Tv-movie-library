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