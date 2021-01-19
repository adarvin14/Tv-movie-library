const BASE_URL = 'http://127.0.0.1:3000/home'
const apiService = new ApiService() 

const init = () => {
    bindEventListeners()
    renderCatalogs()
}

function bindEventListeners() {
    document.getElementById('catalog-form').addEventListener('click', displayCreateCatalogForm)
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
    attachClickstoLinks()
}

function displayCreateCatalogForm() {
    let formDiv = document.getElementById('catalog-form')
    let html = `
        <br>
        <form>
            <label>Catalog Name:</label>
            <input type="text" id = "name">
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

async function createCatalog(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let catalog = {
        name: e.target.querySelector("#catalogs").value
    }

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
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/catalogs/${id}`)
    .then(resp => resp.json())
    .then(catalog => {
        main.innerHTML = `
        <h3>${catalog.name}:</h3>
        
        <br>
        <a href="#" id="movie-form" data-id="${catalog.id}">Add to Catalog</a>
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

function displayCreateMovieForm(e) {
    let movieId = e.target.dataset.id
    let formDivT = document.querySelector('div#movie-form')
    let htmlT = `
        <br>
        <form data-id="${movieId}">
        <input type="hidden" id="categoryId" value="${e.target.dataset.id}">
            <label>Title:</label>
            <input type="text" id = "title">
            <label>Release Year:</label>
            <input type="text" id = "release_year">
            <input type="submit">
        </form>
        `
    formDivT.innerHTML = htmlT
   document.querySelector('form').addEventListener('submit', createMovie)
}

function clearMovieForm() {
    let formDiv = document.querySelector('div#movie-form')
    formDiv.innerHTML = ''
}

function createMovie(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let catalogId = e.target.dataset.id
    let movie = {
        title: e.target.querySelector("#title").value,
        release_year:  e.target.querySelector("#release_year").value,
        catalog_id: catalogId
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + `/movies`, configObj)
    .then(res => res .json()) 
    .then(movie => {
        
        main.innerHTML += `
            <li>${movie.description}
                <button class="delete-movie" data-id="${movie.id}">Remove Movie</button>
            </li>
        `
        clearMovieForm()
        attachClicksToButtons()
        document.getElementById('movie-form').addEventListener('click', displayCreateMovieForm) 
        } 
    )
}

init() 