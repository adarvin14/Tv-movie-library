const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('catalog-form').addEventListener('click', displayCreateForm)
    document.getElementById('catalogs').addEventListener('click', getCategories)
    getCategories()
})

async function renderCatalogs() {
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

function displayCreateForm() {
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


