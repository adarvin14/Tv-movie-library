class ApiService {
    constructor() {
        this.baseURL = "tcp://127.0.0.1:3000"
    }

    async fetchMovies(){
        let resp = await fetch(this.baseURL + '/movies')
        let movies = await resp.json()
        return movies
    }

    async fetchMovie(id){
        let resp = await fetch(this.baseURL + `/movies/${id}`)
        let movie = await resp.json()
        return movie
    }

    async deleteMovie(id){
        let configObj = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        await fetch(this.baseURL + `/movies/${id}`, configObj)
    }

    async postMovie(movieData){
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(movieData)
        }
        let resp = await fetch(this.baseURL + `/movies`, configObj)
        let movie = await resp.json()
        return movie
    }

    async patchMovie(id, movieData){
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bookData)
        }
        let resp = await fetch(this.baseURL + `/movies/${id}`, configObj)
        let data = resp.json()
        return data
    }

    async fetchAllCatalogs(){
        let resp = await fetch(this.baseURL +'/catalogs')
        let catalogs = await resp.json()
        return catalogs
    }
}