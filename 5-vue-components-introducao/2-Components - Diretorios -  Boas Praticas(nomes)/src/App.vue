<template>
   <div>
    <AppHeader/>
    <Contador/>
    
</div> 
</template>

<script>

import AppHeader from './components/shared/AppHeader.vue'
import Contador from './components/contador/Contador.vue'

export default {
    components: {
        AppHeader,
        Contador
    }
}
</script>