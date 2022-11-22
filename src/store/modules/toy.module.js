import { toyService } from '../../services/toy.service.js'

export default {
  state: {
    toys: null,
    filterBy: {name:'' },
  },
  getters: {
    toys(state) {
      return state.toys
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex((toy) => toy.id === id)
      state.toys.splice(idx, 1)
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy.id === toy.id)
      if (idx !== -1) state.toys.splice(idx, 1, toy)
      else state.toys.push(toy)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = { ...state.filterBy, ...filterBy }
      
    },
  },
  actions: {
    loadToys({ commit, state }) {
      toyService.query(state.filterBy).then((toys) => {
        console.log(toys)
        commit({ type: 'setToys', toys })
      })
    },
    removeToy({ commit }, { id }) {
      toyService.remove(id).then(() => {
        commit({ type: 'removeToy', id })
      })
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then((toy) => {
        commit({ type: 'saveToy', toy })
      })
    },
    getToyById(context, { toyId }) {
      console.log(context)
      return toyService.getById(toyId)
    },
    setFilterBy({ commit, dispatch }, { filterBy }) {
      console.log(filterBy)
      commit({ type: 'setFilterBy', filterBy })
      dispatch({ type: 'loadToys' })
    },
  },
}
