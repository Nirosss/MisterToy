<template>
  <li class="toy-preview">
    <custom-card>
      <template #header>
        <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
        <p><span class="fw-bold">Lables:</span> {{ toy.labels[0] }}</p>
        <p>
          <span class="fw-bold">Price:</span>
          {{ $filters.currencyUSD(toy.price) }}
        </p>
      </template>

      <template #footer>
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="goToDetail" class="btn btn-info">details</button>
          <button @click="removeToy(toy._id)" class="btn btn-danger">
            delete
          </button>
        </div>
      </template>
    </custom-card>
  </li>
</template>

<script>
  import customCard from './custom-card.vue'

  export default {
    name: 'toy-preview',
    props: {
      toy: Object,
    },
    components: {
      customCard,
    },
    methods: {
      goToDetail() {
        this.$router.push(`/toy/${this.toy._id}`)
      },
      goToEdit() {
        this.$router.push(`/toy/edit/${this.toy._id}`)
      },
      removeToy(toyId) {
        this.$emit('removeToy', toyId)
      },
    },
  }
</script>
