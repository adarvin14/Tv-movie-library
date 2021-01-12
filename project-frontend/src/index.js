const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('catalogs').addEventListener('click', getCatalogs)
    getCatalogs()

})

function displayCreateCatalogForm() {
    let formDiv = document.querySelector('div#catalog-form')
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

function createCatalog(e) {
    e.preventDefault()
    let catalog = {
        name: e.target.querySelector("#name").value
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(catalog),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/catalogs', configObj)
    .then(res => res .json()) 
    .then(catalog => {
        main.innerHTML += `
        <br>
        <li>
        <a href="#" data-id="${catalog.id}">${catalog.name}</a>
        - <button class="delete-catalog" data-id="${catalog.id}">Delete List</button>
        </li>
        `
        attachClicksToLinks()
        clearForm() 
        }
    ) 
}

function getCatalogs() {
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetchCatalogs()
    .then(catalogs => {
        main.innerHTML = `
        <a href="#" id="catalog-form">+Create a Movie Catalog</a>
        <div id="catalog-form"></div>
        `
        catalogs.map( catalog => {
        main.innerHTML += `
        <br>
        <li>
        <a href="#" data-id="${catalog.id}">${catalog.name}</a>
            <button class="delete-catalog" data-id="${catalog.id}">Delete Catalog</button>
        </li>
        ` 
        })
        attachClicksToLinks()
        clearForm()
        document.getElementById('catalog-form').addEventListener('click', displayCreateCatalogForm)
    })
    
}

async function fetchCatalogs() {
    let res = await fetch(BASE_URL + '/catalogs')
    let data = await res.json()
    return data
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
    fetch(BASE_URL + `/movies/${movieId}`, configObj)
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
    let catalogId = e.target.dataset.id
    let formDivT = document.querySelector('div#movie-form')
    let htmlT = `
        <br>
        <form data-id="${catalogId}">
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
        clearThingForm()
        attachClicksToButtons()
        document.getElementById('thing-form').addEventListener('click', displayCreateThingForm) 
        } 
    )
}

