import axios from 'axios'
import config from './config/config'



/*
axios.defaults.baseURL = config.apiURL

export default axios */

const instance = axios.create({})

instance.defaults.baseURL = config.apiURL

instance.interceptors.request.use(config => {
   
    console.log('Interceptando requisição: ', config)
    
    config.data = {
        ...config.data,
        curso: 'Vue JS'
    }
     
    //config.headers.common['Authorization'] = 'Bearer token-jwt'

    config.headers.put['Meu cabeçalho'] = 'Curso VueJS'

    return config
   
    /* return new Promise((resolve, reject) => {
            console.log('Fazendo requisição aguardar...')
            console.log('Enviando requisição...')
            setTimeout(() => {
                resolve(config)
            },2000)
    }) */
}, error => {
    console.log('Erro ao fazer requisição', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    console.log('Interceptando resposta...', response)
    if (Array.isArray(response.data)) {
        response.data = response.data.slice(1, 3)
    }
    return response
}, error => {
    console.log('Erro capturado no interceptador de respostas...', error)
    return Promise.reject(error)
})

export default instance