<template>
  <section class="toy-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new toy</button>
    <toy-filter @setFilter="setFilterBy" />
  </section>
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toys" />
</template>

<script>
  import { toyService } from '../services/toy.service.js'
  import toyFilter from '../cmps/toy-filter.vue'
  import toyList from '../cmps/toy-list.vue'

  export default {
    name: 'toy-app',
    data() {
      return {
        filterBy: null,
      }
    },
    computed: {
      toys() {
        return this.$store.getters.toysForDisplay
      },
    },
    created() {},

    methods: {
      loadToys() {
        toyService.query().then((toys) => (this.toys = toys))
      },
      setFilterBy(filterBy) {
        console.log(filterBy)
      this.$store.commit({
        type: 'setFilterBy',
        filterBy,
      })
    },
      goToEdit() {
        this.$router.push(`/toy/edit`)
      },
      removeToy(toyId) {
        this.$store.dispatch({ type: 'removeToy', id: toyId })
      },
    },
    components: {
      toyList,
      toyFilter,
    },
  }
</script>
