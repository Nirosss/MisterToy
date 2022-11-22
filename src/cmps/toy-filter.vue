<template>
    <section class="toy-filter">
      <input
        v-focus
        v-model="filterBy.lables"
        @input="setFilter"
        type="text"
        class="form-input"
        placeholder="Search lables..."
      />
    </section>
  </template>
  
  <script>
  export default {
    name: 'toy-filter',
    data() {
      return {
        filterBy: {
          lables: '',
        },
      }
    },
    methods: {
      setFilter() {
        this.$emit('setFilter', this.filterBy)
      },
    },
  }
  </script>
  