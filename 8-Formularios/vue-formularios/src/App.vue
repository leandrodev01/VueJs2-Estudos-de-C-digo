<template>
  
  <div id="app">
    
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="diplay-4">Formulários Vue</h1>
        <p class="lead">Treinando a manipulação de formulários</p>
      </div>
    </div>
  
    <div class="container">
      <div class="row">

        <!-- formulario -->
        <div class="col-sm-6">
          
          <h3>Prencha abaixo</h3>
          
          <form @reset="resetar"> 
            
            <div class="form-group">
              <label>Nome:</label>
              <input 
              type="text" 
              class="form-control" 
              placeholder="Seu nome"
              v-model.lazy.trim="desenvolvedor.nome"> 
            </div>

            <div class="form-group">
              <label>Endereço de email:</label>
              <input 
              type="email" 
              class="form-control" 
              laceholder="Seu email"
              v-model.lazy="desenvolvedor.email">
            </div>

            <div class="form-group">
              <label>Idade:</label>
              <input type="number" 
              class="form-control" 
              placeholder="Sua Idade"
              v-model.number="desenvolvedor.idade">
            </div>

            <div class="form-group">
             <p>Gênero:</p>

              <div class="form-check form-check-inline">
                <input type="radio" 
                class="form-check-input" 
                value="Masculino"
                v-model="desenvolvedor.genero">
                <label class="form-check-label">Masculino</label>
              </div>

              <div class="form-check form-check-inline">
                <input type="radio" 
                class="form-check-input" 
                value="Feminino"
                v-model="desenvolvedor.genero">
                <label class="form-check-label">Feminino</label>
              </div>
 
            </div>  

            <div class="form-group">
              <label>Ocupação:</label>
              <select class="form-control"  v-model="desenvolvedor.ocupacao">
                <!-- Este 1° option foi feito para browsers que tendem a selecionar a primeira opção com default 
                e não permitindo selecionar a 1° linha de imediato , tendo necessidade de recelecionar para confirmar-->
                <option value="" disabled>Selecione uma opção...</option>
                <option 
                v-for="(ocupacao, indice) in ocupacoes" 
                :key="indice"
                :value="ocupacao"
                :selected="ocupacao">
                {{ ocupacao }}
                </option>
              </select>
            </div> 

            <div class="form-group">

              <p>Tecnologias:</p>

              <div class="form-check form-check-inline">
                <input type="checkbox" 
                class="form-check-input"
                 value="JavaScript"
                 v-model="desenvolvedor.tecnologias">
                <label class="form-check-label">JavaScript</label>
              </div>

              <div class="form-check form-check-inline">
                <input 
                type="checkbox" 
                class="form-check-input"
                value="Vue JS"
                v-model="desenvolvedor.tecnologias">
                <label class="form-check-label"> Vue JS</label>
              </div>

              <div class="form-check form-check-inline">
                <input type="checkbox" 
                class="form-check-input" 
                value="Vuex"
                v-model="desenvolvedor.tecnologias">
                <label class="form-check-label">Vuex</label>
              </div>

              <div class="form-check form-check-inline">
                <input type="checkbox" 
                class="form-check-input" 
                value="Vue Router"
                v-model="desenvolvedor.tecnologias">
                <label class="form-check-label">Vue Router</label>
              </div>

            </div>

            <div class="form-group">
              <label>Resumo de perfil:</label>
              <textarea class="form-control" 
              placeholder="Conte-nos um pouco sobre você..." 
              v-model= "desenvolvedor.biografia">
              
              </textarea> 
            </div>

            <div class="form-group">
              <AppRange
              label="Salario pretendido"
              v-model.number="desenvolvedor.salario"
              min="0"
              max="10000"
              step="50"
              :inputClasses="{'form-control-range':true}"/>
            </div>

            <div class="form-group">

            <div class="form-check form-check-inline"></div>
              <input 
              type="checkbox" 
              class="form-form-check-input"
              v-model="desenvolvedor.notificações"
              true-value="Sim"
              false-value="Não">
              <label class="form-check-label">Receber notificações por email</label>           
            </div>
            
            <div>
              <button class="btn btn-secondary" type="reset">Resetar</button>
              <button class="btn btn-sucess" type="button" @click="enviar">Enviar</button>
            </div>

          </form>
        </div>

        <!--saída-->
        
        <div class="col-sm-6">
          
          <h3>Saída</h3>

          <div class="card">

            <div class="card-hearder">Dados</div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Nome:</strong> {{ desenvolvedor.nome }} </li>
              <li class="list-group-item"><strong>Email:</strong> {{ desenvolvedor.email }} </li>
              <li class="list-group-item"><strong>Idade:</strong>{{ desenvolvedor.idade }} </li>
              <li class="list-group-item"><strong>Gênero:</strong>{{desenvolvedor.genero}} </li>
              <li class="list-group-item"><strong>Ocupação:</strong>{{ desenvolvedor.ocupacao}} </li>
              <li class="list-group-item">
                <strong>Tecnologias:</strong> 
                <ul>
                  <li 
                    v-for="(tecnologia, indice) in desenvolvedor.tecnologias"
                    :key="indice">
                      {{ tecnologia }}
                  </li>
                  
                </ul>
              
              </li>
              <li class="list-group-item">
                <strong>Biografia:</strong> 
                <!-- <pre>{{ desenvolvedor.biografia }} 
                  Usado para quebra de linha automática
                  conforme o formulário -->
                <div style="white-space: pre">{{ desenvolvedor.biografia}}</div>
                </li>
              <li class="list-group-item"><strong>Receber notificações?</strong> {{ desenvolvedor.notificações  /* ? 'Sim': 'Não'*/ }} </li>
               <li class="list-group-item"><strong>Salário pretendido: R$</strong>{{ desenvolvedor.salario}} </li>
            </ul>

            
            <div class="card-header">Model</div>

            <div class="card-body">
              <pre><code>{{ { desenvolvedor } }}</code></pre>
            </div>
          
          </div>
        
        </div>
      
      </div>
    
    </div>
  
  </div>
</template>

<script>

import AppRange from './components/Range.vue';

export default {
  components: {
    AppRange
  },
  data() {
    return {
      desenvolvedor: {},
      valoresPadroes:{
        nome: '',
        email: '',
        idade: 24,
        biografia: 'Eu sou desenvolvedor desde 2024...',
        genero: 'Masculino',
        tecnologias: [] ,
        notificações: 'Não',
        ocupacao: '',
        salario: 0
      },
      ocupacoes: [
        'Desenvolvedor Front End (Web)',
        'Desenvolvedor Front End (Mobile)',
        'Desenvolvedor Front End (Web e Mobile)',
        'Desenvolvedor Back End',
        'Desenvolvedor Full Stack'
      ]
    }
  },
  methods: {
    enviar(event) {
      const formularioEnviado = Object.assign({}, this.desenvolvedor)
      console.log('Formulário enviado!', formularioEnviado, event)
    },
    resetar() {
      this.desenvolvedor = Object.assign({}, this.valoresPadroes)
    }
  },
  created() {
    this.resetar() // corrigindo a chamada do método
  }
}
</script>

<style scoped>
  .btn {
    margin-right: 5px;
    
    
  }
  .btn-sucess {
    background-color: green;
    color: white;
  }
 
</style>
