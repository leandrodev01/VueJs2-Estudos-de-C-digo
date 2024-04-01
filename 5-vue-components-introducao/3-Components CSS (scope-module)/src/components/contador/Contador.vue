<template>
    <div :class="$style.contador">
        <h3>Clicado {{  contador }} vezes</h3>
        <button @click="incrementar">Incrementar</button>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            contador: 0
        }
    },
    methods: {
        incrementar() {
            this.contador++
        }
    },
    created() {
        console.log('CSS  modules', this.$style)
    }
}
</script>

<style module>
    .contador {
        border: 3px solid red;
    }
  
</style>