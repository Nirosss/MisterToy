<template>
  <section class="app-container container">
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from './cmps/app-header.vue'
export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  methods: {
    clicked() {
      alert('I got clicked!')
    },
  },
  components: {
    appHeader,
  },
}
</script>
