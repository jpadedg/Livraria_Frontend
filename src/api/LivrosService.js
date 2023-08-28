import axios from "axios";

const BASE_URL = "http://localhost:4000"

export class LivrosService{
    
    static getLivros(){
        return axios.get(BASE_URL+'/livros');
    }
    
    static getUmLivro(id){
        return axios.get(`${BASE_URL}/livro/${id}`);
    }

    static createLivro(body){
        console.log(body);
        return axios.post(`${BASE_URL}/livros/cadastro`, body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/livros/edicao/${id}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/delete/livro/${id}`);
    }
    
}