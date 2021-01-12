const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('catalog-form').addEventListener('click', displayCreateForm)
    document.getElementById('catalogs').addEventListener('click', getCategories)
    getCategories()
})

function renderCatalogs() {
    document.getElementById("new-catalog-form").innerHTML = ""
    document.getElementById("new-movie-form").innerHTML = ""
    const catalogs = await apiService.fetchCatalogs()
    main.innerHTML = ""
    catalogs.map(catalog => {
        const newCatalog = new Catalog(catalog)
        main.innerHTML += newCatalog.renderCatalog() 
    })
    attachClicksCatalog()
}

function displayCatalogForm() {
    let formDiv = document.querySelector("#new-catalog-form")
    let html = `
        <form>
            <label>Catalog:</label>
            <input type="text" id="catalog">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createCatalog)
}

function clearForm() {
    let formDiv = document.querySelector('div#catalog-form')
    formDiv.innerHTML = ''
}

function createMovie(e) {
    e.preventDefault()
    let movie = {
        title: e.target.querySelector("#title").value
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/movies', configObj)
    .then(res => res .json()) 
    .then(movie => {
        main.innerHTML += `
        <br>
        <li>
        <a href="#" data-id="${movie.id}">${movie.title}</a>
        </li>
        `
        attachClicksToLinks()
        clearForm() 
        }
    ) 
}

