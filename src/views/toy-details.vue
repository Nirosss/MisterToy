<template>
  <div v-if="currToy" class="toy-details-container flex column align-center">
    <custom-card>
      <h1>Details</h1>
      <h2>{{ currToy.name }}</h2>
      <h2>
        Lables:
      </h2>
        <ul class="toy-lables clean-list ">
          <li v-for="lable in currToy.labels"> {{lable}}</li>
        </ul>
      <h3>Status: {{ status }}</h3>
      <h3>created At: {{ createdAt }}</h3>
      <h5>ID: {{ currToy._id }}</h5>
      <router-link to="/toy" class="btn">Back</router-link>
    </custom-card>
  </div>
</template>

<script>
  import { toyService } from '../services/toy.service'
  import customCard from '../cmps/custom-card.vue'

  export default {
    data() {
      return {
        currToy: null,
      }
    },
    components: {
      customCard,
    },
    created() {
      const toyId = this.$route.params.toyId
      this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
          this.currToy = toy
      })
    },
    methods: {
      goBack() {
        this.$router.push(`/toys`)
      },
      goToEdit() {
        this.$router.push(`/toys/edit/${this.toy._id}`)
      },
      removeCar(carId) {
        this.$emit('removeCar', carId)
      },
    },
    computed: {
      status() {
        if (this.currToy.inStock) {
          return 'Availible'
        } else {
          return 'Out of stock'
        }
      },
      createdAt() {
        return (
          new Date(this.currToy.createdAt).toLocaleTimeString('en-US') +
          '  ' +
          new Date(this.currToy.createdAt).toLocaleDateString('en-US')
        )
      },
    },
  }
</script>
