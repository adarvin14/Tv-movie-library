class ApiService {
    constructor() {
        this.baseURL = 'http://127.0.0.1:3000'
    } 

    async fetchCatalogs() {
        let res = await fetch(this.baseURL + '/catalogs')
        let data = await res.json()
        return data
    }

    async fetchMovies() {
        let res = await fetch(this.baseURL + '/movies')
        let data = await res.json()
        return data
    }

    async fetchCatalog(id) {
        let res = await fetch(this.baseURL + `/catalogs/${id}`)
        let data = await res.json()
        return data
    }

    async fetchMovie(id) {
        let res = await fetch(this.baseURL + `/movies/${id}`)
        let data = await res.json()
        return data
    }

    async fetchCreateCatalog(catalogData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(catalogData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/catalogs`, configObj)
        let data = await res.json()
        return data
    }

    async fetchCreateMovie(movieData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(movieData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + '/movies', configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveMovie(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/movies/${id}`, configObj)
    }

}