import { toyService } from '../../services/toy.service.js'

export default {
  state: {
    toys: null,
    filterBy: { status: 'All', name: '' },
  },
  getters: {
    toysForDisplay(state) {
      let filteredToys
      if (!state.filterBy.name && state.filterBy.status === 'All')
        filteredToys = JSON.parse(JSON.stringify(state.toys))
      else {
        if (state.filterBy.status === 'InStock') {
          filteredToys = state.toys.filter((toy) => toy.inStock)
        } else if (state.filterBy.status === 'Outofstock') {
          filteredToys = state.toys.filter((toy) => !toy.inStock)
        } else {
          filteredToys = state.toys
        }
        filteredToys = filteredToys.filter((toy) =>
          new RegExp(state.filterBy.name, 'i').test(toy.name)
        )
      }
      console.log('we got here', filteredToys)
      return filteredToys
        
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
      console.log(state.filterBy)
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then((toys) => {
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
  },
}
