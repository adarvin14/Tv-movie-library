const BASE_URL = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('catalog-form').addEventListener('click', displayCreateForm)
    document.getElementById('catalogs').addEventListener('click', getCategories)
    getCategories()
})

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