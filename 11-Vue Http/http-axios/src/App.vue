<template>
  <div id="app">
    
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisições HTTP no Vue</h1>
        <p class="lead">Usando a biblioteca Axios para fazer chamadas Ajax à uma API REST.</p>
      </div>
    </div>

    <div class="container">

      <TarefasLista/>

      <button 
        class="btn btn-primary  mt-4 mb-2"
        @click="download">
        Baixar imagem
      </button>

      <div class="progress">
        <div 
        class="progress-bar progress-bar-striped bg-success" 
        role="progressbar" 
        :style="{width: progresso + '%'}" 
        :aria-valuenow="progresso" 
        aria-valuemin="0" 
        aria-valuemax="100">
          {{ progresso }} %
        </div>
      </div>

      <div v-if="imagem">
        <img :src="imagem" style="max-width: 100%">
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import config from './config/config'

import TarefasLista from './components/TarefasLista.vue'


export default {
  components: {
    TarefasLista
  },
  data() {
    return {
      progresso: 0,
      imagem: undefined

    }
  },
  async created() {
    /*axios.all([
      axios.get(`${config.apiURL}/tarefas/1`),
      axios.get(`${config.apiURL}/tarefas/3`)
    ]).then(axios.spread((tarefa1, tarefa3) =>{
        console.log('Requisiçõe simultãneas:')
        console.log('Tarefa1: ', tarefa1)
        console.log('Tarefa3: ', tarefa3)
    }))*/
   /*axios.all([
      axios.get(`${config.apiURL}/tarefas/1`),
      axios.get(`${config.apiURL}/tarefas/3`)
    ]).then(response => {
      const [tarefa1, tarefa3] = response
      console.log('Tarefa1: ', tarefa1)
      console.log('Tarefa3: ', tarefa3)
    })*/

   const tarefa1 = await axios.get(`${config.apiURL}/tarefas/1`)
   const tarefa3 = await axios.get(`${config.apiURL}/tarefas/3`)
   
   console.log('Requisiçõe simultãneas:')
   console.log('Tarefa1: ', tarefa1)
   console.log('Tarefa3: ', tarefa3)
  },
  methods: {
      download(evemt) {
        axios.get(
          'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
              console.log('Fazendo download...', progressEvent, evemt)
              this.progresso = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
            }
          }
        ).then(response => {
          
          console.log('Download concluido!', response)

          const reader = new window.FileReader()
          reader.readAsDataURL(response.data)
          reader.onload = () => {
            this.imagem = reader.result
          }

        })
      }
  }
  
}
</script>

