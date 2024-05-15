<template> 
  <div id="app">
    
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Animações</h1>
        <p class="lead">Treiando transição/animação de elementos/components no Vue</p>
      </div>
    </div>
    
    <div class="container">
      
      <button class="btn btn-primary mb-3" @click="mostrar = !mostrar">FADE</button>

      <button class="btn btn-secondary mb-3" @click="ZOOM = !ZOOM">ZOOM</button>

      <button class="btn btn-dark mb-3" @click="SLIDE = !SLIDE">Slide</button>

      <button class="btn btn-info mb-3" @click="CSS = !CSS">CSS</button>

      <button class="btn btn-danger mb-3" @click="JS = !JS">JS</button>
      
    <!--  <button class="btn btn-gray mb-3" @click="alternar=!alternar">Alternar</button> -->

      <div class="form-group" >
        <label>Animações: </label>
       <select class="form-control" v-model="animacaoSelecionada">
        <option value="fade" >Fade</option>
        <option value="zoom" >Zoom</option>
        <option value="slide">Slide</option>
       </select>
        
      </div>
      
      <div class="form-group" >
        <label>Component: </label>
       <select class="form-control" v-model="componentSelecionado">
        <option value="AppHome" >Home</option>
        <option value="AppSobre" >Sobre</option>
       </select>
        
      </div>

     <!-- <div class="form-group" >
        <label>Mensagem: </label>
       <select class="form-control" v-model="alternarAlerta">
        <option value="info" >Informação</option>
        <option value="warning" >Alerta</option>
        <option value="success">Sucssso</option>
       </select>
        
      </div>
      --> 
     

      <transition :name="animacaoSelecionada" mode="out-in">
       <component :is="componentSelecionado"></component>
      </transition>    
      
      <transition name="fade">
        <div class="alert alert-primary" v-if="mostrar">Animações no Vue</div>
      </transition>

      <transition name="zoom">
        <div class="alert alert-primary" v-if="ZOOM">Animações no Vue(ZOOM)</div>
      </transition>     

      <transition name="slide" type="animation">
        <div class="alert alert-primary" v-if="SLIDE">Animações no Vue(SLIDE)</div>
      </transition>

      
      <!-- <transition :name="animacaoSelecionada" mode="out-in">
       <div :class="classesAlerta" :key="alternarAlerta">Animações no Vue (informação)</div>

        Ao retirar essa parte commitada deve ser commitada essas 3 divs 
        <div class="alert alert-info" v-if="alternarAlerta === 'info'" key="informacao">Animações no Vue (informação)</div>
        <div class="alert alert-warning" v-if="alternarAlerta === 'warning'" key="warning">Animações no Vue (alerta)</div>
        <div class="alert alert-success" v-if="alternarAlerta === 'success' " key="sucesso">Animações no Vue (success)</div>
       </transition>   --> 
      
     
      <transition 
        
        appear
        appear-class=""
        appear-active-class="animated flipInY"
        appear-to-class=""

        @before-appear="beforeAppear"
        @appear="appear"
        @after-appear="afterAppear"
        @appear-cancelled="appearCancelled"

        enter-class=""
        enter-active-class="animated bounceInLeft"
        enter-to-class=""

        leave-class=""
        leave-active-class="animated bounceOutDown"
        leave-to-class=""
        >
        <div class="alert alert-primary" v-if="CSS">Animações no Vue(Animate CSS / Classes)</div>
      </transition>

      <transition
        
        appear 

        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="enterCancelled"

        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled"

        :css="false"
      >
        
        <div class="alert alert-primary" v-if="JS">Animações no Vue(Gatilho JS)</div>
      </transition>

    
    </div>
    
    <!--TECNOLOGIAS-->
    
    <div class="container">
      <h3 class="front-weight-light">Tecnologias</h3>

      <div class="row">
        <div class="col-sm2">

          <button class="btn btn-info" @click="embaralhar">Embaralhar</button>
        
        </div>
        <div class="col-sm10">  
          
          <div class="form-group">
            <input 
            type="text" 
            class="form-control"
            placeholder="Insira um novo item e pressione Enter"
            @keyup.enter="adicionar"
            ref="input"
            >
          </div>

        </div>
      </div>
      
      <transition-group tag="ul" class="list-group" name="list">
        <li 
        class="list-group-item"
        v-for="(tecnologia, indice) in tecnologias"
        :key="tecnologia">
          <span>{{ tecnologia }}</span>
          <button 
          class="btn btn-danger btn-sm float-right"
          @click="remover(indice)">
            x
          </button>
        </li>
      </transition-group>
    
    </div>
  
     <br>
    
    <!-- Animações de estado -->
    <div class="container">
      <h3 class="front-weight-light">Animações de Estado</h3>

      <div class="form-group">
        <input  class="form-control" v-model="numero" step="50">
      </div>

      <div class="alert alert-info">
        <h3 class="font-weight-light">
          <strong>Número:</strong>
          <span> {{ numeroAnimado }} </span>
        </h3>
      </div>
    </div>
  
  
  </div>
</template>
 
<script>
/* eslint-disable no-unused-vars */

