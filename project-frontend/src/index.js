const BASE_URL = 'http://127.0.0.1:3000'
const apiService = new ApiService() 

const init = () => {
    bindEventListeners()
    renderCatalogs()
}

function bindEventListeners() {
    document.getElementById('catalogs-form').addEventListener('click', displayCreateCatalogForm)
    document.getElementById('catalogs-home').addEventListener('click', renderCatalogs)
}

async function renderCatalogs() {
    let main = document.getElementById('main')
    let catalogs = await apiService.fetchCatalogs()
    main.innerHTML = ""
    catalogs.map(catalog => { 
        let newCatalog = new Catalog(catalog)

        main.innerHTML += newCatalog.render()
    })
    attachClicksToLinks()
}

function displayCreateCatalogForm() {
    let formDiv = document.getElementById('catalog-form')
    let html = `
        <br>
        <form id="create-catalog">
            <label>Catalog Name:</label>
            <input type="text" id = "name">
            <input type="submit">
        </form>
    `
    console.log
    formDiv.innerHTML = html
    document.querySelector('#create-catalog').addEventListener('submit', createCatalog)
}

function clearForm() {
    let formDiv = document.querySelector('div#catalog-form')
    formDiv.innerHTML = ''
}

async function createCatalog(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let catalog = {
        name: e.target.querySelector("#name").value
    }
    
     console.log(catalog)   
    let data = await apiService.fetchCreateCatalog(catalog)

    let newCatalog = new Catalog(data)
    main.innerHTML += newCatalog.render()
    
    attachClicksToLinks()
    clearForm() 
}

function attachClicksToLinks() {
    let catalogs = document.querySelectorAll("li a")
    catalogs.forEach(catalog => {
        catalog.addEventListener('click', displayCatalog)
    })
    let buttons = document.querySelectorAll(".delete-catalog")
    buttons.forEach(btn => {
        btn.addEventListener('click', removeCatalog)
    })
}

function attachClicksToButtons() {
    let movies = document.querySelectorAll(".delete-movie")
    movies.forEach(movie => {
        movie.addEventListener('click', removeMovie)
    })
}

function displayCatalog(e) {
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/catalogs/${id}`)
    .then(resp => resp.json())
    .then(catalog => {
        main.innerHTML = `
        <h3>${catalog.name}:</h3>
        
        <br>
        <a href="#" id="movie-form" data-id="${catalog.id}">Add A Movie</a>
        <div id="movie-form"></div>
        <br>
        `
        catalog.movies.forEach( movie => {
            main.innerHTML += `
            <li >${movie.title}
                <button class="delete-movie" data-id="${movie.id}">Remove Movie</button>
            </li>
            `  
        })
        attachClicksToButtons()
        document.getElementById('movie-form').addEventListener('click', displayCreateMovieForm)
    })
}

function removeCatalog(e) {
    console.log(e.target)
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/catalog/${e.target.dataset.id}`, configObj)
    .then(() => {
        getCatalogs()}
    )
}

function removeMovie(e) {
    console.log(e.target)
    let movieId = e.target.dataset.id
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/movies/${movie.id}`, configObj)
    .then(() => {
        let buttons = document.querySelectorAll("li button")
        buttons.forEach(b => {
            if (b.dataset.id == movieId) {
                b.parentElement.remove()
            }
        })
    })

}
    
function displayCreateMovieForm() {
    let formDiv = document.getElementById('movie-form')
    let html = `
        <br>
        <form id="create-movie">
            <label> Title:</label>
            <input type="text" id = "title">
            <label> Release Year:</label>
            <input type="text" id = "release_year">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('#create-movie').addEventListener('submit', createMovie)
}

function clearMovieForm() {
    let formDiv = document.querySelector('div#movie-form')
    formDiv.innerHTML = ''
}

async function createMovie(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let catalogId = e.target.catalog.id
    let movie = {
        title: e.target.querySelector("#title").value,
        release_year: e.target.querySelector("#release-year").value,
        catalog_id: catalogId
    }
    
     console.log(catalog)   
    let data = await apiService.fetchCreateCatalog(catalog)

    let newCatalog = new Catalog(data)
    main.innerHTML += newCatalog.render()
    
    attachClicksToLinks()
    clearForm() 
}

init() 