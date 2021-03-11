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

    formDiv.innerHTML = html
    document.querySelector('#create-catalog').addEventListener('submit', createCatalog)
}

function clearForm() {
    let formDiv = document.querySelector('#catalog-form')
    formDiv.innerHTML = ''
}

async function createCatalog(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let catalog = {
        name: e.target.querySelector("#name").value
    }
    
    let data = await apiService.fetchCreateCatalog(catalog)

        let c = new Catalog(data)

         main.innerHTML += c.render()
       
        clearForm()
        attachClicksToLinks()
        document.getElementById('catalogs-form').addEventListener('click', displayCreateCatalogForm) 
}

function attachClicksToLinks() {
    let catalogs = document.querySelectorAll("li a")
    catalogs.forEach(catalog => {
        catalog.addEventListener('click', displayCatalog)
    })
}

function attachDeletesToButtons() { 
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
    let c = Catalog.all.find(c => c.id == id)
    main.innerHTML = c.renderCatalog()
        c.movies.forEach( movie => {
            let newMovie = new Movie(movie)
            newMovie.renderMovie()
            
            attachClicksToLinks()
            attachClicksToButtons()
        })
    document.getElementById('add-movie').addEventListener('click',() => displayCreateMovieForm(c.id))
    attachDeletesToButtons()
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
    fetch(BASE_URL + `/catalogs/${e.target.dataset.id}`, configObj)
    .then(() => {
        renderCatalogs()}
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
    fetch(BASE_URL + `/movies/${e.target.dataset.id}`, configObj)
    .then(() => {
        let buttons = document.querySelectorAll("li button")
        buttons.forEach(b => {
            if (b.dataset.id == movieId) {
                b.parentElement.remove()
            }
        })
    })

}
    
function displayCreateMovieForm(catalog_id) {
    let formDiv = document.getElementById('main')
    let html = `
        <br>
        <form id="create-movie">
            <label> Title:</label>
            <input type="text" id = "title">
            <label> Release Year:</label>
            <input type="text" id = "release_year">
            <input type="hidden" id="catalog_id" value="${catalog_id}">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('#create-movie').addEventListener('submit', createMovie)
}

function clearMovieForm() {
    let formDiv = document.querySelector('#main')
    
    formDiv.innerHTML = ''
}

async function createMovie(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    
    let movie = {
        title: e.target.querySelector("#title").value,
        release_year: e.target.querySelector("#release_year").value,
        catalog_id: e.target.querySelector("#catalog_id").value
    }

    console.log(movie)

    await apiService.fetchCreateMovie(movie)
    .then(movie => { 
        let main = document.getElementById('main')
        let id = movie.catalog.id
        let c = Catalog.all.find(c => c.id == id)
        c.movies.push(movie)
        debugger
        main.innerHTML += c.renderCatalog()
            c.movies.forEach( movie => {
                let newMovie = new Movie(movie)
                newMovie.renderMovie()
                
                attachClicksToLinks()
            })

        attachClicksToButtons()
        } 
    
    )
    // main.innerHTML += newMovie.renderMovie()

}

init() 