import { shuffle } from 'lodash'
import { TweenLite  } from 'gsap/TweenLite'

export default {
  components: {
    AppHome: () => import('./components/Home.vue'),
    AppSobre: () => import('./components/Sobre.vue')
  },
  data ()  {
    return {
      mostrar: true,
      ZOOM:true,
      SLIDE:true,
      CSS:true,
      JS:true,
      alternar: true,
      alternarAlerta: 'info',
      animacaoSelecionada: 'fade',
      componentSelecionado:'AppHome',
      tecnologias:[
        'JavaScript' ,
        'Vue JS',
        'Vuex',
        'Vue Router'

      ],
      numero: 0,
      numeroInterpolado: 0,
      
    }
  },
  computed: {
    classesAlerta() {
      return {
        alert: true,
        [`alert-${this.alternarAlerta}`]: true
      };
    },
    numeroAnimado() {
      return this.numeroInterpolado.toFixed(0)
    }
  },
  watch: {
    numero(novoNumero,antigoNumero) {
      TweenLite.to(this.$data, 2, { numeroInterpolado:novoNumero })
    }
    
  },
  
  methods: {
    beforeAppear(el) {
      console.log('beforeAppear')
    },
    appear(el, done) {
      console.log('appear')
      setTimeout(done, 1000)
    },
    afterAppear(el) {
      console.log('afterAppear')
    },
    appearCancelled(el) {
      console.log('appearCancelled')
    },

    beforeEnter(el) {
      console.log('beforeEnter')
      el.style.opacity=0
    },
    enter(el, done) {
      console.log('enter' )

      let contagem = 0

      const intervalo = setInterval(() =>{
        el.style.opacity = + el.style.opacity + 0.1
        contagem++

        if(contagem > 10) {
          clearInterval(intervalo)
          done()
        }
      },150)

    },
    afterEnter(el) {
      console.log('afterEnter')
    },
    enterCancelled (el) {
      console.log('enterCancelled')
    },

    beforeLeave(el) {
      console.log('beforeLeave')
      el.style.transition = 'width 0.5s'
      el.style.overflow =  'hidden'
      el.style.whiteSpace = 'nowrap'
    },
    leave(el, done) {
      console.log('leave')

      let contagem = 0
      const tamanho = el.offsetWidth

      const intervalo = setInterval(() => {

        el.style.width = (tamanho * (1 - (contagem / 10))) + 'px'
        contagem++

        if (contagem > 10) {
          clearInterval(intervalo)
          done()
        }

      },150)
    },
    afterLeave(el) {
      console.log('afterLeave')
    },
    leaveCancelled(el) {
      console.log('leaveCancelled')
    },
    
    //Aba Tecnologias 
   
    adicionar(event) {
      const novoItem =event.target.value
      if (novoItem) {
        const indice = Math.floor(Math.random() * this.tecnologias.length)
        this.tecnologias.splice(indice, 0, novoItem)
        this.$refs.input.value = ''
      }
    },
    remover(indice) {
      this.tecnologias.splice(indice, 1)
    },
    embaralhar() {
        this.tecnologias = shuffle( this.tecnologias)
    }
  }
}
/* eslint-disable no-unused-vars */
</script>

<style>

  body {
    overflow: auto;
  }

</style>

<style scoped>

/*entrada e saída */

.slide-enter, .slide-leave-to{
 opacity: 0;
}

.slide-enter-active{
  animation: slide 0.7s cubic-bezier(.64,.3,.02,2.41);
  transition: opacity 0.7s cubic-bezier(1,1.74,.26,1);
}

/*.slide-enter-to, .slide-leave{
 opacity: 1;
} Comportamento default pode ser ocultado */

.slide-leave-active{
  animation: slide 0.7s reverse;
  transition: opacity 0.7s;
}


@keyframes slide {
  0%{
    transform: translateX(-100px);
  }
  100%{
    transform: translateX(0px);
  }
}

.zoom-enter, .zoom-leave-to{
  transform: scale(0);
}

.zoom-enter-active, .zoom-leave-active{
  transition: transform 0.5s;
}

.zoom-enter-to, .zoom-leave{
 transform: scale(1)
}

/*entrada e saída */

.fade-enter,  .fade-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-to, .fade-leave{
  opacity: 1;
}





/*
 (entrada) 
 .fade-enter {
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 1s;
}

.fade-enter-to{
 opacity: 1;
}

 (saída) 
.fade-leave {
  opacity: 1;
}

.fade-leave-active{
  transition: opacity 1s;
}

.fade-leave-to{
  opacity: 0;
}
*/

/* Tecnologias */

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-70px);
}

.list-enter-active, .list-leave-active, .list-move {
  transition: all 1s;
}

/*Atributo v-move  foi  substituído pelo 
 nome que eu atribuí - list;
 Agrupado ao list-active

.list-move {
  transition: all 1s;
}*/

.list-leave-active{
  position: absolute;
  width: calc(100% - 100px);
}
.btn{
  margin-right: 8px;

}
.btn-secondary {
  background-color: green;

}
.row {
  margin-right: 0;
  margin-left: 0;
}

</style>

