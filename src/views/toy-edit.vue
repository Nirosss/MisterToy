<template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <form @submit.prevent class="form">
      <div class="form-control">
        <label for="name" class="form-label">Toy Name</label>
        <input
          required
          v-model="toyToEdit.name"
          id="name"
          type="text"
          class="form-input"
          placeholder="Enter your toy name here..."
        />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Toy Price</label>
        <input
          required
          v-model.number="toyToEdit.price"
          id="price"
          type="number"
          class="form-input"
        />
      </div>
      <div class="btn-group">
        <button @click="saveToy" type="button" class="btn btn-info">save</button>
        <button @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
  import { toyService } from '../services/toy.service.js'

  export default {
    name: 'toy-edit',
    data() {
      return {
        toyToEdit: null,
      }
    },
    created() {
      const  { toyId }  = this.$route.params
      if (toyId) {
        toyService.getById(toyId).then((toy) => {
          this.toyToEdit = toy
          console.log(this.toyToEdit)
        })
      } else this.toyToEdit = toyService.getEmptyToy()
      console.log(this.toyToEdit)
     
    },
    methods: {
      goBack() {
        this.$router.push('/toy')
      },
      saveToy() {
        this.$store
          .dispatch({ type: 'saveToy', toy: this.toyToEdit })
          .then(() => {
            this.$router.push('/toy')
          })
      },
    },
  }
</script>
