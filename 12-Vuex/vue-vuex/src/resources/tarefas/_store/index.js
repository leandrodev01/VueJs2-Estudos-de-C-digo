/* eslint-disable */

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
    erro: undefined,
    tarefas: [],
    tarefaSelecionada: undefined
       
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions 

}